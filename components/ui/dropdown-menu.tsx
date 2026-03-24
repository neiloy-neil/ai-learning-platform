
'use client';

import { useState, useEffect, useRef, createContext, useContext } from 'react';
import { cn } from '@/lib/cn';

const DropdownMenuContext = createContext<{ isOpen: boolean; setIsOpen: (isOpen: boolean) => void; }>({ isOpen: false, setIsOpen: () => {} });

export const DropdownMenu = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener('keydown', handleKeyDown);
        } 

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, menuRef]);

    return (
        <DropdownMenuContext.Provider value={{ isOpen, setIsOpen }}>
            <div ref={menuRef} className="relative inline-block text-left">
                {children}
            </div>
        </DropdownMenuContext.Provider>
    );
};

export const DropdownMenuTrigger = ({ children }: { children: React.ReactNode }) => {
    const { setIsOpen } = useContext(DropdownMenuContext);
    return <div onClick={() => setIsOpen(true)}>{children}</div>;
};

export const DropdownMenuContent = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    const { isOpen } = useContext(DropdownMenuContext);
    if (!isOpen) return null;

    return (
        <div className={cn(
            "absolute right-0 mt-2 w-80 origin-top-right rounded-xl bg-surface shadow-floating focus:outline-none",
            className
        )}>
            <div className="py-1">{children}</div>
        </div>
    );
};

export const DropdownMenuItem = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="block px-4 py-2 text-sm text-foreground hover:bg-muted/80">
            {children}
        </div>
    );
};
