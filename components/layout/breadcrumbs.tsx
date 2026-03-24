
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Fragment } from 'react';

// A simple utility to capitalize strings
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean); // Filter out empty strings

  // Don't show breadcrumbs on the main dashboard pages
  if (segments.length <= 2) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="hidden md:block">
      <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
        {segments.map((segment, index) => {
          const href = '/' + segments.slice(0, index + 1).join('/');
          const isLast = index === segments.length - 1;
          
          // Here you could add logic to replace IDs with names, e.g., fetch a student's name
          const name = capitalize(segment.replace(/-/g, ' '));

          return (
            <Fragment key={href}>
              <li>
                <Link 
                  href={href} 
                  className={`hover:text-primary ${isLast ? 'text-foreground font-semibold' : ''}`}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {name}
                </Link>
              </li>
              {!isLast && (
                <li aria-hidden="true" className="select-none">/</li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
