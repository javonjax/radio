import { NextResponse } from 'next/server';
import { getRadioBrowserBaseUrls, HTTPError } from '../../../../lib/api/utils';

/*
  GET all available radio-browser server urls.
*/
export const GET = async () => {
  try {
    const res: string[] = await getRadioBrowserBaseUrls();
    return NextResponse.json({ servers: res });
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
