import { RadioStation } from '@/lib/api/schemas';
import StationListHeaders from '../StationBrowser/StationListHeaders';
import FavoritesListItem from './FavoritesListItem';
import { Dispatch, SetStateAction, useContext } from 'react';
import { FavoritesContextType, FavoritesContext } from '../ContextProviders/FavoritesContext';
import { StationContextType, StationContext } from '../ContextProviders/StationContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import LoadingSpinner from '../ui/Custom/LoadingSpinner';

export interface FavoritesListProps {
  stations: RadioStation[] | undefined;
  hasMore: boolean;
  pageNum: number;
  setPageNum: Dispatch<SetStateAction<number>>;
  isLoading: boolean;
}

const FavoritesList = ({
  stations,
  hasMore,
  pageNum,
  setPageNum,
  isLoading,
}: FavoritesListProps): React.JSX.Element => {
  const stationContext = useContext<StationContextType | undefined>(StationContext);
  const favoritesContext = useContext<FavoritesContextType | undefined>(FavoritesContext);

  return (
    <div className="flex w-full grow flex-col">
      <StationListHeaders />
      {isLoading && <LoadingSpinner />}
      {(!stations || stations.length <= 0) && !isLoading && <div>No stations found</div>}
      {stations && stations.length > 0 && !isLoading && (
        <div className="flex grow flex-col justify-between">
          <ul className="flex w-full flex-row flex-wrap justify-center gap-8 xl:flex-col xl:gap-0">
            {stations.map((station) => (
              <FavoritesListItem
                key={station.stationuuid}
                station={station}
                stationContext={stationContext}
                favoritesContext={favoritesContext}
              />
            ))}
          </ul>
          <div className="mt-6 flex items-center justify-center gap-x-4">
            <button
              className={`${pageNum > 1 ? '' : 'invisible'} hover:text-accent hover:cursor-pointer`}
              onClick={() => {
                setPageNum((prev) => prev - 1);
              }}
            >
              <ChevronLeft />
            </button>
            <div>{pageNum}</div>
            <button
              className={`${hasMore ? '' : 'invisible'} hover:text-accent hover:cursor-pointer`}
              onClick={() => {
                setPageNum((prev) => prev + 1);
              }}
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritesList;
