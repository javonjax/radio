import { StationContextType } from '@/components/ContextProviders/StationContext';
import LoadingSpinner from '@/components/ui/Custom/LoadingSpinner';
import { Slider } from '@/components/ui/slider';
import { RadioStation } from '@/lib/api/schemas';
import { capitalize } from '@/lib/utils';
import { Expand, Heart, Info, Minus, Pause, Play, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

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
  const station: RadioStation | undefined = stationContext?.station;

  return (
    <AnimatePresence>
      <motion.div
        layout
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{
          layout: { type: 'spring', stiffness: 300, damping: 25 },
          duration: 0.1,
        }}
        className={`bg-background fixed right-[32px] bottom-[32px] flex-col gap-2 rounded-md border-2 p-4 ${stationContext?.station ? '' : 'hidden'} ${isOpen ? 'flex w-[200px] min-w-[200px]' : 'max-w-[200px]'}`}
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
            <div className="flex flex-col gap-4">
              {station?.url_resolved && (
                <>
                  <div className="w-full">
                    {station.name && station.name.length > 0 ? (
                      <p className="text-accent">{station.name}</p>
                    ) : (
                      <p className="text-accent">Name not found</p>
                    )}
                    {station.countrycode && (
                      <p className="text-[12px]">Country: {station.countrycode}</p>
                    )}
                    {station.language && (
                      <p className="text-[12px]">Language: {capitalize(station.language)}</p>
                    )}
                    {station.tags &&
                      station.tags.length > 0 &&
                      (() => {
                        const tagString: string = station.tags
                          ?.split(',')
                          .slice(0, 2)
                          .map((tag) => capitalize(tag))
                          .join(', ');
                        return <p className="text-[12px]">Tags: {tagString}</p>;
                      })()}
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
                    <button className="w-fit rounded-md p-2">
                      <Info />
                    </button>
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
