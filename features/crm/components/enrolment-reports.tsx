'use client';

import { useState } from 'react';
import { TrendingUp, DollarSign, Users, Calendar, TrendingDown, BarChart3, Download } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { classes, enrolments, waitlist } from '@/lib/db/enrolment-data';
import { cn } from '@/lib/cn';

export default function EnrolmentReports() {
  const [selectedTerm, setSelectedTerm] = useState('Term 2 2026');

  // Calculate metrics
  const totalEnrolments = enrolments.length;
  const activeEnrolments = enrolments.filter(e => e.status === 'active').length;
  const totalRevenue = enrolments.reduce((sum, e) => sum + e.feeAmount - (e.discountApplied || 0), 0);
  const totalDiscounts = enrolments.reduce((sum, e) => sum + (e.discountApplied || 0), 0);
  const netRevenue = totalRevenue - totalDiscounts;
  const avgFee = totalEnrolments > 0 ? totalRevenue / totalEnrolments : 0;

  const occupancyRates = classes.map(c => (c.enrolledCount / c.maxCapacity) * 100);
  const avgOccupancy = occupancyRates.reduce((sum, rate) => sum + rate, 0) / occupancyRates.length;

  const fullClasses = classes.filter(c => c.enrolledCount >= c.maxCapacity).length;
  const availableSpots = classes.reduce((sum, c) => sum + (c.maxCapacity - c.enrolledCount), 0);

  // Enrolment by level
  const enrolmentsByLevel: Record<string, number> = {};
  classes.forEach(cls => {
    enrolmentsByLevel[cls.level] = (enrolmentsByLevel[cls.level] || 0) + cls.enrolledCount;
  });

  // Enrolment by subject
  const enrolmentsBySubject: Record<string, number> = {};
  classes.forEach(cls => {
    enrolmentsBySubject[cls.subject] = (enrolmentsBySubject[cls.subject] || 0) + cls.enrolledCount;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel-strong overflow-hidden px-6 py-5">
        <div className="flex items-start justify-between">
          <div>
            <span className="eyebrow">Analytics & Insights</span>
            <h1 className="text-3xl font-semibold">Enrolment Reports</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Track enrolment trends, revenue, and capacity utilization
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

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Enrolments</p>
                <p className="mt-2 text-3xl font-semibold">{totalEnrolments}</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-success">
                  <TrendingUp className="size-3" />
                  +12% vs last term
                </p>
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
                <p className="text-sm text-muted-foreground">Net Revenue</p>
                <p className="mt-2 text-3xl font-semibold">${netRevenue.toLocaleString()}</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-success">
                  <TrendingUp className="size-3" />
                  +8.5% vs last term
                </p>
              </div>
              <div className="rounded-lg bg-success/10 p-3">
                <DollarSign className="size-5 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Occupancy</p>
                <p className="mt-2 text-3xl font-semibold">{avgOccupancy.toFixed(1)}%</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-warning">
                  <TrendingDown className="size-3" />
                  -2.1% vs last term
                </p>
              </div>
              <div className="rounded-lg bg-warning/10 p-3">
                <BarChart3 className="size-5 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Available Spots</p>
                <p className="mt-2 text-3xl font-semibold">{availableSpots}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {fullClasses} classes full
                </p>
              </div>
              <div className="rounded-lg bg-blue-500/10 p-3">
                <Calendar className="size-5 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Breakdown */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Gross Revenue</span>
                <span className="font-semibold">${totalRevenue.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Discounts Applied</span>
                <span className="font-semibold text-danger">-${totalDiscounts.toLocaleString()}</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Net Revenue</span>
                  <span className="text-2xl font-semibold text-success">${netRevenue.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Average Fee per Enrolment</span>
                <span className="font-semibold">${avgFee.toFixed(0)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Enrolment Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Active Enrolments</span>
                <Badge className="bg-success/20 text-success">{activeEnrolments}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Pending Enrolments</span>
                <Badge className="bg-warning/20 text-warning">
                  {enrolments.filter(e => e.status === 'pending').length}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Withdrawn</span>
                <Badge className="bg-muted">
                  {enrolments.filter(e => e.status === 'withdrawn').length}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Waitlisted</span>
                <Badge className="bg-purple-500/20 text-purple-500">{waitlist.length}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enrolment by Level */}
      <Card>
        <CardHeader>
          <CardTitle>Enrolment by Level</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(enrolmentsByLevel)
              .sort((a, b) => b[1] - a[1])
              .map(([level, count]) => {
                const percentage = (count / totalEnrolments) * 100;
                return (
                  <div key={level} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{level}</span>
                      <span className="text-sm text-muted-foreground">
                        {count} students ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>

      {/* Enrolment by Subject */}
      <Card>
        <CardHeader>
          <CardTitle>Enrolment by Subject</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {Object.entries(enrolmentsBySubject)
              .sort((a, b) => b[1] - a[1])
              .map(([subject, count]) => (
                <div key={subject} className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{subject}</p>
                      <p className="text-sm text-muted-foreground">{count} students enrolled</p>
                    </div>
                    <Badge className="bg-primary/20 text-primary">{count}</Badge>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Class Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Class Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {classes
              .sort((a, b) => (b.enrolledCount / b.maxCapacity) - (a.enrolledCount / a.maxCapacity))
              .map(cls => {
                const occupancyRate = (cls.enrolledCount / cls.maxCapacity) * 100;
                return (
                  <div key={cls.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex-1">
                      <p className="font-medium">{cls.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {cls.teacherName} • {cls.dayOfWeek} {cls.startTime}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {cls.enrolledCount}/{cls.maxCapacity}
                        </p>
                        <p className="text-xs text-muted-foreground">students</p>
                      </div>
                      <div className="w-24">
                        <div className="h-2 rounded-full bg-muted">
                          <div
                            className={cn(
                              'h-full rounded-full',
                              occupancyRate >= 90 ? 'bg-danger' :
                              occupancyRate >= 70 ? 'bg-warning' : 'bg-success'
                            )}
                            style={{ width: `${occupancyRate}%` }}
                          />
                        </div>
                        <p className="mt-1 text-center text-xs text-muted-foreground">
                          {occupancyRate.toFixed(0)}%
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
