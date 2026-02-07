import React, { createContext, useContext, useState, useEffect } from 'react';

type UserRole = 'viewer' | 'creator' | 'admin';

interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  role: UserRole;
  credits: number;
}

interface AuthContextType {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Initialize from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('streamvault_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (role: UserRole) => {
    const mockUser: User = {
      id: 'u1',
      name: 'AshN0408',
      username: 'ashn0408',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user',
      role: role,
      credits: 1250,
    };
    setUser(mockUser);
    localStorage.setItem('streamvault_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('streamvault_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
