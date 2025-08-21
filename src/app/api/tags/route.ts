import { NextRequest, NextResponse } from 'next/server';
import { getBaseUrl, RadioAPIFetch } from '@/lib/api/utils';
import { TagsAPIResponse, Tag, HTTPError, SchemaError } from '@/lib/api/schemas';

/*
  GET a list of tags in the radio-browser database. Tags are used to categorize
  stations. If a search term is provided, only tags containing the term as a substring
  will be returned.
*/
export const GET = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const baseUrl: string = await getBaseUrl();
    console.log(baseUrl, 'base');
    const searchTerm: string = request.nextUrl.searchParams.get('search') || '';
    const queryParams: URLSearchParams = request.nextUrl.searchParams;
    const filteredParams: URLSearchParams = new URLSearchParams();
    for (const [key, val] of queryParams.entries()) {
      if (key !== 'search') {
        filteredParams.append(key, val);
      }
    }
    console.log(filteredParams.size);
    const url: string = `${baseUrl}/tags${searchTerm ? `/${searchTerm}` : ''}${filteredParams.size ? `?${filteredParams.toString()}` : ''}`;
    console.log(url);
    const res: globalThis.Response = await RadioAPIFetch(url);
    if (!res.ok) {
      throw new HTTPError('Unable to get radio station tags at this time.', 404);
    }

    const data: unknown = await res.json();
    const parsedData = TagsAPIResponse.safeParse(data);
    if (!parsedData.success) {
      throw new SchemaError();
    }

    const tags: Tag[] = parsedData.data;
    return NextResponse.json(tags);
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
