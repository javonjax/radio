export type StationFilters = {
  order: StationSortingOption;
  country: string;
  language: string;
};

export type StationSearchInputs = {
  name: string;
  tag: string;
};

export type StationSortingOption =
  | 'name'
  | 'clickcount'
  | 'votes'
  | 'clicktimestamp'
  | 'changetimestamp'
  | 'clicktrend';

export type DropdownMenuOption = {
  label: string;
  value: string;
};
