import React from 'react';

const Filters = () => {
  return (
    <div className="flex w-full flex-wrap gap-4">
      <div className="">
        <label htmlFor="station-sorting-options">Sort by: </label>
        <select id="station-sorting-options" className="rounded-lg border-2 p-4">
          <option value="clicks">Popularity: Click Count</option>
          <option>Name: Alphabetical</option>
          <option>Name: Reverse Alphabetical</option>
          <option>Votes</option>
          <option>Clicks</option>
          <option>Newest/Recently Updated</option>
          <option>Trending</option>
        </select>
      </div>
      <div className="">
        <label htmlFor="station-sorting-options">Country: </label>
        <select id="station-sorting-options" className="rounded-lg border-2 p-4">
          <option value="clicks">All</option>
        </select>
      </div>
      <div className="">
        <label htmlFor="station-sorting-options">Language: </label>
        <select id="station-sorting-options" className="rounded-lg border-2 p-4">
          <option value="clicks">All</option>
        </select>
      </div>
      <div className="">
        <label htmlFor="station-sorting-options">Sort by: </label>
        <select id="station-sorting-options" className="rounded-lg border-2 p-4">
          <option value="clicks">Popularity: Click Count</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
