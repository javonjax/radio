import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ReadonlyURLSearchParams } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import { StationFilters, StationSearchInputs, StationSortingOption } from '../../lib/schemas';

/*
  Updates url search params when a search is submitted.
*/
export const setStationBrowserSearchParams = (
  searchInputs: StationSearchInputs,
  filters: StationFilters,
  pageNum: number,
  router: AppRouterInstance
): void => {
  const searchParams: string[] = [];

  if (searchInputs.name.length) {
    searchParams.push(`name=${encodeURIComponent(searchInputs.name)}`);
  }

  if (searchInputs.tag.length) {
    searchParams.push(`tag=${encodeURIComponent(searchInputs.tag)}`);
  }

  if (filters.country.length) {
    searchParams.push(`country=${encodeURIComponent(filters.country)}`);
  }

  if (filters.language.length) {
    searchParams.push(`language=${encodeURIComponent(filters.language)}`);
  }

  if (filters.order.length) {
    searchParams.push(`order=${encodeURIComponent(filters.order)}`);
  }

  const searchParamsString: string = `?${searchParams.join('&')}&page=${pageNum}`;

  router.push(searchParamsString);
};

/*
  Updates dropdown box options if they do not already match.
  This is for cases such as direct link navigation to this page.
*/
export const setStationBrowserDropdownOptions = (
  searchParams: ReadonlyURLSearchParams,
  setSearchInputs: Dispatch<SetStateAction<StationSearchInputs>>,
  setFilters: Dispatch<SetStateAction<StationFilters>>
): void => {
  /*
    Check if the sorting option is valid, otherwise sort by name by default.
  */
  const isValidSortingOption = (str: string | null): boolean => {
    return (
      str !== null &&
      ['name', 'clickcount', 'votes', 'clicktimestamp', 'changetimestamp', 'clicktrend'].includes(
        str
      )
    );
  };

  const updatedSearchInputs: StationSearchInputs = {
    name: searchParams.get('name') || '',
    tag: searchParams.get('tag') || '',
  };

  const updatedFilters: StationFilters = {
    order: isValidSortingOption(searchParams.get('order'))
      ? (searchParams.get('order') as StationSortingOption)
      : 'name',
    country: searchParams.get('country') || '',
    language: searchParams.get('language') || '',
  };
  setFilters({ ...updatedFilters });
  setSearchInputs({ ...updatedSearchInputs });
};
