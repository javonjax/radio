import { NextResponse } from 'next/server';
import { getRadioBrowserBaseUrls } from '../../lib/utils';

/*
  GET all available radio-browser server urls.
*/
export const GET = async () => {
  const res: string[] = await getRadioBrowserBaseUrls();
  return NextResponse.json({ servers: res });
};
