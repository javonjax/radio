import { SeaWaves } from 'iconoir-react';
import { Menu } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="mx-auto flex w-full max-w-7xl items-center justify-center rounded-none p-4">
      <div className="flex w-full items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-3xl">
          TuneTide <SeaWaves className="text-accent" />
        </Link>
        <div className="hidden grow items-center justify-center gap-x-6 xl:flex">
          <div>Top</div>
          <div>Trending</div>
          <div>New</div>
          <div>Random</div>
          <div>Map</div>
        </div>
        <Menu />
      </div>
    </header>
  );
};

export default Header;
