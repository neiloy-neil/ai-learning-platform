
'use client';

import { usePathname } from 'next/navigation';
import { getRouteMetadata } from '@/lib/route-metadata';

export default function PageHeader() {
  const pathname = usePathname();
  const { title, subtitle } = getRouteMetadata(pathname);

  return (
    <div>
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-md text-muted-foreground">{subtitle}</p>
    </div>
  );
}
