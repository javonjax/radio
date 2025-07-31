'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ModeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState<boolean>(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const darkMode: boolean = theme === 'dark' || resolvedTheme === 'dark';

  return (
    <button
      className={`hover:bg-foreground hover:text-background flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-md border-2 p-4`}
      onClick={() => (darkMode ? setTheme('light') : setTheme('dark'))}
    >
      {darkMode ? (
        <Sun className="h-[20px] min-h-[20px] w-[20px] min-w-[20px] rotate-0 transition-all" />
      ) : (
        <Moon className="h-[20px] min-h-[20px] w-[20px] min-w-[20px]" />
      )}
    </button>
  );
}
