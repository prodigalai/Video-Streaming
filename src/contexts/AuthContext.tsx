import React, { createContext, useContext, useState, useEffect } from 'react';

type UserRole = 'viewer' | 'creator' | 'admin' | 'agent';

interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  role: UserRole;
  credits: number;
  verificationStatus: 'unverified' | 'pending' | 'verified';
}

interface AuthContextType {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
  updateVerificationStatus: (status: 'unverified' | 'pending' | 'verified') => void;
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
      verificationStatus: 'unverified', // Default to unverified for testing
    };
    setUser(mockUser);
    localStorage.setItem('streamvault_user', JSON.stringify(mockUser));
  };
  
  const updateVerificationStatus = (status: 'unverified' | 'pending' | 'verified') => {
      if (user) {
          const updatedUser = { ...user, verificationStatus: status };
          setUser(updatedUser);
          localStorage.setItem('streamvault_user', JSON.stringify(updatedUser));
      }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('streamvault_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, updateVerificationStatus }}>
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
