import { NextRequest, NextResponse } from 'next/server';
import { getBaseUrl, HTTPError, RadioAPIFetch, SchemaError } from '../../../lib/api/utils';
import { Language, LanguagesAPIResponse } from '../../../lib/api/schemas';

/*
  GET a list of languages for stations listed in the radio-browser data base.
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
    console.log(filteredParams.size);
    const url: string = `${baseUrl}/languages${searchTerm ? `/${searchTerm}` : ''}${filteredParams.size ? `?${filteredParams.toString()}` : ''}`;
    console.log(url);
    const res: globalThis.Response = await RadioAPIFetch(url);
    if (!res.ok) {
      throw new HTTPError('Unable to get languages at this time.', 404);
    }

    const data: unknown = await res.json();
    const parsedData = LanguagesAPIResponse.safeParse(data);
    if (!parsedData.success) {
      throw new SchemaError();
    }

    const languages: Language[] = parsedData.data;
    return NextResponse.json(languages);
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
