'use client';

import PageHeader from '@/components/layout/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PrintableSummaryCard from './printable-summary-card';
import { useDemoData } from '@/features/demo/components/demo-data-provider';
import { mockConcepts } from '@/lib/mocks';

export default function ParentReportsView() {
  const { parentProfiles, selectedParentStudentId, selectedParentSupport, teacherState } = useDemoData();
  const selectedProfile = parentProfiles.find((profile) => profile.student.id === selectedParentStudentId) ?? parentProfiles[0];
  const linkedRequests = teacherState.contactRequests.filter((request) => request.studentId === selectedProfile.student.id).slice(0, 2);

  return (
    <div className="space-y-8">
      <PageHeader />

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_1fr]">
        <Card glass>
          <CardHeader>
            <CardTitle>Report Signals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-3xl border border-border/70 p-4">
              <p className="font-semibold text-foreground">Weekly digest</p>
              <p className="mt-2 text-sm text-muted-foreground">{selectedProfile.digest.summary}</p>
            </div>
            <div className="rounded-3xl border border-border/70 p-4">
              <p className="font-semibold text-foreground">Current change signal</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {selectedProfile.changes[0]?.description ?? 'No recent change signal is active right now.'}
              </p>
            </div>
            {selectedParentSupport ? (
              <div className="rounded-3xl border border-border/70 p-4">
                <p className="font-semibold text-foreground">AI support summary</p>
                <p className="mt-2 text-sm text-muted-foreground">{selectedParentSupport.homePlan}</p>
              </div>
            ) : null}
          </CardContent>
        </Card>

        <Card glass>
          <CardHeader>
            <CardTitle>Family Follow-up Trail</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {linkedRequests.length > 0 ? (
              linkedRequests.map((request) => (
                <div className="rounded-3xl border border-border/70 p-4" key={request.id}>
                  <p className="font-semibold text-foreground">{request.topic}</p>
                  <p className="mt-2 text-sm text-muted-foreground">Requested {request.requestedAtLabel}</p>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-border/70 p-4 text-sm text-muted-foreground">
                Parent-teacher follow-up requests will be mirrored here when the family asks for help.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <PrintableSummaryCard
        alerts={selectedProfile.alerts}
        concepts={mockConcepts}
        goals={selectedProfile.goals.map((goal) => ({ id: goal.id, progress: goal.progress, text: goal.text }))}
        mastery={selectedProfile.mastery}
        student={selectedProfile.student}
        weeklyActivity={selectedProfile.weeklyActivity}
      />
    </div>
  );
}
