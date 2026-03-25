'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress-bar';
import WeeklyActivityWidget from './weekly-activity-widget';
import { useDemoData } from '@/features/demo/components/demo-data-provider';
import { demoUsers, getConceptName, getParentAlerts } from '@/lib/mocks';

const weeklyActivity = [
  { day: 'Mon', minutes: 30 },
  { day: 'Tue', minutes: 45 },
  { day: 'Wed', minutes: 25 },
  { day: 'Thu', minutes: 50 },
  { day: 'Fri', minutes: 40 },
];

export default function ParentDashboardView() {
  const { state, goals } = useDemoData();
  const strengths = state.mastery.filter((item) => item.masteryScore >= 85);
  const weaknesses = state.mastery.filter((item) => item.masteryScore < 60);
  const alerts = getParentAlerts();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Parent Dashboard</h1>
        <p className="text-md text-muted-foreground">
          {demoUsers.parent.name} is viewing progress for <strong>{demoUsers.student.name}</strong>.
        </p>
      </div>

      <WeeklyActivityWidget activity={weeklyActivity} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 grid grid-cols-1 gap-8 md:grid-cols-2">
          <Card glass>
            <CardHeader><CardTitle>Strengths</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {strengths.length > 0 ? strengths.map((item) => (
                <div key={item.conceptId}>
                  <p className="font-semibold">{getConceptName(item.conceptId)}</p>
                  <ProgressBar value={item.masteryScore} />
                </div>
              )) : <p className="text-muted-foreground">No strong concepts identified yet.</p>}
            </CardContent>
          </Card>
          <Card glass>
            <CardHeader><CardTitle>Areas for Improvement</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {weaknesses.length > 0 ? weaknesses.map((item) => (
                <div key={item.conceptId}>
                  <p className="font-semibold">{getConceptName(item.conceptId)}</p>
                  <ProgressBar value={item.masteryScore} />
                </div>
              )) : <p className="text-muted-foreground">No areas for improvement identified.</p>}
            </CardContent>
          </Card>
        </div>
        <Card glass>
          <CardHeader><CardTitle>Alerts and Goals</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {alerts.map((alert) => (
              <div className="rounded-2xl border border-border/70 p-4" key={alert.id}>
                <p className="font-semibold">{alert.message}</p>
                <p className="mt-2 text-sm capitalize text-muted-foreground">Type: {alert.type.replace('_', ' ')}</p>
              </div>
            ))}
            <div className="rounded-2xl border border-border/70 p-4">
              <p className="font-semibold">Current goals</p>
              <p className="mt-2 text-sm text-muted-foreground">{goals.filter((goal) => goal.status === 'active').length} active study goals are helping keep the week on track.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
