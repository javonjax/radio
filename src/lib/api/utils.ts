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
    throw new RadioBrowserServerError('DNS lookup for radio-browser servers failed.');
  }
};

/*
  GET a random available radio-browser server url.
*/
export const getRandomRadioBrowserBaseUrl = async (): Promise<string> => {
  try {
    const servers: string[] = await getRadioBrowserBaseUrls();
    if (!servers.length) {
      throw new RadioBrowserServerError('Failed to find an active server.');
    }
    const randomServer: string = servers[Math.floor(Math.random() * (servers.length - 1))];
    return randomServer;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    throw error;
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
      throw new RadioBrowserServerError('Failed to find an active server.');
    }
    baseUrl = res;
    return baseUrl;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    throw error;
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
  public status: number;
  constructor(
    message: string = 'An active radio-browser server could not be found.',
    status: number = 500
  ) {
    super(message);
    this.status = status;
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

/*
  Custom error class for generic schema errors.
*/
export class SchemaError extends Error {
  public status: number;
  constructor(
    message: string = 'API response does not match the desired schema.',
    status: number = 500
  ) {
    super(message);
    this.status = status;
  }
}

/*
  Regex test if a character is a letter.
*/
export const isValidName = (str: string): boolean => {
  return /^\p{L}[\p{L}\s]*$/u.test(str);
};

/*
  Captilize string data.
*/
export const capitalize = (str: string): string => {
  if (!str.length) return '';
  const res: string[] = [str[0].toUpperCase()];
  for (let i = 1; i < str.length; i++) {
    if (/\s/.test(str[i - 1])) {
      res.push(str[i].toUpperCase());
    } else {
      res.push(str[i]);
    }
  }
  return res.join('');
};
