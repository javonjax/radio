'use client';

import * as React from 'react';
import { Check, ChevronDown } from 'lucide-react';

import { capitalize, cn } from '@/lib/utils';
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
import { StationSortingOption } from '@/lib/schemas';

export interface ComboboxProps {
  value: string | StationSortingOption;
  label: string;
  placeholder: string;
  emptyPlaceholder: string;
  options?: Language[] | Country[] | string[];
  longestLabel?: string;
  handleChangeCountry?: (country: string) => void;
  handleChangeLanguage?: (language: string) => void;
}

const Combobox = ({
  value,
  label,
  placeholder,
  emptyPlaceholder,
  options,
  longestLabel,
  handleChangeCountry,
  handleChangeLanguage,
}: ComboboxProps): React.JSX.Element => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [triggerWidth, setTriggerWidth] = React.useState<number>();
  const ghostRef: React.RefObject<HTMLDivElement | null> = React.useRef<HTMLDivElement>(null);

  /*
    This side effect gets the widest item of the dropdown options and 
    sets the width of the menu trigger to match.
  */
  React.useLayoutEffect(() => {
    if (ghostRef.current) {
      const width = ghostRef.current.offsetWidth;
      setTriggerWidth(width);
    }
  }, [longestLabel]);

  return (
    <>
      {/* Ghost div to measure the wideest dropdown option. */}
      <div
        ref={ghostRef}
        className="invisible absolute max-w-[450px] border px-3 py-2 text-sm font-normal whitespace-nowrap"
      >
        {longestLabel}
      </div>

      <div className="flex flex-1 items-center gap-2">
        <label>{label}:</label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              role="combobox"
              aria-expanded={open}
              style={
                {
                  '--combobox-trigger-width': triggerWidth ? `${triggerWidth + 32}px` : '300px',
                } as React.CSSProperties
              }
              className="bg-background text-foreground flex h-fit w-full max-w-[var(--combobox-trigger-width)] min-w-[300px] shrink justify-between border-2 p-2 text-start text-wrap break-words whitespace-normal sm:w-[var(--combobox-trigger-width)]"
            >
              {value ? capitalize(value) : 'All'}
              <ChevronDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="bg-background flex w-[var(--radix-popover-trigger-width)] border-2 p-0">
            <Command>
              <CommandInput placeholder={placeholder} className="h-9" />
              <CommandList>
                <CommandEmpty>{emptyPlaceholder}</CommandEmpty>
                <CommandGroup>
                  {label === 'Country' && (
                    <>
                      <CommandItem
                        key={'all'}
                        className="flex text-wrap break-words whitespace-normal"
                        value={'All'}
                        onSelect={() => {
                          handleChangeCountry?.('');
                          setOpen(false);
                        }}
                      >
                        All
                        <Check
                          className={cn('ml-auto', value === '' ? 'opacity-100' : 'opacity-0')}
                        />
                      </CommandItem>
                      {(options as Country[])?.map((country) => {
                        return (
                          <CommandItem
                            key={country.name}
                            className="flex text-wrap break-words whitespace-normal"
                            value={country.name}
                            onSelect={(currentValue) => {
                              handleChangeCountry?.(
                                `${currentValue === value ? '' : currentValue}`
                              );
                              setOpen(false);
                            }}
                          >
                            {capitalize(country.name)}
                            <Check
                              className={cn(
                                'ml-auto',
                                value === country.name ? 'opacity-100' : 'opacity-0'
                              )}
                            />
                          </CommandItem>
                        );
                      })}
                    </>
                  )}
                  {label === 'Language' && (
                    <>
                      <CommandItem
                        key={'all'}
                        className="flex text-wrap break-words whitespace-normal"
                        value={'All'}
                        onSelect={() => {
                          handleChangeLanguage?.('');
                          setOpen(false);
                        }}
                      >
                        All
                        <Check
                          className={cn('ml-auto', value === '' ? 'opacity-100' : 'opacity-0')}
                        />
                      </CommandItem>
                      {(options as Language[])?.map((language) => {
                        return (
                          <CommandItem
                            key={language.name}
                            className="flex text-wrap break-words whitespace-normal"
                            value={language.name}
                            onSelect={(currentValue) => {
                              handleChangeLanguage?.(
                                `${currentValue === value ? '' : currentValue}`
                              );
                              setOpen(false);
                            }}
                          >
                            {capitalize(language.name)}
                            <Check
                              className={cn(
                                'ml-auto',
                                value === language.name ? 'opacity-100' : 'opacity-0'
                              )}
                            />
                          </CommandItem>
                        );
                      })}
                    </>
                  )}
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
