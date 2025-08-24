'use client';
import { Favorite, NewFavorite, RadioStation } from '@/lib/api/schemas';
import { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext, AuthContextType } from './AuthContext';
import { APIError, handleAPIError, handleAPIFetch, successToast } from '@/lib/utils';

export interface FavoritesContextType {
  // getFavorites: () => Promise<void>;
  addFavorite: (station: RadioStation) => Promise<void>;
  deleteFavorite: (station: RadioStation) => Promise<void>;
  favoritedIds: string[] | undefined;
  favoritedStations: RadioStation[] | undefined;
  updateFavoritesContext: () => Promise<void>;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element => {
  const authContext = useContext<AuthContextType | undefined>(AuthContext);
  const [favoritedIds, setFavoritedIds] = useState<string[]>();
  const [favoritedStations, setFavoritedStations] = useState<RadioStation[]>();

  useEffect(() => {
    updateFavoritesContext();
  }, [authContext?.isAuth]);

  const updateFavoritesContext = async () => {
    try {
      const userId: number | undefined = authContext?.userId;
      if (!userId) {
        setFavoritedIds(undefined);
        setFavoritedStations(undefined);
        return;
      }
      const res: globalThis.Response = await handleAPIFetch(
        await fetch(`/api/favorites/${userId}`)
      );

      const { favorites }: { favorites: Favorite[] } = await res.json();
      if (!favorites.length) {
        setFavoritedIds(undefined);
        setFavoritedStations(undefined);
        return;
      }

      console.log(favorites);
      const favIds: string[] = favorites.map((fav) => fav.station_id);
      const favStations: RadioStation[] = favorites.map((fav) => fav.station);
      setFavoritedIds(favIds);
      setFavoritedStations(favStations);
      return;
    } catch (error) {
      if (error instanceof APIError) {
        handleAPIError(error);
      } else {
        console.warn(`Unknown error in favorites context.`);
      }
      return;
    }
  };

  // const getFavorites = async (page: number) => {
  //   try {
  //     const userId: number | undefined = authContext?.userId;
  //     if (!userId) {
  //       setFavoritedIds(undefined);
  //       setFavoritedStations(undefined);
  //       return;
  //     }
  //     const res: globalThis.Response = await handleAPIFetch(
  //       await fetch(`/api/favorites/${userId}?page=${page}`)
  //     );

  //     const {favorites, hasMore}: {favorites: Favorite[], hasMore: boolean} = await res.json();
  //     if (!favorites.length) {
  //       setFavoritedIds(undefined);
  //       setFavoritedStations(undefined);
  //     }
  //     const favIds: string[] = favorites.map((fav) => fav.station_id);
  //     const favStations: RadioStation[] = favorites.map((fav) => fav.station);
  //     setFavoritedIds(favIds);
  //     setFavoritedStations(favStations);
  //     return;
  //   } catch (error) {
  //     if (error instanceof APIError) {
  //       handleAPIError(error);
  //     } else {
  //       console.warn(`Unknown error in favorites context.`);
  //     }
  //     return;
  //   }
  // };

  const addFavorite = async (station: RadioStation): Promise<void> => {
    try {
      const newFavorite: NewFavorite = {
        userId: authContext?.userId,
        stationId: station.stationuuid,
        station: station,
      };
      console.log(station.stationuuid);
      const res: globalThis.Response = await handleAPIFetch(
        await fetch('/api/favorites', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(newFavorite),
        })
      );

      setFavoritedIds((prev) =>
        prev ? [...prev, String(station.stationuuid)] : [String(station.stationuuid)]
      );
      setFavoritedStations((prev) => (prev ? [...prev, station] : [station]));
      const data: { message: string } = await res.json();

      successToast(data.message, 'You can view your favorites here.');
      return;
    } catch (error) {
      if (error instanceof APIError) {
        handleAPIError(error);
      } else {
        console.warn(`Unknown error in favorites context.`);
      }
      return;
    }
  };

  const deleteFavorite = async (station: RadioStation): Promise<void> => {
    try {
      const payload = {
        userId: authContext?.userId,
        station: station,
      };

      const res: globalThis.Response = await handleAPIFetch(
        await fetch('/api/favorites', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(payload),
        })
      );

      setFavoritedIds((prev) => prev?.filter((id) => id !== station.stationuuid));
      setFavoritedStations((prev) =>
        prev?.filter((item) => item.stationuuid !== station.stationuuid)
      );
      const data: { message: string } = await res.json();
      successToast(data.message, 'Check out your updated favorites list here.');
      return;
    } catch (error) {
      if (error instanceof APIError) {
        handleAPIError(error);
      } else {
        console.warn(`Unknown error in favorites context.`);
      }
      return;
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        addFavorite,
        deleteFavorite,
        favoritedIds,
        favoritedStations,
        updateFavoritesContext,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
