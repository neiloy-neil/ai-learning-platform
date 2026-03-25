'use client';

import PageHeader from '@/components/layout/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDemoData } from '@/features/demo/components/demo-data-provider';

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
                      <span className="rounded-full border border-border/70 px-3 py-1 text-xs text-muted-foreground" key={student.id}>
                        {student.name} · {student.cohort}
                      </span>
                    ))}
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
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
