'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MasteryOverview from '@/features/student-dashboard/components/mastery-overview';
import RecentActivity from '@/features/student-dashboard/components/recent-activity';
import { useDemoData } from '@/features/demo/components/demo-data-provider';
import { getTeacherAssignments } from '@/lib/mocks';

export default function StudentDetailView({ studentId }: { studentId: string }) {
  const { dashboardData, progressData, goals } = useDemoData();
  const assignments = getTeacherAssignments().filter((assignment) => assignment.assignedToStudentId === studentId || assignment.assignedToStudentId === 'student-a');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Student Progress Workspace</h1>
        <p className="text-md text-muted-foreground">
          Teacher drill-down for mastery, goals, recent activity, and intervention planning.
        </p>
      </div>

      <MasteryOverview concepts={dashboardData.concepts} mastery={dashboardData.mastery} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <RecentActivity activities={dashboardData.recentActivity} />
        <Card glass>
          <CardHeader>
            <CardTitle>Goal and Risk Snapshot</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {progressData.slice(0, 3).map((item) => (
              <div className="rounded-2xl border border-border/70 p-4" key={item.conceptId}>
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold">{item.conceptName}</p>
                  <span className="text-sm font-bold text-primary">{item.mastery}%</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{item.rationale}</p>
              </div>
            ))}
            <div className="rounded-2xl border border-border/70 p-4">
              <p className="font-semibold">Active goals</p>
              <p className="mt-2 text-sm text-muted-foreground">{goals.filter((goal) => goal.status === 'active').length} active goals are currently being tracked in the student workspace.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card glass>
        <CardHeader>
          <CardTitle>Assignments and Interventions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {assignments.map((assignment) => (
            <div className="rounded-2xl border border-border/70 p-4" key={assignment.id}>
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold">{assignment.title}</p>
                <span className="text-sm font-semibold text-primary">{assignment.status}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{assignment.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
