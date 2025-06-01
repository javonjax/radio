import { StationFilters, StationSortingOption } from '@/app/stations/page';
import { Search } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

export interface FiltersProps {
  filters: StationFilters;
  setFilters: Dispatch<SetStateAction<StationFilters>>;
  onSearch: () => void;
}

const Filters = ({ filters, setFilters, onSearch }: FiltersProps): React.JSX.Element => {
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
            value={filters.sortBy}
            onChange={(e) =>
              setFilters({ ...filters, sortBy: e.target.value as StationSortingOption })
            }
          >
            <option value="name">Name</option>
            <option value="clicks">Most Clicked</option>
            <option value="favorites">Most Favorited</option>
            <option value="recentlyPlayed">Recently Played</option>
            <option value="recentlyAdded">Recently Added/Updated</option>
            <option value="trending">Trending</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="station-search-country">Country: </label>
          <select id="station-search-country" className="rounded-lg border-2 p-2">
            <option value="clicks">All</option>
            <option>Clicks</option>
            <option>Newest/Recently Updated</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="station-search-language">Language: </label>
          <select id="station-search-language" className="rounded-lg border-2 p-2">
            <option value="all">All</option>
            <option>Newest/Recently Updated</option>
          </select>
        </div>
      </div>

      <button
        className="bg-button flex w-fit cursor-pointer gap-2 rounded-lg p-4"
        onClick={onSearch}
      >
        Search <Search />
      </button>
    </div>
  );
};

export default Filters;
