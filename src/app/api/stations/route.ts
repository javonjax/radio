import { NextRequest, NextResponse } from 'next/server';
import { getBaseUrl, HTTPError, SchemaError } from '../lib/utils';
import { RadioAPIFetch } from '../lib/utils';
import { RadioStation, RadioStationsAPIResponse } from '../lib/schemas';

/*
  GET stations using query params.
  Possible params listed here: https://fi1.api.radio-browser.info/#List_of_all_radio_stations
*/
export const GET = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const baseUrl: string = await getBaseUrl();
    const queryParams: string = request.nextUrl.searchParams.toString();
    const url: string = `${baseUrl}/stations?${queryParams}`;
    const res: globalThis.Response = await RadioAPIFetch(url);
    if (!res.ok) {
      throw new HTTPError('Unable to get radio stations at this time.', 404);
    }

    const data: unknown = await res.json();
    const parsedData = RadioStationsAPIResponse.safeParse(data);
    if (!parsedData.success) {
      throw new SchemaError();
    }

    const stations: RadioStation[] = parsedData.data;
    return NextResponse.json(stations);
  } catch (error) {
    let message: string = 'Internal server error';
    let status: number | undefined = undefined;

    if (error instanceof Error) {
      message = error.message;
    }
    if (error instanceof HTTPError) {
      status = error.status;
    }

    return NextResponse.json({ error: message }, { status: status || 500 });
  }
};
