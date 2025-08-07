import { StationContextType } from '@/components/ContextProviders/StationContext';
import LoadingSpinner from '@/components/ui/Custom/LoadingSpinner';
import { Slider } from '@/components/ui/slider';
import { RadioStation } from '@/lib/api/schemas';
import { capitalize } from '@/lib/utils';
import { Expand, Heart, Info, Minus, Pause, Play, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { RefObject, useEffect, useRef } from 'react';

export interface PlayerControlsProps {
  stationContext: StationContextType;
  isOpen: boolean;
  isLoading: boolean;
  isError: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handlePlay: () => void;
  handlePause: () => void;
}

const PlayerControls = ({
  stationContext,
  isOpen,
  isLoading,
  isError,
  setIsOpen,
  handlePlay,
  handlePause,
}: PlayerControlsProps) => {
  const playerRef: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);
  const station: RadioStation | undefined = stationContext?.station;

  useEffect(() => {
    if (!isOpen && playerRef.current) {
      playerRef.current.style.width = '';
      playerRef.current.style.height = '';
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      <motion.div
        layout
        ref={playerRef}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{
          layout: { type: 'spring', stiffness: 300, damping: 25 },
          duration: 0.1,
        }}
        className={`bg-background fixed right-[20px] bottom-[20px] flex-col gap-2 rounded-md border-2 p-4 ${stationContext?.station ? '' : 'hidden'} ${isOpen ? 'flex max-h-[300px] min-h-[200px] w-[200px] max-w-[90%] min-w-[200px] overflow-y-auto' : 'h-[fit] w-[fit]'}`}
      >
        <>
          {/* Minimize/maximize and close buttons. */}
          {isOpen && !isError && (
            <div className="flex items-center justify-between">
              <p className={`${isError ? 'text-red-500' : ''}`}>
                {isLoading ? 'Loading...' : isError ? 'Error' : 'Now playing'}
              </p>
              <div className="flex items-center">
                <button
                  className="cursor-pointer"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  <Minus />
                </button>
                <button
                  className="cursor-pointer"
                  onClick={() => {
                    stationContext.setStation(undefined);
                    stationContext.pause();
                  }}
                >
                  <X className="text-red-500" />
                </button>
              </div>
            </div>
          )}
          {isLoading && <LoadingSpinner />}
          {isError && (
            <div className="flex flex-col">
              <button
                className="cursor-pointer self-end"
                onClick={() => {
                  stationContext.setStation(undefined);
                  stationContext.pause();
                }}
              >
                <X className="text-red-500" />
              </button>
              <div className="text-red-500">
                Unable to establish connection with {station?.name}
              </div>
            </div>
          )}
          {/* Station info */}
          {!isError && !isLoading && isOpen && (
            <div className="flex grow flex-col gap-4">
              {station?.url_resolved && (
                <>
                  <div className="w-full">
                    {station.name && station.name.length > 0 ? (
                      <p className="text-accent">{station.name}</p>
                    ) : (
                      <p className="text-accent">Name not found</p>
                    )}
                    {station.countrycode && (
                      <div className="flex gap-x-1 text-[12px]">
                        <div>Country:</div>
                        <Link
                          className="hover:text-accent"
                          href={`/stations?country=${station.country}&order=clickcount`}
                        >
                          {station.country}
                        </Link>
                      </div>
                    )}
                    {station.language && (
                      <div className="flex gap-x-1 text-[12px]">
                        <div>Language:</div>
                        <ul className="flex flex-wrap gap-x-2">
                          {station.language
                            .split(',')
                            .slice(0, 3)
                            .map((lang) => (
                              <li key={`${station.name}-${lang}`}>
                                <Link
                                  className="hover:text-accent"
                                  href={`/stations?language=${lang}&order=clickcount`}
                                >
                                  {capitalize(lang)}
                                </Link>
                              </li>
                            ))}
                        </ul>
                      </div>
                    )}
                    {station.tags && station.tags.length > 0 && (
                      <div className="flex gap-x-1 text-[12px]">
                        <div>Tags: </div>
                        <ul className="flex flex-wrap gap-x-1">
                          {station.tags
                            .split(',')
                            .slice(0, 3)
                            .map((tag) => (
                              <li key={tag} className="hover:text-accent">
                                <Link
                                  className="h-full w-full underline"
                                  href={`/stations?tag=${encodeURIComponent(tag)}&order=clickcount`}
                                  onClick={() => console.log(tag)}
                                >
                                  {capitalize(tag)}
                                </Link>
                              </li>
                            ))}
                        </ul>
                      </div>
                    )}
                  </div>
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
                    <button
                      style={{ backgroundImage: 'var(--accent-gradient)' }}
                      className="w-fit cursor-pointer rounded-md p-2"
                    >
                      <Heart />
                    </button>
                    <Link
                      className="w-fit rounded-md p-2"
                      href={`/stations/${station.stationuuid}`}
                    >
                      <Info />
                    </Link>
                  </div>
                </>
              )}
            </div>
          )}
          {!isError && !isLoading && !isOpen && (
            <div className="flex w-full gap-2">
              <button
                className="w-fit cursor-pointer rounded-md"
                onClick={stationContext.isPlaying ? handlePause : handlePlay}
              >
                {stationContext.isPlaying ? <Pause /> : <Play />}
              </button>
              <button
                className="cursor-pointer"
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                <Expand />
              </button>
              <button
                className="cursor-pointer"
                onClick={() => {
                  stationContext.setStation(undefined);
                  stationContext.pause();
                }}
              >
                <X className="text-red-500" />
              </button>
            </div>
          )}
        </>
      </motion.div>
    </AnimatePresence>
  );
};

export default PlayerControls;
