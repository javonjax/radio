import { NextRequest, NextResponse } from 'next/server';
import { getBaseUrl, HTTPError, RadioAPIFetch, SchemaError } from '../../../../../lib/api/utils';
import { RadioStation, RadioStationsAPIResponse } from '@/lib/api/schemas';

/*
  GET top radio stations.
  Possible params listed here: https://fi1.api.radio-browser.info/#Stations_by_votes
*/
export const GET = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const baseUrl: string = await getBaseUrl();
    const queryParams: string = request.nextUrl.searchParams.toString();
    const url: string = `${baseUrl}/stations/topvote?${queryParams}`;
    const res: globalThis.Response = await RadioAPIFetch(url);
    if (!res.ok) {
      throw new HTTPError('Unable to get radio stations at this time.', 404);
    }

    const data: unknown = await res.json();
    const parsedData = RadioStationsAPIResponse.safeParse(data);
    if (!parsedData.success) {
      throw new SchemaError();
    }
    const topStations: RadioStation[] = parsedData.data;
    return NextResponse.json(topStations);
  } catch (error) {
    let message: string = 'Internal server error';
    let status: number = 500;

    if (error instanceof Error) {
      message = error.message;
    }
    if (error instanceof HTTPError) {
      status = error.status;
    }

    return NextResponse.json({ error: message }, { status: status || 500 });
  }
};
