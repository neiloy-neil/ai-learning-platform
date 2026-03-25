'use client';

import PageHeader from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDemoData } from '@/features/demo/components/demo-data-provider';

export default function TeacherAssignmentsView() {
  const { teacherState, createAssignmentFromTemplate } = useDemoData();

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
    </div>
  );
}
