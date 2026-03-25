import Link from 'next/link';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/cn';
import { buildLearningPath } from '@/lib/mocks';
import type { Concept, ConceptMastery } from '@/lib/pcdc-types';

type TimelineStatus = 'Completed' | 'In Progress' | 'Available' | 'Locked';

const statusColors: Record<TimelineStatus, string> = {
  Completed: 'bg-success',
  'In Progress': 'bg-primary',
  Available: 'bg-primary/70',
  Locked: 'bg-muted-foreground/40',
};

export default function LearningPathTimeline({ mastery, concepts }: { mastery: ConceptMastery[]; concepts: Concept[] }) {
  const nodes = buildLearningPath(mastery);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Learning Path</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative pl-6">
          <div className="absolute bottom-0 left-8 top-0 w-0.5 -translate-x-1/2 bg-border" />

          {nodes.map((item) => {
            const concept = concepts.find((entry) => entry.id === item.conceptId);
            const content = (
              <div
                className={cn(
                  'relative -ml-4 flex items-center rounded-lg p-4 transition-colors duration-200',
                  item.status !== 'Locked' && 'cursor-pointer hover:bg-muted/50',
                )}
              >
                <div className={cn('z-10 h-4 w-4 flex-shrink-0 rounded-full', statusColors[item.status])} />
                <div className="pl-6">
                  <p className="font-semibold">{concept?.name ?? item.conceptName}</p>
                  <p className="text-sm text-muted-foreground">Status: {item.status}</p>
                  {item.prerequisiteNames.length > 0 && item.status === 'Locked' ? (
                    <p className="text-xs text-muted-foreground">Unlock by strengthening {item.prerequisiteNames.join(', ')}.</p>
                  ) : null}
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
