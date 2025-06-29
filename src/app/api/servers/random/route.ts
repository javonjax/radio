import { NextResponse } from 'next/server';
import { getRandomRadioBrowserBaseUrl, HTTPError } from '../../../../lib/api/utils';

/*
  GET a random available radio-browser server url.
 */
export const GET = async () => {
  try {
    const res: string = await getRandomRadioBrowserBaseUrl();
    return Response.json({ server: res });
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
