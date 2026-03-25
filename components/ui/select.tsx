'use client';

import * as React from 'react';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/lib/cn';

type SelectContextValue = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onValueChange?: (value: string) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  value?: string;
};

const SelectContext = React.createContext<SelectContextValue | undefined>(undefined);

function useSelectContext() {
  const context = React.useContext(SelectContext);
  if (!context) {
    throw new Error('Select components must be used inside Select.');
  }
  return context;
}

type SelectProps = {
  children: React.ReactNode;
  onValueChange?: (value: string) => void;
  value?: string;
};

function Select({ children, onValueChange, value }: SelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <SelectContext.Provider value={{ isOpen, setIsOpen, onValueChange, triggerRef, value }}>
      <div className="relative" ref={containerRef}>
        {children}
      </div>
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
  { children, className, type = 'button', onClick, ...props },
  ref,
) {
  const { isOpen, setIsOpen, triggerRef } = useSelectContext();

  return (
    <button
      ref={(node) => {
        triggerRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      }}
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      className={cn(
        'flex h-11 w-full items-center justify-between rounded-xl border border-border/80 bg-surface px-3 py-2 text-sm text-foreground shadow-sm ring-offset-background transition-colors hover:border-primary/30 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      onClick={(event) => {
        onClick?.(event);
        setIsOpen(!isOpen);
      }}
      type={type}
      {...props}
    >
      <span className="truncate">{children}</span>
      <ChevronDown className={cn('h-4 w-4 opacity-50 transition-transform', isOpen && 'rotate-180')} />
    </button>
  );
});

type SelectContentProps = React.HTMLAttributes<HTMLDivElement>;

const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(function SelectContent(
  { children, className, ...props },
  ref,
) {
  const { isOpen } = useSelectContext();

  if (!isOpen) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={cn(
        'absolute z-50 mt-2 min-w-full overflow-hidden rounded-2xl border border-border/80 bg-surface p-1 shadow-floating',
        className,
      )}
      role="listbox"
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
  const { onValueChange, setIsOpen, value: selectedValue, triggerRef } = useSelectContext();

  return (
    <button
      ref={ref}
      className={cn(
        'flex w-full items-center rounded-xl px-3 py-2 text-left text-sm outline-none transition-colors hover:bg-muted/80 focus:bg-muted/80',
        selectedValue === value && 'bg-primary/10 font-semibold text-primary',
        className,
      )}
      onClick={(event) => {
        onValueChange?.(value);
        setIsOpen(false);
        triggerRef.current?.focus();
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
