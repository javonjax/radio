'use client';
import { useEffect, useState } from 'react';
import Filters from '../../components/StationBrowser/Filters';
import StationList from '../../components/StationBrowser/StationList';
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { setStationBrowserSearchParams } from './utils';
import { StationFilters, StationSearchInputs } from '../../lib/schemas';
import { handleAPIError } from '@/lib/utils';
import LoadingSpinner from '@/components/ui/Custom/LoadingSpinner';
import { useFetchCountries } from './hooks/useFetchCountries';
import { useFetchLanguages } from './hooks/useFetchLanguages';
import { useFetchStations } from './hooks/useFetchStations';

const StationBrowserPage = (): React.JSX.Element => {
  const thisComponent: string = StationBrowserPage.name;
  const router: AppRouterInstance = useRouter();
  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  const [searchInputs, setSearchInputs] = useState<StationSearchInputs>({
    name: '',
    tag: '',
  });
  const [filters, setFilters] = useState<StationFilters>({
    order: 'name',
    country: '',
    language: '',
  });

  // Data queries.
  const {
    isLoading: countriesLoading,
    error: countriesFetchError,
    isError: isCountriesFetchError,
    data: countryData,
  } = useFetchCountries();

  const {
    isLoading: languagesLoading,
    error: languagesFetchError,
    isError: isLanguagesFetchError,
    data: languageData,
  } = useFetchLanguages();

  const {
    isLoading: stationsLoading,
    error: stationsFetchError,
    isError: isStationsFetchError,
    data: stationData,
  } = useFetchStations(searchParams, setSearchInputs, setFilters);

  // Filter error handlers.
  useEffect(() => {
    if (isCountriesFetchError) {
      if (countriesFetchError instanceof Error) {
        handleAPIError(countriesFetchError);
      } else {
        console.warn(`Unknown error in ${thisComponent}.`);
      }
    }
  }, [isCountriesFetchError]);

  useEffect(() => {
    if (isLanguagesFetchError) {
      if (languagesFetchError instanceof Error) {
        handleAPIError(languageData);
      } else {
        console.warn(`Unknown error in ${thisComponent}.`);
      }
    }
  }, [isLanguagesFetchError]);

  // Update url search params when filter are updated.
  useEffect(() => {
    handleSearch();
  }, [filters]);

  const handleSearch = () => {
    setStationBrowserSearchParams(searchInputs, filters, router);
  };

  return (
    <div className="flex w-full grow flex-col gap-y-4">
      <h1 className="text-heading text-2xl">Station Browser</h1>
      {(countriesLoading || languagesLoading) && <LoadingSpinner />}
      {!languagesLoading &&
        !countriesLoading &&
        countryData?.countries &&
        languageData?.languages && (
          <>
            <Filters
              filters={filters}
              setFilters={setFilters}
              searchInputs={searchInputs}
              setSearchInputs={setSearchInputs}
              onSearch={handleSearch}
              countries={countryData.countries}
              languages={languageData.languages}
              longestCountryLabel={countryData.longestLabel}
              longestLanguageLabel={languageData.longestLabel}
            />

            <StationList
              stations={stationData}
              isLoading={stationsLoading}
              isError={isStationsFetchError}
              error={stationsFetchError}
            />
          </>
        )}
    </div>
  );
};

export default StationBrowserPage;
