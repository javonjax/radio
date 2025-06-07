'use client';

import * as React from 'react';
import { Check, ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Country, Language } from '@/lib/api/schemas';

const frameworks = [
  {
    value: 'next.js',
    label: 'Next.js',
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit',
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js',
  },
  {
    value: 'remix',
    label: 'Remix',
  },
  {
    value: 'astro',
    label:
      'AemptyPlaceho lderemptyPlaceholderemptyPlaceholderempty PlaceholderemptyPlaceholderemptyPlaceholderemptyPlaceholder',
  },
];

export interface ComboboxProps {
  label: string;
  placeholder: string;
  emptyPlaceholder: string;
  options?: Language[] | Country[] | string[];
}

const Combobox = ({ label, placeholder, emptyPlaceholder }: ComboboxProps): React.JSX.Element => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>('');
  const ghostRef = React.useRef<HTMLDivElement>(null);
  const [triggerWidth, setTriggerWidth] = React.useState<number>();

  React.useEffect(() => {
    if (ghostRef.current) {
      const width = ghostRef.current.offsetWidth;
      console.log('width', width);
      setTriggerWidth(width);
    }
  }, []);

  return (
    <>
      <div
        ref={ghostRef}
        className="invisible absolute max-w-[450px] border px-3 py-2 text-sm font-normal whitespace-nowrap"
        style={{ visibility: 'hidden', position: 'absolute' }}
      >
        {frameworks.reduce((a, b) => (a.label.length > b.label.length ? a : b)).label}
      </div>
      <div className="flex items-center gap-2">
        <label>{label}</label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              style={{ maxWidth: triggerWidth ? `${triggerWidth + 22}px` : '286px' }}
              className="bg-background text-foreground flex h-fit w-full justify-between p-2 text-start text-wrap break-all whitespace-normal"
            >
              {value
                ? frameworks.find((framework) => framework.value === value)?.label
                : 'Select framework...'}
              <ChevronDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="bg-background flex w-[var(--radix-popover-trigger-width)] p-0">
            <Command>
              <CommandInput placeholder={placeholder} className="h-9" />
              <CommandList>
                <CommandEmpty>{emptyPlaceholder}</CommandEmpty>
                <CommandGroup>
                  {frameworks.map((framework) => (
                    <CommandItem
                      className="flex text-wrap break-all whitespace-normal"
                      key={framework.value}
                      value={framework.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? '' : currentValue);
                        setOpen(false);
                      }}
                    >
                      {framework.label}
                      <Check
                        className={cn(
                          'ml-auto',
                          value === framework.value ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

export default Combobox;
