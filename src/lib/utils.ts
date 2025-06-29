import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

/*
  Custom frontend error class.
*/
export class APIError extends Error {
  public status: number;
  constructor(message: string = 'Backend API error.', status: number = 500) {
    super(message);
    this.status = status;
    this.name = 'APIError';
  }
}

/*
  Handle API fetches and create error object if necessary.
*/
export const handleAPIFetch = async (
  res: globalThis.Response,
  context: string
): Promise<globalThis.Response> => {
  if (!res.ok) {
    const body = await res.json();
    const message: string = body?.error || 'API fetch error.';
    const status: number = body?.status ?? res.status;
    throw new APIError(`${context}: ${message}.`, status);
  }
  return res;
};

export const handleAPIError = (error: unknown, context: string): void => {
  if (error instanceof APIError) {
    console.warn(`Status: ${error.status}`, error.message);
  } else {
    console.warn(`API fetch error occured in ${context}.`);
  }
};
