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
  const { dashboardData, latestStudyPlan, generatedQuizzes, generatedQuizAssessments } = useDemoData();
  const latestGeneratedQuiz = generatedQuizzes[0];
  const latestGeneratedQuizAssessment = latestGeneratedQuiz ? generatedQuizAssessments[latestGeneratedQuiz.id] : null;

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

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_1fr]">
        <Card glass>
          <CardHeader>
            <CardTitle>Revision Coaching Loop</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-3xl border border-border/70 p-4">
              <p className="font-semibold text-foreground">1. Clear the weakest concept</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Start with {dashboardData.revisionQueue[0]?.conceptName ?? dashboardData.recommendation.nextConceptName} to remove the biggest blocker first.
              </p>
            </div>
            <div className="rounded-3xl border border-border/70 p-4">
              <p className="font-semibold text-foreground">2. Use AI to explain the gap</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Ask the AI tutor to simplify the concept or turn it into a short checkpoint before the next assessed attempt.
              </p>
            </div>
            <div className="rounded-3xl border border-border/70 p-4">
              <p className="font-semibold text-foreground">3. Rebalance the plan</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Move back to the study plan once the queue starts shrinking so the next session stays realistic.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card glass>
          <CardHeader>
            <CardTitle>Connected Signals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {latestStudyPlan ? (
              <div className="rounded-3xl border border-border/70 p-4">
                <p className="font-semibold text-foreground">Latest plan signal</p>
                <p className="mt-2 text-sm text-muted-foreground">{latestStudyPlan.rationale}</p>
              </div>
            ) : null}
            {latestGeneratedQuizAssessment ? (
              <div className="rounded-3xl border border-border/70 p-4">
                <p className="font-semibold text-foreground">Latest AI quiz signal</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {latestGeneratedQuiz?.title} scored {latestGeneratedQuizAssessment.score}% and is currently steering the revision queue.
                </p>
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-border/70 p-4 text-sm text-muted-foreground">
                Once an AI quiz is assessed, its coaching signal will appear here beside the revision queue.
              </div>
            )}
            <div className="flex flex-col gap-3 md:flex-row">
              <Button asChild className="md:flex-1" variant="secondary">
                <Link href={appRoutes.student.aiTutor}>Open AI Tutor</Link>
              </Button>
              <Button asChild className="md:flex-1" variant="ghost">
                <Link href={appRoutes.student.progress}>Open progress loop</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
