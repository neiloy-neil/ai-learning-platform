'use client';

import { useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EmptyStatePanel } from '@/components/ui/state-panel';
import { Input } from '@/components/ui/input';
import MasteryOverview from '@/features/student-dashboard/components/mastery-overview';
import RecentActivity from '@/features/student-dashboard/components/recent-activity';
import { useDemoData } from '@/features/demo/components/demo-data-provider';

export default function StudentDetailView({ studentId }: { studentId: string }) {
  const { dashboardData, progressData, goals, teacherState, createTeacherAssignment, sendTeacherNudge } = useDemoData();
  const [assignmentTitle, setAssignmentTitle] = useState('Focused remediation set');
  const [assignmentDescription, setAssignmentDescription] = useState('Short concept recovery set for the next practice block.');
  const [nudgeMessage, setNudgeMessage] = useState('Please complete the next intervention set before tomorrow morning.');
  const student = teacherState.students.find((item) => item.id === studentId) ?? teacherState.students[0];

  const assignments = useMemo(
    () => teacherState.assignments.filter((assignment) => assignment.assignedToStudentId === student?.id),
    [student?.id, teacherState.assignments],
  );
  const nudges = useMemo(
    () => teacherState.nudges.filter((nudge) => nudge.studentId === student?.id).slice(0, 5),
    [student?.id, teacherState.nudges],
  );

  function handleAssign() {
    const title = assignmentTitle.trim();
    const description = assignmentDescription.trim();
    if (!student || !title || !description) {
      return;
    }

    createTeacherAssignment({
      title,
      description,
      studentId: student.id,
      dueDate: '2026-03-31',
    });
    setAssignmentTitle('Follow-up mastery check');
    setAssignmentDescription('Brief checkpoint assignment to confirm the concept gap is closing.');
  }

  function handleNudge(audience: 'student' | 'parent') {
    const message = nudgeMessage.trim();
    if (!student || !message) {
      return;
    }

    sendTeacherNudge({
      studentId: student.id,
      audience,
      message,
      category: audience === 'parent' ? 'Follow-up' : 'Intervention',
    });
    setNudgeMessage('Quick reminder: one more focused session will prepare this learner for the next milestone.');
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Student Progress Workspace</h1>
        <p className="text-md text-muted-foreground">
          {student?.name ?? 'Selected student'} overview for mastery, interventions, and follow-up planning.
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
              <p className="mt-2 text-sm text-muted-foreground">
                {goals.filter((goal) => goal.status === 'active').length} active goals are currently being tracked in the student workspace.
              </p>
            </div>
            {student ? (
              <div className="rounded-2xl border border-border/70 p-4">
                <p className="font-semibold">Class placement</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {teacherState.classes.find((item) => item.id === student.classId)?.name ?? 'Unassigned'} | {student.cohort}
                </p>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
        <Card glass>
          <CardHeader>
            <CardTitle>Assignments and Interventions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 rounded-2xl border border-border/70 p-4">
              <Input value={assignmentTitle} onChange={(event) => setAssignmentTitle(event.target.value)} />
              <Input value={assignmentDescription} onChange={(event) => setAssignmentDescription(event.target.value)} />
              <Button onClick={handleAssign} variant="secondary">
                Assign remediation
              </Button>
            </div>

            {assignments.length === 0 ? (
              <EmptyStatePanel
                className="border-0 bg-transparent shadow-none"
                title="No interventions assigned"
                description="Teacher-targeted assignments and follow-up actions will appear here when a student needs support."
              />
            ) : (
              assignments.map((assignment) => (
                <div className="rounded-2xl border border-border/70 p-4" key={assignment.id}>
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold">{assignment.title}</p>
                    <span className="text-sm font-semibold text-primary">{assignment.status}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{assignment.description}</p>
                  <p className="mt-2 text-xs text-muted-foreground">Due {assignment.dueDate.toLocaleDateString()}</p>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card glass>
          <CardHeader>
            <CardTitle>Teacher Nudges and Follow-up</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 rounded-2xl border border-border/70 p-4">
              <Input value={nudgeMessage} onChange={(event) => setNudgeMessage(event.target.value)} />
              <div className="flex flex-col gap-3 md:flex-row">
                <Button className="md:flex-1" onClick={() => handleNudge('student')} variant="secondary">
                  Nudge student
                </Button>
                <Button className="md:flex-1" onClick={() => handleNudge('parent')} variant="ghost">
                  Notify parent
                </Button>
              </div>
            </div>

            {nudges.length === 0 ? (
              <EmptyStatePanel
                className="border-0 bg-transparent shadow-none"
                title="No teacher nudges yet"
                description="Encouragement and parent follow-up messages will appear here after intervention actions."
              />
            ) : (
              nudges.map((nudge) => (
                <div className="rounded-2xl border border-border/70 p-4" key={nudge.id}>
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold">
                      {nudge.category} to {nudge.audience}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {new Date(nudge.sentAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{nudge.message}</p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
