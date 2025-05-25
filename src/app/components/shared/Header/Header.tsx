import { Menu } from 'lucide-react';

const Header = () => {
  return (
    <header className="mx-auto flex w-full max-w-7xl items-center justify-center rounded-none p-6">
      <div className="w-full">
        <div className="flex w-full items-center">
          <div>RadioBrowser</div>
          <div className="mx-auto flex justify-center gap-x-8">
            <a>Top Stations</a>
            <a>Browse by Category</a>
            <a>Map</a>
          </div>
          <div className="flex">
            <Menu />{' '}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
