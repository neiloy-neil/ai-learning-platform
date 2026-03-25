'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

import PageHeader from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ProgressBar } from '@/components/ui/progress-bar';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyStatePanel } from '@/components/ui/state-panel';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useDemoData } from '@/features/demo/components/demo-data-provider';
import AssignmentOverviewCard from '@/features/teacher/components/assignment-overview-card';
import { appRoutes, getTeacherStudentRoute } from '@/lib/app-routes';
import { mockTeacherWeakConcepts, type TeacherCohort } from '@/lib/mocks';

const statusTone: Record<string, string> = {
  Strong: 'bg-success/20 text-success',
  Good: 'bg-primary/15 text-primary',
  Weak: 'bg-danger/20 text-danger',
};

const cohortTone: Record<TeacherCohort, string> = {
  Core: 'bg-secondary text-secondary-foreground',
  Acceleration: 'bg-success/20 text-success',
  Intervention: 'bg-danger/20 text-danger',
};

const StatCard = ({ title, value }: { title: string; value: string | number }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-md text-muted-foreground">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-3xl font-bold">{value}</p>
    </CardContent>
  </Card>
);

export default function TeacherDashboardView() {
  const {
    teacherState,
    teacherHeatmap,
    teacherWatchlist,
    teacherArtifacts,
    addTeacherClass,
    assignStudentToClass,
    cycleStudentCohort,
    createTeacherAssignment,
    sendTeacherNudge,
    addTeacherNote,
  } =
    useDemoData();
  const [filterName, setFilterName] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedClassId, setSelectedClassId] = useState('all');
  const [className, setClassName] = useState('');
  const [sectionName, setSectionName] = useState('');
  const [focusArea, setFocusArea] = useState('');
  const [assignmentTitle, setAssignmentTitle] = useState('');
  const [assignmentDescription, setAssignmentDescription] = useState('');
  const [assignmentStudentId, setAssignmentStudentId] = useState('student-c');
  const [assignmentDueDate, setAssignmentDueDate] = useState('2026-03-31');
  const [nudgeMessage, setNudgeMessage] = useState('Finish the next targeted set before tomorrow so we can review the gap together.');
  const [nudgeStudentId, setNudgeStudentId] = useState('student-c');
  const [teacherNote, setTeacherNote] = useState('Student needs one more scaffolded check before independent practice.');
  const assignments = teacherState.assignments;
  const recentNudges = teacherState.nudges.slice(0, 4);

  const teacherStats = useMemo(() => {
    const sourceStudents =
      selectedClassId === 'all'
        ? teacherState.students
        : teacherState.students.filter((student) => student.classId === selectedClassId);

    const averageScore =
      sourceStudents.length === 0
        ? 0
        : Math.round(sourceStudents.reduce((sum, student) => sum + student.avgScore, 0) / sourceStudents.length);

    return {
      averageScore,
      completionRate: 85,
      studentsAtRisk: sourceStudents.filter((student) => student.status === 'Weak').length,
    };
  }, [selectedClassId, teacherState.students]);

  const classCards = useMemo(
    () =>
      teacherState.classes.map((teacherClass) => {
        const roster = teacherState.students.filter((student) => student.classId === teacherClass.id);
        const averageScore =
          roster.length === 0 ? 0 : Math.round(roster.reduce((sum, student) => sum + student.avgScore, 0) / roster.length);

        return {
          ...teacherClass,
          rosterCount: roster.length,
          weakCount: roster.filter((student) => student.status === 'Weak').length,
          averageScore,
        };
      }),
    [teacherState.classes, teacherState.students],
  );

  const filteredStudents = useMemo(() => {
    return teacherState.students.filter((student) => {
      const matchesName = student.name.toLowerCase().includes(filterName.toLowerCase());
      const matchesStatus = filterStatus === 'all' || student.status === filterStatus;
      const matchesClass = selectedClassId === 'all' || student.classId === selectedClassId;
      return matchesName && matchesStatus && matchesClass;
    });
  }, [filterName, filterStatus, selectedClassId, teacherState.students]);

  function handleCreateClass() {
    const name = className.trim();
    const section = sectionName.trim();
    const focus = focusArea.trim();
    if (!name || !section || !focus) {
      return;
    }

    addTeacherClass({ name, section, focusArea: focus });
    setClassName('');
    setSectionName('');
    setFocusArea('');
  }

  function handleCreateAssignment() {
    const title = assignmentTitle.trim();
    const description = assignmentDescription.trim();
    if (!title || !description || !assignmentStudentId || !assignmentDueDate) {
      return;
    }

    createTeacherAssignment({
      title,
      description,
      studentId: assignmentStudentId,
      dueDate: assignmentDueDate,
    });
    setAssignmentTitle('');
    setAssignmentDescription('');
  }

  function handleSendNudge(audience: 'student' | 'parent') {
    const message = nudgeMessage.trim();
    if (!message || !nudgeStudentId) {
      return;
    }

    sendTeacherNudge({
      studentId: nudgeStudentId,
      audience,
      message,
      category: audience === 'parent' ? 'Follow-up' : 'Intervention',
    });
    setNudgeMessage('Keep the momentum going with one focused review block tonight.');
  }

  return (
    <div className="space-y-8">
      <PageHeader />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard title="Average Score" value={`${teacherStats.averageScore}%`} />
        <StatCard title="Completion Rate" value={`${teacherStats.completionRate}%`} />
        <StatCard title="Students at Risk" value={teacherStats.studentsAtRisk} />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">At-Risk Watchlist</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {teacherWatchlist.map((student) => (
              <Link className="block rounded-2xl border border-border/70 p-3 transition hover:border-primary/40" href={getTeacherStudentRoute(student.id)} key={student.id}>
                <p className="font-semibold">{student.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {student.cohort} · {student.avgScore}%
                </p>
              </Link>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Assignment Templates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {teacherState.templates.slice(0, 3).map((template) => (
              <div className="rounded-2xl border border-border/70 p-3" key={template.id}>
                <p className="font-semibold">{template.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{template.focusArea}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {teacherState.deadlines.map((deadline) => (
              <div className="rounded-2xl border border-border/70 p-3" key={deadline.id}>
                <p className="font-semibold">{deadline.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {deadline.type} · {deadline.dueLabel}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Parent Contact Requests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {teacherState.contactRequests.map((request) => (
              <div className="rounded-2xl border border-border/70 p-3" key={request.id}>
                <p className="font-semibold">{request.parentName}</p>
                <p className="mt-1 text-sm text-muted-foreground">{request.topic}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Class and Section Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-3 xl:grid-cols-[1.4fr_1fr_1.3fr_auto]">
            <Input
              placeholder="New class name"
              value={className}
              onChange={(event) => setClassName(event.target.value)}
            />
            <Input
              placeholder="Section"
              value={sectionName}
              onChange={(event) => setSectionName(event.target.value)}
            />
            <Input
              placeholder="Focus area"
              value={focusArea}
              onChange={(event) => setFocusArea(event.target.value)}
            />
            <Button className="w-full xl:w-auto" onClick={handleCreateClass} variant="secondary">
              Add class
            </Button>
          </div>

          {classCards.length === 0 ? (
            <EmptyStatePanel
              className="border-0 bg-transparent shadow-none"
              title="No classes configured"
              description="Add a class to start grouping students into sections and intervention cohorts."
            />
          ) : (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {classCards.map((teacherClass) => (
                <Card
                  key={teacherClass.id}
                  className={selectedClassId === teacherClass.id ? 'border-primary/60 shadow-floating' : undefined}
                >
                  <CardHeader className="space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <CardTitle className="text-lg">{teacherClass.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{teacherClass.section}</p>
                      </div>
                      <Button
                        onClick={() =>
                          setSelectedClassId((current) => (current === teacherClass.id ? 'all' : teacherClass.id))
                        }
                        size="sm"
                        variant={selectedClassId === teacherClass.id ? 'primary' : 'secondary'}
                      >
                        {selectedClassId === teacherClass.id ? 'Showing' : 'Filter'}
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">{teacherClass.focusArea}</p>
                  </CardHeader>
                  <CardContent className="grid grid-cols-3 gap-3 text-sm">
                    <div className="rounded-2xl border border-border/70 p-3">
                      <p className="text-muted-foreground">Roster</p>
                      <p className="mt-1 text-2xl font-bold">{teacherClass.rosterCount}</p>
                    </div>
                    <div className="rounded-2xl border border-border/70 p-3">
                      <p className="text-muted-foreground">Avg. Score</p>
                      <p className="mt-1 text-2xl font-bold">{teacherClass.averageScore}%</p>
                    </div>
                    <div className="rounded-2xl border border-border/70 p-3">
                      <p className="text-muted-foreground">At Risk</p>
                      <p className="mt-1 text-2xl font-bold">{teacherClass.weakCount}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Weakest Concepts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockTeacherWeakConcepts.length === 0 ? (
              <EmptyStatePanel
                className="border-0 bg-transparent shadow-none"
                title="No weak concepts"
                description="Class-level concept risk will appear here once student evidence is available."
              />
            ) : (
              mockTeacherWeakConcepts.map((item) => (
                <div key={item.conceptId}>
                  <div className="mb-1 flex items-center justify-between">
                    <h3 className="text-sm font-semibold">{item.conceptName}</h3>
                    <span className="text-xs font-bold text-danger">{item.performance}% Avg.</span>
                  </div>
                  <ProgressBar value={item.performance} />
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Student Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-4 xl:flex-row">
              <Input
                className="flex-1"
                placeholder="Filter by name..."
                value={filterName}
                onChange={(event) => setFilterName(event.target.value)}
              />
              <Select value={selectedClassId} onValueChange={setSelectedClassId}>
                <SelectTrigger className="xl:w-[220px]">{selectedClassId === 'all' ? 'All classes' : classCards.find((item) => item.id === selectedClassId)?.name ?? 'Class'}</SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All classes</SelectItem>
                  {classCards.map((teacherClass) => (
                    <SelectItem key={teacherClass.id} value={teacherClass.id}>
                      {teacherClass.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="xl:w-[180px]">
                  {filterStatus === 'all' ? 'All statuses' : filterStatus}
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="Strong">Strong</SelectItem>
                  <SelectItem value="Good">Good</SelectItem>
                  <SelectItem value="Weak">Weak</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="overflow-auto">
              {filteredStudents.length === 0 ? (
                <EmptyStatePanel
                  className="border-0 bg-transparent shadow-none"
                  title="No matching students"
                  description="Try changing the current class or status filter to bring students back into the table."
                />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Avg. Score</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Cohort</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-semibold">
                          <Link href={getTeacherStudentRoute(student.id)}>{student.name}</Link>
                        </TableCell>
                        <TableCell>
                          <Select value={student.classId} onValueChange={(value) => assignStudentToClass(student.id, value)}>
                            <SelectTrigger className="min-w-[180px]">
                              {classCards.find((teacherClass) => teacherClass.id === student.classId)?.name ?? 'Assign class'}
                            </SelectTrigger>
                            <SelectContent>
                              {classCards.map((teacherClass) => (
                                <SelectItem key={teacherClass.id} value={teacherClass.id}>
                                  {teacherClass.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>{student.avgScore}%</TableCell>
                        <TableCell>
                          <span className={`rounded-full px-2 py-1 text-xs font-bold ${statusTone[student.status]}`}>
                            {student.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button
                            className={cohortTone[student.cohort]}
                            onClick={() => cycleStudentCohort(student.id)}
                            size="sm"
                            variant="ghost"
                          >
                            {student.cohort}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Concept Heatmap</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            {teacherHeatmap.map((item) => (
              <div className="rounded-2xl border border-border/70 p-4" key={item.conceptId}>
                <p className="text-sm font-semibold">{item.conceptName}</p>
                <p className="mt-3 text-3xl font-bold">{item.score}%</p>
                <p className="mt-2 text-xs uppercase tracking-[0.12em] text-muted-foreground">Class signal</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Submission Feed</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {teacherState.submissions.map((submission) => (
              <div className="rounded-2xl border border-border/70 p-4" key={submission.id}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">{submission.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{submission.studentName}</p>
                  </div>
                  <span className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{submission.status}</span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">Submitted {submission.submittedAtLabel}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Tools Rail</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full">
              <Link href={appRoutes.teacher.aiTools}>Open AI tools</Link>
            </Button>
            <Button asChild className="w-full" variant="secondary">
              <Link href={appRoutes.teacher.analytics}>Open analytics</Link>
            </Button>
            {teacherArtifacts.slice(0, 2).map((artifact) => (
              <div className="rounded-2xl border border-border/70 p-3" key={artifact.id}>
                <p className="font-semibold">{artifact.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{artifact.summary}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Assignments and Intervention Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="space-y-3 rounded-3xl border border-border/70 p-4">
              <h3 className="font-semibold">Create targeted assignment</h3>
              <Input
                placeholder="Assignment title"
                value={assignmentTitle}
                onChange={(event) => setAssignmentTitle(event.target.value)}
              />
              <Input
                placeholder="Assignment description"
                value={assignmentDescription}
                onChange={(event) => setAssignmentDescription(event.target.value)}
              />
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <Select value={assignmentStudentId} onValueChange={setAssignmentStudentId}>
                  <SelectTrigger>
                    {teacherState.students.find((student) => student.id === assignmentStudentId)?.name ?? 'Assign student'}
                  </SelectTrigger>
                  <SelectContent>
                    {teacherState.students.map((student) => (
                      <SelectItem key={student.id} value={student.id}>
                        {student.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input type="date" value={assignmentDueDate} onChange={(event) => setAssignmentDueDate(event.target.value)} />
              </div>
              <Button onClick={handleCreateAssignment} variant="secondary">
                Assign intervention
              </Button>
            </div>

            <div className="space-y-3 rounded-3xl border border-border/70 p-4">
              <h3 className="font-semibold">Send targeted nudge</h3>
              <Select value={nudgeStudentId} onValueChange={setNudgeStudentId}>
                <SelectTrigger>
                  {teacherState.students.find((student) => student.id === nudgeStudentId)?.name ?? 'Select student'}
                </SelectTrigger>
                <SelectContent>
                  {teacherState.students.map((student) => (
                    <SelectItem key={student.id} value={student.id}>
                      {student.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input value={nudgeMessage} onChange={(event) => setNudgeMessage(event.target.value)} />
              <div className="flex flex-col gap-3 md:flex-row">
                <Button className="md:flex-1" onClick={() => handleSendNudge('student')} variant="secondary">
                  Nudge student
                </Button>
                <Button className="md:flex-1" onClick={() => handleSendNudge('parent')} variant="ghost">
                  Notify parent
                </Button>
              </div>
              <div className="space-y-2">
                {recentNudges.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No recent nudges yet.</p>
                ) : (
                  recentNudges.map((nudge) => (
                    <div className="rounded-2xl border border-border/70 p-3" key={nudge.id}>
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold">
                          {teacherState.students.find((student) => student.id === nudge.studentId)?.name ?? 'Student'}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {nudge.category} to {nudge.audience}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{nudge.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="space-y-3 rounded-3xl border border-border/70 p-4">
              <h3 className="font-semibold">Teacher notes panel</h3>
              <Input value={teacherNote} onChange={(event) => setTeacherNote(event.target.value)} />
              <Button
                onClick={() => {
                  addTeacherNote(nudgeStudentId, teacherNote);
                  setTeacherNote('Flagged for a stronger exit check before the next assignment.');
                }}
                variant="secondary"
              >
                Save note
              </Button>
              <div className="space-y-2">
                {teacherState.notes.slice(0, 4).map((note) => (
                  <div className="rounded-2xl border border-border/70 p-3" key={note.id}>
                    <p className="text-sm font-semibold">
                      {teacherState.students.find((student) => student.id === note.studentId)?.name ?? 'Student'}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">{note.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {assignments.length === 0 ? (
            <EmptyStatePanel
              className="border-0 bg-transparent shadow-none"
              title="No assignments yet"
              description="Assignments and intervention sets will appear here once a teacher creates or targets work."
            />
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {assignments.map((assignment) => (
                <AssignmentOverviewCard assignment={assignment} key={assignment.id} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export const TeacherDashboardSkeleton = () => (
  <div className="space-y-8">
    <Skeleton className="h-12 w-1/3" />
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <Skeleton className="h-32" />
      <Skeleton className="h-32" />
      <Skeleton className="h-32" />
    </div>
    <Skeleton className="h-56 w-full" />
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <Skeleton className="h-64" />
      <Skeleton className="h-64" />
    </div>
    <Skeleton className="h-48 w-full" />
  </div>
);
