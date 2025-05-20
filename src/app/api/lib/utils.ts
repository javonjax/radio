import { promises, SrvRecord } from 'dns';

let baseUrl: string | null = null;

/*
  GET all available radio-browser server urls.
*/
export const getRadioBrowserBaseUrls = async (): Promise<string[]> => {
  const servers: SrvRecord[] = await promises.resolveSrv('_api._tcp.radio-browser.info');
  servers.sort();
  return servers.map((host) => 'https://' + host.name + '/json');
};

/*
  GET a random available radio-browser server url.
 */
export const getRandomRadioBrowserBaseUrl = async (): Promise<string> => {
  const servers: string[] = await getRadioBrowserBaseUrls();
  const randomServer: string = servers[Math.floor(Math.random() * (servers.length - 1))];
  return randomServer;
};

/*
  GET the base url for requests top the radio-browser API.
*/
export const getBaseUrl = async (): Promise<string> => {
  if (baseUrl) return baseUrl;

  const res: string = await getRandomRadioBrowserBaseUrl();
  baseUrl = res;
  return baseUrl;
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
