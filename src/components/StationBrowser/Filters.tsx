import { StationFilters, StationSortingOption } from '@/app/stations/schemas';
import { Country, Language } from '@/lib/api/schemas';
import { Search } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import Combobox from '../ui/Combobox/Combobox';

export interface FiltersProps {
  filters: StationFilters;
  setFilters: Dispatch<SetStateAction<StationFilters>>;
  languages: Language[];
  countries: Country[];
  onSearch: () => void;
  longestCountryLabel: string;
  longestLanguageLabel: string;
}

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
    <div className="flex w-full flex-col">
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
            className="rounded-xl border-2 p-2"
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
            className="rounded-xl border-2 p-2"
            placeholder="Enter a search term..."
          ></input>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="station-search-sorting">Sort by: </label>
          <select
            id="station-search-sorting"
            className="rounded-lg border-2 p-2"
            value={filters.order}
            onChange={(e) =>
              setFilters({ ...filters, order: e.target.value as StationSortingOption })
            }
          >
            <option value="clickcount">Most Clicked</option>
            <option value="votes">Most Favorited</option>
            <option value="name">Name: Alphabetical</option>
            <option value="clicktimestamp">Recently Played</option>
            <option value="changetimestamp">Recently Added/Updated</option>
            <option value="clicktrend">Trending</option>
          </select>
        </div>

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
        onClick={onSearch}
      >
        Search <Search />
      </button>
    </div>
  );
};

export default Filters;
