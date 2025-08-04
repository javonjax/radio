import { ClickData } from '@/lib/api/schemas';
import { handleAPIFetch } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';

export const useFetchStationClicks = (stationuuid: string) => {
  const fetchStationClicks = async () => {
    const url: string = `http://localhost:3000/api/stations/activity/clicks/${stationuuid}?seconds=86400`;
    const res: globalThis.Response = await handleAPIFetch(await fetch(url));
    const stationClicks: ClickData[] = await res.json();
    return stationClicks;
  };

  return useQuery<ClickData[]>({
    queryKey: ['fetchStationClicks', stationuuid],
    queryFn: fetchStationClicks,
    retry: false,
  });
};
