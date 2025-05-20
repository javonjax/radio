import { NextResponse } from 'next/server';
import { getBaseUrl } from '../../lib/utils';
import { RadioAPIFetch } from '../../lib/utils';

/*
  GET all radio stations.
  WARNING: This API will return up to 100,000 items.
           Use the /stations API with query params to get faster results.
*/
export const GET = async (): Promise<NextResponse> => {
  const baseUrl: string = await getBaseUrl();
  const url: string = `${baseUrl}/stations`;
  const res: globalThis.Response = await RadioAPIFetch(url);
  const data = await res.json();
  return NextResponse.json({ data });
};
