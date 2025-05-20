export const RadioAPIFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
  return fetch(url, {
    ...options,
    headers: {
      'User-Agent': 'JJ_Radio_App/1.0',
      ...(options.headers || {}),
    },
  });
};
