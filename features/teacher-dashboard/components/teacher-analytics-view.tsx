'use client';

import Link from 'next/link';
import { useMemo } from 'react';

import PageHeader from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDemoData } from '@/features/demo/components/demo-data-provider';
import { appRoutes, getTeacherStudentRoute } from '@/lib/app-routes';

export default function TeacherAnalyticsView() {
  const { teacherHeatmap, teacherWatchlist, teacherState, teacherArtifacts } = useDemoData();
  const cohortDistribution = useMemo(
    () => [
      {
        label: 'Acceleration',
        count: teacherState.students.filter((student) => student.cohort === 'Acceleration').length,
      },
      {
        label: 'Core',
        count: teacherState.students.filter((student) => student.cohort === 'Core').length,
      },
      {
        label: 'Intervention',
        count: teacherState.students.filter((student) => student.cohort === 'Intervention').length,
      },
    ],
    [teacherState.students],
  );
  const classPerformance = useMemo(
    () =>
      teacherState.classes.map((teacherClass) => {
        const roster = teacherState.students.filter((student) => student.classId === teacherClass.id);
        const averageScore =
          roster.length === 0 ? 0 : Math.round(roster.reduce((sum, student) => sum + student.avgScore, 0) / roster.length);

        return {
          id: teacherClass.id,
          name: teacherClass.name,
          section: teacherClass.section,
          averageScore,
          riskCount: roster.filter((student) => student.status === 'Weak').length,
          rosterCount: roster.length,
        };
      }),
    [teacherState.classes, teacherState.students],
  );
  const reviewPressure = teacherState.reviewQueue.length + teacherState.submissions.filter((item) => item.status === 'Needs Review').length;

  return (
    <div className="space-y-8">
      <PageHeader />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card glass>
          <CardHeader>
            <CardTitle className="text-lg">Review Pressure</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-foreground">{reviewPressure}</p>
            <p className="mt-2 text-sm text-muted-foreground">Open reviews and submissions waiting for action.</p>
          </CardContent>
        </Card>
        <Card glass>
          <CardHeader>
            <CardTitle className="text-lg">Parent Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-foreground">{teacherState.contactRequests.length}</p>
            <p className="mt-2 text-sm text-muted-foreground">Family follow-ups currently in the queue.</p>
          </CardContent>
        </Card>
        <Card glass>
          <CardHeader>
            <CardTitle className="text-lg">AI Artifacts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-foreground">{teacherArtifacts.length}</p>
            <p className="mt-2 text-sm text-muted-foreground">Generated summaries, lesson outlines, and intervention sets.</p>
          </CardContent>
        </Card>
        <Card glass>
          <CardHeader>
            <CardTitle className="text-lg">At-Risk Learners</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-foreground">{teacherWatchlist.length}</p>
            <p className="mt-2 text-sm text-muted-foreground">Students who need the fastest intervention loop.</p>
          </CardContent>
        </Card>
      </div>

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
                <div className="mt-4 flex flex-col gap-2">
                  <Button asChild size="sm" variant="secondary">
                    <Link href={appRoutes.teacher.review}>Open review response</Link>
                  </Button>
                  <Button asChild size="sm" variant="ghost">
                    <Link href={appRoutes.teacher.assignments}>Assign intervention</Link>
                  </Button>
                </div>
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

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_1fr]">
        <Card glass>
          <CardHeader>
            <CardTitle>Class Performance Snapshot</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {classPerformance.map((teacherClass) => (
              <div className="rounded-3xl border border-border/70 p-4" key={teacherClass.id}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-foreground">{teacherClass.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{teacherClass.section}</p>
                  </div>
                  <div className="rounded-2xl bg-primary/10 px-3 py-2 text-sm font-semibold text-primary">
                    {teacherClass.averageScore}%
                  </div>
                </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-muted-foreground">
                <div className="rounded-2xl border border-border/70 p-3">
                  <p>Roster</p>
                  <p className="mt-1 text-2xl font-semibold text-foreground">{teacherClass.rosterCount}</p>
                </div>
                  <div className="rounded-2xl border border-border/70 p-3">
                  <p>At Risk</p>
                  <p className="mt-1 text-2xl font-semibold text-foreground">{teacherClass.riskCount}</p>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-3 md:flex-row">
                <Button asChild className="md:flex-1" size="sm" variant="secondary">
                  <Link href={appRoutes.teacher.assignments}>Open assignment desk</Link>
                </Button>
                <Button asChild className="md:flex-1" size="sm" variant="ghost">
                  <Link href={appRoutes.teacher.classes}>Open class roster</Link>
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

        <Card glass>
          <CardHeader>
            <CardTitle>Cohort Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {cohortDistribution.map((cohort) => (
              <div className="rounded-3xl border border-border/70 p-4" key={cohort.label}>
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-foreground">{cohort.label}</p>
                  <span className="text-sm font-semibold text-primary">{cohort.count} learners</span>
                </div>
                <div className="mt-4 h-3 rounded-full bg-muted">
                  <div
                    className="h-3 rounded-full bg-primary"
                    style={{ width: `${Math.max(12, (cohort.count / Math.max(1, teacherState.students.length)) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
            <div className="flex flex-col gap-3 md:flex-row">
              <Button asChild className="md:flex-1" variant="secondary">
                <Link href={appRoutes.teacher.review}>Open review desk</Link>
              </Button>
              <Button asChild className="md:flex-1" variant="ghost">
                <Link href={appRoutes.teacher.aiTools}>Open AI tools</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_1fr]">
        <Card glass>
          <CardHeader>
            <CardTitle>Submission Status Feed</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {teacherState.submissions.map((submission) => (
              <div className="rounded-3xl border border-border/70 p-4" key={submission.id}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-foreground">{submission.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{submission.studentName}</p>
                  </div>
                  <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-700">
                    {submission.status}
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">Submitted {submission.submittedAtLabel}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card glass>
          <CardHeader>
            <CardTitle>Recent AI Artifact History</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {teacherArtifacts.length > 0 ? (
              teacherArtifacts.slice(0, 4).map((artifact) => (
                <div className="rounded-3xl border border-border/70 p-4" key={artifact.id}>
                  <p className="font-semibold text-foreground">{artifact.title}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{artifact.summary}</p>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-border/70 p-4 text-sm text-muted-foreground">
                Generate an AI artifact from the tools page or review desk to start building the analytics trail.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card glass>
        <CardHeader>
          <CardTitle>Analytics-to-Action Bridge</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-border/70 p-4">
            <p className="font-semibold text-foreground">Weak concept detected</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Use review when the concept heatmap is dropping and the class needs a fast response.
            </p>
            <Button asChild className="mt-4 w-full" size="sm" variant="secondary">
              <Link href={appRoutes.teacher.review}>Go to review</Link>
            </Button>
          </div>
          <div className="rounded-3xl border border-border/70 p-4">
            <p className="font-semibold text-foreground">Learner cluster at risk</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Move from analytics into assignments when a cohort or class needs a repeatable intervention.
            </p>
            <Button asChild className="mt-4 w-full" size="sm" variant="secondary">
              <Link href={appRoutes.teacher.assignments}>Go to assignments</Link>
            </Button>
          </div>
          <div className="rounded-3xl border border-border/70 p-4">
            <p className="font-semibold text-foreground">Family signal rising</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Move into messages when analytics pressure and parent follow-up are both active.
            </p>
            <Button asChild className="mt-4 w-full" size="sm" variant="secondary">
              <Link href={appRoutes.teacher.messages}>Go to messages</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
