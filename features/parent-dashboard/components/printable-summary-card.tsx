'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import type { Concept, ConceptMastery, ParentAlert, User } from "@/lib/pcdc-types";

interface PrintableSummaryCardProps {
  student: User;
  mastery: ConceptMastery[];
  concepts: Concept[];
  weeklyActivity: { day: string; minutes: number }[];
  alerts: ParentAlert[];
  goals: Array<{ id: string; text: string; progress: number }>;
}

export default function PrintableSummaryCard({
  student,
  mastery,
  concepts,
  weeklyActivity,
  alerts,
  goals,
}: PrintableSummaryCardProps) {
  const getConceptName = (conceptId: string) =>
    concepts.find((concept) => concept.id === conceptId)?.name ?? 'Unknown';

  const strengths = mastery.filter((item) => item.masteryScore >= 80);
  const weaknesses = mastery.filter((item) => item.masteryScore < 60);
  const totalMinutesThisWeek = weeklyActivity.reduce((total, day) => total + day.minutes, 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <Card className="mt-8">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Progress Summary for {student.name}</CardTitle>
        <Button onClick={handlePrint} variant="secondary">
          Print / Share
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="mb-2 text-lg font-semibold">Overall Performance</h3>
          <p className="text-muted-foreground">
            {student.name} has spent a total of {totalMinutesThisWeek} minutes studying this week.
            Here is a snapshot of their progress.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <h4 className="mb-2 font-semibold">Strengths</h4>
            {strengths.length > 0 ? (
              strengths.map((item) => (
                <div key={item.conceptId} className="mb-2">
                  <p className="text-sm font-medium">
                    {getConceptName(item.conceptId)} ({item.masteryScore}%)
                  </p>
                  <ProgressBar value={item.masteryScore} />
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No strong concepts identified yet.</p>
            )}
          </div>

          <div>
            <h4 className="mb-2 font-semibold">Areas for Improvement</h4>
            {weaknesses.length > 0 ? (
              weaknesses.map((item) => (
                <div key={item.conceptId} className="mb-2">
                  <p className="text-sm font-medium text-danger">
                    {getConceptName(item.conceptId)} ({item.masteryScore}%)
                  </p>
                  <ProgressBar value={item.masteryScore} />
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No areas for improvement identified.
              </p>
            )}
          </div>
        </div>

        {alerts.length > 0 && (
          <div>
            <h4 className="mb-2 font-semibold">Recent Alerts</h4>
            <ul className="list-disc space-y-1 pl-5 text-sm">
              {alerts.map((alert) => (
                <li key={alert.id} className="text-muted-foreground">
                  {alert.message}
                </li>
              ))}
            </ul>
          </div>
        )}

        {goals.length > 0 && (
          <div>
            <h4 className="mb-2 font-semibold">Current Goals</h4>
            <ul className="list-disc space-y-1 pl-5 text-sm">
              {goals.map((goal) => (
                <li key={goal.id} className="text-muted-foreground">
                  {goal.text} ({goal.progress}%)
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
