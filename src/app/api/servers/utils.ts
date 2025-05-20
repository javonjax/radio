import { promises, SrvRecord } from 'dns';

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
