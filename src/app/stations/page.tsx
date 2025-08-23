'use client';
import { Suspense, useCallback, useEffect, useState } from 'react';
import Filters from '@/components/StationBrowser/Filters';
import StationList from '@/components/StationBrowser/StationList';
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { setStationBrowserSearchParams } from './utils';
import { StationFilters, StationSearchInputs, StationSortingOption } from '@/lib/schemas';
import { handleAPIError } from '@/lib/utils';
import LoadingSpinner from '@/components/ui/Custom/LoadingSpinner';
import { useFetchCountries } from '@/lib/hooks/useFetchCountries';
import { useFetchLanguages } from '@/lib/hooks/useFetchLanguages';
import { useFetchStations } from '@/lib/hooks/useFetchStations';

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
  const [pageNum, setPageNum] = useState<number>(1);

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
  } = useFetchStations(searchParams, pageNum, setSearchInputs, setFilters);

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

  // Update url search params when filters or pagenum update.
  useEffect(() => {
    updateURLSearchParams();
  }, [filters, pageNum]);

  /*
    Event handlers.
  */

  // Updates to url search params will trigger a search.
  const updateURLSearchParams = () => {
    setStationBrowserSearchParams(searchInputs, filters, pageNum, router);
  };

  // Search happens immediately after filters update. Reset page number when filters are updated.
  const handleChangeSortingOption = useCallback((sortingOption: StationSortingOption) => {
    setFilters((prev) => {
      if (prev.order === sortingOption) {
        return prev;
      }
      return {
        ...prev,
        order: sortingOption,
      };
    });
    setPageNum(1);
  }, []);

  const handleChangeCountry = useCallback((country: string) => {
    setFilters((prev) => {
      if (prev.country === country) return prev;
      return {
        ...prev,
        country: country,
      };
    });
    setPageNum(1);
  }, []);

  const handleChangeLanguage = useCallback((language: string) => {
    setFilters((prev) => {
      if (prev.language === language) return prev;
      return {
        ...prev,
        language: language,
      };
    });
    setPageNum(1);
  }, []);

  return (
    <Suspense>
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
                searchInputs={searchInputs}
                setSearchInputs={setSearchInputs}
                updateURLSearchParams={updateURLSearchParams}
                pageNum={pageNum}
                setPageNum={setPageNum}
                countries={countryData.countries}
                languages={languageData.languages}
                longestCountryLabel={countryData.longestLabel}
                longestLanguageLabel={languageData.longestLabel}
                handleChangeSortingOption={handleChangeSortingOption}
                handleChangeCountry={handleChangeCountry}
                handleChangeLanguage={handleChangeLanguage}
              />
              <StationList
                stations={stationData?.stations}
                hasMore={stationData?.hasMore}
                isLoading={stationsLoading}
                isError={isStationsFetchError}
                error={stationsFetchError}
                pageNum={pageNum}
                setPageNum={setPageNum}
              />
            </>
          )}
      </div>
    </Suspense>
  );
};

export default StationBrowserPage;
