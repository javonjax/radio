import { NextRequest, NextResponse } from 'next/server';
import { getBaseUrl } from '../lib/utils';
import { RadioAPIFetch } from '../lib/utils';

/*
  GET stations using query params.
  Possible params listed here: https://fi1.api.radio-browser.info/#List_of_all_radio_stations
*/
export const GET = async (request: NextRequest): Promise<NextResponse> => {
  const baseUrl: string = await getBaseUrl();
  const queryParams: string = request.nextUrl.searchParams.toString();
  const url: string = `${baseUrl}/stations?${queryParams}`;
  const res: globalThis.Response = await RadioAPIFetch(url);
  const data = await res.json();
  return NextResponse.json({ data });
};
