import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const HamburgerMenu = () => {
  return (
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
        <DropdownMenuSeparator className="bg-foreground mx-[2px]" />
        <DropdownMenuItem className="p-0">
          <Link className="hover:bg-accent h-full w-full rounded-sm p-2" href="/login">
            Login
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-foreground mx-[2px]" />
        <DropdownMenuItem className="p-0">
          <Link className="hover:bg-accent h-full w-full rounded-sm p-2" href="/register">
            Register
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HamburgerMenu;
