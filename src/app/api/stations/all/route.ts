import { NextResponse } from 'next/server';
import { getBaseUrl } from '@/lib/api/utils';
import { RadioAPIFetch } from '@/lib/api/utils';
import { HTTPError, RadioStation, RadioStationsAPIResponse, SchemaError } from '@/lib/api/schemas';

/*
  GET all radio stations.
  WARNING: This API will return up to 100,000 items.
           Use the /stations API with query params to get faster results.
*/
export const GET = async (): Promise<NextResponse> => {
  try {
    const baseUrl: string = await getBaseUrl();
    const url: string = `${baseUrl}/stations`;
    const res: globalThis.Response = await RadioAPIFetch(url);
    if (!res.ok) {
      throw new HTTPError('Unable to get radio stations at this time.', 404);
    }

    const data: unknown = await res.json();
    const parsedData = RadioStationsAPIResponse.safeParse(data);
    if (!parsedData.success) {
      throw new SchemaError();
    }

    const allStations: RadioStation[] = parsedData.data;
    return NextResponse.json(allStations);
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
