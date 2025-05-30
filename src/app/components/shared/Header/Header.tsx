import { Menu } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="mx-auto flex w-full max-w-7xl items-center justify-center rounded-none p-6">
      <div className="flex w-full items-center justify-between">
        <Link href="/">TuneTide</Link>
        <div className="flex grow items-center justify-center gap-x-6">
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
