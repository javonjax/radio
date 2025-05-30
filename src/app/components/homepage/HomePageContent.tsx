import React from 'react';
import Header from './Header/Header';
import { Tag } from '@/app/api/lib/schemas';

export interface HomePageContentProps {
  popularTags: Tag[];
}

const HomePageContent = ({ popularTags }: HomePageContentProps) => {
  return (
    <div className="grid h-full w-full grid-cols-12 gap-6">
      <Header />
      <div className="col-span-full flex flex-col items-center gap-6">
        <h2 className="text-heading mr-auto text-xl">Recently Played</h2>
        <div className="flex h-[400px] w-full items-center justify-center border-2">Carousel</div>
      </div>
      <div className="col-span-6 flex flex-col items-center gap-6 border-2">
        <h2 className="text-heading mr-auto text-xl">Browse By Tag</h2>
        <div className="flex w-full flex-wrap items-center justify-center gap-4 p-4">
          {popularTags.map((tag) => (
            <div key={tag.name} className="rounded-xl border-2 p-4">
              <h3>{tag.name}</h3>
              <h4>{tag.stationcount} stations live</h4>
            </div>
          ))}
        </div>
        <a>Browse all tags</a>
      </div>
      <div className="col-span-6 flex flex-col items-center gap-6 border-2">
        <h2 className="text-heading mr-auto text-xl">Stations Hosted Near You</h2>
        <div className="flex w-full flex-wrap items-center justify-center gap-4 p-4">
          {popularTags.map((tag) => (
            <div key={tag.name} className="rounded-xl border-2 p-4">
              <h3>{tag.name}</h3>
              <h4>{tag.stationcount} stations live</h4>
            </div>
          ))}
        </div>
        <a>Browse all tags</a>
      </div>
    </div>
  );
};

export default HomePageContent;
