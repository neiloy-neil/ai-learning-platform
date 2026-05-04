'use client';

import { Sparkles } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { getRouteMetadata } from '@/lib/route-metadata';

export default function PageHeader() {
  const pathname = usePathname();
  const { title, subtitle } = getRouteMetadata(pathname);

  return (
    <div className="glass-panel-strong overflow-hidden px-6 py-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <span className="eyebrow">Demo Workspace</span>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">{title}</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-surface/70 px-4 py-3 text-sm text-muted-foreground">
          <Sparkles className="size-4 text-primary" />
          Shared mock state keeps every role flow in sync for the demo.
        </div>
      </div>
    </div>
  );
}
