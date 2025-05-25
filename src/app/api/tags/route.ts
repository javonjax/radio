import { NextRequest, NextResponse } from 'next/server';
import { getBaseUrl, HTTPError, RadioAPIFetch, SchemaError } from '../lib/utils';
import { TagsAPIResponse, Tag } from '../lib/schemas';

/*
  GET a list of tags in the radio-browser database. Tags are used to categorize
  stations. If a search term is provided, only tags containing the term as a substring
  will be returned.
*/
export const GET = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const baseUrl: string = await getBaseUrl();
    const searchTerm: string = request.nextUrl.searchParams.get('search') || '';
    const url: string = `${baseUrl}/tags/${searchTerm}?hidebroken=true`;
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
