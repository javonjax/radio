import { Search } from 'lucide-react';
import React, { Dispatch, SetStateAction } from 'react';
import DropdownMenu from './DropdownMenu';
import {
  DropdownMenuOption,
  StationFilters,
  StationSearchInputs,
  StationSortingOption,
} from '@/lib/schemas';
import { Language, Country } from '@/lib/api/schemas';
import Combobox from '../ui/Custom/Combobox';

const sortingOptions: DropdownMenuOption[] = [
  { label: 'Most Clicked', value: 'clickcount' },
  { label: 'Most Favorited', value: 'votes' },
  { label: 'Name: Alphabetical', value: 'name' },
  { label: 'Recently Played', value: 'clicktimestamp' },
  { label: 'Recently Added', value: 'changetimestamp' },
  { label: 'Trending', value: 'clicktrend' },
];
export interface FavoritesFiltersProps {
  searchInputs: StationSearchInputs;
  setSearchInputs: Dispatch<SetStateAction<StationSearchInputs>>;
  filters: StationFilters;
  handleChangeSortingOption: (sortingOption: StationSortingOption) => void;
  countries: Country[];
  languages: Language[];
  longestCountryLabel: string;
  longestLanguageLabel: string;
  handleChangeCountry: (country: string) => void;
  handleChangeLanguage: (language: string) => void;
  pageNum: number;
  setPageNum: Dispatch<SetStateAction<number>>;
  updateURLParams: () => void;
}

const FavoritesFilters = ({
  searchInputs,
  setSearchInputs,
  filters,
  handleChangeSortingOption,
  countries,
  languages,
  longestCountryLabel,
  longestLanguageLabel,
  handleChangeCountry,
  handleChangeLanguage,
  pageNum,
  setPageNum,
  updateURLParams,
}: FavoritesFiltersProps) => {
  return (
    <form
      className="flex w-full flex-col"
      onSubmit={(e) => {
        e.preventDefault();
        if (pageNum === 1) {
          updateURLParams();
        } else {
          setPageNum(1);
        }
      }}
    >
      <div className="flex w-full flex-wrap items-center gap-4 py-4">
        <div className="relative flex flex-1 items-center gap-2">
          <label htmlFor="station-search-name">Name: </label>
          <input
            type="search"
            className="w-full min-w-[250px] rounded-md border-2 p-2 pr-8"
            placeholder="Enter a search term..."
            value={searchInputs.name}
            onChange={(e) => {
              setSearchInputs({ ...searchInputs, name: e.target.value });
            }}
          ></input>
          <button
            className="flex h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-md bg-linear-(--accent-gradient)"
            type="submit"
          >
            <Search size={16} />
          </button>
        </div>
        <div className="relative flex flex-1 items-center gap-2">
          <label htmlFor="station-search-tag">Tag: </label>
          <input
            type="search"
            className="w-full min-w-[250px] rounded-md border-2 p-2 pr-8"
            placeholder="Enter a search term..."
            value={searchInputs.tag}
            onChange={(e) => {
              setSearchInputs({ ...searchInputs, tag: e.target.value });
            }}
          ></input>
          <button
            className="flex h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-md bg-linear-(--accent-gradient)"
            type="submit"
          >
            <Search size={16} />
          </button>
        </div>
        <DropdownMenu
          label="Sort by"
          value={filters.order ?? 'name'}
          options={sortingOptions}
          handleChangeSortingOption={handleChangeSortingOption}
        />
        {countries && countries.length > 0 && (
          <Combobox
            label="Country"
            options={countries}
            emptyPlaceholder="Country not found."
            placeholder="Search country..."
            value={filters.country}
            longestLabel={longestCountryLabel}
            handleChangeCountry={handleChangeCountry}
          />
        )}
        {languages && languages.length > 0 && (
          <Combobox
            label="Language"
            options={languages}
            emptyPlaceholder="Language not found."
            placeholder="Search language..."
            value={filters.language}
            longestLabel={longestLanguageLabel}
            handleChangeLanguage={handleChangeLanguage}
          />
        )}
      </div>
    </form>
  );
};

export default FavoritesFilters;
