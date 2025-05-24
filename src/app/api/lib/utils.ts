import { promises as dns, SrvRecord } from 'dns';

let baseUrl: string | null = null;

/*
  GET all available radio-browser server urls.
*/
export const getRadioBrowserBaseUrls = async (): Promise<string[]> => {
  try {
    const servers: SrvRecord[] = await dns.resolveSrv('_api._tcp.radio-browser.info');
    servers.sort();
    return servers.map((host) => 'https://' + host.name + '/json');
  } catch (error) {
    if (error instanceof Error) {
      console.error('DNS lookup for radio-browser servers failed:/n', error);
    }
    return [];
  }
};

/*
  GET a random available radio-browser server url.
 */
export const getRandomRadioBrowserBaseUrl = async (): Promise<string> => {
  try {
    const servers: string[] = await getRadioBrowserBaseUrls();
    if (!servers.length) {
      throw new Error('Failed to find an active server.');
    }
    const randomServer: string = servers[Math.floor(Math.random() * (servers.length - 1))];
    return randomServer;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    return '';
  }
};

/*
  GET the base url for requests top the radio-browser API.
*/
export const getBaseUrl = async (): Promise<string> => {
  if (baseUrl) return baseUrl;
  try {
    const res: string = await getRandomRadioBrowserBaseUrl();
    if (!res.length) {
      throw new Error('Failed to find an active server.');
    }
    baseUrl = res;
    return baseUrl;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    return '';
  }
};

/*
  Wrapper for fetch requests to the radio-browser API.
  This ensures that the User-Agent header is sent with each request too help the API's maintainer.
*/
export const RadioAPIFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
  return fetch(url, {
    ...options,
    headers: {
      'User-Agent': 'JJ_Radio_App/1.0',
      ...(options.headers || {}),
    },
  });
};

/*
  Custom error class for failure to retrieve active radio-browser servers.
*/
export class RadioBrowserServerError extends Error {
  constructor(message: string = 'An active radio-browser server could not be found.') {
    super(message);
  }
}

/*
  Custom error class that allows adding a status code.
*/
export class HTTPError extends Error {
  public status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}
