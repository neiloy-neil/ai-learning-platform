'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress-bar';
import { useDemoData } from '@/features/demo/components/demo-data-provider';

const statusLabel: Record<'active' | 'completed' | 'archived', string> = {
  active: 'Mark complete',
  completed: 'Archive',
  archived: 'Reopen',
};

export default function GoalsView() {
  const { goals, addGoal, cycleGoalStatus } = useDemoData();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Goals</h1>
          <p className="text-md text-muted-foreground">Track weekly learning goals and stay accountable.</p>
        </div>
        <Button onClick={addGoal}>Add Goal</Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {goals.map((goal) => (
          <Card glass key={goal.id}>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <CardTitle className="text-lg">{goal.text}</CardTitle>
                <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-semibold capitalize text-primary">{goal.status}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Progress</span>
                  <span className="text-sm font-bold text-primary">{goal.progress}%</span>
                </div>
                <ProgressBar value={goal.progress} />
              </div>
              <p className="text-sm text-muted-foreground">Metric: {goal.metric}</p>
              <Button className="w-full" variant={goal.status === 'active' ? 'primary' : 'secondary'} onClick={() => cycleGoalStatus(goal.id)}>
                {statusLabel[goal.status]}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
