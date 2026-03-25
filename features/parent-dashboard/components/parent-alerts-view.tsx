'use client';

import PageHeader from '@/components/layout/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDemoData } from '@/features/demo/components/demo-data-provider';

export default function ParentAlertsView() {
  const { parentProfiles, selectedParentStudentId } = useDemoData();
  const selectedProfile = parentProfiles.find((profile) => profile.student.id === selectedParentStudentId) ?? parentProfiles[0];

  return (
    <div className="space-y-8">
      <PageHeader />

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_1fr]">
        <Card glass>
          <CardHeader>
            <CardTitle>Active Alerts and Changes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedProfile.alerts.map((alert) => (
              <div className="rounded-3xl border border-border/70 p-4" key={alert.id}>
                <p className="font-semibold text-foreground">{alert.message}</p>
                <p className="mt-2 text-sm capitalize text-muted-foreground">{alert.type.replace('_', ' ')}</p>
              </div>
            ))}
            {selectedProfile.changes.map((item) => (
              <div className="rounded-3xl border border-border/70 p-4" key={item.id}>
                <p className="font-semibold text-foreground">{item.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card glass>
          <CardHeader>
            <CardTitle>Upcoming and Missed Work</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedProfile.upcomingAssessments.map((assessment) => (
              <div className="rounded-3xl border border-border/70 p-4" key={assessment.id}>
                <p className="font-semibold text-foreground">{assessment.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">Due {assessment.dueLabel}</p>
              </div>
            ))}
            {selectedProfile.missedWork.map((item) => (
              <div className="rounded-3xl border border-border/70 p-4" key={item.id}>
                <p className="font-semibold text-foreground">{item.title}</p>
                <p className="mt-2 text-sm text-danger">{item.status}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
