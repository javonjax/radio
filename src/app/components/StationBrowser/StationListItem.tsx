import { RadioStation } from '@/app/api/lib/schemas';
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
      <div id="station-name" className="flex w-[30%] items-center">
        {station.favicon !== null && station.favicon !== 'null' && station.favicon.length > 0 && (
          <Image
            src={station.favicon}
            className="mr-4"
            width={40}
            height={40}
            alt={`${station.name} icon`}
          />
        )}
        <div className="text-wrap">{station.name}</div>
      </div>
      <div id="station-info" className="w-[30%] text-wrap">
        {station.country && <div>Country: {station.country}</div>}
        {station.language && <div>Language: {station.language}</div>}
        {station.clickcount && <div>Times clicked: {station.clickcount}</div>}
        {station.votes !== null && <div>Votes: {station.votes}</div>}
        {station.clicktrend !== null && station.clicktrend > 10 && (
          <div id="station-trending">Trending: {station.clicktrend}</div>
        )}
      </div>
      <div id="station-tags" className="w-[20%] text-wrap break-words">
        {station.tags
          ?.split(',')
          .slice(0, 5)
          .map((tag) => <div key={tag}>{tag}</div>)}
      </div>
      <div id="station-last-online-check" className="w-[20%] text-wrap break-words">
        {station.lastcheckoktime_iso8601}
      </div>
    </li>
  );
};

export default StationListItem;
