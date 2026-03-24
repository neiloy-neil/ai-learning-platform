
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Skeleton } from "@/components/ui/skeleton";
import PageHeader from '@/components/layout/page-header';
import { teacherService } from "@/features/teacher/services/teacher.service";
import AssignmentOverviewCard from '@/features/teacher/components/assignment-overview-card';
import type { Assignment } from '@/lib/pcdc-types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const statusTone: Record<string, string> = {
  Strong: "bg-success/20 text-success",
  Good: "bg-primary/15 text-primary",
  Weak: "bg-danger/20 text-danger",
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
  const [stats, setStats] = useState<any>(null);
  const [weakConcepts, setWeakConcepts] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [filterName, setFilterName] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredStudents = students.filter(student => {
    const matchesName = student.name.toLowerCase().includes(filterName.toLowerCase());
    const matchesStatus = filterStatus === 'all' || student.status === filterStatus;
    return matchesName && matchesStatus;
  });

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const [statsData, weakConceptsData, studentsData, assignmentsData] = await Promise.all([
        teacherService.getStats(),
        teacherService.getWeakConcepts(),
        teacherService.getStudentList(),
        fetch('/api/teacher/assignments').then(res => res.json()),
      ]);

      setStats(statsData);
      setWeakConcepts(weakConceptsData);
      setStudents(studentsData);
      setAssignments(assignmentsData);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  if (isLoading) {
    return <TeacherDashboardSkeleton />;
  }

  return (
    <div className="space-y-8">
        <PageHeader />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Average Score" value={`${stats.averageScore}%`} />
        <StatCard title="Completion Rate" value={`${stats.completionRate}%`} />
        <StatCard title="Students at Risk" value={stats.studentsAtRisk} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Weakest Concepts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {weakConcepts.map((item) => (
              <div key={item.concept}>
                <div className="mb-1 flex items-center justify-between">
                  <h3 className="text-sm font-semibold">{item.concept}</h3>
                  <span className="text-xs font-bold text-danger">{item.performance}% Avg.</span>
                </div>
                <ProgressBar value={item.performance} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Student Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex space-x-4">
                <Input 
                    placeholder="Filter by name..."
                    value={filterName}
                    onChange={(e) => setFilterName(e.target.value)}
                    className="flex-1"
                />
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
                    <Link href={`/teacher/students/${student.id}`} key={student.id}>
                      <TableRow className="cursor-pointer">
                        <TableCell className="font-semibold">{student.name}</TableCell>
                        <TableCell>{student.avgScore}%</TableCell>
                        <TableCell>
                          <span className={`rounded-full px-2 py-1 text-xs font-bold ${statusTone[student.status]}`}>
                            {student.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    </Link>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Assignments Overview</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {assignments.map(assignment => (
                    <AssignmentOverviewCard key={assignment.id} assignment={assignment} />
                ))}
            </div>
        </CardContent>
      </Card>
    </div>
  );
}

const TeacherDashboardSkeleton = () => (
    <div className="space-y-8">
        <Skeleton className="h-12 w-1/3" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Skeleton className="h-64" />
            <Skeleton className="h-64" />
        </div>
        <Skeleton className="h-48 w-full" />
    </div>
);
