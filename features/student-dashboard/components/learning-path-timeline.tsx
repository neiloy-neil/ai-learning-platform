import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/cn';
import { appRoutes } from '@/lib/app-routes';
import { buildLearningPath } from '@/lib/mocks';
import type { Concept, ConceptMastery } from '@/lib/pcdc-types';

type TimelineStatus = 'Completed' | 'In Progress' | 'Available' | 'Locked';

const statusColors: Record<TimelineStatus, string> = {
  Completed: 'bg-success',
  'In Progress': 'bg-primary',
  Available: 'bg-secondary',
  Locked: 'bg-muted-foreground/40',
};

export default function LearningPathTimeline({ mastery, concepts }: { mastery: ConceptMastery[]; concepts: Concept[] }) {
  const nodes = buildLearningPath(mastery);

  return (
    <Card glass>
      <CardHeader>
        <CardTitle>Your Learning Path</CardTitle>
        <p className="text-sm leading-6 text-muted-foreground">
          Concepts unlock in sequence based on prerequisites and current mastery signals.
        </p>
      </CardHeader>
      <CardContent>
        <div className="relative pl-6">
          <div className="absolute bottom-0 left-[13px] top-0 w-px bg-border" />

          {nodes.map((item) => {
            const concept = concepts.find((entry) => entry.id === item.conceptId);
            const content = (
              <div
                className={cn(
                  'relative mb-4 rounded-3xl border border-border/70 bg-surface/70 p-4 transition-all',
                  item.href && 'hover:border-primary/30 hover:bg-muted/50',
                )}
              >
                <div className="flex items-start gap-4">
                  <div className={cn('mt-1 h-4 w-4 shrink-0 rounded-full ring-4 ring-background', statusColors[item.status])} />
                  <div className="min-w-0 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold text-foreground">{concept?.name ?? item.conceptName}</p>
                      <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                        {item.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.mastery}% mastery</p>
                    {item.prerequisiteNames.length > 0 && item.status === 'Locked' ? (
                      <p className="text-sm leading-6 text-muted-foreground">
                        Unlock by strengthening {item.prerequisiteNames.join(', ')}.
                      </p>
                    ) : (
                      <p className="text-sm leading-6 text-muted-foreground">
                        {item.status === 'Completed'
                          ? 'This concept is complete and ready to support the next milestone.'
                          : 'You can enter practice directly from this step.'}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {item.href ? (
                        <Button asChild size="sm" variant="secondary">
                          <Link href={item.href}>Practice</Link>
                        </Button>
                      ) : null}
                      <Button asChild size="sm" variant="ghost">
                        <Link href={appRoutes.student.aiTutor}>Ask AI</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );

            if (!item.href) {
              return <div key={item.conceptId}>{content}</div>;
            }

            return (
              <Link href={item.href} key={item.conceptId}>
                {content}
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
