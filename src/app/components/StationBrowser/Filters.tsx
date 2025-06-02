import { StationFilters, StationSortingOption } from '@/app/stations/schemas';
import { Country, Language } from '@/lib/api/schemas';
import { Search } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

export interface FiltersProps {
  filters: StationFilters;
  setFilters: Dispatch<SetStateAction<StationFilters>>;
  languages: Language[];
  countries: Country[];
  onSearch: () => void;
}

const Filters = ({
  filters,
  setFilters,
  languages,
  countries,
  onSearch,
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

        <div className="flex items-center gap-2">
          <label htmlFor="station-search-country">Country: </label>
          <select
            id="station-search-country"
            className="rounded-lg border-2 p-2"
            value={filters.country}
            onChange={(e) => {
              setFilters({
                ...filters,
                country: e.target.value,
              });
            }}
          >
            <option value="">All</option>
            {countries
              ?.sort((a, b) => a.name.localeCompare(b.name))
              .map((country) => {
                if (!country.name) return null;
                return (
                  <option key={country.name} value={country.name}>
                    {country.name}
                  </option>
                );
              })}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="station-search-language">Language: </label>
          <select
            id="station-search-language"
            className="rounded-lg border-2 p-2"
            value={filters.language}
            onChange={(e) => {
              setFilters({
                ...filters,
                language: e.target.value,
              });
            }}
          >
            <option value="">All</option>
            {languages?.map((language) => {
              // Filters out some of the weird entries in the radio-browser db ie. "16 additional languages" or "#english".
              if (!language.name || !/^[a-zA-z]$/.test(language.name[0])) return null;
              return (
                <option key={language.name} value={language.name}>
                  {language.name[0].toUpperCase() + language.name.slice(1)}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <button
        className="bg-accent flex w-fit cursor-pointer gap-2 rounded-lg p-4"
        onClick={onSearch}
      >
        Search <Search />
      </button>
    </div>
  );
};

export default Filters;
