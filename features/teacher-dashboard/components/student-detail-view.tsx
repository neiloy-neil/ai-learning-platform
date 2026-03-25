'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

import PageHeader from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { EmptyStatePanel } from '@/components/ui/state-panel';
import { useDemoData } from '@/features/demo/components/demo-data-provider';
import RecentActivity from '@/features/student-dashboard/components/recent-activity';
import { appRoutes } from '@/lib/app-routes';

export default function StudentDetailView({ studentId }: { studentId: string }) {
  const {
    dashboardData,
    progressData,
    goals,
    teacherState,
    teacherArtifacts,
    createTeacherAssignment,
    createAssignmentFromTemplate,
    sendTeacherNudge,
    addTeacherNote,
  } = useDemoData();
  const [assignmentTitle, setAssignmentTitle] = useState('Focused remediation set');
  const [assignmentDescription, setAssignmentDescription] = useState('Short concept recovery set for the next practice block.');
  const [nudgeMessage, setNudgeMessage] = useState('Please complete the next intervention set before tomorrow morning.');
  const [noteDraft, setNoteDraft] = useState('Needs a short scaffolded checkpoint before independent work.');

  const student = teacherState.students.find((item) => item.id === studentId) ?? teacherState.students[0];
  const className = teacherState.classes.find((item) => item.id === student?.classId)?.name ?? 'Unassigned';
  const assignments = useMemo(
    () => teacherState.assignments.filter((assignment) => assignment.assignedToStudentId === student?.id),
    [student?.id, teacherState.assignments],
  );
  const nudges = useMemo(
    () => teacherState.nudges.filter((nudge) => nudge.studentId === student?.id).slice(0, 5),
    [student?.id, teacherState.nudges],
  );
  const notes = useMemo(() => teacherState.notes.filter((note) => note.studentId === student?.id).slice(0, 5), [student?.id, teacherState.notes]);
  const submissions = useMemo(
    () => teacherState.submissions.filter((submission) => submission.studentId === student?.id).slice(0, 4),
    [student?.id, teacherState.submissions],
  );
  const reviewQueue = useMemo(
    () => teacherState.reviewQueue.filter((item) => item.studentId === student?.id).slice(0, 4),
    [student?.id, teacherState.reviewQueue],
  );
  const relatedThread = useMemo(
    () => teacherState.threads.find((thread) => thread.studentId === student?.id),
    [student?.id, teacherState.threads],
  );
  const contactRequests = useMemo(
    () => teacherState.contactRequests.filter((request) => request.studentId === student?.id).slice(0, 3),
    [student?.id, teacherState.contactRequests],
  );
  const recommendedTemplate = teacherState.templates.find((template) => template.recommendedFor === student?.cohort) ?? teacherState.templates[0];
  const relevantProgress = progressData.slice(0, 4);

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

  function handleAddNote() {
    if (!student) {
      return;
    }
    addTeacherNote(student.id, noteDraft);
    setNoteDraft('Flagged for a tighter exit check and one follow-up review tomorrow.');
  }

  return (
    <div className="space-y-8">
      <PageHeader />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-4">
        <Card glass>
          <CardHeader>
            <CardTitle className="text-lg">Learner Snapshot</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-2xl font-semibold text-foreground">{student?.name ?? 'Selected student'}</p>
            <p className="text-sm text-muted-foreground">
              {className} · {student?.cohort}
            </p>
            <p className="text-sm text-muted-foreground">
              {student?.status} current status with {student?.avgScore}% average score.
            </p>
          </CardContent>
        </Card>
        <Card glass>
          <CardHeader>
            <CardTitle className="text-lg">Intervention Pressure</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-foreground">{assignments.length}</p>
            <p className="mt-2 text-sm text-muted-foreground">Open targeted assignments and remediation sets tied to this learner.</p>
          </CardContent>
        </Card>
        <Card glass>
          <CardHeader>
            <CardTitle className="text-lg">Review Queue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-foreground">{reviewQueue.length}</p>
            <p className="mt-2 text-sm text-muted-foreground">Submissions or checks still waiting for feedback or teacher follow-up.</p>
          </CardContent>
        </Card>
        <Card glass>
          <CardHeader>
            <CardTitle className="text-lg">Family Follow-up</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-foreground">{contactRequests.length}</p>
            <p className="mt-2 text-sm text-muted-foreground">Parent requests or teacher-parent conversations linked to this learner.</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <RecentActivity activities={dashboardData.recentActivity} />
        <Card glass>
          <CardHeader>
            <CardTitle>Mastery Trend and Goal Snapshot</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {relevantProgress.map((item) => (
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
            <div className="rounded-2xl border border-border/70 p-4">
              <p className="font-semibold">Current recommendation</p>
              <p className="mt-2 text-sm text-muted-foreground">{dashboardData.recommendation.reason}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
        <Card glass>
          <CardHeader>
            <CardTitle>Assignments and Templates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 rounded-2xl border border-border/70 p-4">
              <Input value={assignmentTitle} onChange={(event) => setAssignmentTitle(event.target.value)} />
              <Input value={assignmentDescription} onChange={(event) => setAssignmentDescription(event.target.value)} />
              <div className="flex flex-col gap-3 md:flex-row">
                <Button className="md:flex-1" onClick={handleAssign} variant="secondary">
                  Assign remediation
                </Button>
                {recommendedTemplate && student ? (
                  <Button
                    className="md:flex-1"
                    onClick={() => createAssignmentFromTemplate(recommendedTemplate.id, student.id)}
                    variant="ghost"
                  >
                    Use template
                  </Button>
                ) : null}
              </div>
            </div>

            {recommendedTemplate ? (
              <div className="rounded-2xl border border-border/70 p-4">
                <p className="font-semibold">Recommended template</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {recommendedTemplate.title} is the best current template match for the {student?.cohort ?? 'selected'} cohort.
                </p>
              </div>
            ) : null}

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
            <CardTitle>Teacher Notes and AI Follow-up</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 rounded-2xl border border-border/70 p-4">
              <Input value={noteDraft} onChange={(event) => setNoteDraft(event.target.value)} />
              <Button onClick={handleAddNote} variant="secondary">
                Save teacher note
              </Button>
            </div>

            {notes.map((note) => (
              <div className="rounded-2xl border border-border/70 p-4" key={note.id}>
                <p className="text-sm font-semibold text-foreground">{note.createdAtLabel}</p>
                <p className="mt-2 text-sm text-muted-foreground">{note.text}</p>
              </div>
            ))}

            {teacherArtifacts.slice(0, 2).map((artifact) => (
              <div className="rounded-2xl border border-border/70 p-4" key={artifact.id}>
                <p className="font-semibold">{artifact.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">{artifact.summary}</p>
              </div>
            ))}

            <Button asChild className="w-full" variant="ghost">
              <Link href={appRoutes.teacher.aiTools}>Open AI tools</Link>
            </Button>
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
                    <span className="text-xs text-muted-foreground">{new Date(nudge.sentAt).toLocaleDateString()}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{nudge.message}</p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_1fr_0.9fr]">
        <Card glass>
          <CardHeader>
            <CardTitle>Submission Feed and Review Queue</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {submissions.length === 0 && reviewQueue.length === 0 ? (
              <EmptyStatePanel
                className="border-0 bg-transparent shadow-none"
                title="No review items yet"
                description="Recent submissions and high-priority review work will appear here when this learner starts sending work back."
              />
            ) : null}
            {submissions.map((submission) => (
              <div className="rounded-2xl border border-border/70 p-4" key={submission.id}>
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold">{submission.title}</p>
                  <span className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{submission.status}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{submission.submittedAtLabel}</p>
              </div>
            ))}
            {reviewQueue.map((item) => (
              <div className="rounded-2xl border border-border/70 p-4" key={item.id}>
                <p className="font-semibold">{item.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Priority {item.priority} · due {item.dueLabel}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card glass>
          <CardHeader>
            <CardTitle>Family Context and Messages</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {contactRequests.length > 0 ? (
              contactRequests.map((request) => (
                <div className="rounded-2xl border border-border/70 p-4" key={request.id}>
                  <p className="font-semibold">{request.parentName}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{request.topic}</p>
                </div>
              ))
            ) : (
              <EmptyStatePanel
                className="border-0 bg-transparent shadow-none"
                title="No current parent requests"
                description="Parent contact activity will appear here whenever follow-up is requested."
              />
            )}

            {relatedThread ? (
              <div className="rounded-2xl border border-border/70 p-4">
                <p className="font-semibold">Latest thread</p>
                <p className="mt-2 text-sm text-muted-foreground">{relatedThread.topic}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {relatedThread.messages[relatedThread.messages.length - 1]?.text ?? 'No message yet.'}
                </p>
                <Button asChild className="mt-4 w-full" variant="ghost">
                  <Link href={appRoutes.teacher.messages}>Open messages</Link>
                </Button>
              </div>
            ) : null}
          </CardContent>
        </Card>

        <Card glass>
          <CardHeader>
            <CardTitle>Next Teacher Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full">
              <Link href={appRoutes.teacher.assignments}>Open assignment desk</Link>
            </Button>
            <Button asChild className="w-full" variant="secondary">
              <Link href={appRoutes.teacher.review}>Open review queue</Link>
            </Button>
            <Button asChild className="w-full" variant="ghost">
              <Link href={appRoutes.teacher.analytics}>Open analytics</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
