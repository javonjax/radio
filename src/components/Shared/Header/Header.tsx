'use client';
import { SeaWaves } from 'iconoir-react';
import Link from 'next/link';
import { ModeToggle } from './ModeToggle';
import AccountsDropdown from './AccountsDropdown';
import HamburgerMenu from './HamburgerMenu';

const Header = () => {
  return (
    <header className="relative mx-auto flex w-full max-w-7xl items-center justify-center rounded-none p-4">
      <div className="relative flex w-full items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-3xl">
          TuneTide <SeaWaves className="text-accent" />
        </Link>
        <div className="absolute left-1/2 hidden grow -translate-x-1/2 items-center justify-center gap-x-6 xl:flex">
          <Link className="hover:text-accent" href="/stations?order=votes&page=1">
            Top
          </Link>
          <Link className="hover:text-accent" href="/stations?order=clicktrend&page=1">
            Trending
          </Link>
          <Link className="hover:text-accent" href="/stations?order=changetimestamp&page=1">
            New
          </Link>
        </div>
        <div className="m-0 flex items-center justify-center gap-4">
          <ModeToggle />
          <AccountsDropdown />
          <HamburgerMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
