'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export function ModeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState<boolean>(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const darkMode: boolean = theme === 'dark' || resolvedTheme === 'dark';

  return (
    <Button
      size="icon"
      className="cursor-pointer border-2"
      onClick={() => (darkMode ? setTheme('light') : setTheme('dark'))}
    >
      {darkMode ? (
        <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all" />
      ) : (
        <Moon className="absolute h-[1.2rem] w-[1.2rem]" />
      )}
    </Button>
  );
}
