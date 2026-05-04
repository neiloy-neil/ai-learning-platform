'use client';

import { useState } from 'react';
import {
  Calendar, CheckCircle, XCircle, Clock, UserCheck,
  Search, Filter, Download, Plus, Edit
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { attendanceRecords, calculateAttendanceRate, getAttendanceByClassAndDate } from '@/lib/db/attendance-data';
import { classes } from '@/lib/db/enrolment-data';
import { AttendanceStatus } from '@/lib/pcdc-types';
import { cn } from '@/lib/cn';

export default function AttendanceTrackingView() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMarkAttendance, setShowMarkAttendance] = useState(false);

  // Get filtered attendance records
  const filteredRecords = attendanceRecords.filter(record => {
    const matchesDate = record.date.toDateString() === selectedDate.toDateString();
    const matchesClass = selectedClass === 'all' || record.classId === selectedClass;
    const matchesSearch = searchQuery
      ? record.studentName.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesDate && matchesClass && matchesSearch;
  });

  // Calculate stats for selected date
  const totalStudents = filteredRecords.length;
  const presentCount = filteredRecords.filter(r => r.status === AttendanceStatus.PRESENT).length;
  const absentCount = filteredRecords.filter(r => r.status === AttendanceStatus.ABSENT).length;
  const lateCount = filteredRecords.filter(r => r.status === AttendanceStatus.LATE).length;
  const excusedCount = filteredRecords.filter(r => r.status === AttendanceStatus.EXCUSED).length;
  const attendanceRate = totalStudents > 0 ? ((presentCount + lateCount) / totalStudents * 100).toFixed(1) : '0';

  const getStatusBadge = (status: AttendanceStatus) => {
    const config: Record<AttendanceStatus, { label: string; color: string; icon: any }> = {
      [AttendanceStatus.PRESENT]: { label: 'Present', color: 'bg-success/20 text-success border-success/30', icon: CheckCircle },
      [AttendanceStatus.ABSENT]: { label: 'Absent', color: 'bg-danger/20 text-danger border-danger/30', icon: XCircle },
      [AttendanceStatus.LATE]: { label: 'Late', color: 'bg-warning/20 text-warning border-warning/30', icon: Clock },
      [AttendanceStatus.EXCUSED]: { label: 'Excused', color: 'bg-blue-500/20 text-blue-500 border-blue-500/30', icon: UserCheck },
      [AttendanceStatus.EARLY_DISMISSAL]: { label: 'Early Leave', color: 'bg-purple-500/20 text-purple-500 border-purple-500/30', icon: Clock },
    };
    const { label, color, icon: Icon } = config[status];
    return (
      <Badge className={cn('border gap-1', color)}>
        <Icon className="size-3" />
        {label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel-strong overflow-hidden px-6 py-5">
        <div className="flex items-start justify-between">
          <div>
            <span className="eyebrow">Daily Operations</span>
            <h1 className="text-3xl font-semibold">Attendance Tracking</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Track student attendance, check-in/check-out times, and absence notes
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" className="gap-2">
              <Calendar className="size-4" />
              {selectedDate.toLocaleDateString()}
            </Button>
            <Button className="gap-2" onClick={() => setShowMarkAttendance(true)}>
              <Plus className="size-4" />
              Mark Attendance
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-4xl font-semibold text-primary">{attendanceRate}%</p>
              <p className="mt-2 text-sm text-muted-foreground">Attendance Rate</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-4xl font-semibold text-success">{presentCount}</p>
              <p className="mt-2 text-sm text-muted-foreground">Present</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-4xl font-semibold text-danger">{absentCount}</p>
              <p className="mt-2 text-sm text-muted-foreground">Absent</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-4xl font-semibold text-warning">{lateCount}</p>
              <p className="mt-2 text-sm text-muted-foreground">Late</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-4xl font-semibold text-blue-500">{excusedCount}</p>
              <p className="mt-2 text-sm text-muted-foreground">Excused</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex-1 min-w-[300px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search students..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <select
          value={selectedClass}
          onChange={e => setSelectedClass(e.target.value)}
          className="flex h-10 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="all" className="bg-slate-900">All Classes</option>
          {classes.map(cls => (
            <option key={cls.id} value={cls.id} className="bg-slate-900">{cls.name}</option>
          ))}
        </select>
        <Button variant="secondary" className="gap-2">
          <Filter className="size-4" />
          More Filters
        </Button>
        <Button variant="secondary" className="gap-2">
          <Download className="size-4" />
          Export
        </Button>
      </div>

      {/* Attendance Records Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Attendance Records - {selectedDate.toLocaleDateString('en-AU', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredRecords.length > 0 ? (
            <div className="space-y-2">
              {filteredRecords.map(record => (
                <div
                  key={record.id}
                  className="flex items-center justify-between rounded-lg border p-4 transition-all hover:border-primary"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <p className="font-semibold">{record.studentName}</p>
                      {getStatusBadge(record.status)}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{record.className}</p>
                    {record.notes && (
                      <p className="mt-1 text-sm text-muted-foreground italic">
                        📝 {record.notes}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-6 text-sm">
                    {record.checkInTime && (
                      <div className="text-right">
                        <p className="text-muted-foreground">Check In</p>
                        <p className="font-medium">
                          {record.checkInTime.toLocaleTimeString('en-AU', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    )}
                    {record.checkOutTime && (
                      <div className="text-right">
                        <p className="text-muted-foreground">Check Out</p>
                        <p className="font-medium">
                          {record.checkOutTime.toLocaleTimeString('en-AU', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    )}
                    <Button size="sm" variant="secondary" className="gap-1">
                      <Edit className="size-3" />
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <Calendar className="mx-auto mb-4 size-12 text-muted-foreground" />
              <p className="text-lg font-medium">No attendance records</p>
              <p className="mt-2 text-sm text-muted-foreground">
                No records found for the selected date and filters
              </p>
              <Button className="mt-4" onClick={() => setShowMarkAttendance(true)}>
                <Plus className="mr-2 size-4" />
                Mark Attendance
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Student Attendance Rates */}
      <Card>
        <CardHeader>
          <CardTitle>Student Attendance Rates (This Term)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {classes.slice(0, 3).map(cls => {
              const classStudents = attendanceRecords
                .filter(r => r.classId === cls.id)
                .map(r => r.studentId)
                .filter((v, i, a) => a.indexOf(v) === i);

              return classStudents.map(studentId => {
                const student = attendanceRecords.find(r => r.studentId === studentId);
                if (!student) return null;
                const rate = calculateAttendanceRate(studentId, cls.id);
                return (
                  <div key={`${studentId}-${cls.id}`} className="flex items-center justify-between rounded-lg border p-3">
                    <div>
                      <p className="font-medium">{student.studentName}</p>
                      <p className="text-sm text-muted-foreground">{cls.name}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-32">
                        <div className="h-2 rounded-full bg-muted">
                          <div
                            className={cn(
                              'h-full rounded-full',
                              rate >= 90 ? 'bg-success' :
                              rate >= 75 ? 'bg-warning' : 'bg-danger'
                            )}
                            style={{ width: `${rate}%` }}
                          />
                        </div>
                      </div>
                      <Badge className={cn(
                        rate >= 90 ? 'bg-success/20 text-success' :
                        rate >= 75 ? 'bg-warning/20 text-warning' : 'bg-danger/20 text-danger'
                      )}>
                        {rate.toFixed(0)}%
                      </Badge>
                    </div>
                  </div>
                );
              });
            }).filter(Boolean)}
          </div>
        </CardContent>
      </Card>

      {/* Mark Attendance Modal */}
      {showMarkAttendance && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-2xl rounded-lg bg-background p-6">
            <div className="flex items-start justify-between">
              <h2 className="text-2xl font-semibold">Mark Attendance</h2>
              <Button variant="ghost" onClick={() => setShowMarkAttendance(false)}>✕</Button>
            </div>

            <div className="mt-6 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">Select Class</label>
                  <select className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white">
                    <option value="" className="bg-slate-900">Choose class...</option>
                    {classes.map(cls => (
                      <option key={cls.id} value={cls.id} className="bg-slate-900">{cls.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Date</label>
                  <Input type="date" defaultValue={selectedDate.toISOString().split('T')[0]} />
                </div>
              </div>

              <div className="rounded-lg bg-primary/5 p-4">
                <p className="text-sm font-medium">Quick Actions</p>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" variant="secondary" className="gap-1">
                    <CheckCircle className="size-3" />
                    Mark All Present
                  </Button>
                  <Button size="sm" variant="secondary">
                    Import from File
                  </Button>
                </div>
              </div>

              <p className="text-center text-sm text-muted-foreground">
                Select a class to view and mark attendance for students
              </p>

              <div className="flex gap-2 pt-4">
                <Button className="flex-1">Save Attendance</Button>
                <Button variant="secondary" onClick={() => setShowMarkAttendance(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
