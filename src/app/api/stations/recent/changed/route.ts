import { getBaseUrl, RadioAPIFetch } from '@/app/api/lib/utils';
import { NextRequest, NextResponse } from 'next/server';

/*
  GET radio stations that were recently changed or added.
*/
export const GET = async (request: NextRequest): Promise<NextResponse> => {
  const baseUrl: string = await getBaseUrl();
  const queryParams: string = request.nextUrl.searchParams.toString();
  const url: string = `${baseUrl}/stations/lastchange?${queryParams}`;
  const res: globalThis.Response = await RadioAPIFetch(url);
  const recentlyChangedStations = await res.json();
  return NextResponse.json(recentlyChangedStations);
};
