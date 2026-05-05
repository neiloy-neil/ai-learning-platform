'use client';

import { useState } from 'react';
import {
  Users, Calendar, FileText, DollarSign, Bell, TrendingUp,
  Clock, CheckCircle, AlertTriangle, ChevronDown, ChevronUp,
  Mail, Phone, MapPin
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { makeupSessions } from '@/lib/db/observations-data';
import { attendanceRecords, homeworkSubmissions } from '@/lib/db/attendance-data';
import { studentAttempts, notifications } from '@/lib/db/data';
import { mockAssessments } from '@/lib/mock-data';
import { students, families, parents } from '@/lib/db/crm-data';
import { classes } from '@/lib/db/enrolment-data';
import { cn } from '@/lib/cn';

export default function FamilyDashboardView() {
  const [selectedChild, setSelectedChild] = useState<string | null>(null);
  const [showBilling, setShowBilling] = useState(false);
  const [showAttendance, setShowAttendance] = useState(false);
  const [showPaymentHistory, setShowPaymentHistory] = useState(false);
  const [showMakeupLessons, setShowMakeupLessons] = useState(false);

  // Mock data - in production, this would come from auth context
  const currentParentId = 'parent-1';
  const currentParent = parents.find(p => p.id === currentParentId);
  const currentFamily = families.find(f => f.id === currentParent?.familyId);
  const familyStudents = students.filter(s => currentFamily?.studentIds.includes(s.id));

  // If no child selected and we have children, select the first one
  const activeChild = selectedChild && familyStudents.find(s => s.id === selectedChild)
    ? familyStudents.find(s => s.id === selectedChild)
    : familyStudents[0];

  const activeChildClass = classes.find(c => c.id === activeChild?.currentClassId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel-strong overflow-hidden px-6 py-5">
        <div className="flex items-start justify-between">
          <div>
            <span className="eyebrow">Family Portal</span>
            <h1 className="text-3xl font-semibold">Welcome, {currentParent?.firstName}!</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage your family account and track your children's progress
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" className="gap-2">
              <Bell className="size-4" />
              Notifications
            </Button>
            <Button className="gap-2">
              <FileText className="size-4" />
              View Reports
            </Button>
          </div>
        </div>
      </div>

      {/* Child Selector */}
      {familyStudents.length > 1 && (
        <div className="glass-panel-strong overflow-hidden p-6">
          <h2 className="text-lg font-semibold mb-4">Select Child</h2>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {familyStudents.map((student) => (
              <button
                key={student.id}
                className={cn(
                  'flex items-center gap-4 rounded-lg border-2 p-4 text-left transition-all',
                  activeChild?.id === student.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                )}
                onClick={() => setSelectedChild(student.id)}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Users className="size-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{student.firstName} {student.lastName}</p>
                  <p className="text-sm text-muted-foreground">{student.grade} • {student.school}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Attendance Rate</p>
                <p className="mt-2 text-3xl font-semibold">95%</p>
                <p className="mt-1 text-xs text-success">+2% this month</p>
              </div>
              <div className="rounded-lg bg-success/10 p-3">
                <CheckCircle className="size-5 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Assessments Done</p>
                <p className="mt-2 text-3xl font-semibold">12</p>
                <p className="mt-1 text-xs text-muted-foreground">This term</p>
              </div>
              <div className="rounded-lg bg-primary/10 p-3">
                <FileText className="size-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Next Class</p>
                <p className="mt-2 text-lg font-semibold">Tomorrow</p>
                <p className="mt-1 text-xs text-muted-foreground">3:00 PM - 4:30 PM</p>
              </div>
              <div className="rounded-lg bg-blue-500/10 p-3">
                <Calendar className="size-5 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Outstanding Balance</p>
                <p className="mt-2 text-3xl font-semibold">$245</p>
                <p className="mt-1 text-xs text-warning">Due May 15</p>
              </div>
              <div className="rounded-lg bg-warning/10 p-3">
                <DollarSign className="size-5 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Child Progress */}
      {activeChild && (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Progress Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="size-5 text-primary" />
                {activeChild.firstName}'s Progress
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {activeChild.grade} - {activeChildClass?.name}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Mathematics</span>
                  <Badge className="bg-success/20 text-success">Mastered</Badge>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div className="h-full w-[85%] rounded-full bg-success" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Reading</span>
                  <Badge className="bg-warning/20 text-warning">Developing</Badge>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div className="h-full w-[65%] rounded-full bg-warning" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Writing</span>
                  <Badge className="bg-primary/20 text-primary">Near Mastery</Badge>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div className="h-full w-[75%] rounded-full bg-primary" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Science</span>
                  <Badge className="bg-success/20 text-success">Mastered</Badge>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div className="h-full w-[90%] rounded-full bg-success" />
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-2">Recent Assessments</h4>
                <div className="space-y-2">
                    {studentAttempts.filter(attempt => (attempt as any).studentId === activeChild.id && attempt.source === 'assessment').slice(0, 3).map(attempt => (
                        <div key={attempt.id} className="flex items-center justify-between text-sm">
                            <span>{mockAssessments.find(a => a.id === (attempt as any).assessmentId)?.title}</span>
                            <span className="font-semibold">{Math.round((attempt as any).percentage)}%</span>
                        </div>
                    ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-2">Attendance Summary</h4>
                <div className="flex justify-around text-center">
                    <div>
                        <p className="text-2xl font-bold">{attendanceRecords.filter(r => r.studentId === activeChild.id && r.status === 'present').length}</p>
                        <p className="text-xs text-muted-foreground">Present</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold">{attendanceRecords.filter(r => r.studentId === activeChild.id && r.status === 'absent').length}</p>
                        <p className="text-xs text-muted-foreground">Absent</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold">{attendanceRecords.filter(r => r.studentId === activeChild.id && r.status === 'late').length}</p>
                        <p className="text-xs text-muted-foreground">Late</p>
                    </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-2">Homework Status</h4>
                <div className="flex justify-around text-center">
                    <div>
                        <p className="text-2xl font-bold">{homeworkSubmissions.filter(s => s.studentId === activeChild.id && s.status === 'submitted').length}</p>
                        <p className="text-xs text-muted-foreground">Submitted</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold">{homeworkSubmissions.filter(s => s.studentId === activeChild.id && s.status === 'overdue').length}</p>
                        <p className="text-xs text-muted-foreground">Overdue</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold">{homeworkSubmissions.filter(s => s.studentId === activeChild.id && s.status === 'graded').length}</p>
                        <p className="text-xs text-muted-foreground">Graded</p>
                    </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="size-5 text-blue-500" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: 'Completed Math Assessment', date: '2 days ago', type: 'success' },
                  { action: 'Attended Science Class', date: '3 days ago', type: 'success' },
                  { action: 'Homework Submitted', date: '4 days ago', type: 'success' },
                  { action: 'Reading Task Assigned', date: '5 days ago', type: 'info' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={cn(
                      'mt-1 h-2 w-2 rounded-full',
                      activity.type === 'success' ? 'bg-success' : 'bg-blue-500'
                    )} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Upcoming Classes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="size-5 text-blue-500" />
            This Week's Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { day: 'Monday', time: '3:00 PM - 4:30 PM', subject: 'Mathematics', teacher: 'Mr. Anderson' },
              { day: 'Wednesday', time: '3:00 PM - 4:30 PM', subject: 'Mathematics', teacher: 'Mr. Anderson' },
              { day: 'Friday', time: '4:00 PM - 5:30 PM', subject: 'Science', teacher: 'Ms. Taylor' },
            ].map((cls, index) => (
              <div key={index} className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-blue-500/10 p-3">
                    <Calendar className="size-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium">{cls.subject}</p>
                    <p className="text-sm text-muted-foreground">{cls.teacher}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{cls.day}</p>
                  <p className="text-sm text-muted-foreground">{cls.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Billing & Invoices Section */}
      <Card>
        <CardHeader
          className="cursor-pointer"
          onClick={() => setShowBilling(!showBilling)}
        >
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="size-5 text-warning" />
              Billing & Invoices
            </CardTitle>
            {showBilling ? <ChevronUp className="size-5" /> : <ChevronDown className="size-5" />}
          </div>
        </CardHeader>
        {showBilling && (
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Invoice #INV-2026-042</p>
                    <p className="text-sm text-muted-foreground">Term 2 - Mathematics</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">$245.00</p>
                    <Badge className="mt-1 bg-warning/20 text-warning">Pending</Badge>
                  </div>
                </div>
                <div className="mt-3 flex justify-end gap-2">
                  <Button size="sm" variant="secondary">Download</Button>
                  <Button size="sm">Pay Now</Button>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Invoice #INV-2026-038</p>
                    <p className="text-sm text-muted-foreground">Term 1 - Science</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">$220.00</p>
                    <Badge className="mt-1 bg-success/20 text-success">Paid</Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
                <Button variant="outline" onClick={() => setShowPaymentHistory(!showPaymentHistory)}>
                    {showPaymentHistory ? 'Hide' : 'Show'} Payment History
                </Button>
                {showPaymentHistory && (
                    <div className="mt-4 space-y-3">
                        <div className="flex items-center justify-between rounded-lg border p-3">
                            <div>
                                <p className="font-medium">Payment for Invoice #INV-2026-038</p>
                                <p className="text-sm text-muted-foreground">Paid on May 1, 2026</p>
                            </div>
                            <p className="font-semibold">$220.00</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-4">
                <Button variant="outline" onClick={() => setShowMakeupLessons(!showMakeupLessons)}>
                    {showMakeupLessons ? 'Hide' : 'Show'} Make-up Lessons
                </Button>
                {showMakeupLessons && (
                    <div className="mt-4 space-y-3">
                        {makeupSessions.filter(m => m.studentId === activeChild.id).map(session => (
                            <div key={session.id} className="flex items-center justify-between rounded-lg border p-3">
                                <div>
                                    <p className="font-medium">Missed: {session.originalClassName}</p>
                                    <p className="text-sm text-muted-foreground">on {new Date(session.originalDate).toLocaleDateString()}</p>
                                </div>
                                <Button size="sm">Request Make-up</Button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Attendance History */}
      <Card>
        <CardHeader
          className="cursor-pointer"
          onClick={() => setShowAttendance(!showAttendance)}
        >
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="size-5 text-success" />
              Attendance History
            </CardTitle>
            {showAttendance ? <ChevronUp className="size-5" /> : <ChevronDown className="size-5" />}
          </div>
        </CardHeader>
        {showAttendance && (
          <CardContent>
            <div className="space-y-3">
              {[
                { date: 'May 2, 2026', status: 'Present', class: 'Mathematics' },
                { date: 'April 30, 2026', status: 'Present', class: 'Mathematics' },
                { date: 'April 28, 2026', status: 'Absent', class: 'Science', note: 'Make-up scheduled' },
                { date: 'April 26, 2026', status: 'Present', class: 'Mathematics' },
              ].map((record, index) => (
                <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'h-2 w-2 rounded-full',
                      record.status === 'Present' ? 'bg-success' : 'bg-danger'
                    )} />
                    <div>
                      <p className="text-sm font-medium">{record.class}</p>
                      <p className="text-xs text-muted-foreground">{record.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={record.status === 'Present' ? 'bg-success/20 text-success' : 'bg-danger/20 text-danger'}>
                      {record.status}
                    </Badge>
                    {record.note && (
                      <p className="mt-1 text-xs text-muted-foreground">{record.note}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Family Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="size-5 text-purple-500" />
            Family Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-muted-foreground uppercase">Contact Details</p>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="size-4 text-muted-foreground" />
                <span>{currentFamily?.primaryEmail}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="size-4 text-muted-foreground" />
                <span>{currentFamily?.primaryPhone}</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="size-4 text-muted-foreground mt-0.5" />
                <span>{currentFamily?.address.street}, {currentFamily?.address.city}</span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold text-muted-foreground uppercase">Emergency Contact</p>
              <p className="text-sm font-medium">{currentFamily?.emergencyContact.name}</p>
              <p className="text-sm text-muted-foreground">{currentFamily?.emergencyContact.relationship}</p>
              <p className="text-sm">{currentFamily?.emergencyContact.phone}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Messages */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="size-5 text-blue-500" />
            Messages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.filter(n => n.userId === currentParent.id).slice(0, 3).map(notification => (
              <div key={notification.id} className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10">
                  <Mail className="size-4 text-blue-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{notification.text}</p>
                  <p className="text-xs text-muted-foreground">{new Date(notification.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <Button variant="outline">View All Messages</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
