'use client';

import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactElement,
  type ReactNode,
} from 'react';

import { cn } from '@/lib/cn';

type DropdownMenuContextValue = {
  contentId: string;
  isOpen: boolean;
  menuRef: React.RefObject<HTMLDivElement | null>;
  setIsOpen: (isOpen: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
};

const DropdownMenuContext = createContext<DropdownMenuContextValue | undefined>(undefined);

function useDropdownMenuContext() {
  const context = useContext(DropdownMenuContext);
  if (!context) {
    throw new Error('Dropdown menu components must be used inside DropdownMenu.');
  }
  return context;
}

export const DropdownMenu = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement>(null);
  const contentId = useId();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent | globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        setIsOpen(false);
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
    <DropdownMenuContext.Provider value={{ contentId, isOpen, menuRef, setIsOpen, triggerRef }}>
      <div className="relative inline-block text-left">{children}</div>
    </DropdownMenuContext.Provider>
  );
};

export const DropdownMenuTrigger = ({ children }: { children: ReactNode }) => {
  const { contentId, isOpen, setIsOpen, triggerRef } = useDropdownMenuContext();

  if (!isValidElement(children)) {
    return null;
  }

  const child = children as ReactElement<{
    'aria-controls'?: string;
    'aria-expanded'?: boolean;
    'aria-haspopup'?: string;
    onClick?: () => void;
    onKeyDown?: (event: KeyboardEvent<HTMLElement>) => void;
    ref?: React.Ref<HTMLElement>;
  }>;

  return cloneElement(child, {
    'aria-controls': contentId,
    'aria-expanded': isOpen,
    'aria-haspopup': 'menu',
    onClick: () => {
      child.props.onClick?.();
      setIsOpen(!isOpen);
    },
    onKeyDown: (event: KeyboardEvent<HTMLElement>) => {
      child.props.onKeyDown?.(event);
      if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setIsOpen(true);
      }
    },
    ref: (node: HTMLElement | null) => {
      triggerRef.current = node;
      const { ref } = child as { ref?: React.Ref<HTMLElement> };
      if (typeof ref === 'function') {
        ref(node);
      }
    },
  });
};

export const DropdownMenuContent = ({ children, className }: { children: ReactNode; className?: string }) => {
  const { contentId, isOpen, menuRef } = useDropdownMenuContext();

  useEffect(() => {
    if (!isOpen || !menuRef.current) {
      return;
    }

    const firstItem = menuRef.current.querySelector<HTMLElement>('[role="menuitem"]');
    firstItem?.focus();
  }, [isOpen, menuRef]);

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        'absolute right-0 mt-2 w-80 origin-top-right rounded-xl bg-surface shadow-floating focus:outline-none',
        className,
      )}
      id={contentId}
      ref={menuRef}
      role="menu"
    >
      <div className="py-1">{children}</div>
    </div>
  );
};

export const DropdownMenuItem = ({
  children,
  className,
  onSelect,
}: {
  children: ReactNode;
  className?: string;
  onSelect?: () => void;
}) => {
  const { setIsOpen, triggerRef } = useDropdownMenuContext();

  const closeMenu = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect?.();
      closeMenu();
    }
  };

  return (
    <div
      className={cn('block px-4 py-2 text-sm text-foreground hover:bg-muted/80 focus:bg-muted/80 focus:outline-none', className)}
      onClick={() => {
        onSelect?.();
        closeMenu();
      }}
      onKeyDown={handleKeyDown}
      role="menuitem"
      tabIndex={0}
    >
      {children}
    </div>
  );
};
