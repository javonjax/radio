'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';
import { StationContext, StationContextType } from '../../ContextProviders/StationContext';
import { RadioStation } from '@/lib/api/schemas';
import PlayerControls from './PlayerControls';

const Player = () => {
  const stationContext = useContext<StationContextType | undefined>(StationContext);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const station: RadioStation | undefined = stationContext?.station;

  useEffect(() => {
    if (audioRef.current && stationContext) {
      audioRef.current.volume = stationContext.volume / 100;
      setIsError(false);
    }
  }, [stationContext]);

  const handlePlay = (): void => {
    if (audioRef.current) {
      audioRef.current.play();
    }
    if (stationContext) {
      stationContext.play();
    }
  };

  const handlePause = (): void => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (stationContext) {
      stationContext.pause();
    }
  };

  if (!stationContext?.station) {
    return null;
  }

  return (
    <>
      <PlayerControls
        isOpen={isOpen}
        isLoading={isLoading}
        isError={isError}
        setIsOpen={setIsOpen}
        stationContext={stationContext}
        handlePlay={handlePlay}
        handlePause={handlePause}
      />

      {station?.url_resolved ? (
        <>
          <audio
            autoPlay
            ref={audioRef}
            src={station.url_resolved}
            onLoadStart={() => setIsLoading(true)}
            onCanPlay={() => setIsLoading(false)}
            onError={() => {
              setIsError(true);
              setIsLoading(false);
            }}
          ></audio>
        </>
      ) : null}
    </>
  );
};

export default Player;
