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
  const searchParams: URLSearchParams = new URLSearchParams();

  if (searchInputs.name.length > 0) {
    searchParams.set('name', searchInputs.name);
  }

  if (searchInputs.tag.length > 0) {
    searchParams.set('tag', searchInputs.tag);
  }

  if (filters.country.length > 0) {
    searchParams.set('country', filters.country);
  }

  if (filters.language.length > 0) {
    searchParams.set('language', filters.language);
  }

  if (filters.order.length > 0) {
    searchParams.set('order', filters.order);
  }

  searchParams.set('page', pageNum.toString());
  console.log(searchParams.toString());

  router.push(`?${searchParams.toString()}`);
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
