import { RadioStation } from '@/lib/api/schemas';
import React from 'react';
import StationListItem from './StationListItem';
import StationListHeaders from './StationListHeaders';

export interface StationListProps {
  stations: RadioStation[];
}

const StationList = ({ stations }: StationListProps) => {
  return (
    <div className="flex w-full flex-col">
      <StationListHeaders />
      <ul className="flex flex-col">
        {stations.map((station) => (
          <StationListItem key={station.stationuuid} station={station} />
        ))}
      </ul>
    </div>
  );
};

export default StationList;
