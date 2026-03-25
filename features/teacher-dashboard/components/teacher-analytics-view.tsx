'use client';

import Link from 'next/link';

import PageHeader from '@/components/layout/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDemoData } from '@/features/demo/components/demo-data-provider';
import { getTeacherStudentRoute } from '@/lib/app-routes';

export default function TeacherAnalyticsView() {
  const { teacherHeatmap, teacherWatchlist } = useDemoData();

  return (
    <div className="space-y-8">
      <PageHeader />

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <Card glass>
          <CardHeader>
            <CardTitle>Concept Heatmap</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            {teacherHeatmap.map((cell) => (
              <div
                className="rounded-3xl border border-border/70 p-5"
                key={cell.conceptId}
                style={{ backgroundColor: `rgba(48, 104, 255, ${Math.max(0.08, cell.score / 140)})` }}
              >
                <p className="text-sm font-semibold text-foreground">{cell.conceptName}</p>
                <p className="mt-3 text-3xl font-semibold text-foreground">{cell.score}%</p>
                <p className="mt-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">Class performance</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card glass>
          <CardHeader>
            <CardTitle>At-Risk Watchlist</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {teacherWatchlist.map((student) => (
              <Link className="block rounded-3xl border border-border/70 p-4 transition hover:border-primary/40" href={getTeacherStudentRoute(student.id)} key={student.id}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-foreground">{student.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {student.cohort} cohort · {student.status} status
                    </p>
                  </div>
                  <div className="rounded-2xl bg-danger/10 px-3 py-2 text-sm font-semibold text-danger">
                    {student.avgScore}%
                  </div>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
