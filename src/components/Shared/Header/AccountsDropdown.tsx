'use client';
import { User } from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import { useContext } from 'react';
import { AuthContext, AuthContextType } from '@/components/ContextProviders/AuthContext';

const AccountsDropdown = (): React.JSX.Element => {
  const authContext = useContext<AuthContextType | undefined>(AuthContext);
  const onLogout = async () => {
    await authContext?.logout();
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="data-[state=open]:bg-accent bg-background hover:bg-accent focus:bg-background mx-0 hidden h-[40px] w-[40px] cursor-pointer rounded-md p-2 xl:block">
        <User className="h-[24px] min-h-[24px] w-[24px] min-w-[24px]" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background mt-1 hidden xl:block">
        {!authContext?.isAuth && (
          <>
            <DropdownMenuItem className="p-0">
              <Link
                className="hover:bg-accent h-full w-full rounded-sm p-2 text-left"
                href="/login"
              >
                Login
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-foreground mx-[2px]" />
            <DropdownMenuItem className="p-0">
              <Link
                className="hover:bg-accent h-full w-full rounded-sm p-2 text-left"
                href="/register"
              >
                Register
              </Link>
            </DropdownMenuItem>
          </>
        )}
        {authContext?.isAuth && (
          <>
            <DropdownMenuItem className="p-0">
              <Link
                className="hover:bg-accent h-full w-full rounded-sm p-2 text-left"
                href="/favorites"
              >
                Favorites
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-foreground mx-[2px]" />
            <DropdownMenuItem className="p-0">
              <button
                className="hover:bg-accent h-full w-full rounded-sm p-2 text-left"
                onClick={() => onLogout()}
              >
                Logout
              </button>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountsDropdown;
