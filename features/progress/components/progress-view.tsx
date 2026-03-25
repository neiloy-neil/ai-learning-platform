'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress-bar';
import { useDemoData } from '@/features/demo/components/demo-data-provider';

function BarChart({ data }: { data: { conceptId: string; conceptName: string; mastery: number }[] }) {
  return (
    <div className="flex h-64 w-full items-end space-x-4 rounded-lg bg-muted p-4">
      {data.map((item) => (
        <div className="flex flex-1 flex-col items-center" key={item.conceptId}>
          <div
            className="w-full rounded-t-md bg-gradient-to-t from-blue-500 to-purple-600 transition-all duration-500 ease-out"
            style={{ height: `${item.mastery}%` }}
          />
          <span className="mt-2 text-center text-xs text-muted-foreground">{item.conceptName}</span>
        </div>
      ))}
    </div>
  );
}

export default function ProgressView() {
  const { progressData, state } = useDemoData();
  const totalMinutes = state.attempts.length * 12;
  const revisionCount = state.attempts.filter((attempt) => attempt.mode === 'revision').length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Your Progress</h1>
        <p className="text-md text-muted-foreground">A detailed overview of your concept mastery, recent movement, and study momentum.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card glass>
          <CardHeader>
            <CardTitle className="text-lg">Study Time</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalMinutes} min</p>
            <p className="text-sm text-muted-foreground">Tracked from your practice and assessment attempts.</p>
          </CardContent>
        </Card>
        <Card glass>
          <CardHeader>
            <CardTitle className="text-lg">Revision Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{revisionCount}</p>
            <p className="text-sm text-muted-foreground">Spaced review attempts completed in this demo session.</p>
          </CardContent>
        </Card>
        <Card glass>
          <CardHeader>
            <CardTitle className="text-lg">Concept Momentum</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{progressData.filter((item) => item.delta > 0).length}</p>
            <p className="text-sm text-muted-foreground">Concepts showing positive short-term movement.</p>
          </CardContent>
        </Card>
      </div>

      <Card glass>
        <CardHeader>
          <CardTitle>Mastery Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart data={progressData} />
        </CardContent>
      </Card>

      <Card glass>
        <CardHeader>
          <CardTitle>Mastery by Concept</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {progressData.map((item) => (
            <div key={item.conceptId} className="space-y-2 rounded-2xl border border-border/70 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-semibold">{item.conceptName}</h3>
                  <p className="text-sm text-muted-foreground">Last practiced {item.lastPracticedLabel}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-primary">{item.mastery}%</span>
                  <p className="text-xs text-muted-foreground">Trend {item.delta >= 0 ? `+${item.delta}` : item.delta} pts</p>
                </div>
              </div>
              <ProgressBar value={item.mastery} />
              <p className="text-sm leading-6 text-muted-foreground">{item.rationale}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
