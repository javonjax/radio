'use client';
import { useContext, useEffect } from 'react';
import FavoritesList from '@/components/Favorites/FavoritesList';
import {
  FavoritesContext,
  FavoritesContextType,
} from '@/components/ContextProviders/FavoritesContext';
import { AuthContext, AuthContextType } from '@/components/ContextProviders/AuthContext';
import Link from 'next/link';

const FavoritesPage = (): React.JSX.Element => {
  const authContext = useContext<AuthContextType | undefined>(AuthContext);
  const favoritesContext = useContext<FavoritesContextType | undefined>(FavoritesContext);

  useEffect(() => {
    favoritesContext?.updateFavoritesContext();
  }, []);

  return (
    <div className="flex w-full grow flex-col gap-y-4">
      <h1 className="text-heading text-2xl">Favorites</h1>
      {!authContext?.isAuth && (
        <div className="flex w-full grow flex-col">
          <div>
            You must be{' '}
            <Link href={'/login'} className="hover:text-accent underline">
              logged in
            </Link>{' '}
            to view your favorites.
          </div>
        </div>
      )}
      {authContext?.isAuth &&
        favoritesContext?.favoritedStations &&
        favoritesContext?.favoritedStations.length > 0 && (
          <FavoritesList stations={favoritesContext.favoritedStations} />
        )}
      {authContext?.isAuth &&
        (!favoritesContext?.favoritedStations ||
          favoritesContext?.favoritedStations.length === 0) && (
          <div className="flex w-full grow flex-col">
            <div>
              You haven&apos;t added any favorites yet. Click the heart icon on any station to
              favorite it.
            </div>
            <Link href="/stations?order=clickcount" className="hover:text-accent underline">
              Click here to browse stations.
            </Link>
          </div>
        )}
    </div>
  );
};

export default FavoritesPage;
