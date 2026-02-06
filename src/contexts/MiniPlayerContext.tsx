import React, { createContext, useContext, useState, useCallback } from "react";

interface MiniPlayerState {
  isActive: boolean;
  streamId: string | null;
  streamTitle: string;
  streamThumbnail: string;
  creatorName: string;
  creatorAvatar: string;
  viewers: number;
}

interface MiniPlayerContextType {
  miniPlayer: MiniPlayerState;
  openMiniPlayer: (stream: Omit<MiniPlayerState, 'isActive'>) => void;
  closeMiniPlayer: () => void;
}

const MiniPlayerContext = createContext<MiniPlayerContextType | undefined>(undefined);

export function MiniPlayerProvider({ children }: { children: React.ReactNode }) {
  const [miniPlayer, setMiniPlayer] = useState<MiniPlayerState>({
    isActive: false,
    streamId: null,
    streamTitle: "",
    streamThumbnail: "",
    creatorName: "",
    creatorAvatar: "",
    viewers: 0,
  });

  const openMiniPlayer = useCallback((stream: Omit<MiniPlayerState, 'isActive'>) => {
    setMiniPlayer({ ...stream, isActive: true });
  }, []);

  const closeMiniPlayer = useCallback(() => {
    setMiniPlayer((prev) => ({ ...prev, isActive: false, streamId: null }));
  }, []);

  return (
    <MiniPlayerContext.Provider value={{ miniPlayer, openMiniPlayer, closeMiniPlayer }}>
      {children}
    </MiniPlayerContext.Provider>
  );
}

export function useMiniPlayer() {
  const context = useContext(MiniPlayerContext);
  if (!context) {
    throw new Error("useMiniPlayer must be used within a MiniPlayerProvider");
  }
  return context;
}
