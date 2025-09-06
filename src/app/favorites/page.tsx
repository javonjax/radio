'use client';
import { useCallback, useContext, useEffect, useState } from 'react';
import FavoritesList from '@/components/Favorites/FavoritesList';
import {
  FavoritesContext,
  FavoritesContextType,
} from '@/components/ContextProviders/FavoritesContext';
import { AuthContext, AuthContextType } from '@/components/ContextProviders/AuthContext';
import Link from 'next/link';
import FavoritesFilters from '@/components/Favorites/FavoritesFilters';
import { StationFilters, StationSearchInputs, StationSortingOption } from '@/lib/schemas';
import { RadioStation } from '@/lib/api/schemas';
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import { useFetchCountries } from '@/lib/hooks/useFetchCountries';
import { useFetchLanguages } from '@/lib/hooks/useFetchLanguages';
import { handleAPIError } from '@/lib/utils';
import LoadingSpinner from '@/components/ui/Custom/LoadingSpinner';
import { setSearchParams } from '../stations/utils';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

const FavoritesPage = (): React.JSX.Element => {
  const thisComponent: string = FavoritesPage.name;
  const router: AppRouterInstance = useRouter();
  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  const authContext = useContext<AuthContextType | undefined>(AuthContext);
  const favoritesContext = useContext<FavoritesContextType | undefined>(FavoritesContext);
  const [filteredStations, setFilteredStations] = useState<RadioStation[]>([]);
  const [searchInputs, setSearchInputs] = useState<StationSearchInputs>({
    name: searchParams.get('name') ?? '',
    tag: searchParams.get('tag') ?? '',
  });
  const [filters, setFilters] = useState<StationFilters>({
    order: (searchParams.get('order') as StationSortingOption) ?? 'name',
    country: searchParams.get('country') ?? '',
    language: searchParams.get('language') ?? '',
  });
  const [pageNum, setPageNum] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
        handleAPIError(languagesFetchError);
      } else {
        console.warn(`Unknown error in ${thisComponent}.`);
      }
    }
  }, [isLanguagesFetchError]);

  // Update url search params when filters or pagenum update.
  useEffect(() => {
    updateURLParams();
  }, [filters, pageNum]);

  useEffect(() => {
    setIsLoading(true);
    const fetchFavorites = async () => {
      console.log(filters);
      console.log(searchInputs);
      const res = await favoritesContext?.getFavorites(
        pageNum,
        searchInputs.name,
        searchInputs.tag,
        filters.country,
        filters.language,
        filters.order
      );
      if (res) {
        setFilteredStations(res.favorites);
        setHasMore(res.hasMore);
      }
      setIsLoading(false);
    };

    fetchFavorites();
  }, [searchParams.toString(), favoritesContext?.favoritedStations]);

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

  const updateURLParams = () => {
    setSearchParams(searchInputs, filters, pageNum, router);
  };

  return (
    <div className="flex w-full grow flex-col gap-y-4">
      <h1 className="text-heading text-2xl">Favorites</h1>
      {!authContext?.isAuth && (
        <div className="flex w-full grow flex-col">
          <div>
            You must be{' '}
            <Link href={'/login'} className="hover:text-accent underline">
              logged in
            </Link>{' '}
            to view your favorites.
          </div>
        </div>
      )}
      {(countriesLoading || languagesLoading) && <LoadingSpinner />}
      {authContext?.isAuth &&
        favoritesContext?.favoritedStations &&
        favoritesContext?.favoritedStations.length > 0 &&
        !languagesLoading &&
        !countriesLoading &&
        countryData?.countries &&
        languageData?.languages && (
          <>
            <FavoritesFilters
              searchInputs={searchInputs}
              setSearchInputs={setSearchInputs}
              filters={filters}
              handleChangeSortingOption={handleChangeSortingOption}
              countries={countryData.countries}
              longestCountryLabel={countryData.longestLabel}
              languages={languageData.languages}
              longestLanguageLabel={languageData.longestLabel}
              handleChangeCountry={handleChangeCountry}
              handleChangeLanguage={handleChangeLanguage}
              pageNum={pageNum}
              setPageNum={setPageNum}
              updateURLParams={updateURLParams}
            />
            <FavoritesList
              stations={filteredStations}
              hasMore={hasMore}
              pageNum={pageNum}
              setPageNum={setPageNum}
              isLoading={isLoading}
            />
          </>
        )}
      {authContext?.isAuth &&
        !isLoading &&
        (!favoritesContext?.favoritedStations ||
          favoritesContext?.favoritedStations.length <= 0) && (
          <div className="flex w-full grow flex-col">
            <div>
              You haven&apos;t added any favorites yet. Click the heart icon on any station to
              favorite it.
            </div>
            <Link href="/stations?order=clickcount" className="hover:text-accent underline">
              Click here to browse stations.
            </Link>
          </div>
        )}
    </div>
  );
};

export default FavoritesPage;
