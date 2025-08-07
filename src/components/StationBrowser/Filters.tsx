import { DropdownMenuOption, StationFilters, StationSearchInputs } from '@/lib/schemas';
import { Country, Language } from '@/lib/api/schemas';
import { Search } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import Combobox from '../ui/Custom/Combobox';
import DropdownMenu from './DropdownMenu';

export interface FiltersProps {
  filters: StationFilters;
  setFilters: Dispatch<SetStateAction<StationFilters>>;
  languages: Language[];
  countries: Country[];
  searchInputs: StationSearchInputs;
  setSearchInputs: Dispatch<SetStateAction<StationSearchInputs>>;
  onSearch: () => void;
  longestCountryLabel: string;
  longestLanguageLabel: string;
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
  setFilters,
  languages,
  countries,
  searchInputs,
  setSearchInputs,
  onSearch,
  longestCountryLabel,
  longestLanguageLabel,
}: FiltersProps): React.JSX.Element => {
  return (
    <form
      className="flex w-full flex-col"
      onSubmit={(e) => {
        e.preventDefault();
        onSearch();
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
              // setFilters({ ...filters, name: e.target.value });
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
              // setFilters({ ...filters, tag: e.target.value });
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
          filters={filters}
          setFilters={setFilters}
          options={sortingOptions}
          type="order"
        />

        {countries && countries.length > 0 && (
          <Combobox
            label="Country"
            options={countries}
            emptyPlaceholder="Country not found."
            placeholder="Search country..."
            value={filters.country}
            filters={filters}
            setFilters={setFilters}
            longestLabel={longestCountryLabel}
          />
        )}
        {languages && languages.length > 0 && (
          <Combobox
            label="Language"
            options={languages}
            emptyPlaceholder="Language not found."
            placeholder="Search language..."
            value={filters.language}
            filters={filters}
            setFilters={setFilters}
            longestLabel={longestLanguageLabel}
          />
        )}
      </div>

      {/* <button
        className="flex w-fit cursor-pointer gap-2 rounded-lg bg-linear-(--accent-gradient) p-4"
        type="submit"
      >
        Search <Search />
      </button> */}
    </form>
  );
};

export default Filters;
