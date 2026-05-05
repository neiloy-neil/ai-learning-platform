'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  Users,
  BookOpen,
  BarChart3,
  Mail,
  Activity,
  TrendingUp,
  Clock,
  Server,
  Download,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  AlertTriangle,
  CheckCircle,
  XCircle,
  LineChart,
} from 'lucide-react';

import PageHeader from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsTrigger } from '@/components/ui/tabs';
import { adminUsers, adminClasses, systemMetrics, adminReports, bulkEmails } from '@/lib/db/admin-data';
import { classes } from '@/lib/db/enrolment-data';
import { attendanceRecords } from '@/lib/db/attendance-data';
import { makeupSessions } from '@/lib/db/observations-data';
import { diagnosticBookings, leads, students } from '@/lib/db/crm-data';
import { studentAttempts } from '@/lib/db/data';
import { invoices } from '@/lib/db/billing-data';
import { enrolments } from '@/lib/db/enrolment-data';
import { mockAssessments } from '@/lib/mock-data';
import { cn } from '@/lib/cn';

export default function AdminDashboardView() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  // Set active tab based on current pathname
  useEffect(() => {
    if (pathname?.includes('/users')) setActiveTab('users');
    else if (pathname?.includes('/classes')) setActiveTab('classes');
    else if (pathname?.includes('/reports')) setActiveTab('reports');
    else if (pathname?.includes('/emails')) setActiveTab('emails');
    else setActiveTab('overview');
  }, [pathname]);

  return (
    <div className="space-y-8">
      <div className="glass-panel-strong overflow-hidden px-6 py-5">
        <div className="space-y-2">
          <span className="eyebrow">Admin Portal</span>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">Admin Dashboard</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">Manage users, classes, reports, and system operations</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex space-x-4 border-b">
          {['overview', 'users', 'classes', 'reports', 'emails'].map((tab) => (
            <button
              key={tab}
              className={cn(
                "pb-2 border-b-2 text-sm font-medium transition-colors capitalize",
                activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
              )}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'users' && <UsersTab searchQuery={searchQuery} onSearchChange={setSearchQuery} />}
        {activeTab === 'classes' && <ClassesTab />}
        {activeTab === 'reports' && <ReportsTab />}
        {activeTab === 'emails' && <EmailsTab />}
        {activeTab === 'leads' && <LeadsTab />}
      </div>
    </div>
  );
}

function OverviewTab() {
  return (
    <>
      {/* Today's Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Overview</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Classes Scheduled Today</p>
            <p className="text-3xl font-bold">{classes.filter(c => c.dayOfWeek === new Date().toLocaleString('en-us', {  weekday: 'long' })).length}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Attendance Rate Today</p>
            <p className="text-3xl font-bold">{Math.round(attendanceRecords.filter(r => new Date(r.date).toDateString() === new Date().toDateString() && r.status === 'present').length / attendanceRecords.filter(r => new Date(r.date).toDateString() === new Date().toDateString()).length * 100)}%</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Pending Make-up Lessons</p>
            <p className="text-3xl font-bold">{makeupSessions.filter(m => m.status === 'pending').length}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Upcoming Diagnostics</p>
            <p className="text-3xl font-bold">{diagnosticBookings.filter(b => new Date(b.date) >= new Date()).length}</p>
          </div>
        </CardContent>
      </Card>

      {/* Pending Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">New Leads</p>
            <p className="text-3xl font-bold">{leads.filter(l => l.status === 'new').length}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Unpaid Invoices</p>
            <p className="text-3xl font-bold">{invoices.filter(i => i.status === 'sent' || i.status === 'overdue').length}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Make-up Lessons to Schedule</p>
            <p className="text-3xl font-bold">{makeupSessions.filter(m => m.status === 'pending').length}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Assessment Reminders</p>
            <p className="text-3xl font-bold">{mockAssessments.filter(a => new Date(a.dueDate) < new Date()).length}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Enrolment Approvals Pending</p>
            <p className="text-3xl font-bold">{enrolments.filter(e => e.status === 'pending').length}</p>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Key Metrics</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Total Active Students</p>
            <p className="text-3xl font-bold">{students.filter(s => s.status === 'active').length}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Classes This Week</p>
            <p className="text-3xl font-bold">{classes.length}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Weekly Attendance Rate</p>
            <p className="text-3xl font-bold">{Math.round(attendanceRecords.filter(r => r.status === 'present').length / attendanceRecords.length * 100)}%</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Assessment Completion Rate</p>
            <p className="text-3xl font-bold">{Math.round(studentAttempts.filter(a => a.source === 'assessment').length / mockAssessments.length * 100)}%</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Outstanding Invoice Total</p>
            <p className="text-3xl font-bold">${invoices.reduce((acc, i) => acc + i.outstandingAmount, 0)}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">New Enquiries This Week</p>
            <p className="text-3xl font-bold">{leads.filter(l => new Date(l.createdDate) >= new Date(new Date().setDate(new Date().getDate() - 7))).length}</p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          <Button className="w-full justify-start" variant="secondary">
            <Plus className="mr-2 size-4" />
            Add New Lead
          </Button>
          <Button className="w-full justify-start" variant="secondary">
            <Plus className="mr-2 size-4" />
            Book Diagnostic
          </Button>
          <Button className="w-full justify-start" variant="secondary">
            <BookOpen className="mr-2 size-4" />
            Create Class
          </Button>
          <Button className="w-full justify-start" variant="secondary">
            <Download className="mr-2 size-4" />
            Generate Invoice
          </Button>
          <Button className="w-full justify-start" variant="secondary">
            <Mail className="mr-2 size-4" />
            Send Bulk Email
          </Button>
        </CardContent>
      </Card>
    </>
  );
}

function UsersTab({ searchQuery, onSearchChange }: { searchQuery: string; onSearchChange: (value: string) => void }) {
  const [selectedRole, setSelectedRole] = useState<string>('all');

  const filteredUsers = adminUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="student">Students</option>
            <option value="teacher">Teachers</option>
            <option value="parent">Parents</option>
            <option value="admin">Admins</option>
          </select>
        </div>
        <Button>
          <Plus className="mr-2 size-4" />
          Add User
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Role</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                  <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-t border-border/50">
                    <td className="px-4 py-3">
                      <p className="font-medium">{user.name}</p>
                    </td>
                    <td className="px-4 py-3 text-sm">{user.email}</td>
                    <td className="px-4 py-3">
                      <Badge variant={user.role === 'admin' ? 'destructive' : user.role === 'teacher' ? 'default' : 'secondary'}>
                        {user.role}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className="text-emerald-600 border-emerald-600">
                        Active
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="size-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit className="size-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

function ClassesTab() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Class Management</h2>
        <Button>
          <Plus className="mr-2 size-4" />
          Create Class
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {adminClasses.map((classItem) => {
          const occupancy = (classItem.enrolledStudents.length / classItem.maxCapacity) * 100;
          return (
            <Card key={classItem.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{classItem.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{classItem.subject} • {classItem.grade}</p>
                  </div>
                  <Badge variant={classItem.status === 'active' ? 'default' : classItem.status === 'upcoming' ? 'secondary' : 'outline'}>
                    {classItem.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Teacher</span>
                  <span className="font-medium">{classItem.teacherName}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Schedule</span>
                  <span className="font-medium">{classItem.schedule}</span>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Occupancy</span>
                    <span className="font-medium">{classItem.enrolledStudents.length}/{classItem.maxCapacity}</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div
                      className={cn(
                        "h-2 rounded-full transition-all",
                        occupancy > 90 ? 'bg-red-500' : occupancy > 70 ? 'bg-amber-500' : 'bg-emerald-500'
                      )}
                      style={{ width: `${occupancy}%` }}
                    />
                  </div>
                </div>
                {classItem.waitlist.length > 0 && (
                  <div className="flex items-center gap-2 text-sm text-amber-600">
                    <AlertTriangle className="size-4" />
                    <span>{classItem.waitlist.length} on waitlist</span>
                  </div>
                )}
                <div className="flex gap-2">
                  <Button size="sm" variant="secondary" className="flex-1">
                    <Edit className="mr-2 size-4" />
                    Edit
                  </Button>
                  <Button size="sm" variant="secondary" className="flex-1">
                    <Eye className="mr-2 size-4" />
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}

function ReportsTab() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Report Generator</h2>
        <Button>
          <Plus className="mr-2 size-4" />
          Generate New Report
        </Button>
      </div>

      <div className="grid gap-4">
        {adminReports.map((report) => (
          <Card key={report.id}>
            <CardContent className="flex items-center justify-between p-6">
              <div className="flex-1">
                <h3 className="font-semibold">{report.title}</h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <span>{report.type.replace('_', ' ')}</span>
                  <span>•</span>
                  <span>{report.generatedAt.toLocaleDateString()}</span>
                  <span>•</span>
                  <Badge variant="outline" className="uppercase">
                    {report.format}
                  </Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm">
                  <Download className="mr-2 size-4" />
                  Download
                </Button>
                <Button size="sm" variant="secondary">
                  <Eye className="size-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}

function EmailsTab() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Bulk Email System</h2>
        <Button>
          <Plus className="mr-2 size-4" />
          Compose Email
        </Button>
      </div>

      <div className="grid gap-4">
        {bulkEmails.map((email) => (
          <Card key={email.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">{email.subject}</h3>
                    <Badge variant={email.status === 'sent' ? 'default' : email.status === 'scheduled' ? 'secondary' : 'destructive'}>
                      {email.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{email.body}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4 text-muted-foreground">
                  <span>To: {email.recipientType.replace(/_/g, ' ')}</span>
                  <span>•</span>
                  <span>{email.recipientCount} recipients</span>
                  <span>•</span>
                  <span>{email.sentAt.toLocaleString()}</span>
                </div>
                <Button size="sm" variant="ghost">
                  <MoreVertical className="size-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}

function MetricCard({ title, value, icon: Icon, trend, trendUp, color }: any) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold mt-2">{value}</p>
            <p className={cn("text-sm mt-2", trendUp ? 'text-emerald-600' : 'text-red-600')}>
              {trend}
            </p>
          </div>
          <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white", color)}>
            <Icon className="size-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function HealthMetric({ label, value, good }: { label: string; value: string; good: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm">{label}</span>
      <div className="flex items-center gap-2">
        {good ? (
          <CheckCircle className="size-4 text-emerald-600" />
        ) : (
          <XCircle className="size-4 text-red-600" />
        )}
        <span className="text-sm font-medium">{value}</span>
      </div>
    </div>
  );
}
