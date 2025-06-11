export type StationFilters = {
  name: string;
  tag: string;
  order: StationSortingOption;
  country: string;
  language: string;
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
