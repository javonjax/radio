import { RadioStation, RadioStationsAPIResponse } from '@/lib/api/schemas';
import { getBaseUrl, HTTPError, RadioAPIFetch, SchemaError } from '@/lib/api/utils';
import { NextRequest, NextResponse } from 'next/server';

/*
  GET list of recently clicked radio stations.
*/
export const GET = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const baseUrl: string = await getBaseUrl();
    console.log(baseUrl, 'base');
    const queryParams: string = request.nextUrl.searchParams.toString();
    const url: string = `${baseUrl}/stations/lastclick?${queryParams}`;
    const res: globalThis.Response = await RadioAPIFetch(url);
    if (!res.ok) {
      throw new HTTPError('Unable to get radio stations at this time.', 404);
    }

    const data: unknown = await res.json();
    const parsedData = RadioStationsAPIResponse.safeParse(data);
    if (!parsedData.success) {
      throw new SchemaError();
    }

    const recentlyClickedStations: RadioStation[] = parsedData.data;
    return NextResponse.json(recentlyClickedStations);
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
