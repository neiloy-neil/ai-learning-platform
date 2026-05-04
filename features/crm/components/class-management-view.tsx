'use client';

import { useState } from 'react';
import {
  Users, Calendar, Clock, MapPin, TrendingUp, AlertCircle,
  Plus, Search, Filter, Eye, Edit, UserPlus, MoreVertical
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { classes, enrolments, waitlist, getOccupancyRate, getWaitlistByClassId, getEnrolmentsByClassId } from '@/lib/db/enrolment-data';
import { EnrolmentClass } from '@/lib/pcdc-types';
import { cn } from '@/lib/cn';

export default function ClassManagementView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedClass, setSelectedClass] = useState<EnrolmentClass | null>(null);
  const [showEnrolments, setShowEnrolments] = useState(false);
  const [showWaitlist, setShowWaitlist] = useState(false);

  // Filter classes
  const filteredClasses = classes.filter(cls => {
    const matchesSearch = searchQuery
      ? cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cls.teacherName.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesLevel = selectedLevel === 'all' || cls.level === selectedLevel;
    const matchesSubject = selectedSubject === 'all' || cls.subject === selectedSubject;
    return matchesSearch && matchesLevel && matchesSubject;
  });

  // Get unique levels and subjects for filters
  const levels = Array.from(new Set(classes.map(c => c.level)));
  const subjects = Array.from(new Set(classes.map(c => c.subject)));

  // Calculate metrics
  const totalClasses = classes.length;
  const activeClasses = classes.filter(c => c.status === 'active').length;
  const fullClasses = classes.filter(c => c.status === 'full').length;
  const totalEnrolled = classes.reduce((sum, c) => sum + c.enrolledCount, 0);
  const totalCapacity = classes.reduce((sum, c) => sum + c.maxCapacity, 0);
  const overallOccupancy = totalCapacity > 0 ? ((totalEnrolled / totalCapacity) * 100).toFixed(1) : '0';
  const totalWaitlisted = classes.reduce((sum, c) => sum + c.waitlistCount, 0);

  const getStatusBadge = (status: string) => {
    const config: Record<string, { label: string; color: string }> = {
      active: { label: 'Active', color: 'bg-success/20 text-success border-success/30' },
      full: { label: 'Full', color: 'bg-danger/20 text-danger border-danger/30' },
      waitlist: { label: 'Waitlist', color: 'bg-warning/20 text-warning border-warning/30' },
      cancelled: { label: 'Cancelled', color: 'bg-muted text-muted-foreground border-border' },
      completed: { label: 'Completed', color: 'bg-muted text-muted-foreground border-border' },
    };
    const { label, color } = config[status] || { label: status, color: 'bg-muted' };
    return <Badge className={cn('border', color)}>{label}</Badge>;
  };

  const getOccupancyBadge = (rate: number) => {
    if (rate >= 90) return <Badge className="bg-danger/20 text-danger">{rate.toFixed(0)}% Full</Badge>;
    if (rate >= 70) return <Badge className="bg-warning/20 text-warning">{rate.toFixed(0)}% Full</Badge>;
    return <Badge className="bg-success/20 text-success">{rate.toFixed(0)}% Full</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel-strong overflow-hidden px-6 py-5">
        <div className="flex items-start justify-between">
          <div>
            <span className="eyebrow">Enrolment Management</span>
            <h1 className="text-3xl font-semibold">Class Management</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage classes, track enrolments, and monitor capacity
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" className="gap-2">
              <Calendar className="size-4" />
              View Schedule
            </Button>
            <Button className="gap-2">
              <Plus className="size-4" />
              Create Class
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Metrics */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Classes</p>
                <p className="mt-2 text-3xl font-semibold">{totalClasses}</p>
                <p className="mt-1 text-xs text-muted-foreground">This term</p>
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
                <p className="text-sm text-muted-foreground">Active Classes</p>
                <p className="mt-2 text-3xl font-semibold">{activeClasses}</p>
                <p className="mt-1 text-xs text-success">Running now</p>
              </div>
              <div className="rounded-lg bg-success/10 p-3">
                <TrendingUp className="size-5 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Enrolled</p>
                <p className="mt-2 text-3xl font-semibold">{totalEnrolled}</p>
                <p className="mt-1 text-xs text-muted-foreground">Across all classes</p>
              </div>
              <div className="rounded-lg bg-primary/10 p-3">
                <Users className="size-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Occupancy Rate</p>
                <p className="mt-2 text-3xl font-semibold">{overallOccupancy}%</p>
                <p className="mt-1 text-xs text-warning">+3.2% vs last term</p>
              </div>
              <div className="rounded-lg bg-warning/10 p-3">
                <AlertCircle className="size-5 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Waitlisted</p>
                <p className="mt-2 text-3xl font-semibold">{totalWaitlisted}</p>
                <p className="mt-1 text-xs text-muted-foreground">Waiting for spots</p>
              </div>
              <div className="rounded-lg bg-purple-500/10 p-3">
                <UserPlus className="size-5 text-purple-500" />
              </div>
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
              placeholder="Search classes by name or teacher..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <select
          value={selectedLevel}
          onChange={e => setSelectedLevel(e.target.value)}
          className="flex h-10 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="all" className="bg-slate-900">All Levels</option>
          {levels.map(level => (
            <option key={level} value={level} className="bg-slate-900">{level}</option>
          ))}
        </select>
        <select
          value={selectedSubject}
          onChange={e => setSelectedSubject(e.target.value)}
          className="flex h-10 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="all" className="bg-slate-900">All Subjects</option>
          {subjects.map(subject => (
            <option key={subject} value={subject} className="bg-slate-900">{subject}</option>
          ))}
        </select>
        <Button variant="secondary" className="gap-2">
          <Filter className="size-4" />
          More Filters
        </Button>
      </div>

      {/* Classes Grid */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredClasses.map(cls => {
          const occupancyRate = getOccupancyRate(cls.id);
          const classEnrolments = getEnrolmentsByClassId(cls.id);
          const classWaitlist = getWaitlistByClassId(cls.id);

          return (
            <Card
              key={cls.id}
              className="cursor-pointer transition-all hover:border-primary hover:shadow-lg"
              onClick={() => setSelectedClass(cls)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{cls.name}</CardTitle>
                    <p className="mt-1 text-sm text-muted-foreground">{cls.description}</p>
                  </div>
                  {getStatusBadge(cls.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* Class Info */}
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="size-4 text-muted-foreground" />
                      <span>{cls.dayOfWeek}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="size-4 text-muted-foreground" />
                      <span>{cls.startTime} - {cls.endTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="size-4 text-muted-foreground" />
                      <span>{cls.teacherName}</span>
                    </div>
                    {cls.roomId && (
                      <div className="flex items-center gap-2">
                        <MapPin className="size-4 text-muted-foreground" />
                        <span>{cls.roomId}</span>
                      </div>
                    )}
                  </div>

                  {/* Occupancy Bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Enrolment</span>
                      {getOccupancyBadge(occupancyRate)}
                    </div>
                    <div className="h-2 rounded-full bg-muted">
                      <div
                        className={cn(
                          'h-full rounded-full transition-all',
                          occupancyRate >= 90 ? 'bg-danger' :
                          occupancyRate >= 70 ? 'bg-warning' : 'bg-success'
                        )}
                        style={{ width: `${occupancyRate}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{cls.enrolledCount} / {cls.maxCapacity} students</span>
                      {cls.waitlistCount > 0 && (
                        <span className="text-purple-500">{cls.waitlistCount} on waitlist</span>
                      )}
                    </div>
                  </div>

                  {/* Term Dates */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                    <span>Term: {cls.termStart.toLocaleDateString()} - {cls.termEnd.toLocaleDateString()}</span>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="secondary" className="flex-1 gap-1">
                      <Eye className="size-3" />
                      View
                    </Button>
                    <Button size="sm" variant="secondary" className="flex-1 gap-1">
                      <Edit className="size-3" />
                      Edit
                    </Button>
                    <Button size="sm" className="flex-1 gap-1">
                      <UserPlus className="size-3" />
                      Enrol
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Class Detail Modal */}
      {selectedClass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-background p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-semibold">{selectedClass.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {selectedClass.level} • {selectedClass.subject}
                </p>
              </div>
              <Button variant="ghost" onClick={() => setSelectedClass(null)}>
                ✕
              </Button>
            </div>

            <div className="mt-6 space-y-6">
              {/* Class Details */}
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Class Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <p className="text-muted-foreground">Teacher:</p>
                      <p className="font-medium">{selectedClass.teacherName}</p>
                      <p className="text-muted-foreground">Day:</p>
                      <p className="font-medium">{selectedClass.dayOfWeek}</p>
                      <p className="text-muted-foreground">Time:</p>
                      <p className="font-medium">{selectedClass.startTime} - {selectedClass.endTime}</p>
                      <p className="text-muted-foreground">Room:</p>
                      <p className="font-medium">{selectedClass.roomId || 'TBD'}</p>
                      <p className="text-muted-foreground">Capacity:</p>
                      <p className="font-medium">{selectedClass.maxCapacity} students</p>
                      <p className="text-muted-foreground">Status:</p>
                      <div>{getStatusBadge(selectedClass.status)}</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Enrolment Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Occupancy Rate</span>
                        {getOccupancyBadge(getOccupancyRate(selectedClass.id))}
                      </div>
                      <div className="h-3 rounded-full bg-muted">
                        <div
                          className={cn(
                            'h-full rounded-full transition-all',
                            getOccupancyRate(selectedClass.id) >= 90 ? 'bg-danger' :
                            getOccupancyRate(selectedClass.id) >= 70 ? 'bg-warning' : 'bg-success'
                          )}
                          style={{ width: `${getOccupancyRate(selectedClass.id)}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>{selectedClass.enrolledCount} enrolled</span>
                        <span>{selectedClass.maxCapacity - selectedClass.enrolledCount} spots left</span>
                      </div>
                    </div>
                    {selectedClass.waitlistCount > 0 && (
                      <div className="rounded-lg bg-purple-500/10 p-3">
                        <p className="text-sm font-medium text-purple-600">
                          {selectedClass.waitlistCount} students on waitlist
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Enrolments and Waitlist Tabs */}
              <div className="flex gap-3">
                <Button
                  variant={showEnrolments ? 'primary' : 'secondary'}
                  onClick={() => { setShowEnrolments(true); setShowWaitlist(false); }}
                >
                  Enrolments ({getEnrolmentsByClassId(selectedClass.id).length})
                </Button>
                <Button
                  variant={showWaitlist ? 'primary' : 'secondary'}
                  onClick={() => { setShowWaitlist(true); setShowEnrolments(false); }}
                >
                  Waitlist ({getWaitlistByClassId(selectedClass.id).length})
                </Button>
              </div>

              {/* Enrolments List */}
              {showEnrolments && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Enrolled Students</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {getEnrolmentsByClassId(selectedClass.id).map(enrol => (
                        <div key={enrol.id} className="flex items-center justify-between rounded-lg border p-3">
                          <div>
                            <p className="font-medium">{enrol.studentName}</p>
                            <p className="text-sm text-muted-foreground">
                              Enrolled: {enrol.enrolmentDate.toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge className={enrol.status === 'active' ? 'bg-success/20 text-success' : 'bg-muted'}>
                              {enrol.status}
                            </Badge>
                            <p className="mt-1 text-sm font-medium">${enrol.feeAmount}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Waitlist */}
              {showWaitlist && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Waitlist</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {getWaitlistByClassId(selectedClass.id).map(entry => (
                        <div key={entry.id} className="flex items-center justify-between rounded-lg border p-3">
                          <div>
                            <p className="font-medium">{entry.studentName}</p>
                            <p className="text-sm text-muted-foreground">
                              Position #{entry.position} • Added {entry.addedDate.toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={
                              entry.status === 'waiting' ? 'bg-warning/20 text-warning' :
                              entry.status === 'offered' ? 'bg-primary/20 text-primary' : 'bg-muted'
                            }>
                              {entry.status}
                            </Badge>
                            <Button size="sm">Offer Spot</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-4">
                <Button className="flex-1 gap-2">
                  <UserPlus className="size-4" />
                  Enrol Student
                </Button>
                <Button variant="secondary" className="flex-1 gap-2">
                  <Edit className="size-4" />
                  Edit Class
                </Button>
                <Button variant="danger" className="flex-1">
                  Cancel Class
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
