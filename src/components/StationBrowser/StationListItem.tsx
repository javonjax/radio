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
} from 'lucide-react';
import Image from 'next/image';
import Favicon from './Favicon';
import { StationContextType } from '../ContextProviders/StationContext';

export interface StationListItemProps {
  station: RadioStation;
  stationContext?: StationContextType | undefined;
}

const StationListItem = ({ station, stationContext }: StationListItemProps) => {
  console.log(station);
  return (
    <li
      key={station.stationuuid}
      className="odd:bg-list-alt flex min-h-[100px] w-full items-center gap-4 rounded-xl p-4"
    >
      <div className="flex w-[30%] flex-col">
        <div id="station-name" className="flex w-full items-center">
          {/*
            Render a the favicon as link if both a homepage link and a favicon are available.
            If there is a homepage link but no favicon, render an svg icon.
            If there is a favicon but no homepage, render the favicon.
          */}
          {station.homepage !== null && !!station.homepage.length ? (
            station.favicon !== null && station.favicon !== 'null' && !!station.favicon.length ? (
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
      <div id="station-info" className="flex w-[30%] flex-col justify-center text-wrap">
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
      <ul id="station-tags" className="w-[20%] text-wrap break-words">
        {station.tags
          ?.split(',')
          .slice(0, 5)
          .map((tag) => <li key={tag}>{capitalize(tag)}</li>)}
      </ul>

      <div className="flex w-[20%] flex-wrap items-center justify-center gap-4">
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
    </li>
  );
};

export default StationListItem;
