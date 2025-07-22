import { RadioStation } from '@/lib/api/schemas';
import { capitalize } from '@/lib/utils';
import {
  Flame,
  Heart,
  Info,
  Languages,
  MapPinned,
  MousePointerClick,
  Play,
  SquareArrowOutUpRight,
  Tag,
} from 'lucide-react';
import Image from 'next/image';
import Favicon from './Favicon';
import { StationContextType } from '../ContextProviders/StationContext';

export interface StationListItemProps {
  station: RadioStation;
  stationContext?: StationContextType | undefined;
}

const StationListItem = ({ station, stationContext }: StationListItemProps) => {
  return (
    <li
      key={station.stationuuid}
      className="xl:odd:bg-list-alt flex w-full flex-col items-center rounded-xl border-2 md:w-[45%] xl:w-full xl:border-0"
    >
      <div className="flex h-[450px] w-full flex-col items-center justify-between gap-4 p-6 xl:h-full xl:min-h-[150px] xl:flex-row xl:justify-start xl:gap-0 xl:p-4">
        <div className="mb-2 flex w-full flex-col items-center overflow-y-auto xl:w-[80%] xl:flex-row">
          <div className="mb-2 flex w-full flex-col xl:mb-0 xl:w-[37.5%]">
            <div id="station-name" className="flex w-full items-center">
              {/*
                Render a the favicon as link if both a homepage link and a favicon are available.
                If there is a homepage link but no favicon, render an svg icon.
                If there is a favicon but no homepage, render the favicon.
              */}
              {station.homepage !== null && station.homepage.length > 0 ? (
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
                  <div className="flex flex-col items-start">
                    <p>{station.name} </p>
                    <div className="flex items-center">
                      <Flame
                        height={20}
                        width={20}
                        className="text-accent mb-[2px] -ml-[2px] h-[16px] min-h-[18px] w-[16px] min-w-[16px]"
                      />
                      <span className="text-accent">Trending</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-wrap">{station.name} </p>
                )
              ) : (
                <p>Station name not found</p>
              )}
            </div>
          </div>

          <div
            id="station-info"
            className="mb-4 flex w-full flex-col justify-center gap-y-4 text-wrap xl:mb-0 xl:w-[37.5%] xl:gap-y-2"
          >
            {station.country && (
              <div className="flex items-center gap-x-2">
                <MapPinned size={20} className="min-h-[20px] min-w-[20px]" />
                <p>Country: {station.country}</p>
              </div>
            )}
            {station.language && (
              <div className="flex items-center gap-x-2">
                <Languages height={20} width={20} className="min-h-[20px] w-[20px] min-w-[20px]" />
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

          <div className="flex w-full items-center gap-x-2 xl:w-[25%]">
            {station.tags && station.tags.length > 0 && (
              <>
                <Tag size={20} className="xl:hidden" />
                <ul
                  id="station-tags"
                  className="flex w-full flex-wrap gap-x-2 text-wrap break-words xl:flex-col xl:gap-0"
                >
                  {station.tags
                    ?.split(',')
                    .slice(0, 5)
                    .map((tag) => (
                      <li key={tag} className="text-wrap break-words">
                        {capitalize(tag)}
                      </li>
                    ))}
                </ul>
              </>
            )}
          </div>
        </div>

        <div className="flex w-full flex-wrap items-center justify-center gap-4 xl:w-[20%]">
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
    </li>
  );
};

export default StationListItem;
