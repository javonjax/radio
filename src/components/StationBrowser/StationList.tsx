import { RadioStation } from '@/lib/api/schemas';
import React, { useContext, useEffect } from 'react';
import StationListItem from './StationListItem';
import StationListHeaders from './StationListHeaders';
import { StationContext, StationContextType } from '../ContextProviders/StationContext';
import { handleAPIError } from '@/lib/utils';
import LoadingSpinner from '../ui/Custom/LoadingSpinner';

export interface StationListProps {
  stations: RadioStation[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

const StationList = ({ stations, isLoading, isError, error }: StationListProps) => {
  const thisComponent: string = StationList.name;
  const stationContext = useContext<StationContextType | undefined>(StationContext);

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
      {!isError && !isLoading && stations && (
        <>
          <ul className="flex w-full flex-row flex-wrap justify-center gap-8 xl:flex-col xl:gap-0">
            {stations.map((station) => (
              <StationListItem
                key={station.stationuuid}
                station={station}
                stationContext={stationContext}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default StationList;
