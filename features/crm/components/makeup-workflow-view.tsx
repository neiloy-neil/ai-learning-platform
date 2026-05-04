'use client';

import { useState } from 'react';
import { Calendar, CheckCircle, Clock, XCircle, Plus, Search, BookOpen, FileText, AlertCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { makeupSessions, getPendingMakeupSessions, getScheduledMakeupSessions, recordBookletCollection, completeIndependentCheck } from '@/lib/db/observations-data';
import { cn } from '@/lib/cn';
import { MakeUpOption, AcademicImportance } from '@/lib/pcdc-types';

export default function MakeupWorkflowView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showSchedule, setShowSchedule] = useState(false);
  const [selectedSession, setSelectedSession] = useState<any>(null);

  const filteredSessions = makeupSessions.filter(session => {
    const matchesSearch = searchQuery
      ? session.studentName.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesStatus = selectedStatus === 'all' || session.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const pendingSessions = getPendingMakeupSessions();
  const scheduledSessions = getScheduledMakeupSessions();

  const getStatusBadge = (status: string) => {
    const config: Record<string, { label: string; color: string }> = {
      pending: { label: 'Pending', color: 'bg-warning/20 text-warning' },
      scheduled: { label: 'Scheduled', color: 'bg-primary/20 text-primary' },
      completed: { label: 'Completed', color: 'bg-success/20 text-success' },
      cancelled: { label: 'Cancelled', color: 'bg-muted' },
      waived: { label: 'Waived', color: 'bg-blue-500/20 text-blue-500' },
      booklet_assigned: { label: 'Booklet Assigned', color: 'bg-green-500/20 text-green-600' },
      ai_assigned: { label: 'AI Tasks Assigned', color: 'bg-purple-500/20 text-purple-600' },
    };
    const statusConfig = config[status];
    if (!statusConfig) {
      return <Badge className="bg-muted">{status}</Badge>;
    }
    const { label, color } = statusConfig;
    return <Badge className={color}>{label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="glass-panel-strong overflow-hidden px-6 py-5">
        <div className="flex items-start justify-between">
          <div>
            <span className="eyebrow">Attendance Management</span>
            <h1 className="text-3xl font-semibold">Make-up Session Workflow</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Schedule and manage make-up sessions for absent students
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="size-4" />
            Create Make-up Session
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-4xl font-semibold text-warning">{pendingSessions.length}</p>
              <p className="mt-2 text-sm text-muted-foreground">Pending</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-4xl font-semibold text-primary">{scheduledSessions.length}</p>
              <p className="mt-2 text-sm text-muted-foreground">Scheduled</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-4xl font-semibold text-success">
                {makeupSessions.filter(s => s.status === 'completed').length}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">Completed</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Phase 6: Booklet & Independent Check Tracking */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <BookOpen className="size-5 text-green-600" />
              Booklet Collections
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {makeupSessions
                .filter(m => m.makeUpOption === MakeUpOption.BOOKLET_CATCHUP)
                .slice(0, 3)
                .map(session => (
                  <div key={session.id} className="rounded-lg bg-muted/50 p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{session.studentName}</p>
                        <p className="text-xs text-muted-foreground">{session.originalClassName}</p>
                      </div>
                      {session.bookletCollected ? (
                        <Badge className="bg-green-500/20 text-green-600 border-green-500/30">
                          <CheckCircle className="mr-1 size-3" />
                          Collected
                        </Badge>
                      ) : (
                        <Badge className="bg-warning/20 text-warning border-warning/30">
                          <Clock className="mr-1 size-3" />
                          Pending
                        </Badge>
                      )}
                    </div>
                    {!session.bookletCollected && (
                      <Button
                        size="sm"
                        variant="secondary"
                        className="mt-2 w-full"
                        onClick={() => recordBookletCollection(session.id, 'admin-1')}
                      >
                        Mark as Collected
                      </Button>
                    )}
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="size-5 text-purple-600" />
              Independent Checks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {makeupSessions
                .filter(m => m.independentCheckRequired && !m.independentCheckCompleted && m.status === 'completed')
                .slice(0, 3)
                .map(session => (
                  <div key={session.id} className="rounded-lg bg-muted/50 p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{session.studentName}</p>
                        <p className="text-xs text-muted-foreground">{session.originalClassName}</p>
                      </div>
                      <Badge className="bg-purple-500/20 text-purple-600 border-purple-500/30">
                        <AlertCircle className="mr-1 size-3" />
                        Required
                      </Badge>
                    </div>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="mt-2 w-full"
                      onClick={() => completeIndependentCheck(
                        session.id,
                        'Student demonstrated understanding of missed concepts',
                        'admin-1'
                      )}
                    >
                      Complete Check
                    </Button>
                  </div>
                ))}
              {makeupSessions.filter(m => m.independentCheckRequired && !m.independentCheckCompleted && m.status === 'completed').length === 0 && (
                <p className="text-center text-sm text-muted-foreground py-4">No pending independent checks</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

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
          value={selectedStatus}
          onChange={e => setSelectedStatus(e.target.value)}
          className="flex h-10 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
        >
          <option value="all" className="bg-slate-900">All Status</option>
          <option value="pending" className="bg-slate-900">Pending</option>
          <option value="scheduled" className="bg-slate-900">Scheduled</option>
          <option value="completed" className="bg-slate-900">Completed</option>
          <option value="waived" className="bg-slate-900">Waived</option>
        </select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Make-up Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredSessions.map(session => (
              <div key={session.id} className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-semibold">{session.studentName}</p>
                  <p className="text-sm text-muted-foreground">{session.originalClassName}</p>
                  <p className="text-sm text-muted-foreground">
                    Original: {session.originalDate.toLocaleDateString()}
                  </p>
                  {session.makeupDate && (
                    <p className="text-sm text-primary">
                      Make-up: {session.makeupDate.toLocaleDateString()}
                    </p>
                  )}
                  {session.notes && (
                    <p className="mt-1 text-sm text-muted-foreground italic">📝 {session.notes}</p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  {getStatusBadge(session.status)}
                  {session.status === 'pending' && (
                    <Button size="sm" onClick={() => {
                      setSelectedSession(session);
                      setShowSchedule(true);
                    }}>
                      Schedule
                    </Button>
                  )}
                  {session.status === 'scheduled' && (
                    <Button size="sm" variant="success">
                      <CheckCircle className="mr-1 size-3" />
                      Mark Complete
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {showSchedule && selectedSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-2xl rounded-lg bg-background p-6">
            <div className="flex items-start justify-between">
              <h2 className="text-2xl font-semibold">Schedule Make-up Session</h2>
              <Button variant="ghost" onClick={() => setShowSchedule(false)}>✕</Button>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-lg bg-primary/5 p-4">
                <p className="font-semibold">{selectedSession.studentName}</p>
                <p className="text-sm text-muted-foreground">{selectedSession.originalClassName}</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">Make-up Class</label>
                  <select className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white">
                    <option value="" className="bg-slate-900">Select class...</option>
                    <option value="class-1" className="bg-slate-900">Year 3 Math - Monday</option>
                    <option value="class-2" className="bg-slate-900">Year 3 Math - Wednesday</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Make-up Date</label>
                  <Input type="date" />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Notes</label>
                <textarea
                  className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white"
                  rows={3}
                  placeholder="Additional notes..."
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button className="flex-1">Confirm Schedule</Button>
                <Button variant="secondary" onClick={() => setShowSchedule(false)}>Cancel</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
