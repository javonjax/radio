'use client';
import { RadioStation, Tag } from '../lib/api/schemas';
import Header from '../components/HomePage/Header';
import { capitalize, handleAPIError, handleAPIFetch } from '@/lib/utils';
import { useContext, useEffect } from 'react';
import {
  LocationContext,
  LocationContextType,
} from '@/components/ContextProviders/LocationContext';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import { StationContext, StationContextType } from '@/components/ContextProviders/StationContext';

import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '@/components/ui/Custom/LoadingSpinner';
import CarouselCard from '@/components/HomePage/CarouselCard';
import Link from 'next/link';

const HomePage = (): React.JSX.Element => {
  const thisComponent: string = HomePage.name;
  // const locationContext = useContext<LocationContextType | undefined>(LocationContext);
  const stationContext = useContext<StationContextType | undefined>(StationContext);

  const fetchTrendingStations = async (): Promise<RadioStation[]> => {
    const url: string =
      'http://localhost:3000/api/stations/search?order=clicktrend&limit=12&reverse=true';
    const res: globalThis.Response = await handleAPIFetch(await fetch(url));
    const trendingStations: RadioStation[] = await res.json();
    console.log(trendingStations);
    return trendingStations;
  };

  const fetchMostPopularTags = async (): Promise<Tag[]> => {
    const url: string =
      'http://localhost:3000/api/tags?order=stationcount&reverse=true&hidebroken=true&limit=12';
    const res: globalThis.Response = await handleAPIFetch(await fetch(url));
    const tags: Tag[] = await res.json();
    return tags;
  };

  const fetchRecentlyClickedStations = async (): Promise<RadioStation[]> => {
    const url: string = 'http://localhost:3000/api/stations/recent/clicked?limit=12';
    const res: globalThis.Response = await handleAPIFetch(await fetch(url));
    const recentlyClickedStations: RadioStation[] = await res.json();
    return recentlyClickedStations;
  };

  //#TODO: tanstack queries
  const {
    isLoading: trendingStationsLoading,
    error: trendingStationsFetchError,
    isError: isTrendingStationsFetchError,
    data: trendingStations,
  } = useQuery<RadioStation[]>({
    queryKey: ['fetchTrendingStations'],
    queryFn: fetchTrendingStations,
    retry: false,
  });

  const {
    isLoading: tagsLoading,
    error: tagsFetchError,
    isError: isTagsFetchError,
    data: tags,
  } = useQuery<Tag[]>({
    queryKey: ['fetchMostPopularTags'],
    queryFn: fetchMostPopularTags,
    retry: false,
  });

  const {
    isLoading: recentlyClickedStationsLoading,
    error: recentlyClickedStationsFetchError,
    isError: isRecentlyClickedStationsFetchError,
    data: recentlyClickedStations,
  } = useQuery<RadioStation[]>({
    queryKey: ['fetchRecentlyClickedStations'],
    queryFn: fetchRecentlyClickedStations,
    retry: false,
  });

  useEffect(() => {
    if (isTrendingStationsFetchError) {
      console.log(trendingStationsFetchError);
      if (trendingStationsFetchError instanceof Error) {
        handleAPIError(trendingStationsFetchError);
      } else {
        console.warn(`Unknown error in ${thisComponent}.`);
      }
    }
  }, [isTrendingStationsFetchError]);

  // Init.
  useEffect(() => {
    if (isTagsFetchError) {
      console.log(tagsFetchError.message);
      if (tagsFetchError instanceof Error) {
        handleAPIError(tagsFetchError);
      } else {
        console.warn(`Unknown error in ${thisComponent}.`);
      }
    }
  }, [isTagsFetchError]);

  // TODO: API seems to be bugged when searching with a geo_distance.
  useEffect(() => {
    if (isTagsFetchError) {
      console.log(tagsFetchError.message);
      if (tagsFetchError instanceof Error) {
        handleAPIError(tagsFetchError);
      } else {
        console.warn(`Unknown error in ${thisComponent}.`);
      }
    }
  }, [isTagsFetchError]);

  useEffect(() => {
    if (isRecentlyClickedStationsFetchError) {
      console.log(recentlyClickedStationsFetchError);
      if (recentlyClickedStationsFetchError instanceof Error) {
        handleAPIError(recentlyClickedStationsFetchError);
      } else {
        console.warn(`Unknown error in ${thisComponent}.`);
      }
    }
  }, [isRecentlyClickedStationsFetchError]);

  // TODO: API seems to be bugged when searching with a geo_distance.
  // Get stations near the user.
  // useEffect(() => {
  //   if (locationContext?.location) {
  //     const fetchLocalStations = async () => {
  //       const lat: string = locationContext.location?.latitude.toString() || '';
  //       const lon: string = locationContext.location?.longitude.toString() || '';
  //       let queryParams: string = '';
  //       if (lat.length && lon.length) {
  //         queryParams += `&geo_lat=${lat}&geo_lon=${lon}&geo_distance=75000`;
  //       }
  //       const res: globalThis.Response = await fetch(
  //         `http://localhost:3000/api/stations/search?limit=12${queryParams}`
  //       );
  //       console.log(res);
  //       const localStations: RadioStation[] = await res.json();
  //       if (!localStations.length) {
  //         throw new Error('No stations found near this location.');
  //       }
  //       setLocalStations(localStations);
  //     };
  //     try {
  //       fetchLocalStations();
  //     } catch (error) {
  //       console.warn(error);
  //       toast.warning('error');
  //     }
  //   }
  // }, [locationContext?.location]);

  return (
    <div className="grid h-full w-full grid-cols-12 gap-4">
      <Header />

      <div className="col-span-full flex min-h-[500px] flex-col items-center">
        <h2 className="text-heading mr-auto text-xl">Recently clicked stations</h2>
        {trendingStationsLoading && <LoadingSpinner />}
        {isTrendingStationsFetchError && trendingStationsFetchError && (
          <div className="flex h-full w-full items-center justify-center">
            {trendingStationsFetchError.message}
          </div>
        )}
        {!isTrendingStationsFetchError && trendingStations && (
          <div className="flex w-[82%] items-center justify-center md:w-[90%] xl:w-[95%]">
            <Carousel
              opts={{
                align: 'start',
              }}
              className="w-full p-4"
            >
              <CarouselContent>
                {trendingStations.length > 0 &&
                  trendingStations?.map((station) => (
                    <CarouselItem
                      key={station.stationuuid}
                      className="-mt-2 pb-2 md:basis-1/2 lg:basis-1/3"
                    >
                      <CarouselCard station={station} stationContext={stationContext} />
                    </CarouselItem>
                  ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        )}
      </div>

      <div className="col-span-full flex min-h-[500px] flex-col items-center gap-y-4 lg:col-span-6">
        <h2 className="text-heading mr-auto text-xl">Popular Categories</h2>
        {tagsLoading && <LoadingSpinner />}
        {isTagsFetchError && tagsFetchError && (
          <div className="flex h-full w-full items-center justify-center">
            {tagsFetchError.message}
          </div>
        )}
        {tags && (
          <div className="flex h-full w-full flex-col items-center justify-center gap-y-4">
            <div className="grid h-full w-full grid-cols-2 gap-4 md:grid-cols-3">
              {tags.length > 0 &&
                tags?.map((tag) => (
                  <Link
                    rel="noopener noreferrer"
                    key={tag.name}
                    className="hover:text-accent cursor-pointer rounded-md border-2 p-4"
                    href={`/stations?tag=${tag.name}&order=clickcount`}
                  >
                    <h3>{capitalize(tag?.name || '')}</h3>
                    <h4>{tag.stationcount} Live Stations</h4>
                  </Link>
                ))}
            </div>
            <Link
              rel="noopener noreferrer"
              className="rounded-md bg-linear-(--accent-gradient) p-4"
              href="/stations?order=clickcount"
            >
              Browse All
            </Link>
          </div>
        )}
      </div>

      <div className="col-span-full flex min-h-[500px] flex-col items-center lg:col-span-6">
        <h2 className="text-heading mr-auto text-xl">Recently Clicked Stations</h2>
        {recentlyClickedStationsLoading && <LoadingSpinner />}
        {isRecentlyClickedStationsFetchError && recentlyClickedStationsFetchError && (
          <div className="flex h-full w-full items-center justify-center">
            {recentlyClickedStationsFetchError.message}
          </div>
        )}
        {!isRecentlyClickedStationsFetchError && recentlyClickedStations && (
          <div className="flex w-[82%] items-center justify-center md:w-[90%] lg:w-[82%]">
            <Carousel
              opts={{
                align: 'start',
              }}
              className="w-full p-4"
            >
              <CarouselContent>
                {recentlyClickedStations.length > 0 &&
                  recentlyClickedStations?.map((station) => (
                    <CarouselItem
                      key={station.stationuuid}
                      className="-mt-2 md:basis-1/2 lg:basis-1/1"
                    >
                      <CarouselCard station={station} stationContext={stationContext} />
                    </CarouselItem>
                  ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        )}
      </div>
      {/* <div className="col-span-full flex w-full flex-col gap-6 xl:col-span-6 xl:min-h-[500px]">
        <h2 className="text-heading mr-auto text-xl">Stations Hosted Near You</h2>
        {locationContext?.location ? (
          <div>{locationContext.location.latitude}</div>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <button
              className="flex items-center rounded-md bg-linear-(--accent-gradient) p-4"
              onClick={async () => {
                try {
                  if (!locationContext?.location) {
                    await locationContext?.requestLocation();
                  }
                } catch (error) {
                  console.warn(error);
                  toast.warning('Location services required.', {
                    position: 'top-center',
                    duration: 7000,
                    description:
                      'Please enable location services in your browser to use this feature.',
                  });
                }
              }}
            >
              {' '}
              Coming Soon! Search near me
              <Navigation className="mt-1 ml-2" size={16} />
            </button>
          </div>
        )}
      </div> */}
      <div className="col-span-full flex min-h-[500px] flex-col items-center">
        <h2 className="text-heading mr-auto text-xl">Recently Clicked Stations</h2>
        {recentlyClickedStationsLoading && <LoadingSpinner />}
        {isRecentlyClickedStationsFetchError && recentlyClickedStationsFetchError && (
          <div className="flex h-full w-full items-center justify-center">
            {recentlyClickedStationsFetchError.message}
          </div>
        )}
        {!isRecentlyClickedStationsFetchError && recentlyClickedStations && (
          <div className="flex w-[82%] items-center justify-center md:w-[90%] xl:w-[95%]">
            <Carousel
              opts={{
                align: 'start',
              }}
              className="w-full p-4"
            >
              <CarouselContent>
                {recentlyClickedStations.length > 0 &&
                  recentlyClickedStations?.map((station) => (
                    <CarouselItem
                      key={station.stationuuid}
                      className="-mt-2 pb-2 md:basis-1/2 lg:basis-1/3"
                    >
                      <CarouselCard station={station} stationContext={stationContext} />
                    </CarouselItem>
                  ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
