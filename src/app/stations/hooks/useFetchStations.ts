import { ReadonlyURLSearchParams } from 'next/navigation';
import { setStationBrowserDropdownOptions } from '../utils';
import { RadioStation } from '@/lib/api/schemas';
import { handleAPIFetch } from '@/lib/utils';
import { Dispatch, SetStateAction } from 'react';
import { StationFilters, StationSearchInputs } from '../schemas';
import { useQuery } from '@tanstack/react-query';

export const useFetchStations = (
  searchParams: ReadonlyURLSearchParams,
  setSearchInputs: Dispatch<SetStateAction<StationSearchInputs>>,
  setFilters: Dispatch<SetStateAction<StationFilters>>
) => {
  const searchParamString: string = searchParams.toString();
  const fetchStations = async (): Promise<RadioStation[]> => {
    setStationBrowserDropdownOptions(searchParams, setSearchInputs, setFilters);
    let url: string = `http://localhost:3000/api/stations/search?limit=100&hidebroken=true`;
    const paramString: string = searchParams.toString();
    if (paramString.length) {
      url += `&${paramString}`;
    }
    /* 
          Numerical data from the radio-browser API is sorted in ascending order.
          Because of this all sorting, with the exception of name based alphabetical sorting, should be reversed.
          Add the param 'reverse=true' to retrieve numerical data in descending order. 
        */
    if (!searchParams.toString().includes('order=name')) {
      url += '&reverse=true';
    }
    const res: globalThis.Response = await handleAPIFetch(await fetch(url));
    const radioStations: RadioStation[] = await res.json();
    return radioStations;
  };

  return useQuery<RadioStation[]>({
    queryKey: ['fetchStations', searchParamString],
    queryFn: fetchStations,
  });
};
