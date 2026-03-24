'use client';

import * as React from 'react';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/lib/cn';

type SelectContextValue = {
  onValueChange?: (value: string) => void;
  value?: string;
};

const SelectContext = React.createContext<SelectContextValue>({});

type SelectProps = {
  children: React.ReactNode;
  onValueChange?: (value: string) => void;
  value?: string;
};

function Select({ children, onValueChange, value }: SelectProps) {
  return (
    <SelectContext.Provider value={{ onValueChange, value }}>
      <div className="relative">{children}</div>
    </SelectContext.Provider>
  );
}

function SelectGroup({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function SelectValue({ placeholder }: { placeholder?: string }) {
  return <span className="truncate text-sm text-foreground">{placeholder}</span>;
}

type SelectTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(function SelectTrigger(
  { children, className, type = 'button', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(
        'flex h-11 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      type={type}
      {...props}
    >
      <span className="truncate">{children}</span>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  );
});

type SelectContentProps = React.HTMLAttributes<HTMLDivElement>;

const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(function SelectContent(
  { children, className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        'absolute z-50 mt-2 min-w-[8rem] rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});

type SelectItemProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  value: string;
};

const SelectItem = React.forwardRef<HTMLButtonElement, SelectItemProps>(function SelectItem(
  { children, className, onClick, value, type = 'button', ...props },
  ref,
) {
  const { onValueChange } = React.useContext(SelectContext);

  return (
    <button
      ref={ref}
      className={cn(
        'flex w-full items-center rounded-sm px-3 py-2 text-left text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground',
        className,
      )}
      onClick={(event) => {
        onValueChange?.(value);
        onClick?.(event);
      }}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
});

const SelectSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function SelectSeparator({ className, ...props }, ref) {
    return <div ref={ref} className={cn('-mx-1 my-1 h-px bg-muted', className)} {...props} />;
  },
);

export { Select, SelectContent, SelectGroup, SelectItem, SelectSeparator, SelectTrigger, SelectValue };
