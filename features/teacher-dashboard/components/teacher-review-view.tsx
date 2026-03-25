'use client';

import PageHeader from '@/components/layout/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDemoData } from '@/features/demo/components/demo-data-provider';

export default function TeacherReviewView() {
  const { teacherState } = useDemoData();

  return (
    <div className="space-y-8">
      <PageHeader />

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[0.9fr_1.1fr]">
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
      </div>
    </div>
  );
}
