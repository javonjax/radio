'use client';
import { useEffect, useState } from 'react';
import Filters from '../components/StationBrowser/Filters';
import StationList from '../components/StationBrowser/StationList';
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import { RadioStation } from '../api/lib/schemas';

const StationsPage = (): React.JSX.Element => {
  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  const [stations, setStations] = useState<RadioStation[]>([]);

  useEffect(() => {
    const fetchStations = async (): Promise<void> => {
      setTimeout(() => {}, 10000);
      console.log(searchParams);
      const res = await fetch(
        'http://localhost:3000/api/stations/search?limit=100&hidebroken=true'
      );
      const data = await res.json();
      setStations(data);
    };
    fetchStations();
  }, [searchParams]);

  return (
    <div className="flex h-full w-full flex-col">
      <Filters />
      <StationList stations={stations} />
    </div>
  );
};

export default StationsPage;
