'use client';
import LoadingSpinner from '@/components/ui/Custom/LoadingSpinner';
import { use } from 'react';
import { useFetchStationInfo } from './hooks/useFetchStationInfo';
import Link from 'next/link';
import { capitalize } from '@/lib/utils';

export interface StationInfoPageProps {
  // 'params' is a promise in this version of next.js.
  params: Promise<{
    stationuuid: string;
  }>;
}

const StationInfoPage = ({ params }: StationInfoPageProps): React.JSX.Element => {
  const stationuuid: string = use(params).stationuuid;

  const {
    isLoading: stationLoading,
    error: stationFetchError,
    isError: isStationFetchError,
    data: station,
  } = useFetchStationInfo(stationuuid);

  return (
    <div className="flex w-full grow flex-col gap-y-4">
      <h1 className="text-heading text-2xl">Station Info</h1>
      {stationLoading && <LoadingSpinner />}
      {isStationFetchError && <div>{stationFetchError.message}</div>}
      {!isStationFetchError && !stationLoading && station && (
        <div className="grow border-2">
          <div>Name: {station.name}</div>
          {station.url && (
            <div>
              URL:{' '}
              <Link target="_blank" rel="noopener noreferrer" href={station.url}>
                {station.url}
              </Link>
            </div>
          )}
          {station.country && <div>Country: {station.country}</div>}
          {station.language && <div>Language: {capitalize(station.language)}</div>}
          {station.clickcount && <div>Clicks: {station.clickcount}</div>}
          {station.votes && <div>Favorites: {station.votes}</div>}
          <div>tags</div>
        </div>
      )}
    </div>
  );
};

export default StationInfoPage;
