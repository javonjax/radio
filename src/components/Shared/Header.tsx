'use client';
import { SeaWaves } from 'iconoir-react';
import Link from 'next/link';
import { ModeToggle } from './ModeToggle';
import { Menu } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  return (
    <header className="relative mx-auto flex w-full max-w-7xl items-center justify-center rounded-none p-4">
      <div className="relative flex w-full items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-3xl">
          TuneTide <SeaWaves className="text-accent" />
        </Link>
        <div className="absolute left-1/2 hidden grow -translate-x-1/2 items-center justify-center gap-x-6 xl:flex">
          <Link className="hover:text-accent" href="/stations?order=votes">
            Top
          </Link>
          <Link className="hover:text-accent" href="/stations?order=clicktrend">
            Trending
          </Link>
          <Link className="hover:text-accent" href="/stations?order=changetimestamp">
            New
          </Link>
          <div>Map</div>
        </div>
        <div className="m-0 flex items-center justify-center gap-4">
          <ModeToggle />
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="data-[state=open]:bg-accent bg-background hover:bg-accent focus:bg-background mx-0 h-[40px] w-[40px] cursor-pointer rounded-md p-2 xl:hidden">
              <Menu className="h-[24px] min-h-[24px] w-[24px] min-w-[24px]" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-background mt-1 xl:hidden">
              <DropdownMenuItem className="p-0">
                <Link
                  className="hover:bg-accent h-full w-full rounded-sm p-2"
                  href="/stations?order=votes"
                >
                  Top
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-foreground mx-[2px]" />
              <DropdownMenuItem className="p-0">
                <Link
                  className="hover:bg-accent h-full w-full rounded-sm p-2"
                  href="/stations?order=clicktrend"
                >
                  Trending
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-foreground mx-[2px]" />
              <DropdownMenuItem className="p-0">
                <Link
                  className="hover:bg-accent h-full w-full rounded-sm p-2"
                  href="/stations?order=changetimestamp"
                >
                  New
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
