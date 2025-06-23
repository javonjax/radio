'use client';
import { RadioStation, Tag } from '../lib/api/schemas';
import Header from '../components/HomePage/Header';
import { capitalize } from '@/lib/utils';
import { useContext, useEffect, useState } from 'react';
import {
  LocationContext,
  LocationContextType,
} from '@/components/ContextProviders/LocationContext';
import {
  Flame,
  Heart,
  Info,
  Languages,
  MapPinned,
  MousePointerClick,
  Navigation,
  Play,
  SquareArrowOutUpRight,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Favicon from '@/components/StationBrowser/Favicon';
import Image from 'next/image';
import { StationContext, StationContextType } from '@/components/ContextProviders/StationContext';

const HomePage = (): React.JSX.Element => {
  const locationContext = useContext<LocationContextType | undefined>(LocationContext);
  const stationContext = useContext<StationContextType | undefined>(StationContext);
  const [tags, setTags] = useState<Tag[] | undefined>();
  const [recentlyClickedStations, setRecentlyClickedStations] = useState<RadioStation[]>([]);
  const [localStations, setLocalStations] = useState<RadioStation[]>([]);
  console.log(locationContext);

  // Init.
  useEffect(() => {
    const fetchMostPopularTags = async () => {
      const res: globalThis.Response = await fetch(
        'http://localhost:3000/api/tags?order=stationcount&reverse=true&hidebroken=true&limit=12'
      );
      const tags: Tag[] = await res.json();
      setTags(tags);
    };
    const fetchRecentlyClickedStations = async () => {
      const res: globalThis.Response = await fetch(
        'http://localhost:3000/api/stations/recent/clicked?limit=12'
      );
      const recentlyClickedStations: RadioStation[] = await res.json();
      setRecentlyClickedStations(recentlyClickedStations);
    };
    fetchMostPopularTags();
    fetchRecentlyClickedStations();
  }, []);

  // Get stations near the user.
  // TODO: API seems to be bugged when searchin with a geo_distance.
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
      <div className="col-span-full flex flex-col items-center">
        <h2 className="text-heading mr-auto text-xl">Recently clicked stations</h2>
        <div className="flex w-[82%] items-center justify-center md:w-[90%] xl:w-[95%]">
          <Carousel
            opts={{
              align: 'start',
            }}
            className="w-full p-4"
          >
            <CarouselContent>
              {recentlyClickedStations?.map((station) => (
                <CarouselItem key={station.stationuuid} className="p-2 md:basis-1/2 lg:basis-1/3">
                  <div className="m-2 h-full min-h-[400px] rounded-md border-2">
                    <div className="flex h-full w-full flex-col justify-between p-6">
                      <div className="flex flex-col gap-4">
                        <div id="station-name" className="flex w-full items-center">
                          {/*
                          Render a the favicon as link if both a homepage link and a favicon are available.
                          If there is a homepage link but no favicon, render an svg icon.
                          If there is a favicon but no homepage, render the favicon.
                        */}
                          {station.homepage !== null && !!station.homepage.length ? (
                            station.favicon !== null &&
                            station.favicon !== 'null' &&
                            !!station.favicon.length ? (
                              <Favicon
                                alt={`${station.name} icon`}
                                src={station.favicon.trim()}
                                height={40}
                                width={40}
                                key={`${station.name} icon`}
                              />
                            ) : (
                              <a
                                href={`${station.homepage !== null && station.homepage.length ? station.homepage : ''}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <SquareArrowOutUpRight className="mr-4" width={40} height={40} />
                              </a>
                            )
                          ) : station.favicon !== null &&
                            station.favicon !== 'null' &&
                            station.favicon.length > 0 ? (
                            <Image
                              src={station.favicon.trim()}
                              className="mr-4 min-w-[40px]"
                              width={40}
                              height={40}
                              alt={`${station.name} icon`}
                            />
                          ) : null}

                          {station.name && !!station?.name?.length ? (
                            !!station.clicktrend && station.clicktrend > 10 ? (
                              <div className="flex items-center">
                                <p>{station.name}</p>
                                <Flame
                                  height={20}
                                  width={20}
                                  className="text-accent ml-2 h-[20px] min-h-[20px] w-[20px] min-w-[20px]"
                                />
                              </div>
                            ) : (
                              <p className="text-wrap">{station.name}</p>
                            )
                          ) : (
                            <p>Station name not found</p>
                          )}
                        </div>
                        <div className="flex flex-col gap-4">
                          {station.country && (
                            <div className="flex items-center gap-x-2">
                              <MapPinned size={20} className="min-h-[20px] min-w-[20px]" />
                              <p>Country: {station.country}</p>
                            </div>
                          )}
                          {station.language && (
                            <div className="flex items-center gap-x-2">
                              <Languages size={20} />
                              <p>
                                Language:{' '}
                                {station.language
                                  .split(',')
                                  .map((lang) => capitalize(lang))
                                  .join(', ')}
                              </p>
                            </div>
                          )}{' '}
                          {!!station.clickcount && (
                            <div className="flex items-center gap-x-2">
                              <MousePointerClick size={20} />
                              <p>Clicks: {station.clickcount}</p>
                            </div>
                          )}{' '}
                          {station.votes !== null && (
                            <div className="flex items-center gap-x-2">
                              <Heart size={20} />
                              <p>Favorites: {station.votes}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex w-full flex-wrap items-center justify-center gap-4">
                        <button
                          className="cursor-pointer rounded-xl bg-linear-(--accent-gradient) p-4"
                          onClick={() => {
                            stationContext?.setStation(station);
                            stationContext?.play();
                          }}
                        >
                          <Play />
                        </button>
                        <button className="cursor-pointer rounded-xl bg-linear-(--accent-gradient) p-4">
                          <Heart />
                        </button>
                        <button className="cursor-pointer rounded-xl bg-linear-(--accent-gradient) p-4">
                          <Info />
                        </button>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          {/* <Carousel className="flex h-full w-[80%] items-center border-2 border-red-500">
            <CarouselContent className="bg-accent">
              {recentlyClickedStations.map((station) => (
                <CarouselItem key={station.stationuuid} className="lg:basis-1/2 xl:basis-1/3">
                  <div className="flex flex-col items-center justify-center border-2 bg-green-500">
                    <div className="flex aspect-square items-center justify-center">
                      {station.name}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel> */}
          {/* <Carousel className="flex h-full w-full items-center justify-center border-2 bg-green-400">
            <CarouselContent className="bg-accent flex h-full w-[90%]">
              {recentlyClickedStations.map((station) => {
                return (
                  <CarouselItem
                    key={station.stationuuid}
                    className="flex h-full border-2 border-red-500 text-wrap"
                  >
                    <div className="h-full w-full bg-yellow-300">
                      {station.name}
                      {station.name}
                      {station.name}
                      {station.name}
                      {station.name}
                      {station.name}
                      {station.name}
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel> */}
        </div>
      </div>
      <div className="col-span-full flex min-h-[500px] flex-col items-center gap-6 xl:col-span-6">
        <h2 className="text-heading mr-auto text-xl">Popular categories</h2>
        <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-3">
          {tags?.map((tag) => (
            <a
              key={tag.name}
              className="hover:text-accent cursor-pointer rounded-md border-2 p-4"
              href={`/stations?tag=${tag.name}&order=clickcount`}
            >
              <h3>{capitalize(tag?.name || '')}</h3>
              <h4>{tag.stationcount} live stations</h4>
            </a>
          ))}
        </div>
        <a className="hover:text-accent rounded-md border-2 p-4" href="/stations?order=clickcount">
          Browse all
        </a>
      </div>
      <div className="col-span-full flex w-full flex-col gap-6 xl:col-span-6 xl:min-h-[500px]">
        <h2 className="text-heading mr-auto text-xl">Stations Hosted Near You</h2>
        {locationContext?.location ? (
          <div>{locationContext.location.latitude}</div>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <button
              className="flex cursor-pointer items-center rounded-md bg-linear-(--accent-gradient) p-4"
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
              Search near me
              <Navigation className="mt-1 ml-2" size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
