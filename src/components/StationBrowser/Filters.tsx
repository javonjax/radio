import { DropdownMenuOption, StationFilters } from '@/app/stations/schemas';
import { Country, Language } from '@/lib/api/schemas';
import { Search } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import Combobox from '../ui/Custom/Combobox/Combobox';
import DropdownMenu from './DropdownMenu';

export interface FiltersProps {
  filters: StationFilters;
  setFilters: Dispatch<SetStateAction<StationFilters>>;
  languages: Language[];
  countries: Country[];
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
        <div className="flex items-center gap-2">
          <label htmlFor="station-search-name">Name: </label>
          <input
            id="station-search-name"
            value={filters.name}
            onChange={(e) => {
              setFilters({ ...filters, name: e.target.value });
            }}
            type="search"
            className="rounded-md border-2 p-2"
            placeholder="Enter a search term..."
          ></input>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="station-search-tag">Tag: </label>
          <input
            id="station-search-tag"
            value={filters.tag}
            onChange={(e) => {
              setFilters({ ...filters, tag: e.target.value });
            }}
            type="search"
            className="rounded-md border-2 p-2"
            placeholder="Enter a search term..."
          ></input>
        </div>

        <DropdownMenu
          label="Sort by"
          value={filters.order ?? 'name'}
          filters={filters}
          setFilters={setFilters}
          options={sortingOptions}
          type="order"
        />

        {countries.length > 0 && (
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
        {languages.length > 0 && (
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

      <button
        className="flex w-fit cursor-pointer gap-2 rounded-lg bg-linear-(--accent-gradient) p-4"
        type="submit"
      >
        Search <Search />
      </button>
    </form>
  );
};

export default Filters;
