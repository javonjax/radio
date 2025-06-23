import { RadioStation } from '@/lib/api/schemas';
import React, { useContext, useEffect } from 'react';
import StationListItem from './StationListItem';
import StationListHeaders from './StationListHeaders';
import { StationContext, StationContextType } from '../ContextProviders/StationContext';

export interface StationListProps {
  stations: RadioStation[];
}

const StationList = ({ stations }: StationListProps) => {
  const stationContext = useContext<StationContextType | undefined>(StationContext);
  return (
    <div className="flex w-full flex-col">
      <StationListHeaders />
      <ul className="flex flex-col">
        {stations.map((station) => (
          <StationListItem
            key={station.stationuuid}
            station={station}
            stationContext={stationContext}
          />
        ))}
      </ul>
    </div>
  );
};

export default StationList;
