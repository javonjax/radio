import { RadioStation } from '@/lib/api/schemas';
import React, { Dispatch, SetStateAction, useContext, useEffect } from 'react';
import StationListItem from './StationListItem';
import StationListHeaders from './StationListHeaders';
import { StationContext, StationContextType } from '../ContextProviders/StationContext';
import { handleAPIError } from '@/lib/utils';
import LoadingSpinner from '../ui/Custom/LoadingSpinner';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FavoritesContext, FavoritesContextType } from '../ContextProviders/FavoritesContext';

export interface StationListProps {
  stations: RadioStation[] | undefined;
  hasMore: boolean | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  pageNum: number;
  setPageNum: Dispatch<SetStateAction<number>>;
}

const StationList = ({
  stations,
  hasMore,
  isLoading,
  isError,
  error,
  pageNum,
  setPageNum,
}: StationListProps) => {
  const thisComponent: string = StationList.name;
  const stationContext = useContext<StationContextType | undefined>(StationContext);
  const favoritesContext = useContext<FavoritesContextType | undefined>(FavoritesContext);

  useEffect(() => {
    if (isError) {
      if (error instanceof Error) {
        handleAPIError(error);
      } else {
        console.warn(`Unknown error in ${thisComponent}.`);
      }
    }
  }, [isError]);

  return (
    <div className="flex w-full grow flex-col">
      <StationListHeaders />
      {isLoading && <LoadingSpinner />}
      {!isError && !isLoading && stations && stations.length > 0 && (
        <div className="flex grow flex-col justify-between">
          <ul className="flex w-full flex-row flex-wrap justify-center gap-8 xl:flex-col xl:gap-0">
            {stations.map((station) => (
              <StationListItem
                key={station.stationuuid}
                station={station}
                stationContext={stationContext}
                favoritesContext={favoritesContext}
              />
            ))}
          </ul>
          <div className="mt-6 flex items-center justify-center gap-x-4">
            <button
              className={`${pageNum > 1 ? '' : 'invisible'} hover:text-accent hover:cursor-pointer`}
              onClick={() => {
                setPageNum((prev) => prev - 1);
              }}
            >
              <ChevronLeft />
            </button>
            <div>{pageNum}</div>
            <button
              className={`${hasMore ? '' : 'invisible'} hover:text-accent hover:cursor-pointer`}
              onClick={() => {
                setPageNum((prev) => prev + 1);
              }}
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StationList;
