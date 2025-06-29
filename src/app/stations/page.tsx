'use client';
import { useEffect, useState } from 'react';
import Filters from '../../components/StationBrowser/Filters';
import StationList from '../../components/StationBrowser/StationList';
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation';
import { Country, Language, RadioStation } from '../../lib/api/schemas';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { setStationBrowserDropdownOptions, setStationBrowserSearchParams } from './utils';
import { StationFilters, StationSearchInputs } from './schemas';
import { handleAPIError, handleAPIFetch } from '@/lib/utils';

const StationsPage = (): React.JSX.Element => {
  const thisComponent: string = StationsPage.name;
  const router: AppRouterInstance = useRouter();
  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  const [stations, setStations] = useState<RadioStation[]>([]);
  const [searchInputs, setSearchInputs] = useState<StationSearchInputs>({
    name: '',
    tag: '',
  });
  const [filters, setFilters] = useState<StationFilters>({
    order: 'name',
    country: '',
    language: '',
  });
  const [languages, setLanguages] = useState<Language[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [longestLanguage, setLongestLanguage] = useState<string>('');
  const [longestCountry, setLongestCountry] = useState<string>('');

  // Init.
  useEffect(() => {
    try {
      const fetchCountries = async (): Promise<void> => {
        const url: string = `http://localhost:3000/api/countries`;
        const res: globalThis.Response = await handleAPIFetch(await fetch(url), thisComponent);
        const data: Country[] = await res.json();
        setCountries(data);
        const longestLabel: string = data.reduce((a, b) =>
          a.name.length > b.name.length ? a : b
        ).name;
        setLongestCountry(longestLabel);
      };

      const fetchLanguages = async (): Promise<void> => {
        const url: string = `http://localhost:3000/api/languages`;
        const res: globalThis.Response = await handleAPIFetch(await fetch(url), thisComponent);
        const data: Language[] = await res.json();
        setLanguages(data);
        const longestLabel: string = data.reduce((a, b) =>
          a.name.length > b.name.length ? a : b
        ).name;
        setLongestLanguage(longestLabel);
      };

      fetchCountries();
      fetchLanguages();
      handleSearch();
    } catch (error) {
      if (error instanceof Error) {
        handleAPIError(error, thisComponent);
      } else {
        console.warn(`Unknown error in ${thisComponent}.`);
      }
    }
  }, []);

  // Event handlers.
  useEffect(() => {
    try {
      const fetchStations = async (): Promise<void> => {
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
        const res: globalThis.Response = await handleAPIFetch(await fetch(url), thisComponent);
        const data = await res.json();
        setStations(data);
      };

      setStationBrowserDropdownOptions(searchParams, setSearchInputs, setFilters);
      fetchStations();
    } catch (error) {
      if (error instanceof Error) {
        handleAPIError(error, thisComponent);
      } else {
        console.warn(`Unknown error in ${thisComponent}.`);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    handleSearch();
  }, [filters]);

  const handleSearch = () => {
    setStationBrowserSearchParams(searchInputs, filters, router);
  };

  return (
    <div className="flex h-full w-full flex-col gap-y-4">
      <h1 className="text-heading text-2xl">Station Browser</h1>
      <Filters
        filters={filters}
        setFilters={setFilters}
        searchInputs={searchInputs}
        setSearchInputs={setSearchInputs}
        onSearch={handleSearch}
        countries={countries}
        languages={languages}
        longestCountryLabel={longestCountry}
        longestLanguageLabel={longestLanguage}
      />
      <StationList stations={stations} />
    </div>
  );
};

export default StationsPage;
