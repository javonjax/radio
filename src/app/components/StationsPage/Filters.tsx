import React from 'react';

const Filters = () => {
  return (
    <div className="col-span-full flex gap-4 border-2 border-green-400">
      <div className="">
        <label htmlFor="station-sorting-options">Sort by: </label>
        <select id="station-sorting-options" className="rounded-lg border-2 p-4">
          <option value="clicks">Popularity: Click Count</option>
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
