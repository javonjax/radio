import { getBaseUrl, RadioAPIFetch } from '@/app/api/lib/utils';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest): Promise<NextResponse> => {
  const baseUrl: string = await getBaseUrl();
  const queryParams: string = request.nextUrl.searchParams.toString();
  const url: string = `${baseUrl}/stations/topclick?${queryParams}`;
  const res: globalThis.Response = await RadioAPIFetch(url);
  const topStationsByClicks = await res.json();
  return NextResponse.json(topStationsByClicks);
};
