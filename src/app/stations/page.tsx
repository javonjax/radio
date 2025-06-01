'use client';
import { useEffect, useState } from 'react';
import Filters from '../components/StationBrowser/Filters';
import StationList from '../components/StationBrowser/StationList';
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation';
import { RadioStation } from '../../lib/api/schemas';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export type StationFilters = {
  name: string;
  tag: string;
  sortBy: StationSortingOption;
  country: string;
  language: string;
};

export type StationSortingOption =
  | 'name'
  | 'clicks'
  | 'favorites'
  | 'recentlyPlayed'
  | 'recentlyAdded'
  | 'trending';

const StationsPage = (): React.JSX.Element => {
  const router: AppRouterInstance = useRouter();
  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  const [stations, setStations] = useState<RadioStation[]>([]);
  const [filters, setFilters] = useState<StationFilters>({
    name: '',
    tag: '',
    sortBy: 'name',
    country: '',
    language: '',
  });

  useEffect(() => {
    const fetchStations = async (): Promise<void> => {
      console.log(searchParams.toString().includes('order=name'));
      let url: string = `http://localhost:3000/api/stations/search?${searchParams.toString()}&limit=100&hidebroken=true`;
      /* 
        Numerical data from the radio-browser API is sorted in ascending order.
        Add the param 'reverse=true' to retrieve numerical data in descending order. 
      */
      if (!searchParams.toString().includes('order=name')) {
        url += '&reverse=true';
      }
      const res = await fetch(url);
      const data = await res.json();
      setStations(data);
    };
    fetchStations();
  }, [searchParams]);

  const onSearch = (): void => {
    const searchParams: string[] = [];
    if (filters.name.length) {
      searchParams.push(`name=${filters.name}`);
    }

    if (filters.tag.length) {
      searchParams.push(`tag=${filters.tag}`);
    }

    if (filters.country.length) {
      searchParams.push(`country=${filters.country}`);
    }

    if (filters.language.length) {
      searchParams.push(`language=${filters.language}`);
    }

    const sortOrder: Record<string, string> = {
      name: 'name',
      clicks: 'clickcount',
      favorites: 'votes',
      recentlyPlayed: 'clicktimestamp',
      recentlyAdded: 'changetimestamp',
      trending: 'clicktrend',
    };

    searchParams.push(`order=${sortOrder[filters.sortBy]}`);
    const searchParamsString: string = `?${searchParams.join('&')}`;
    router.push(searchParamsString);
  };

  return (
    <div className="flex h-full w-full flex-col gap-y-4">
      <h1 className="text-heading text-2xl">Station Browser</h1>
      <Filters filters={filters} setFilters={setFilters} onSearch={onSearch} />
      <StationList stations={stations} />
    </div>
  );
};

export default StationsPage;
