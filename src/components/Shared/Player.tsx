'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';
import { StationContext, StationContextType } from '../Providers/StationContext';
import { Heart, Info, PanelLeftClose, PanelRightClose, Pause, Play, X } from 'lucide-react';
import { Slider } from '../ui/slider';

const Player = () => {
  const stationContext = useContext<StationContextType | undefined>(StationContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current && stationContext) {
      console.log(stationContext.volume);
      audioRef.current.volume = stationContext.volume / 100;
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
    <div
      className={`bg-background fixed right-[32px] bottom-[32px] flex min-w-[200px] flex-col gap-2 rounded-md border-2 p-4 ${isOpen ? 'w-[50%]' : 'w-[200px]'} ${stationContext?.station ? '' : 'hidden'}`}
    >
      <div className="flex items-center justify-between">
        <p>Now playing</p>
        <button
          className="cursor-pointer self-end"
          onClick={() => stationContext.setStation(undefined)}
        >
          <X />
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {stationContext?.station.url ? (
          <>
            <p className="w-full">
              <span className="text-accent">{stationContext.station.name}</span>
            </p>
            <audio
              autoPlay
              ref={audioRef}
              className="w-full"
              src={stationContext.station.url}
            ></audio>
            <Slider
              className="bg-accent max-w-[200px] rounded-md"
              value={[stationContext.volume]}
              step={1}
              max={100}
              onValueChange={(value) => {
                stationContext.setVolume(value[0]);
              }}
            />
            <div className="flex items-center justify-center gap-4">
              <button
                className="w-fit cursor-pointer rounded-md p-2"
                onClick={stationContext.isPlaying ? handlePause : handlePlay}
              >
                {stationContext.isPlaying ? <Pause /> : <Play />}
              </button>
              <button className="w-fit cursor-pointer rounded-md p-2">
                <Heart />
              </button>
              <button className="w-fit rounded-md p-2">
                <Info />
              </button>
            </div>
          </>
        ) : (
          <p>Could not connect to {stationContext.station.name}</p>
        )}
      </div>
    </div>
  );
};

export default Player;
