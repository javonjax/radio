import { RadioStation } from '@/lib/api/schemas';
import { useContext } from 'react';
import { StationContext, StationContextType } from '../ContextProviders/StationContext';

const Header = () => {
  const stationContext = useContext<StationContextType | undefined>(StationContext);

  // Sorting by order=random does not appear to work properly, so we improvise.
  const fetchRandomStation = async () => {
    const sortingOptions: string[] = [
      'name',
      'url',
      'tags',
      'country',
      'language',
      'clickcount',
      'clicktrend',
      'changetimestamp',
    ];
    const randomSortingOption: string = sortingOptions[Math.floor(Math.random() * 8)];
    const randomLimit: number = Math.floor(Math.random() * 100) + 1;
    let queryParams: string = `hidebroken=true&limit=${randomLimit}`;
    queryParams += `&order=${randomSortingOption}`;
    const url: string = `http://localhost:3000/api/stations/search?${queryParams}`;
    console.log(url);
    const res: globalThis.Response = await fetch(url, { cache: 'no-store' });
    const stations: RadioStation[] = await res.json();
    const randomStation: RadioStation = stations[Math.floor(Math.random() * stations.length)];
    console.log(randomStation);
    stationContext?.setStation(randomStation);
    stationContext?.play();
  };

  return (
    <>
      <div className="col-span-full flex flex-col items-center justify-center">
        <h1 className="text-center text-3xl">Catch a wave. Find your sound.</h1>
        <h2 className="text-center">
          Browse radio stations from around the world, all in one place.
        </h2>
      </div>
      <div className="col-span-full flex items-center justify-center gap-6">
        <a
          className="rounded-md bg-linear-(--accent-gradient) p-4"
          href="/stations?order=clickcount"
        >
          Browse Stations
        </a>
        <button className="cursor-pointer rounded-md border-2 p-4" onClick={fetchRandomStation}>
          I&apos;m feeling lucky
        </button>
      </div>
    </>
  );
};

export default Header;
