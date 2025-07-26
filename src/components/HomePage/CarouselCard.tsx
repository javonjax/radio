import Favicon from '@/components/StationBrowser/Favicon';
import Image from 'next/image';
import { RadioStation } from '@/lib/api/schemas';
import { capitalize } from '@/lib/utils';
import { Heart, Play } from 'iconoir-react';
import {
  SquareArrowOutUpRight,
  Flame,
  MapPinned,
  Languages,
  MousePointerClick,
  TagIcon,
  Info,
} from 'lucide-react';
import { StationContextType } from '@/components/ContextProviders/StationContext';
import Link from 'next/link';

export interface HomePageCarouselCardProps {
  station: RadioStation;
  stationContext?: StationContextType | undefined;
  variant?: 'horizontal' | 'vertical';
}

const CarouselCard = ({
  station,
  stationContext,
  variant = 'horizontal',
}: HomePageCarouselCardProps) => {
  return (
    <div className={`m-2 h-[450px] rounded-md border-2 ${variant === 'vertical' ? 'w-full' : ''}`}>
      <div className="flex h-full w-full flex-col justify-between gap-y-4 p-6">
        <div className="flex flex-col gap-4 overflow-y-auto">
          <div id="station-name" className="flex w-full items-center">
            {/*
                Render the favicon as link if both a homepage link and a favicon are available.
                If there is a homepage link but no favicon, render the SquareArrowOutUpRight icon.
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
                  <SquareArrowOutUpRight className="mr-4 h-[40px] min-h-[40px] w-[40px] min-w-[40px]" />
                </a>
              )
            ) : station.favicon !== null &&
              station.favicon !== 'null' &&
              station.favicon.length > 0 ? (
              <Image
                width={40}
                height={40}
                src={station.favicon.trim()}
                className="mr-4 h-[40px] min-h-[40px] w-[40px] min-w-[40px]"
                alt={`${station.name} icon`}
              />
            ) : null}

            {station.name && !!station?.name?.length ? (
              !!station.clicktrend && station.clicktrend > 10 ? (
                <div className="flex flex-col items-start">
                  <p>{station.name} </p>
                  <div className="flex items-center">
                    <Flame className="text-accent mb-[2px] -ml-[2px] h-[16px] min-h-[16px] w-[16px] min-w-[16px]" />
                    <span className="text-accent">Trending</span>
                  </div>
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
                <MapPinned className="h-[20px] min-h-[20px] w-[20px] min-w-[20px]" />
                <p>Country: {station.country}</p>
              </div>
            )}
            {station.language && (
              <div className="flex items-center gap-x-2">
                <Languages className="h-[20px] min-h-[20px] w-[20px] min-w-[20px]" />
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
                <MousePointerClick className="h-[20px] min-h-[20px] w-[20px] min-w-[20px]" />
                <p>Clicks: {station.clickcount}</p>
              </div>
            )}{' '}
            {station.votes !== null && (
              <div className="flex items-center gap-x-2">
                <Heart className="h-[20px] min-h-[20px] w-[20px] min-w-[20px]" />
                <p>Favorites: {station.votes}</p>
              </div>
            )}
            {station.tags && station.tags.length > 0 && (
              <div className="flex items-center gap-x-2">
                <TagIcon size={20} />
                <ul
                  id="station-tags"
                  className="flex w-full flex-wrap gap-x-2 text-wrap break-words"
                >
                  {station.tags?.split(',').map((tag) => (
                    <li key={tag} className="hover:text-accent text-wrap break-words">
                      <Link href={`/stations?tag=${encodeURIComponent(tag)}&order=votes`}>
                        {capitalize(tag)}
                      </Link>
                    </li>
                  ))}
                </ul>
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
              console.log(station);
            }}
          >
            <Play className="h-[24px] min-h-[24px] w-[24px] min-w-[24px]" />
          </button>
          <button className="cursor-pointer rounded-xl bg-linear-(--accent-gradient) p-4">
            <Heart className="h-[24px] min-h-[24px] w-[24px] min-w-[24px]" />
          </button>
          <Link
            className="cursor-pointer rounded-xl bg-linear-(--accent-gradient) p-4"
            href={`/stations/${station.stationuuid}`}
          >
            <Info className="h-[24px] min-h-[24px] w-[24px] min-w-[24px]" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarouselCard;
