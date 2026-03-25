'use client';

import Link from 'next/link';

import PageHeader from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDemoData } from '@/features/demo/components/demo-data-provider';
import { appRoutes, getTeacherStudentRoute } from '@/lib/app-routes';

export default function TeacherReviewView() {
  const { teacherState, createAssignmentFromTemplate, sendTeacherNudge, generateTeacherArtifact } = useDemoData();
  const defaultTemplate = teacherState.templates[0];

  return (
    <div className="space-y-8">
      <PageHeader />

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[0.9fr_1.1fr_0.9fr]">
        <Card glass>
          <CardHeader>
            <CardTitle>Review Queue</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {teacherState.reviewQueue.map((item) => (
              <div className="rounded-3xl border border-border/70 p-4" key={item.id}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-foreground">{item.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{item.studentName}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.priority === 'High' ? 'bg-danger/20 text-danger' : 'bg-primary/10 text-primary'}`}>
                    {item.priority}
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">Due {item.dueLabel}</p>
                <div className="mt-4 flex flex-col gap-3 md:flex-row">
                  <Button asChild size="sm" variant="secondary">
                    <Link href={getTeacherStudentRoute(item.studentId)}>Open workspace</Link>
                  </Button>
                  <Button asChild size="sm" variant="ghost">
                    <Link href={appRoutes.teacher.messages}>Open messages</Link>
                  </Button>
                </div>
                <div className="mt-3 flex flex-col gap-3">
                  {defaultTemplate ? (
                    <Button
                      onClick={() => createAssignmentFromTemplate(defaultTemplate.id, item.studentId)}
                      size="sm"
                      variant="secondary"
                    >
                      Assign intervention template
                    </Button>
                  ) : null}
                  <Button
                    onClick={() =>
                      sendTeacherNudge({
                        studentId: item.studentId,
                        audience: 'student',
                        message: `Please clear ${item.title.toLowerCase()} before the next checkpoint.`,
                        category: 'Intervention',
                      })
                    }
                    size="sm"
                    variant="ghost"
                  >
                    Send student nudge
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card glass>
          <CardHeader>
            <CardTitle>Recent Submissions Feed</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {teacherState.submissions.map((submission) => (
              <div className="rounded-3xl border border-border/70 p-4" key={submission.id}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-foreground">{submission.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{submission.studentName}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${submission.status === 'Needs Review' ? 'bg-amber-500/15 text-amber-700' : 'bg-success/20 text-success'}`}>
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
            <CardTitle>Parent Follow-up Requests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {teacherState.contactRequests.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border/70 p-4 text-sm text-muted-foreground">
                No open parent requests yet.
              </div>
            ) : (
              teacherState.contactRequests.map((request) => (
                <div className="rounded-3xl border border-border/70 p-4" key={request.id}>
                  <p className="font-semibold text-foreground">{request.parentName}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{request.topic}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                    {request.requestedAtLabel}
                  </p>
                  <div className="mt-4 flex flex-col gap-3">
                    <Button asChild size="sm" variant="secondary">
                      <Link href={getTeacherStudentRoute(request.studentId)}>Open learner</Link>
                    </Button>
                    <Button asChild size="sm" variant="ghost">
                      <Link href={appRoutes.teacher.messages}>Reply in messages</Link>
                    </Button>
                    <Button
                      onClick={() =>
                        generateTeacherArtifact({
                          tool: 'parent-summary',
                          focus: request.topic,
                          className: teacherState.classes.find((teacherClass) =>
                            teacherClass.studentIds.includes(request.studentId),
                          )?.name ?? 'Current class',
                        })
                      }
                      size="sm"
                      variant="secondary"
                    >
                      Generate parent summary
                    </Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
