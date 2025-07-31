import { z } from 'zod';

export const RadioStationSchema = z.object({
  changeuuid: z.string().nullable(),
  stationuuid: z.string().nullable(),
  name: z.string().nullable(),
  url: z.string().nullable(),
  url_resolved: z.string().nullable(),
  homepage: z.string().nullable(),
  favicon: z.string().nullable(),
  tags: z.string().nullable(),
  country: z.string().nullable(), // Depreciated: use country code.
  countrycode: z.string().nullable(),
  state: z.string().nullable(),
  iso_3166_2: z.string().nullable(),
  language: z.string().nullable(),
  languagecodes: z.string().nullable(),
  votes: z.number().nullable(),
  lastchangetime_iso8601: z.string().datetime().nullable(),
  lastcheckok: z.number(),
  lastchecktime_iso8601: z.string().datetime().nullable(),
  lastcheckoktime_iso8601: z.string().datetime().nullable(),
  clicktimestamp_iso8601: z.string().datetime().nullable(),
  clickcount: z.number().nullable(),
  clicktrend: z.number().nullable(),
  geo_lat: z.number().nullable(),
  geo_long: z.number().nullable(),
});

export type RadioStation = z.infer<typeof RadioStationSchema>;

export const RadioStationsAPIResponse = z.array(RadioStationSchema);

export const TagSchema = z.object({
  name: z.string().nullable(),
  stationcount: z.number().nullable(),
});

export type Tag = z.infer<typeof TagSchema>;

export const TagsAPIResponse = z.array(TagSchema);

export const CountrySchema = z.object({
  name: z.string(),
  iso_3166_1: z.string().nullable(),
  stationcount: z.number().nullable(),
});

export type Country = z.infer<typeof CountrySchema>;

export const CountriesAPIResponse = z.array(CountrySchema);

export const LanguageSchema = z.object({
  name: z.string(),
  iso_639: z.string().nullable(),
  stationcount: z.number().nullable(),
});

export type Language = z.infer<typeof LanguageSchema>;

export const LanguagesAPIResponse = z.array(LanguageSchema);

export const StationClickSchema = z.object({
  stationuuid: z.string(),
  clickuuid: z.string(),
  clicktimestamp_iso8601: z.string(),
  clicktimestamp: z.string(),
});

export type StationClick = z.infer<typeof StationClickSchema>;

export const StationClicksAPIResponse = z.array(StationClickSchema);

export type ClickData = {
  hour: string;
  clicks: number;
};
