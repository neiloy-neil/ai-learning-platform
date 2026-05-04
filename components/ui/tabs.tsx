
'use client';

import * as React from "react";
import { cn } from "@/lib/cn";

const Tabs = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn("flex space-x-4 border-b", className)} {...props} />
);

const TabsTrigger = ({ className, isActive, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { isActive?: boolean }) => (
    <button
        className={cn(
            "pb-2 border-b-2 text-sm font-medium transition-colors",
            isActive ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
        )}
        {...props}
    />
);

const TabsContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn("mt-4", className)} {...props} />
);

export { Tabs, TabsTrigger, TabsContent };
