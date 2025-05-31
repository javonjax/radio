import { RadioStation } from '@/app/api/lib/schemas';
import React from 'react';
import StationsListItem from './StationsListItem';
import StationsListHeaders from './StationsListHeaders';

export interface StationsTableProps {
  stations: RadioStation[];
}

const StationsList = ({ stations }: StationsTableProps) => {
  return (
    <div className="flex w-full flex-col">
      <StationsListHeaders />
      <ul className="flex flex-col">
        {stations.map((station) => (
          <StationsListItem key={station.stationuuid} station={station} />
        ))}
      </ul>
    </div>
  );
};

export default StationsList;
