'use client';

import Link from 'next/link';

import PageHeader from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDemoData } from '@/features/demo/components/demo-data-provider';
import { appRoutes, getTeacherStudentRoute } from '@/lib/app-routes';

export default function TeacherClassesView() {
  const { teacherState } = useDemoData();

  return (
    <div className="space-y-8">
      <PageHeader />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Card glass>
          <CardHeader>
            <CardTitle>Sections and Rosters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {teacherState.classes.map((teacherClass) => {
              const roster = teacherState.students.filter((student) => student.classId === teacherClass.id);
              return (
                <div className="rounded-3xl border border-border/70 p-5" key={teacherClass.id}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-lg font-semibold text-foreground">{teacherClass.name}</p>
                      <p className="text-sm text-muted-foreground">{teacherClass.section}</p>
                    </div>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {roster.length} learners
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{teacherClass.focusArea}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {roster.map((student) => (
                      <Link
                        className="rounded-full border border-border/70 px-3 py-1 text-xs text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
                        href={getTeacherStudentRoute(student.id)}
                        key={student.id}
                      >
                        {student.name} · {student.cohort}
                      </Link>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-col gap-3 md:flex-row">
                    <Button asChild className="md:flex-1" size="sm" variant="secondary">
                      <Link href={appRoutes.teacher.assignments}>Assign class intervention</Link>
                    </Button>
                    <Button asChild className="md:flex-1" size="sm" variant="ghost">
                      <Link href={appRoutes.teacher.analytics}>Open class analytics</Link>
                    </Button>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card glass>
          <CardHeader>
            <CardTitle>Class Focus Areas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {teacherState.classes.map((teacherClass) => (
              <div className="rounded-3xl border border-border/70 p-4" key={`focus-${teacherClass.id}`}>
                <p className="font-semibold text-foreground">{teacherClass.name}</p>
                <p className="mt-2 text-sm text-muted-foreground">{teacherClass.focusArea}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  Route: classes to analytics to review to assignments
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card glass>
        <CardHeader>
          <CardTitle>Class Action Bridge</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-border/70 p-4">
            <p className="font-semibold text-foreground">Roster signal</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Start here when you need a class-level view of cohorts and who belongs in the current intervention lane.
            </p>
          </div>
          <div className="rounded-3xl border border-border/70 p-4">
            <p className="font-semibold text-foreground">Analytics handoff</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Move to analytics when the roster needs evidence on which concept or cohort is slipping fastest.
            </p>
          </div>
          <div className="rounded-3xl border border-border/70 p-4">
            <p className="font-semibold text-foreground">Intervention handoff</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Move to assignments or review once the class-level signal is clear enough to act on.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
