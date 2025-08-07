import { User } from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';

const AccountsDropdown = () => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="data-[state=open]:bg-accent bg-background hover:bg-accent focus:bg-background mx-0 hidden h-[40px] w-[40px] cursor-pointer rounded-md p-2 xl:block">
        <User className="h-[24px] min-h-[24px] w-[24px] min-w-[24px]" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background mt-1 hidden xl:block">
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

export default AccountsDropdown;
