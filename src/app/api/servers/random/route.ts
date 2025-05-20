import { getRandomRadioBrowserBaseUrl } from '../../lib/utils';

/*
  GET a random available radio-browser server url.
 */
export const GET = async () => {
  const res: string = await getRandomRadioBrowserBaseUrl();
  return Response.json({ server: `${res}/json` });
};
