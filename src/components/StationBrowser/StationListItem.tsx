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

export interface StationListItemProps {
  station: RadioStation;
}

const StationListItem = ({ station }: StationListItemProps) => {
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
              // <a
              //   href={`${station.homepage !== null && station.homepage.length ? station.homepage : ''}`}
              //   target="_blank"
              //   rel="noopener noreferrer"
              // >
              //   <Image
              //     src={station.favicon.trim()}
              //     className="mr-4 min-w-[40px]"
              //     width={40}
              //     height={40}
              //     alt={`${station.name} icon`}
              //   />
              // </a>
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
              <p className="text-accent flex">
                {station.name}
                <Flame height={20} width={20} className="ml-2" />
              </p>
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
            <MapPinned size={20} className="min-h-[20px] min-w-[20px]" /> Country: {station.country}
          </div>
        )}
        {station.language && (
          <div className="flex items-center gap-x-2">
            <Languages size={20} />
            Language:{' '}
            {station.language
              .split(',')
              .map((lang) => capitalize(lang))
              .join(',')}
          </div>
        )}{' '}
        {!!station.clickcount && (
          <div className="flex items-center gap-x-2">
            <MousePointerClick size={20} />
            Clicks: {station.clickcount}
          </div>
        )}{' '}
        {station.votes !== null && (
          <div className="flex items-center gap-x-2">
            <Heart size={20} />
            Favorites: {station.votes}
          </div>
        )}
        {/* {station.clicktimestamp_iso8601 && (
          <div>Last listener: {station.clicktimestamp_iso8601}</div>
        )} */}
      </div>
      <ul id="station-tags" className="w-[20%] text-wrap break-words">
        {station.tags
          ?.split(',')
          .slice(0, 5)
          .map((tag) => <li key={tag}>{capitalize(tag)}</li>)}
      </ul>

      <div className="flex w-[20%] flex-wrap items-center justify-center gap-4">
        <button
          className="rounded-xl bg-linear-(--accent-gradient) p-4"
          onClick={() => {
            console.log(station.url);
          }}
        >
          <Play />
        </button>
        <button className="rounded-xl bg-linear-(--accent-gradient) p-4">
          <Heart />
        </button>
        <button className="rounded-xl bg-linear-(--accent-gradient) p-4">
          <Info />
        </button>
      </div>
    </li>
  );
};

export default StationListItem;
