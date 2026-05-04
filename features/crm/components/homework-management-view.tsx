'use client';

import { useState } from 'react';
import {
  BookOpen, CheckCircle, Clock, AlertCircle, Plus, Search,
  Filter, Edit, Eye, MessageSquare, Download
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { homeworkAssignments, homeworkSubmissions, getHomeworkStats } from '@/lib/db/attendance-data';
import { HomeworkStatus } from '@/lib/pcdc-types';
import { cn } from '@/lib/cn';

export default function HomeworkManagementView() {
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);
  const [showGrading, setShowGrading] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);

  // Filter assignments
  const filteredAssignments = homeworkAssignments.filter(assignment => {
    const matchesClass = selectedClass === 'all' || assignment.classId === selectedClass;
    const matchesStatus = selectedStatus === 'all' || assignment.status === selectedStatus;
    const matchesSearch = searchQuery
      ? assignment.title.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesClass && matchesStatus && matchesSearch;
  });

  // Calculate overall stats
  const totalAssignments = homeworkAssignments.filter(a => a.status === 'active').length;
  const totalSubmissions = homeworkSubmissions.length;
  const gradedCount = homeworkSubmissions.filter(s => s.status === HomeworkStatus.GRADED).length;
  const overdueCount = homeworkSubmissions.filter(s => s.status === HomeworkStatus.OVERDUE).length;
  const avgScore = gradedCount > 0
    ? homeworkSubmissions.filter(s => s.score !== undefined).reduce((sum, s) => sum + (s.score || 0), 0) / gradedCount
    : 0;

  const getStatusBadge = (status: HomeworkStatus) => {
    const config: Record<HomeworkStatus, { label: string; color: string }> = {
      [HomeworkStatus.ASSIGNED]: { label: 'Assigned', color: 'bg-blue-500/20 text-blue-500 border-blue-500/30' },
      [HomeworkStatus.SUBMITTED]: { label: 'Submitted', color: 'bg-purple-500/20 text-purple-500 border-purple-500/30' },
      [HomeworkStatus.GRADED]: { label: 'Graded', color: 'bg-success/20 text-success border-success/30' },
      [HomeworkStatus.OVERDUE]: { label: 'Overdue', color: 'bg-danger/20 text-danger border-danger/30' },
      [HomeworkStatus.EXCUSED]: { label: 'Excused', color: 'bg-muted text-muted-foreground border-border' },
    };
    const { label, color } = config[status];
    return <Badge className={cn('border', color)}>{label}</Badge>;
  };

  const getAssignmentStatusBadge = (status: string) => {
    const config: Record<string, { label: string; color: string }> = {
      active: { label: 'Active', color: 'bg-success/20 text-success border-success/30' },
      archived: { label: 'Archived', color: 'bg-muted text-muted-foreground border-border' },
      cancelled: { label: 'Cancelled', color: 'bg-danger/20 text-danger border-danger/30' },
    };
    const { label, color } = config[status];
    return <Badge className={cn('border', color)}>{label}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel-strong overflow-hidden px-6 py-5">
        <div className="flex items-start justify-between">
          <div>
            <span className="eyebrow">Academic Management</span>
            <h1 className="text-3xl font-semibold">Homework Management</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Create assignments, track submissions, and grade student work
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" className="gap-2">
              <Download className="size-4" />
              Export
            </Button>
            <Button className="gap-2">
              <Plus className="size-4" />
              Create Assignment
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-4xl font-semibold text-primary">{totalAssignments}</p>
              <p className="mt-2 text-sm text-muted-foreground">Active Assignments</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-4xl font-semibold text-purple-500">{totalSubmissions}</p>
              <p className="mt-2 text-sm text-muted-foreground">Total Submissions</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-4xl font-semibold text-success">{gradedCount}</p>
              <p className="mt-2 text-sm text-muted-foreground">Graded</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-4xl font-semibold text-warning">{avgScore.toFixed(0)}%</p>
              <p className="mt-2 text-sm text-muted-foreground">Average Score</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overdue Alert */}
      {overdueCount > 0 && (
        <Card className="border-danger/50 bg-danger/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="size-5 text-danger" />
              <div>
                <p className="font-semibold text-danger">{overdueCount} Overdue Submission{overdueCount > 1 ? 's' : ''}</p>
                <p className="text-sm text-muted-foreground">
                  Students have missed homework deadlines and require follow-up
                </p>
              </div>
              <Button size="sm" variant="danger" className="ml-auto">
                Send Reminders
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex-1 min-w-[300px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search assignments..."
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
          <option value="class-1" className="bg-slate-900">Year 3 Math - Monday</option>
          <option value="class-3" className="bg-slate-900">Year 5 Advanced Math</option>
          <option value="class-4" className="bg-slate-900">Year 1 Literacy</option>
          <option value="class-6" className="bg-slate-900">Year 6 NAPLAN Prep</option>
        </select>
        <select
          value={selectedStatus}
          onChange={e => setSelectedStatus(e.target.value)}
          className="flex h-10 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="all" className="bg-slate-900">All Status</option>
          <option value="active" className="bg-slate-900">Active</option>
          <option value="archived" className="bg-slate-900">Archived</option>
        </select>
        <Button variant="secondary" className="gap-2">
          <Filter className="size-4" />
          More Filters
        </Button>
      </div>

      {/* Assignments Grid */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredAssignments.map(assignment => {
          const stats = getHomeworkStats(assignment.id);
          const submissions = homeworkSubmissions.filter(s => s.assignmentId === assignment.id);
          const submissionRate = stats.total > 0 ? (stats.submitted / stats.total * 100).toFixed(0) : '0';

          return (
            <Card
              key={assignment.id}
              className="cursor-pointer transition-all hover:border-primary hover:shadow-lg"
              onClick={() => setSelectedAssignment(assignment)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{assignment.title}</CardTitle>
                    <p className="mt-1 text-sm text-muted-foreground">{assignment.className}</p>
                  </div>
                  {getAssignmentStatusBadge(assignment.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm line-clamp-2">{assignment.description}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="size-4 text-muted-foreground" />
                      <span>Due: {assignment.dueDate.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="size-4 text-muted-foreground" />
                      <span>{assignment.maxPoints} pts</span>
                    </div>
                  </div>

                  {/* Submission Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">Submissions</span>
                      <span className="text-muted-foreground">{submissionRate}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${submissionRate}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{stats.submitted} submitted</span>
                      <span>{stats.graded} graded</span>
                      {stats.overdue > 0 && (
                        <span className="text-danger">{stats.overdue} overdue</span>
                      )}
                    </div>
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
                    <Button
                      size="sm"
                      className="flex-1 gap-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedAssignment(assignment);
                        setShowGrading(true);
                      }}
                    >
                      <MessageSquare className="size-3" />
                      Grade
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Assignment Detail Modal */}
      {selectedAssignment && !showGrading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-background p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-semibold">{selectedAssignment.title}</h2>
                <p className="text-sm text-muted-foreground">
                  {selectedAssignment.className} • {selectedAssignment.subject}
                </p>
              </div>
              <Button variant="ghost" onClick={() => setSelectedAssignment(null)}>✕</Button>
            </div>

            <div className="mt-6 space-y-6">
              {/* Assignment Details */}
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Assignment Info</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <p className="text-muted-foreground">Assigned:</p>
                      <p className="font-medium">{selectedAssignment.assignedDate.toLocaleDateString()}</p>
                      <p className="text-muted-foreground">Due Date:</p>
                      <p className="font-medium">{selectedAssignment.dueDate.toLocaleDateString()}</p>
                      <p className="text-muted-foreground">Max Points:</p>
                      <p className="font-medium">{selectedAssignment.maxPoints}</p>
                      <p className="text-muted-foreground">Status:</p>
                      <div>{getAssignmentStatusBadge(selectedAssignment.status)}</div>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm text-muted-foreground">Description</p>
                      <p className="mt-1 text-sm">{selectedAssignment.description}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Submission Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {(() => {
                      const stats = getHomeworkStats(selectedAssignment.id);
                      return (
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="rounded-lg bg-purple-500/10 p-3 text-center">
                              <p className="text-2xl font-semibold text-purple-500">{stats.total}</p>
                              <p className="text-xs text-muted-foreground">Total Students</p>
                            </div>
                            <div className="rounded-lg bg-success/10 p-3 text-center">
                              <p className="text-2xl font-semibold text-success">{stats.submitted}</p>
                              <p className="text-xs text-muted-foreground">Submitted</p>
                            </div>
                            <div className="rounded-lg bg-primary/10 p-3 text-center">
                              <p className="text-2xl font-semibold text-primary">{stats.graded}</p>
                              <p className="text-xs text-muted-foreground">Graded</p>
                            </div>
                            <div className="rounded-lg bg-danger/10 p-3 text-center">
                              <p className="text-2xl font-semibold text-danger">{stats.overdue}</p>
                              <p className="text-xs text-muted-foreground">Overdue</p>
                            </div>
                          </div>
                          {stats.avgScore > 0 && (
                            <div className="rounded-lg bg-warning/10 p-3 text-center">
                              <p className="text-2xl font-semibold text-warning">{stats.avgScore.toFixed(1)}%</p>
                              <p className="text-xs text-muted-foreground">Average Score</p>
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </CardContent>
                </Card>
              </div>

              {/* Submissions List */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Student Submissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {homeworkSubmissions
                      .filter(s => s.assignmentId === selectedAssignment.id)
                      .map(submission => (
                        <div
                          key={submission.id}
                          className="flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-all hover:border-primary"
                          onClick={() => {
                            setSelectedSubmission(submission);
                            setShowGrading(true);
                          }}
                        >
                          <div>
                            <p className="font-medium">{submission.studentName}</p>
                            <p className="text-sm text-muted-foreground">
                              Submitted: {submission.submissionDate.toLocaleDateString()}
                              {submission.lateSubmission && (
                                <span className="ml-2 text-danger">(Late)</span>
                              )}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            {submission.score !== undefined && (
                              <Badge className="bg-success/20 text-success">
                                {submission.score}/{selectedAssignment.maxPoints}
                              </Badge>
                            )}
                            {getStatusBadge(submission.status)}
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex gap-2 pt-4">
                <Button className="flex-1 gap-2" onClick={() => setShowGrading(true)}>
                  <MessageSquare className="size-4" />
                  Grade Submissions
                </Button>
                <Button variant="secondary" className="flex-1 gap-2">
                  <Edit className="size-4" />
                  Edit Assignment
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grading Modal */}
      {showGrading && selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-2xl rounded-lg bg-background p-6">
            <div className="flex items-start justify-between">
              <h2 className="text-2xl font-semibold">Grade Submission</h2>
              <Button variant="ghost" onClick={() => {
                setShowGrading(false);
                setSelectedSubmission(null);
              }}>✕</Button>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-lg bg-primary/5 p-4">
                <p className="font-semibold">{selectedSubmission.studentName}</p>
                <p className="text-sm text-muted-foreground">
                  Submitted: {selectedSubmission.submissionDate.toLocaleString()}
                  {selectedSubmission.lateSubmission && (
                    <span className="ml-2 text-danger">• Late Submission</span>
                  )}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">Score</label>
                  <Input
                    type="number"
                    placeholder="Enter score"
                    defaultValue={selectedSubmission.score || ''}
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    Out of {selectedAssignment?.maxPoints || 100} points
                  </p>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Status</label>
                  <select className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white">
                    <option value="submitted" className="bg-slate-900">Submitted</option>
                    <option value="graded" className="bg-slate-900">Graded</option>
                    <option value="overdue" className="bg-slate-900">Overdue</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Feedback</label>
                <textarea
                  className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                  rows={4}
                  placeholder="Provide feedback to the student..."
                  defaultValue={selectedSubmission.feedback || ''}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button className="flex-1">Save Grade</Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setShowGrading(false);
                    setSelectedSubmission(null);
                  }}
                >
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
