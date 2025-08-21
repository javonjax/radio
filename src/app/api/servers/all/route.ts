import { NextResponse } from 'next/server';
import { getRadioBrowserBaseUrls } from '@/lib/api/utils';
import { HTTPError } from '@/lib/api/schemas';

/*
  GET all available radio-browser server urls.
*/
export const GET = async (): Promise<NextResponse> => {
  try {
    const res: Set<string> = await getRadioBrowserBaseUrls();
    return NextResponse.json({ servers: res });
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
