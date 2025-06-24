'use client';
import { RadioStation } from '@/lib/api/schemas';
import React, { useState, createContext } from 'react';

export interface StationContextType {
  station: RadioStation | undefined;
  setStation: React.Dispatch<React.SetStateAction<RadioStation | undefined>>;
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
}

export const StationContext = createContext<StationContextType | undefined>(undefined);

export const StationContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [station, setStation] = useState<RadioStation | undefined>(undefined);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(25);

  const play = (): void => {
    setIsPlaying(true);
  };

  const pause = (): void => {
    setIsPlaying(false);
  };

  return (
    <StationContext.Provider
      value={{ station, setStation, isPlaying, play, pause, volume, setVolume }}
    >
      {children}
    </StationContext.Provider>
  );
};
