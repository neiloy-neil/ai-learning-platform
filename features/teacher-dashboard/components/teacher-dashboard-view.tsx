'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ProgressBar } from '@/components/ui/progress-bar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyStatePanel } from '@/components/ui/state-panel';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import PageHeader from '@/components/layout/page-header';
import AssignmentOverviewCard from '@/features/teacher/components/assignment-overview-card';
import { getTeacherAssignments, getTeacherDashboardData } from '@/lib/mocks';
import type { Assignment } from '@/lib/pcdc-types';

const statusTone: Record<string, string> = {
  Strong: 'bg-success/20 text-success',
  Good: 'bg-primary/15 text-primary',
  Weak: 'bg-danger/20 text-danger',
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
  const [filterName, setFilterName] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const { classStats, weakConcepts, students } = getTeacherDashboardData();
  const assignments: Assignment[] = getTeacherAssignments();

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesName = student.name.toLowerCase().includes(filterName.toLowerCase());
      const matchesStatus = filterStatus === 'all' || student.status === filterStatus;
      return matchesName && matchesStatus;
    });
  }, [filterName, filterStatus, students]);

  return (
    <div className="space-y-8">
      <PageHeader />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard title="Average Score" value={`${classStats.averageScore}%`} />
        <StatCard title="Completion Rate" value={`${classStats.completionRate}%`} />
        <StatCard title="Students at Risk" value={classStats.studentsAtRisk} />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Weakest Concepts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {weakConcepts.length === 0 ? (
              <EmptyStatePanel
                className="border-0 bg-transparent shadow-none"
                title="No weak concepts"
                description="Class-level concept risk will appear here once student evidence is available."
              />
            ) : (
              weakConcepts.map((item) => (
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
          <CardContent>
            <div className="mb-4 flex space-x-4">
              <Input className="flex-1" placeholder="Filter by name..." value={filterName} onChange={(event) => setFilterName(event.target.value)} />
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
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
                  description="Try changing the current filter to bring students back into the table."
                />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Avg. Score</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow className="cursor-pointer" key={student.id}>
                        <TableCell className="font-semibold">
                          <Link href={`/teacher/students/${student.id}`}>{student.name}</Link>
                        </TableCell>
                        <TableCell>{student.avgScore}%</TableCell>
                        <TableCell>
                          <span className={`rounded-full px-2 py-1 text-xs font-bold ${statusTone[student.status]}`}>
                            {student.status}
                          </span>
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

      <Card>
        <CardHeader>
          <CardTitle>Assignments Overview</CardTitle>
        </CardHeader>
        <CardContent>
          {assignments.length === 0 ? (
            <EmptyStatePanel
              className="border-0 bg-transparent shadow-none"
              title="No assignments yet"
              description="Assignments and intervention sets will appear here once a teacher creates or targets work."
            />
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {assignments.map((assignment: Assignment) => (
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
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <Skeleton className="h-64" />
      <Skeleton className="h-64" />
    </div>
    <Skeleton className="h-48 w-full" />
  </div>
);
