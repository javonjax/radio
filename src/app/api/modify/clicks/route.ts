import { NextRequest, NextResponse } from 'next/server';
import { getBaseUrl, RadioAPIFetch } from '../../lib/utils';

/*
  Increases the click count of a station by passing in its UUID.
  This API should be called every time a user starts playing a stream
  to mark the stream as more popular.
*/
export const GET = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const baseUrl: string = await getBaseUrl();
    if (!baseUrl.length) {
      throw new Error('An active radio-browser server could not be found.');
    }
    if (!request.nextUrl.searchParams.get('uuid')) {
      throw new Error('Station UUID missing from request.');
    }
    const stationUUID: string | undefined = request.nextUrl.searchParams.get('uuid')?.toString();
    const url: string = `${baseUrl}/url/${stationUUID}`;
    const res: globalThis.Response = await RadioAPIFetch(url);
    if (!res.ok) {
      throw new Error(`Failed to update click count for stationUUID: ${stationUUID}`);
    }
    console.log(res);
    const data = await res.json();
    console.log(data);
    return NextResponse.json({ message: `Click count updated for stationUUID: ${stationUUID}` });
  } catch (error) {
    let message: string = 'Internal server error';
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
};
