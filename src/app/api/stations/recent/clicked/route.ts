import { getBaseUrl, RadioAPIFetch } from '@/app/api/lib/utils';
import { NextRequest, NextResponse } from 'next/server';

/*
  GET list of recently clicked radio stations.
*/
export const GET = async (request: NextRequest): Promise<NextResponse> => {
  const baseUrl: string = await getBaseUrl();
  const queryParams: string = request.nextUrl.searchParams.toString();
  const url: string = `${baseUrl}/stations/lastclick?${queryParams}`;
  const res: globalThis.Response = await RadioAPIFetch(url);
  const recentlyClickedStations = await res.json();
  return NextResponse.json(recentlyClickedStations);
};
