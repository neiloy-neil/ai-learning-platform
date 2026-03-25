'use client';

import Link from 'next/link';

import { EmptyStatePanel } from '@/components/ui/state-panel';
import PageHeader from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDemoData } from '@/features/demo/components/demo-data-provider';
import { appRoutes } from '@/lib/app-routes';

export default function TeacherAssignmentsView() {
  const { teacherState, createAssignmentFromTemplate, teacherArtifacts } = useDemoData();
  const assigned = teacherState.assignments.filter((assignment) => assignment.status === 'Assigned');
  const submitted = teacherState.assignments.filter((assignment) => assignment.status === 'Submitted');
  const graded = teacherState.assignments.filter((assignment) => assignment.status === 'Graded');

  return (
    <div className="space-y-8">
      <PageHeader />

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[0.95fr_1.05fr]">
        <Card glass>
          <CardHeader>
            <CardTitle>Assignment Templates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {teacherState.templates.map((template) => (
              <div className="rounded-3xl border border-border/70 p-5" key={template.id}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-foreground">{template.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{template.focusArea}</p>
                  </div>
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                    {template.audience}
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">Recommended for {template.recommendedFor} learners.</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {teacherState.students.slice(0, 3).map((student) => (
                    <Button
                      key={`${template.id}-${student.id}`}
                      onClick={() => createAssignmentFromTemplate(template.id, student.id)}
                      size="sm"
                      variant="secondary"
                    >
                      Assign to {student.name}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card glass>
          <CardHeader>
            <CardTitle>Current Assignment Load</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {teacherState.assignments.map((assignment) => (
              <div className="rounded-3xl border border-border/70 p-4" key={assignment.id}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-foreground">{assignment.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{assignment.description}</p>
                  </div>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {assignment.status}
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  Assigned to {teacherState.students.find((student) => student.id === assignment.assignedToStudentId)?.name ?? 'student'} · due{' '}
                  {assignment.dueDate.toLocaleDateString()}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <Card glass>
          <CardHeader>
            <CardTitle>Assignment Workflow Board</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 lg:grid-cols-3">
            <div className="space-y-4 rounded-3xl border border-border/70 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold text-foreground">Assigned</p>
                <span className="text-sm font-semibold text-primary">{assigned.length}</span>
              </div>
              {assigned.length > 0 ? (
                assigned.map((assignment) => (
                  <div className="rounded-2xl border border-border/70 p-3" key={assignment.id}>
                    <p className="font-semibold text-foreground">{assignment.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {teacherState.students.find((student) => student.id === assignment.assignedToStudentId)?.name ?? 'student'}
                    </p>
                  </div>
                ))
              ) : (
                <EmptyStatePanel
                  className="border-0 bg-transparent p-0 shadow-none"
                  title="No assigned work"
                  description="Newly assigned intervention sets will appear here first."
                />
              )}
            </div>

            <div className="space-y-4 rounded-3xl border border-border/70 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold text-foreground">Submitted</p>
                <span className="text-sm font-semibold text-primary">{submitted.length}</span>
              </div>
              {submitted.length > 0 ? (
                submitted.map((assignment) => (
                  <div className="rounded-2xl border border-border/70 p-3" key={assignment.id}>
                    <p className="font-semibold text-foreground">{assignment.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Waiting for review from{' '}
                      {teacherState.students.find((student) => student.id === assignment.assignedToStudentId)?.name ?? 'student'}
                    </p>
                  </div>
                ))
              ) : (
                <EmptyStatePanel
                  className="border-0 bg-transparent p-0 shadow-none"
                  title="Nothing waiting"
                  description="Submitted work will collect here before it moves into review."
                />
              )}
            </div>

            <div className="space-y-4 rounded-3xl border border-border/70 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold text-foreground">Graded</p>
                <span className="text-sm font-semibold text-primary">{graded.length}</span>
              </div>
              {graded.length > 0 ? (
                graded.map((assignment) => (
                  <div className="rounded-2xl border border-border/70 p-3" key={assignment.id}>
                    <p className="font-semibold text-foreground">{assignment.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">Score {assignment.score ?? 0}%</p>
                  </div>
                ))
              ) : (
                <EmptyStatePanel
                  className="border-0 bg-transparent p-0 shadow-none"
                  title="No graded work"
                  description="Completed graded interventions will show up here as they close out."
                />
              )}
            </div>
          </CardContent>
        </Card>

        <Card glass>
          <CardHeader>
            <CardTitle>AI Assignment Support</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {teacherArtifacts.length > 0 ? (
              teacherArtifacts.slice(0, 3).map((artifact) => (
                <div className="rounded-3xl border border-border/70 p-4" key={artifact.id}>
                  <p className="font-semibold text-foreground">{artifact.title}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{artifact.summary}</p>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-border/70 p-4 text-sm text-muted-foreground">
                AI-generated assignment support will appear here after you create quizzes, remediation sets, or parent summaries.
              </div>
            )}
            <div className="flex flex-col gap-3">
              <Button asChild variant="secondary">
                <Link href={appRoutes.teacher.aiTools}>Generate new AI artifact</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href={appRoutes.teacher.review}>Open review desk</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
