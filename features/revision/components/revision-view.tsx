'use client';

import Link from 'next/link';

import PageHeader from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDemoData } from '@/features/demo/components/demo-data-provider';
import { appRoutes } from '@/lib/app-routes';

const intensityTone = {
  light: 'bg-secondary text-secondary-foreground',
  medium: 'bg-primary/15 text-primary',
  high: 'bg-danger/20 text-danger',
} as const;

export default function RevisionView() {
  const { dashboardData } = useDemoData();

  return (
    <div className="space-y-8">
      <PageHeader />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card glass>
          <CardHeader>
            <CardTitle>Revision Queue</CardTitle>
            <p className="text-sm text-muted-foreground">
              Due concepts are ranked by weakness and freshness so the demo feels like a real spaced-review flow.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {dashboardData.revisionQueue.map((task) => (
              <div className="rounded-3xl border border-border/70 p-5" key={task.id}>
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <p className="text-lg font-semibold text-foreground">{task.conceptName}</p>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${intensityTone[task.intensity]}`}>
                        {task.intensity}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{task.reason}</p>
                    <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{task.dueLabel}</p>
                  </div>
                  <div className="flex w-full flex-col gap-3 md:w-auto">
                    <Button asChild variant="secondary">
                      <Link href={`${appRoutes.student.practice}?conceptId=${task.conceptId}&mode=revision`}>Open revision set</Link>
                    </Button>
                    <Button asChild variant="ghost">
                      <Link href={appRoutes.student.aiTutor}>Ask AI for help</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card glass>
            <CardHeader>
              <CardTitle>Why these tasks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>Weak concepts are surfaced first when they block upcoming milestones.</p>
              <p>Older concepts return when evidence has gone stale and the spaced-review timer is due.</p>
              <p>Each task is designed to be short enough to fit between practice and assessment prep.</p>
            </CardContent>
          </Card>

          <Card glass>
            <CardHeader>
              <CardTitle>Next action rail</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full">
                <Link href={dashboardData.recommendation.href}>{dashboardData.recommendation.ctaLabel}</Link>
              </Button>
              <Button asChild className="w-full" variant="secondary">
                <Link href={appRoutes.student.studyPlan}>Build a revision-first study plan</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
