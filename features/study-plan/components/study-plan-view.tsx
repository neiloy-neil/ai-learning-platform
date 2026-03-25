'use client';

import { useState } from 'react';

import PageHeader from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useDemoData } from '@/features/demo/components/demo-data-provider';

export default function StudyPlanView() {
  const { latestStudyPlan, generateStudyPlan, dashboardData } = useDemoData();
  const [minutes, setMinutes] = useState('75');

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
      </div>
    </div>
  );
}
