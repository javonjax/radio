import { NextRequest, NextResponse } from 'next/server';
import { getBaseUrl, HTTPError, RadioAPIFetch, SchemaError } from '../../../lib/api/utils';
import { CountriesAPIResponse, Country } from '../../../lib/api/schemas';

/*
  GET a list of countries where radio stations are being hosted.
*/
export const GET = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const baseUrl: string = await getBaseUrl();
    const searchTerm: string = request.nextUrl.searchParams.get('search') || '';
    const queryParams: URLSearchParams = request.nextUrl.searchParams;
    const filteredParams: URLSearchParams = new URLSearchParams();
    for (const [key, val] of queryParams.entries()) {
      if (key !== 'search') {
        filteredParams.append(key, val);
      }
    }
    const url: string = `${baseUrl}/countries${searchTerm ? `/${searchTerm}` : ''}${filteredParams.size ? `?${filteredParams.toString()}` : ''}`;
    const res: globalThis.Response = await RadioAPIFetch(url);
    if (!res.ok) {
      throw new HTTPError('Unable to get countries at this time.', 404);
    }

    const data: unknown = await res.json();
    const parsedData = CountriesAPIResponse.safeParse(data);
    if (!parsedData.success) {
      throw new SchemaError();
    }

    const tags: Country[] = parsedData.data;
    return NextResponse.json(tags);
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
