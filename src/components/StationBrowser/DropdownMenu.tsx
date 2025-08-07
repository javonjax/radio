'use client';

import { DropdownMenuOption, StationFilters, StationSortingOption } from '@/lib/schemas';
import {
  DropdownMenu as Menu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Check, ChevronDown } from 'lucide-react';

import * as React from 'react';

export interface DropdownMenuProps {
  label: string;
  value: string | StationSortingOption;
  filters: StationFilters;
  setFilters: React.Dispatch<React.SetStateAction<StationFilters>>;
  options: DropdownMenuOption[];
  type: 'name' | 'tag' | 'order' | 'country' | 'language';
}

const DropdownMenu = ({ label, value, filters, setFilters, options, type }: DropdownMenuProps) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [triggerWidth, setTriggerWidth] = React.useState<number>();
  const [longestLabel, setLongestLabel] = React.useState<string>();
  const ghostRef: React.RefObject<HTMLDivElement | null> = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const longest: string = options.reduce((a, b) => {
      return a.label.length > b.label.length ? a : b;
    }).label;
    setLongestLabel(longest);
  }, [options]);

  React.useLayoutEffect(() => {
    if (ghostRef.current) {
      const width = ghostRef.current.offsetWidth;
      console.log('dd width', width);
      console.log(longestLabel);
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

      <div className="flex w-full flex-1 items-center gap-2">
        <label className="whitespace-nowrap">{label}:</label>
        <Menu modal={false} open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger
            style={
              {
                '--dropdown-trigger-width': triggerWidth ? `${triggerWidth + 32}px` : '300px',
              } as React.CSSProperties
            }
            className="flex w-full max-w-[var(--dropdown-trigger-width)] min-w-[200px] items-center justify-between rounded-md border-2 p-2 text-left text-sm"
          >
            {options.find((option) => option.value === value)?.label}{' '}
            <ChevronDown className="opacity-50" height={16} width={16} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-background w-[var(--radix-dropdown-menu-trigger-width)] border-2">
            {options.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onSelect={() => {
                  setFilters({ ...filters, [type]: option.value });
                  setOpen(false);
                }}
              >
                {option.label}
                <Check
                  className={cn('ml-auto', value === option.value ? 'opacity-100' : 'opacity-0')}
                />
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </Menu>
      </div>
    </>
  );
};

export default DropdownMenu;
