import 'server-only';
import { SignJWT, jwtVerify } from 'jose';
import { SessionPayload } from './schemas';
import { cookies } from 'next/headers';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { Session } from './api/schemas';

const secretKey: string = process.env.SECRET_KEY as string;
const encodedKey = new TextEncoder().encode(secretKey);
const EXPIRATION_SECONDS: number = 24 * 60 * 60;

export const encrypt = async (payload: SessionPayload): Promise<string> => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${EXPIRATION_SECONDS} seconds`)
    .sign(encodedKey);
};

export const decrypt = async (
  session: string | undefined = ''
): Promise<SessionPayload | undefined> => {
  try {
    const { payload } = await jwtVerify(session, encodedKey, { algorithms: ['HS256'] });
    return payload as SessionPayload;
  } catch (error) {
    console.warn('No active session found.', error);
    return undefined;
  }
};

export const createSession = async (userId: number): Promise<boolean> => {
  try {
    const expiresAt: Date = new Date(Date.now() + EXPIRATION_SECONDS * 1000);
    const session: string = await encrypt({ userId });
    const cookieStore = await cookies();
    cookieStore.set('session', session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: expiresAt,
      sameSite: 'lax',
      path: '/',
    });
    return true;
  } catch (error) {
    console.warn('Failed to create login session.', error);
    return false;
  }
};

export const getSessionCookie = async (): Promise<RequestCookie | undefined> => {
  try {
    const cookieStore = await cookies();
    const cookie: RequestCookie | undefined = cookieStore.get('session');
    return cookie;
  } catch (error) {
    console.warn('Error getting session cookie.');
    throw error;
  }
};

export const getActiveSession = async (): Promise<Session> => {
  try {
    const cookie: RequestCookie | undefined = await getSessionCookie();
    const cookieValue: string | undefined = cookie?.value;
    const session: SessionPayload | undefined = await decrypt(cookieValue);
    if (!session?.userId) {
      return { isAuth: false, userId: undefined };
    }
    return { isAuth: true, userId: session.userId };
  } catch (error) {
    console.warn('Error getting active session', error);
    return { isAuth: false, userId: undefined };
  }
};

export const deleteSession = async (): Promise<void> => {
  try {
    const cookie: RequestCookie | undefined = await getSessionCookie();
    if (!cookie) return;
    const cookieStore = await cookies();
    cookieStore.delete('session');
  } catch (error) {
    console.warn('Error deleting session.', error);
  }
};
