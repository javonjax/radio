import { NextRequest, NextResponse } from 'next/server';
import { getBaseUrl } from '@/lib/api/utils';
import { RadioAPIFetch } from '@/lib/api/utils';
import {
  ClickData,
  HTTPError,
  SchemaError,
  StationClick,
  StationClicksAPIResponse,
} from '@/lib/api/schemas';

/*
  GET all radio stations.
  WARNING: This API will return up to 100,000 items.
           Use the /stations API with query params to get faster results.
*/
export const GET = async (
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ stationuuid: string }>;
  }
): Promise<NextResponse> => {
  const { stationuuid }: { stationuuid: string } = await params;

  try {
    const baseUrl: string = await getBaseUrl();
    const queryParams: string = request.nextUrl.searchParams.toString();
    const url: string = `${baseUrl}/clicks/${stationuuid}?${queryParams}`;
    const res: globalThis.Response = await RadioAPIFetch(url);
    if (!res.ok) {
      throw new HTTPError('Unable to get click data at this time.', 404);
    }

    const data: unknown = await res.json();
    const parsedData = StationClicksAPIResponse.safeParse(data);
    if (!parsedData.success) {
      throw new SchemaError();
    }

    const stationClicks: StationClick[] = parsedData.data;
    const clicksPerHour: Record<string, number> = {}; // Object with key = time as a string, val = number of clicks
    const currentHour: number = new Date().getHours();

    // Insert keys into clicksPerHour object in order so that the current hour is last.
    for (let i: number = 1; i <= 24; i++) {
      clicksPerHour[String((currentHour + i) % 24) + ':00'] = 0;
    }

    for (const click of stationClicks) {
      const hour: number = new Date(click.clicktimestamp_iso8601).getHours();
      clicksPerHour[String(hour) + ':00']++;
    }

    // Convert data to format that is accepted by Rechart/Shadcn chart.
    const clicksChartData: ClickData[] = Object.entries(clicksPerHour).map(([hour, clicks]) => ({
      hour: hour,
      clicks: clicks,
    }));

    return NextResponse.json(clicksChartData);
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
