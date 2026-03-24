import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress-bar';
import WeeklyActivityWidget from './weekly-activity-widget';
import { getConceptName, getParentDashboardData } from '@/lib/mocks';

const weeklyActivity = [
  { day: 'Mon', minutes: 30 },
  { day: 'Tue', minutes: 45 },
  { day: 'Wed', minutes: 25 },
  { day: 'Thu', minutes: 50 },
  { day: 'Fri', minutes: 40 },
];

export default function ParentDashboardView() {
  const { parent, student, strengths, weaknesses } = getParentDashboardData();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Parent Dashboard</h1>
        <p className="text-md text-muted-foreground">
          {parent.name} is viewing progress for <strong>{student.name}</strong>.
        </p>
      </div>

      <WeeklyActivityWidget activity={weeklyActivity} />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
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
    </div>
  );
}
