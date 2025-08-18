'use client';
import { Session } from '@/lib/api/schemas';
import { APIError, handleAPIError, handleAPIFetch, successToast } from '@/lib/utils';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { createContext, useEffect, useState } from 'react';
import { FieldValues } from 'react-hook-form';
export interface AuthContextType {
  isAuth: boolean;
  userId: number | undefined;
  register: (credentials: FieldValues) => Promise<void>;
  login: (credentials: FieldValues) => Promise<void>;
  logout: () => Promise<void>;
  loginError: string | undefined;
  registrationError: string | undefined;
  clearLoginError: () => void;
  clearRegistrationError: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const router: AppRouterInstance = useRouter();
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>();
  const [registrationError, setRegistrationError] = useState<string>();
  const [loginError, setLoginError] = useState<string>();

  const updateSessionContext = async (
    intention: 'login' | 'logout' | 'register' | 'init' = 'init'
  ): Promise<void> => {
    try {
      const res: globalThis.Response = await handleAPIFetch(await fetch('/api/accounts/session'));

      const session: Session = await res.json();

      if (intention === 'login' || intention === 'register') {
        if (!session.isAuth || !session.userId) {
          setIsAuth(false);
          setUserId(undefined);
          throw new APIError('Failed to login. Please try again later.');
        }
      }

      /* 
        Flags are always set to indicate a logout when that is the intention.
        If deleting the old session fails, creating a new session with a login will overwrite the old session.
        Otherwise the token will timeout on its own.
      */
      if (intention === 'logout') {
        setIsAuth(false);
        setUserId(undefined);
      } else {
        setIsAuth(session.isAuth);
        setUserId(session.userId);
      }

      return;
    } catch (error) {
      setIsAuth(false);
      setUserId(undefined);
      // Rethrow errors to be handled in each specific case.
      if (error instanceof Error) {
        throw error;
      }
      return;
    }
  };

  useEffect(() => {
    updateSessionContext('init');
  }, []);

  const login = async (credentials: FieldValues): Promise<void> => {
    try {
      const res: globalThis.Response = await handleAPIFetch(
        await fetch('/api/accounts/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(credentials),
        })
      );

      await updateSessionContext('login');
      setLoginError(undefined);
      const data: { message: string } = await res.json();
      router.push('/');
      successToast(data.message, 'Enjoy your stay. Share your faves.');
    } catch (error) {
      if (error instanceof APIError) {
        handleAPIError(error);
        setLoginError(error.message);
      } else {
        console.warn(`Unknown error in auth context.`);
        return;
      }
    }
  };

  const register = async (credentials: FieldValues): Promise<void> => {
    try {
      const res: globalThis.Response = await handleAPIFetch(
        await fetch('/api/accounts/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(credentials),
        })
      );

      await updateSessionContext('register');
      setRegistrationError(undefined);
      const data: { message: string } = await res.json();
      router.push('/');
      successToast(data.message, 'You can now start your list of favorites.');
    } catch (error) {
      if (error instanceof APIError) {
        handleAPIError(error);
        setRegistrationError(error.message);
      } else {
        console.warn(`Unknown error in auth context.`);
        return;
      }
    }
  };

  const logout = async (): Promise<void> => {
    try {
      const res: globalThis.Response = await handleAPIFetch(
        await fetch('/api/accounts/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        })
      );

      await updateSessionContext('logout');

      const data: { message: string } = await res.json();
      successToast(data.message, 'You have logged out.');
    } catch (error) {
      console.warn('Error logging out.', error);
      return;
    }
  };

  const clearLoginError = (): void => {
    setLoginError(undefined);
  };

  const clearRegistrationError = (): void => {
    setRegistrationError(undefined);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        userId,
        register,
        login,
        logout,
        loginError,
        registrationError,
        clearLoginError,
        clearRegistrationError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
