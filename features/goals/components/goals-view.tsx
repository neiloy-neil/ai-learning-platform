'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress-bar';

type Goal = {
  id: string;
  text: string;
  progress: number;
};

const initialGoals: Goal[] = [
  { id: 'goal-1', text: 'Review Linear Equations', progress: 80 },
  { id: 'goal-2', text: 'Practice Graphing Inequalities', progress: 55 },
  { id: 'goal-3', text: 'Complete Quadratics Checkpoint', progress: 30 },
];

export default function GoalsView() {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);

  const handleAddGoal = () => {
    const nextId = `goal-${goals.length + 1}`;
    setGoals((current) => [...current, { id: nextId, text: 'New study goal', progress: 0 }]);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Goals</h1>
          <p className="text-md text-muted-foreground">Track weekly learning goals and stay accountable.</p>
        </div>
        <Button onClick={handleAddGoal}>Add Goal</Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {goals.map((goal) => (
          <Card glass key={goal.id}>
            <CardHeader>
              <CardTitle className="text-lg">{goal.text}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Progress</span>
                <span className="text-sm font-bold text-primary">{goal.progress}%</span>
              </div>
              <ProgressBar value={goal.progress} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
