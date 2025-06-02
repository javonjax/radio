import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ReadonlyURLSearchParams } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import { StationFilters, StationSortingOption } from './schemas';

/*
  Updates url search params when a search is submitted.
*/
export const setStationBrowserSearchParams = (
  filters: StationFilters,
  router: AppRouterInstance
): void => {
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

  if (filters.order.length) {
    searchParams.push(`order=${filters.order}`);
  }

  const searchParamsString: string = `?${searchParams.join('&')}`;

  router.push(searchParamsString);
};

/*
  Updates dropdown box options if they do not already match.
  This is for cases such as direct link navigation to this page.
*/
export const setStationBrowserDropdownOptions = (
  searchParams: ReadonlyURLSearchParams,
  setFilters: Dispatch<SetStateAction<StationFilters>>
): void => {
  const isValidSortingOption = (str: string | null): boolean => {
    return (
      str !== null &&
      ['name', 'clickcount', 'votes', 'clicktimestamp', 'changetimestamp', 'clicktrend'].includes(
        str
      )
    );
  };

  const updatedFilters: StationFilters = {
    name: searchParams.get('name') || '',
    tag: searchParams.get('tag') || '',
    order: isValidSortingOption(searchParams.get('order'))
      ? (searchParams.get('order') as StationSortingOption)
      : 'clickcount',
    country: searchParams.get('country') || '',
    language: searchParams.get('language') || '',
  };
  setFilters({ ...updatedFilters });
};
