'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const BarChart = ({ data }: { data: { day: string; minutes: number }[] }) => {
  const maxValue = Math.max(...data.map((item) => item.minutes), 60);

  return (
    <div className="grid h-52 grid-cols-5 items-end gap-3 rounded-3xl border border-border/70 bg-surface/70 p-4">
      {data.map((item) => (
        <div className="flex h-full flex-col items-center justify-end gap-2" key={item.day}>
          <div
            className="w-full rounded-2xl bg-gradient-to-t from-primary via-primary/80 to-secondary transition-transform duration-300 hover:scale-y-105"
            style={{ height: `${(item.minutes / maxValue) * 100}%` }}
            title={`${item.minutes} minutes`}
          />
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{item.day}</span>
        </div>
      ))}
    </div>
  );
};

export default function WeeklyActivityWidget({ activity }: { activity: { day: string; minutes: number }[] }) {
  const totalMinutes = activity.reduce((acc, curr) => acc + curr.minutes, 0);

  return (
    <Card glass>
      <CardHeader>
        <CardTitle>Weekly Activity</CardTitle>
        <p className="text-sm leading-6 text-muted-foreground">
          Total study time this week: <strong className="text-foreground">{totalMinutes} minutes</strong>
        </p>
      </CardHeader>
      <CardContent>
        <BarChart data={activity} />
      </CardContent>
    </Card>
  );
}
