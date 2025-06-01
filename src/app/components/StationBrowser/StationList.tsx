import { RadioStation } from '@/app/api/lib/schemas';
import React from 'react';
import StationListItem from './StationListItem';
import ListHeaders from './ListHeaders';

export interface StationListProps {
  stations: RadioStation[];
}

const StationList = ({ stations }: StationListProps) => {
  return (
    <div className="flex w-full flex-col">
      <ListHeaders />
      <ul className="flex flex-col">
        {stations.map((station) => (
          <StationListItem key={station.stationuuid} station={station} />
        ))}
      </ul>
    </div>
  );
};

export default StationList;
