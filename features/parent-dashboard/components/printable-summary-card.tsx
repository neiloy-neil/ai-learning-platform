'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress-bar';
import type { Concept, ConceptMastery, ParentAlert, User } from '@/lib/pcdc-types';

interface PrintableSummaryCardProps {
  student: User;
  mastery: ConceptMastery[];
  concepts: Concept[];
  weeklyActivity: { day: string; minutes: number }[];
  alerts: ParentAlert[];
  goals: Array<{ id: string; text: string; progress: number }>;
  aiSupportSummary?: string | null;
  followUpSummary?: string | null;
}

export default function PrintableSummaryCard({
  student,
  mastery,
  concepts,
  weeklyActivity,
  alerts,
  goals,
  aiSupportSummary,
  followUpSummary,
}: PrintableSummaryCardProps) {
  const getConceptName = (conceptId: string) => concepts.find((concept) => concept.id === conceptId)?.name ?? 'Unknown';

  const strengths = mastery.filter((item) => item.masteryScore >= 80);
  const weaknesses = mastery.filter((item) => item.masteryScore < 60);
  const totalMinutesThisWeek = weeklyActivity.reduce((total, day) => total + day.minutes, 0);

  return (
    <Card glass>
      <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <CardTitle>Printable Progress Summary</CardTitle>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            A clean handoff summary for parent review, sharing, or print.
          </p>
        </div>
        <Button onClick={() => window.print()} variant="secondary">
          Print / Share
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-3xl border border-border/70 bg-surface/70 p-5">
          <h3 className="text-lg font-semibold text-foreground">Progress Summary for {student.name}</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {student.name} logged {totalMinutesThisWeek} minutes of study time this week. This summary combines concept
            strengths, risk areas, alerts, and goal momentum in one printable view.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="rounded-3xl border border-border/70 bg-surface/70 p-5">
            <h4 className="font-semibold text-foreground">Strengths</h4>
            <div className="mt-4 space-y-3">
              {strengths.length > 0 ? (
                strengths.map((item) => (
                  <div key={item.conceptId}>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <p className="text-sm font-medium text-foreground">{getConceptName(item.conceptId)}</p>
                      <span className="text-sm font-semibold text-primary">{item.masteryScore}%</span>
                    </div>
                    <ProgressBar value={item.masteryScore} />
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No strong concepts identified yet.</p>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-border/70 bg-surface/70 p-5">
            <h4 className="font-semibold text-foreground">Areas for Improvement</h4>
            <div className="mt-4 space-y-3">
              {weaknesses.length > 0 ? (
                weaknesses.map((item) => (
                  <div key={item.conceptId}>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <p className="text-sm font-medium text-foreground">{getConceptName(item.conceptId)}</p>
                      <span className="text-sm font-semibold text-danger">{item.masteryScore}%</span>
                    </div>
                    <ProgressBar value={item.masteryScore} />
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No immediate risk areas are currently flagged.</p>
              )}
            </div>
          </div>
        </div>

        {alerts.length > 0 ? (
          <div className="rounded-3xl border border-border/70 bg-surface/70 p-5">
            <h4 className="font-semibold text-foreground">Recent Alerts</h4>
            <ul className="mt-4 space-y-2">
              {alerts.map((alert) => (
                <li className="text-sm leading-6 text-muted-foreground" key={alert.id}>
                  {alert.message}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {goals.length > 0 ? (
          <div className="rounded-3xl border border-border/70 bg-surface/70 p-5">
            <h4 className="font-semibold text-foreground">Current Goals</h4>
            <ul className="mt-4 space-y-2">
              {goals.map((goal) => (
                <li className="text-sm leading-6 text-muted-foreground" key={goal.id}>
                  {goal.text} ({goal.progress}%)
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {aiSupportSummary ? (
          <div className="rounded-3xl border border-border/70 bg-surface/70 p-5">
            <h4 className="font-semibold text-foreground">AI Home Support Summary</h4>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">{aiSupportSummary}</p>
          </div>
        ) : null}

        {followUpSummary ? (
          <div className="rounded-3xl border border-border/70 bg-surface/70 p-5">
            <h4 className="font-semibold text-foreground">Family Follow-up Note</h4>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">{followUpSummary}</p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
