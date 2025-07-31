'use client';
import LoadingSpinner from '@/components/ui/Custom/LoadingSpinner';
import { use } from 'react';
import { useFetchStationInfo } from './hooks/useFetchStationInfo';
import Link from 'next/link';
import { capitalize } from '@/lib/utils';
import {
  Heart,
  Languages,
  MapPinned,
  MousePointerClick,
  Link as LinkIcon,
  Flame,
  SquareArrowOutUpRight,
  Tag,
} from 'lucide-react';
import Image from 'next/image';
import Favicon from '@/components/StationBrowser/Favicon';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export interface StationInfoPageProps {
  // 'params' is a promise in this version of next.js.
  params: Promise<{
    stationuuid: string;
  }>;
}

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: '#2563eb',
  },
  mobile: {
    label: 'Mobile',
    color: '#60a5fa',
  },
} satisfies ChartConfig;

const chartData = [
  { month: 'January', Clicks: 186, mobile: 80 },
  { month: 'February', Clicks: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
];

const StationInfoPage = ({ params }: StationInfoPageProps): React.JSX.Element => {
  const stationuuid: string = use(params).stationuuid;

  const {
    isLoading: stationLoading,
    error: stationFetchError,
    isError: isStationFetchError,
    data: station,
  } = useFetchStationInfo(stationuuid);

  return (
    <div className="flex w-full grow flex-col">
      <div className="flex grow flex-col gap-y-4">
        <h1 className="text-heading text-2xl">Station Info</h1>
        {stationLoading && <LoadingSpinner />}
        {isStationFetchError && <div>{stationFetchError.message}</div>}
        {!isStationFetchError && !stationLoading && station && (
          <div className="flex grow flex-col gap-y-2">
            <div id="station-name" className="flex w-full items-center xl:p-2">
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
                  <Link
                    href={`${station.homepage !== null && station.homepage.length ? station.homepage : ''}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SquareArrowOutUpRight className="mr-4" width={40} height={40} />
                  </Link>
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

              <div className="flex flex-col items-start">
                {station.name && !!station?.name?.length ? (
                  station.homepage !== null && station.homepage.length > 0 ? (
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent"
                      href={`${station.homepage !== null && station.homepage.length ? station.homepage : ''}`}
                    >
                      {station.name}
                    </Link>
                  ) : (
                    <p>{station.name}</p>
                  )
                ) : (
                  <p>Unknown Station</p>
                )}

                {!!station.clicktrend && station.clicktrend > 10 && (
                  <div className="flex items-center">
                    <Flame
                      height={20}
                      width={20}
                      className="text-accent mb-[2px] -ml-[2px] h-[16px] min-h-[18px] w-[16px] min-w-[16px]"
                    />
                    <span className="text-accent">Trending</span>
                  </div>
                )}
              </div>
            </div>
            {station.url && (
              <div className="flex items-start gap-x-2">
                <div className="flex flex-nowrap items-center gap-x-2">
                  <LinkIcon height={20} width={20} className="min-h-[20px] w-[20px] min-w-[20px]" />
                  <div className="whitespace-nowrap">Homepage URL: </div>
                </div>
                <Link
                  className="hover:text-accent"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={station.url}
                >
                  {station.url}
                </Link>
              </div>
            )}
            {station.country && (
              <div className="flex gap-x-2">
                <MapPinned size={20} className="min-h-[20px] min-w-[20px]" />
                <div>Country:</div>
                <Link
                  className="hover:text-accent"
                  href={`/stations?country=${station.country}&order=clickcount`}
                >
                  {station.country}
                </Link>
              </div>
            )}
            {station.language && (
              <div className="flex w-full items-center gap-x-2">
                <Languages height={20} width={20} className="min-h-[20px] w-[20px] min-w-[20px]" />
                <div>Language: </div>
                <ul className="flex flex-wrap gap-x-2">
                  {station.language.split(',').map((lang) => (
                    <li key={`${station.name}-${lang}`}>
                      <Link
                        className="hover:text-accent"
                        href={`/stations?language=${lang}&order=clickcount`}
                      >
                        {capitalize(lang)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {!!station.clickcount && (
              <div className="flex items-center gap-x-2">
                <MousePointerClick size={20} />
                <div>Clicks: {station.clickcount}</div>
              </div>
            )}
            {station.votes !== null && (
              <div className="flex items-center gap-x-2">
                <Heart size={20} />
                <p>Favorites: {station.votes}</p>
              </div>
            )}
            <div id="station-tags" className="flex w-full items-start gap-x-2">
              {station.tags && station.tags.length > 0 && (
                <>
                  <div className="flex items-center gap-x-2">
                    <Tag size={20} />
                    <div>Tags:</div>
                  </div>
                  <ul className="flex h-full w-full flex-wrap gap-x-2 text-wrap break-words">
                    {station.tags?.split(',').map((tag) => (
                      <li
                        key={tag}
                        className="hover:text-accent w-fit max-w-full cursor-pointer text-wrap break-words"
                      >
                        <Link
                          className="h-full w-full underline"
                          href={`/stations?tag=${encodeURIComponent(tag)}&order=clickcount`}
                          onClick={() => console.log(tag)}
                        >
                          {capitalize(tag)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            <Card className="bg-background text-foreground m-0 border-0 px-0">
              <CardHeader>
                <CardTitle className="font-normal">Station Traffic</CardTitle>
                <CardDescription>Clicks - Last 24 Hours</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <LineChart
                    accessibilityLayer
                    data={chartData}
                    margin={{
                      left: 12,
                      right: 12,
                    }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Line
                      dataKey="Clicks"
                      type="natural"
                      stroke="var(--accent)"
                      strokeWidth={2}
                      dot={{
                        fill: 'var(--accent)',
                      }}
                      activeDot={{
                        r: 6,
                      }}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
              <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">
                  Trending up by 5.2% this month
                </div>
                <div className="text-muted-foreground leading-none">
                  Showing total visitors for the last 6 months
                </div>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default StationInfoPage;
