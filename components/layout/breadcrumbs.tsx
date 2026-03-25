'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { getRouteSegmentLabel } from '@/lib/route-metadata';

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="hidden md:block">
      <ol className="flex items-center gap-2 text-sm text-muted-foreground">
        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join('/')}`;
          const isLast = index === segments.length - 1;
          const label = getRouteSegmentLabel(segment);

          return (
            <Fragment key={href}>
              <li>
                {isLast ? (
                  <span aria-current="page" className="font-semibold text-foreground">
                    {label}
                  </span>
                ) : (
                  <Link className="transition-colors hover:text-primary" href={href}>
                    {label}
                  </Link>
                )}
              </li>
              {!isLast ? (
                <li aria-hidden="true" className="select-none text-border">
                  /
                </li>
              ) : null}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
