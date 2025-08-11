import {
  DropdownMenuOption,
  StationFilters,
  StationSearchInputs,
  StationSortingOption,
} from '@/lib/schemas';
import { Country, Language } from '@/lib/api/schemas';
import { Search } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import Combobox from '../ui/Custom/Combobox';
import DropdownMenu from './DropdownMenu';

export interface FiltersProps {
  filters: StationFilters;

  languages: Language[];
  countries: Country[];
  searchInputs: StationSearchInputs;
  setSearchInputs: Dispatch<SetStateAction<StationSearchInputs>>;
  pageNum: number;
  setPageNum: Dispatch<SetStateAction<number>>;
  longestCountryLabel: string;
  longestLanguageLabel: string;
  handleChangeSortingOption: (sortingOption: StationSortingOption) => void;
  handleChangeCountry: (country: string) => void;
  handleChangeLanguage: (language: string) => void;
  updateURLSearchParams: () => void;
}

/*
  Sorting options to be passed into dropdown menu.
*/
const sortingOptions: DropdownMenuOption[] = [
  { label: 'Most Clicked', value: 'clickcount' },
  { label: 'Most Favorited', value: 'votes' },
  { label: 'Name: Alphabetical', value: 'name' },
  { label: 'Recently Played', value: 'clicktimestamp' },
  { label: 'Recently Added', value: 'changetimestamp' },
  { label: 'Trending', value: 'clicktrend' },
];

const Filters = ({
  filters,
  languages,
  countries,
  searchInputs,
  setSearchInputs,
  pageNum,
  setPageNum,
  longestCountryLabel,
  longestLanguageLabel,
  handleChangeSortingOption,
  handleChangeCountry,
  handleChangeLanguage,
  updateURLSearchParams,
}: FiltersProps): React.JSX.Element => {
  return (
    <form
      className="flex w-full flex-col"
      onSubmit={(e) => {
        e.preventDefault();
        // Manually trigger params update if page num is already 1, otherwise the act of resetting page num to 1 will also update other params.
        // Text inputs should only update search params when the form is submitted.
        // Other filteer changes such as changing the page number or selecting an option from a dropdown will update search params immediately.
        if (pageNum === 1) {
          updateURLSearchParams();
        } else {
          setPageNum(1);
        }
      }}
    >
      <div className="flex w-full flex-wrap items-center gap-4 py-4">
        <div className="relative flex flex-1 items-center gap-2">
          <label htmlFor="station-search-name">Name: </label>
          <input
            id="station-search-name"
            value={searchInputs.name}
            onChange={(e) => {
              setSearchInputs({ ...searchInputs, name: e.target.value });
            }}
            type="search"
            className="w-full min-w-[250px] rounded-md border-2 p-2 pr-8"
            placeholder="Enter a search term..."
          ></input>
          <button className="hover:text-accent absolute right-2 cursor-pointer" type="submit">
            <Search size={16} />
          </button>
        </div>

        <div className="relative flex flex-1 items-center gap-2">
          <label htmlFor="station-search-tag">Tag: </label>
          <input
            id="station-search-tag"
            value={searchInputs.tag}
            onChange={(e) => {
              setSearchInputs({ ...searchInputs, tag: e.target.value });
            }}
            type="search"
            className="w-full min-w-[250px] rounded-md border-2 p-2 pr-8"
            placeholder="Enter a search term..."
          ></input>
          <button className="hover:text-accent absolute right-2 cursor-pointer" type="submit">
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

export default Filters;
