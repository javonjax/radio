import { NextRequest, NextResponse } from 'next/server';
import { getBaseUrl, RadioAPIFetch } from '../../lib/utils';

/*
  GET top radio stations.
  Possible params listed here: https://fi1.api.radio-browser.info/#Stations_by_votes
*/
export const GET = async (request: NextRequest): Promise<NextResponse> => {
  const baseUrl: string = await getBaseUrl();
  const queryParams: string = request.nextUrl.searchParams.toString();
  const url: string = `${baseUrl}/stations/topvote?${queryParams}`;
  const res: globalThis.Response = await RadioAPIFetch(url);
  const topStations = await res.json();
  return NextResponse.json({ topStations });
};
