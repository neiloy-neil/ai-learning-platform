'use client';

import { useState } from 'react';
import { TrendingUp, Calendar, BookOpen, Users, Award, AlertTriangle, Download, BarChart3 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { attendanceRecords, homeworkAssignments, homeworkSubmissions, calculateAttendanceRate, getHomeworkStats } from '@/lib/db/attendance-data';
import { AttendanceStatus, HomeworkStatus } from '@/lib/pcdc-types';
import { cn } from '@/lib/cn';

export default function AcademicReportsView() {
  const [selectedTerm, setSelectedTerm] = useState('Term 2 2026');
  const [selectedClass, setSelectedClass] = useState('all');
  const [reportType, setReportType] = useState<'attendance' | 'homework' | 'combined'>('combined');

  // Calculate attendance metrics
  const totalAttendanceRecords = attendanceRecords.length;
  const presentCount = attendanceRecords.filter(r => r.status === AttendanceStatus.PRESENT).length;
  const absentCount = attendanceRecords.filter(r => r.status === AttendanceStatus.ABSENT).length;
  const lateCount = attendanceRecords.filter(r => r.status === AttendanceStatus.LATE).length;
  const overallAttendanceRate = totalAttendanceRecords > 0
    ? ((presentCount + lateCount) / totalAttendanceRecords * 100).toFixed(1)
    : '0';

  // Calculate homework metrics
  const totalAssignments = homeworkAssignments.filter(a => a.status === 'active').length;
  const totalSubmissions = homeworkSubmissions.length;
  const gradedSubmissions = homeworkSubmissions.filter(s => s.status === HomeworkStatus.GRADED).length;
  const overdueSubmissions = homeworkSubmissions.filter(s => s.status === HomeworkStatus.OVERDUE).length;
  const avgScore = gradedSubmissions > 0
    ? homeworkSubmissions.filter(s => s.score !== undefined).reduce((sum, s) => sum + (s.score || 0), 0) / gradedSubmissions
    : 0;

  // Student attendance leaderboard
  const studentAttendanceMap: Record<string, { name: string; present: number; total: number }> = {};
  attendanceRecords.forEach(record => {
    if (!studentAttendanceMap[record.studentId]) {
      studentAttendanceMap[record.studentId] = { name: record.studentName, present: 0, total: 0 };
    }
    studentAttendanceMap[record.studentId].total++;
    if (record.status === AttendanceStatus.PRESENT || record.status === AttendanceStatus.LATE) {
      studentAttendanceMap[record.studentId].present++;
    }
  });

  const studentAttendanceRates = Object.entries(studentAttendanceMap)
    .map(([id, data]) => ({
      id,
      name: data.name,
      rate: (data.present / data.total * 100).toFixed(1),
      present: data.present,
      total: data.total,
    }))
    .sort((a, b) => parseFloat(b.rate) - parseFloat(a.rate));

  // Homework completion by assignment
  const assignmentCompletion = homeworkAssignments
    .filter(a => a.status === 'active')
    .map(assignment => {
      const stats = getHomeworkStats(assignment.id);
      return {
        id: assignment.id,
        title: assignment.title,
        className: assignment.className,
        total: stats.total,
        submitted: stats.submitted,
        graded: stats.graded,
        overdue: stats.overdue,
        avgScore: stats.avgScore,
        completionRate: stats.total > 0 ? (stats.submitted / stats.total * 100).toFixed(0) : '0',
      };
    });

  // Absenteeism alerts
  const lowAttendanceStudents = studentAttendanceRates.filter(s => parseFloat(s.rate) < 75);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel-strong overflow-hidden px-6 py-5">
        <div className="flex items-start justify-between">
          <div>
            <span className="eyebrow">Analytics & Insights</span>
            <h1 className="text-3xl font-semibold">Academic Reports</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Comprehensive attendance and homework analytics
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={selectedTerm}
              onChange={e => setSelectedTerm(e.target.value)}
              className="flex h-10 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="Term 2 2026" className="bg-slate-900">Term 2 2026</option>
              <option value="Term 1 2026" className="bg-slate-900">Term 1 2026</option>
              <option value="Term 4 2025" className="bg-slate-900">Term 4 2025</option>
            </select>
            <Button className="gap-2">
              <Download className="size-4" />
              Export Report
            </Button>
          </div>
        </div>
      </div>

      {/* Report Type Tabs */}
      <div className="flex gap-3">
        <Button
          variant={reportType === 'combined' ? 'primary' : 'secondary'}
          onClick={() => setReportType('combined')}
        >
          Combined View
        </Button>
        <Button
          variant={reportType === 'attendance' ? 'primary' : 'secondary'}
          onClick={() => setReportType('attendance')}
        >
          Attendance Only
        </Button>
        <Button
          variant={reportType === 'homework' ? 'primary' : 'secondary'}
          onClick={() => setReportType('homework')}
        >
          Homework Only
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Attendance Rate</p>
                <p className="mt-2 text-3xl font-semibold">{overallAttendanceRate}%</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-success">
                  <TrendingUp className="size-3" />
                  +2.3% vs last term
                </p>
              </div>
              <div className="rounded-lg bg-success/10 p-3">
                <Calendar className="size-5 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Homework Completion</p>
                <p className="mt-2 text-3xl font-semibold">
                  {totalAssignments > 0
                    ? (homeworkSubmissions.filter(s => s.status !== HomeworkStatus.OVERDUE).length / totalSubmissions * 100).toFixed(0)
                    : 0}%
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {totalSubmissions} submissions
                </p>
              </div>
              <div className="rounded-lg bg-primary/10 p-3">
                <BookOpen className="size-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Average Score</p>
                <p className="mt-2 text-3xl font-semibold">{avgScore.toFixed(0)}%</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-warning">
                  <TrendingUp className="size-3" />
                  +5.1% vs last term
                </p>
              </div>
              <div className="rounded-lg bg-warning/10 p-3">
                <Award className="size-5 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">At Risk Students</p>
                <p className="mt-2 text-3xl font-semibold text-danger">{lowAttendanceStudents.length}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Attendance &lt; 75%
                </p>
              </div>
              <div className="rounded-lg bg-danger/10 p-3">
                <AlertTriangle className="size-5 text-danger" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {lowAttendanceStudents.length > 0 && (
        <Card className="border-danger/50 bg-danger/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-danger">
              <AlertTriangle className="size-5" />
              Attendance Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {lowAttendanceStudents.map(student => (
                <div key={student.id} className="flex items-center justify-between rounded-lg border border-danger/20 bg-background p-3">
                  <div>
                    <p className="font-semibold">{student.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {student.present}/{student.total} days attended
                    </p>
                  </div>
                  <Badge className="bg-danger/20 text-danger">
                    {student.rate}% attendance
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Attendance Breakdown */}
      {(reportType === 'combined' || reportType === 'attendance') && (
        <Card>
          <CardHeader>
            <CardTitle>Attendance Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <h3 className="font-semibold">Attendance Status Distribution</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Present</span>
                    <span className="font-semibold text-success">{presentCount} ({(presentCount / totalAttendanceRecords * 100).toFixed(1)}%)</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div className="h-full rounded-full bg-success" style={{ width: `${presentCount / totalAttendanceRecords * 100}%` }} />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Late</span>
                    <span className="font-semibold text-warning">{lateCount} ({(lateCount / totalAttendanceRecords * 100).toFixed(1)}%)</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div className="h-full rounded-full bg-warning" style={{ width: `${lateCount / totalAttendanceRecords * 100}%` }} />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Absent</span>
                    <span className="font-semibold text-danger">{absentCount} ({(absentCount / totalAttendanceRecords * 100).toFixed(1)}%)</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div className="h-full rounded-full bg-danger" style={{ width: `${absentCount / totalAttendanceRecords * 100}%` }} />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">Top Attendance Students</h3>
                <div className="space-y-2">
                  {studentAttendanceRates.slice(0, 5).map((student, index) => (
                    <div key={student.id} className="flex items-center justify-between rounded-lg border p-2">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-primary/20 text-primary">#{index + 1}</Badge>
                        <span className="text-sm font-medium">{student.name}</span>
                      </div>
                      <Badge className={cn(
                        parseFloat(student.rate) >= 90 ? 'bg-success/20 text-success' :
                        parseFloat(student.rate) >= 75 ? 'bg-warning/20 text-warning' : 'bg-danger/20 text-danger'
                      )}>
                        {student.rate}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Homework Performance */}
      {(reportType === 'combined' || reportType === 'homework') && (
        <Card>
          <CardHeader>
            <CardTitle>Homework Performance by Assignment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {assignmentCompletion.map(assignment => (
                <div key={assignment.id} className="rounded-lg border p-4">
                  <div className="mb-3 flex items-start justify-between">
                    <div>
                      <p className="font-semibold">{assignment.title}</p>
                      <p className="text-sm text-muted-foreground">{assignment.className}</p>
                    </div>
                    <Badge className="bg-primary/20 text-primary">
                      {assignment.completionRate}% Complete
                    </Badge>
                  </div>

                  <div className="grid grid-cols-4 gap-3 text-sm">
                    <div className="text-center">
                      <p className="text-2xl font-semibold text-primary">{assignment.total}</p>
                      <p className="text-xs text-muted-foreground">Total</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-semibold text-success">{assignment.submitted}</p>
                      <p className="text-xs text-muted-foreground">Submitted</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-semibold text-warning">{assignment.graded}</p>
                      <p className="text-xs text-muted-foreground">Graded</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-semibold text-danger">{assignment.overdue}</p>
                      <p className="text-xs text-muted-foreground">Overdue</p>
                    </div>
                  </div>

                  {assignment.avgScore > 0 && (
                    <div className="mt-3 flex items-center justify-between border-t pt-3">
                      <span className="text-sm">Average Score</span>
                      <span className="font-semibold text-warning">{assignment.avgScore.toFixed(1)}%</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Compliance Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="size-5" />
            Compliance Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border p-4">
              <h3 className="mb-2 font-semibold">Attendance Compliance</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>Overall Rate</span>
                  <span className="font-semibold">{overallAttendanceRate}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Target</span>
                  <span className="font-semibold">90%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Status</span>
                  <Badge className={parseFloat(overallAttendanceRate) >= 90 ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'}>
                    {parseFloat(overallAttendanceRate) >= 90 ? 'On Track' : 'Below Target'}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="mb-2 font-semibold">Homework Compliance</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>Submission Rate</span>
                  <span className="font-semibold">
                    {(homeworkSubmissions.filter(s => s.status !== HomeworkStatus.OVERDUE).length / totalSubmissions * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Grading Rate</span>
                  <span className="font-semibold">
                    {(gradedSubmissions / totalSubmissions * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Status</span>
                  <Badge className="bg-success/20 text-success">Good</Badge>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="mb-2 font-semibold">Student Engagement</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>Avg Attendance</span>
                  <span className="font-semibold">{overallAttendanceRate}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Avg Homework Score</span>
                  <span className="font-semibold">{avgScore.toFixed(0)}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Status</span>
                  <Badge className="bg-success/20 text-success">Engaged</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
