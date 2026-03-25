'use client';

import Link from 'next/link';
import { useState } from 'react';

import PageHeader from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useDemoData } from '@/features/demo/components/demo-data-provider';
import { appRoutes } from '@/lib/app-routes';

export default function StudyPlanView() {
  const { latestStudyPlan, generateStudyPlan, dashboardData, assessments, generatedQuizzes, generatedQuizAssessments } = useDemoData();
  const [minutes, setMinutes] = useState('75');
  const nextAssessment = assessments.find((assessment) => assessment.status === 'Assigned' || assessment.status === 'In Progress');
  const latestGeneratedQuiz = generatedQuizzes[0];
  const latestGeneratedQuizAssessment = latestGeneratedQuiz ? generatedQuizAssessments[latestGeneratedQuiz.id] : null;

  function handleGeneratePlan() {
    generateStudyPlan(Number(minutes) || 75);
  }

  return (
    <div className="space-y-8">
      <PageHeader />

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[0.9fr_1.1fr]">
        <Card glass>
          <CardHeader>
            <CardTitle>Plan Generator</CardTitle>
            <p className="text-sm text-muted-foreground">
              Demo AI uses goals, current recommendation, revision pressure, and the next assessment to build an actionable plan.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input type="number" value={minutes} onChange={(event) => setMinutes(event.target.value)} />
            <Button className="w-full" onClick={handleGeneratePlan}>
              Generate study plan
            </Button>
            <div className="rounded-2xl border border-border/70 p-4 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">Current recommendation</p>
              <p className="mt-2">{dashboardData.recommendation.reason}</p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card glass>
            <CardHeader>
              <CardTitle>{latestStudyPlan?.title ?? 'No plan generated yet'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {latestStudyPlan ? (
                <>
                  <div className="rounded-2xl border border-border/70 p-4 text-sm text-muted-foreground">
                    {latestStudyPlan.rationale}
                  </div>
                  <div className="space-y-4">
                    {latestStudyPlan.tasks.map((task) => (
                      <div className="flex flex-col gap-4 rounded-3xl border border-border/70 p-4 md:flex-row md:items-start md:justify-between" key={task.id}>
                        <div>
                          <p className="font-semibold text-foreground">{task.title}</p>
                          <p className="mt-2 text-sm text-muted-foreground">{task.reason}</p>
                        </div>
                        <div className="shrink-0 rounded-2xl bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                          {task.minutes} min
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="rounded-2xl border border-dashed border-border/70 p-6 text-sm text-muted-foreground">
                  Generate a plan to see the AI placeholder break the next session into practice, revision, assessment prep, and reflection.
                </div>
              )}
            </CardContent>
          </Card>

          <Card glass>
            <CardHeader>
              <CardTitle>Calendar Snapshot</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {dashboardData.todayPlan.map((item, index) => (
                <div className="flex items-start gap-4 rounded-3xl border border-border/70 p-4" key={item.id}>
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-sm font-semibold text-primary">
                    {index + 1}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground">{item.label}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.timeLabel} · {item.type}
                    </p>
                  </div>
                </div>
              ))}
              <div className="flex flex-col gap-3 md:flex-row">
                <Button asChild className="md:flex-1" variant="secondary">
                  <Link href={appRoutes.student.revision}>Open revision queue</Link>
                </Button>
                <Button asChild className="md:flex-1" variant="ghost">
                  <Link href={appRoutes.student.aiTutor}>Ask AI to rebalance plan</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_1fr]">
            <Card glass>
              <CardHeader>
                <CardTitle>Planning Inputs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-2xl border border-border/70 p-4">
                  <p className="font-semibold text-foreground">Recommendation signal</p>
                  <p className="mt-2 text-sm text-muted-foreground">{dashboardData.recommendation.reason}</p>
                </div>
                <div className="rounded-2xl border border-border/70 p-4">
                  <p className="font-semibold text-foreground">Upcoming assessment</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {nextAssessment
                      ? `${nextAssessment.title} is due ${new Date(nextAssessment.dueDate).toLocaleDateString()}.`
                      : 'No formal assessment is currently queued.'}
                  </p>
                </div>
                <div className="rounded-2xl border border-border/70 p-4">
                  <p className="font-semibold text-foreground">Latest AI quiz</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {latestGeneratedQuizAssessment
                      ? `${latestGeneratedQuiz?.title} returned ${latestGeneratedQuizAssessment.score}% and now informs the plan.`
                      : 'Generate and assess an AI quiz to feed another planning signal here.'}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card glass>
              <CardHeader>
                <CardTitle>Plan Translation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {latestStudyPlan ? (
                  latestStudyPlan.tasks.map((task, index) => (
                    <div className="rounded-2xl border border-border/70 p-4" key={`translation-${task.id}`}>
                      <p className="font-semibold text-foreground">
                        Block {index + 1}: {task.title}
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {task.reason} This slot is designed as a {task.type} block.
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-border/70 p-4 text-sm text-muted-foreground">
                    Once a plan is generated, each block will be translated into a clearer student-facing action rail here.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
