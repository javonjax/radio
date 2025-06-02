import { RadioStation } from '@/lib/api/schemas';
import { Heart, Info, Play } from 'lucide-react';
import Image from 'next/image';

export interface StationListItemProps {
  station: RadioStation;
}

const StationListItem = ({ station }: StationListItemProps) => {
  return (
    <li
      key={station.stationuuid}
      className="flex min-h-[100px] w-full items-center gap-4 rounded-xl p-4 odd:bg-neutral-900"
    >
      <div className="flex w-[30%] flex-col">
        <div id="station-name" className="flex w-full items-center">
          {station.favicon !== null && station.favicon !== 'null' && station.favicon.length > 0 && (
            <Image
              src={station.favicon.trim()}
              className="mr-4"
              width={40}
              height={40}
              alt={`${station.name} icon`}
            />
          )}
          <a
            className="text-wrap underline"
            href={`${station.homepage !== null && station.homepage.length ? station.homepage : ''}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {station.name}{' '}
          </a>
        </div>
      </div>
      <div id="station-info" className="flex w-[30%] flex-col justify-center text-wrap">
        {station.country && <div>Country: {station.country}</div>}
        {station.language && <div>Language: {station.language}</div>}
        {station.clickcount !== null && station.clickcount > 0 && (
          <div>Clicks: {station.clickcount}</div>
        )}
        {station.votes !== null && <div>Favorites: {station.votes}</div>}
        {station.clicktrend !== null && station.clicktrend > 10 && (
          <div id="station-trending">Trending!</div>
        )}
        {station.clicktimestamp_iso8601 && (
          <div>Last clicked: {station.clicktimestamp_iso8601}</div>
        )}
      </div>
      <div id="station-tags" className="w-[20%] text-wrap break-words">
        {station.tags
          ?.split(',')
          .slice(0, 5)
          .map((tag) => <div key={tag}>{tag}</div>)}
      </div>

      <div className="flex w-[20%] flex-wrap items-center justify-center gap-4">
        <button className="bg-accent rounded-xl p-4">
          <Play />
        </button>
        <button className="bg-accent rounded-xl p-4">
          <Heart />
        </button>
        <button className="bg-accent rounded-xl p-4">
          <Info />
        </button>
      </div>
    </li>
  );
};

export default StationListItem;
