'use client';

import { useState } from 'react';
import {
  TrendingUp, TrendingDown, Minus, Users, Calendar, Target, Activity,
  Download, FileText, BarChart3, Map, Eye, Clock
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/cn';
import {
  analyticsSummary,
  studentPerformanceTrend,
  attendanceTrend,
  engagementTrend,
  attendanceRecords,
  conceptHeatmap,
  itemAnalysisData,
  classPerformanceData,
} from '@/lib/db/analytics-data';

// Simple Sparkline Chart Component
function Sparkline({ data, color = 'stroke-primary', width = 200, height = 60 }: { data: number[]; color?: string; width?: number; height?: number }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const stepX = width / (data.length - 1);

  const points = data.map((value, index) => {
    const x = index * stepX;
    const y = height - ((value - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline
        fill="none"
        className={color}
        strokeWidth="2"
        points={points}
      />
    </svg>
  );
}

// Bar Chart Component
function SimpleBarChart({ data, height = 200 }: { data: Array<{ label: string; value: number; color?: string }>; height?: number }) {
  const maxValue = Math.max(...data.map(d => d.value));
  const barWidth = 100 / data.length;

  return (
    <div className="relative" style={{ height }}>
      <div className="absolute inset-0 flex items-end">
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * 100;
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-end flex-1"
              style={{ height: `${barHeight}%` }}
            >
              <div
                className={cn("w-full mx-1 rounded-t transition-all hover:opacity-80", item.color || 'bg-primary/70')}
                style={{ height: '100%' }}
                title={`${item.label}: ${item.value}%`}
              />
            </div>
          );
        })}
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex">
        {data.map((item, index) => (
          <div key={index} className="flex-1 text-center text-xs text-muted-foreground mt-2">
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}

// Metric Card Component
function AnalyticsMetricCard({
  title,
  value,
  change,
  icon: Icon,
  trend,
  sparklineData,
}: {
  title: string;
  value: string | number;
  change?: string;
  icon: typeof TrendingUp;
  trend?: 'up' | 'down' | 'stable';
  sparklineData?: number[];
}) {
  return (
    <div className="glass-panel-strong overflow-hidden">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-semibold">{value}</p>
          {change && (
            <div className="flex items-center gap-1">
              {trend === 'up' && <TrendingUp className="size-4 text-success" />}
              {trend === 'down' && <TrendingDown className="size-4 text-danger" />}
              {trend === 'stable' && <Minus className="size-4 text-muted-foreground" />}
              <span className={cn(
                'text-sm font-medium',
                trend === 'up' && 'text-success',
                trend === 'down' && 'text-danger',
                trend === 'stable' && 'text-muted-foreground'
              )}>
                {change}
              </span>
            </div>
          )}
        </div>
        <div className="rounded-xl bg-primary/10 p-3">
          <Icon className="size-5 text-primary" />
        </div>
      </div>
      {sparklineData && (
        <div className="mt-4">
          <Sparkline data={sparklineData} />
        </div>
      )}
    </div>
  );
}

// Performance Trend Chart
function PerformanceTrendChart() {
  const data = studentPerformanceTrend;

  return (
    <div className="glass-panel-strong overflow-hidden">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Student Performance Trend</h3>
        <p className="text-sm text-muted-foreground">Average score over the past 18 weeks</p>
      </div>
      <div className="space-y-2">
        {data.map((point, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-16 text-xs text-muted-foreground">{point.label}</div>
            <div className="flex-1">
              <div className="h-6 rounded bg-muted/50 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary/70 to-primary transition-all"
                  style={{ width: `${point.value}%` }}
                />
              </div>
            </div>
            <div className="w-12 text-right text-sm font-medium">{point.value}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Attendance Tracking Table
function AttendanceTable() {
  const [selectedClass, setSelectedClass] = useState('all');

  const filteredRecords = selectedClass === 'all'
    ? attendanceRecords
    : attendanceRecords.filter(r => r.classId === selectedClass);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return <Badge className="bg-success/20 text-success border-success/30">Present</Badge>;
      case 'absent':
        return <Badge className="bg-danger/20 text-danger border-danger/30">Absent</Badge>;
      case 'late':
        return <Badge className="bg-warning/20 text-warning border-warning/30">Late</Badge>;
      case 'excused':
        return <Badge variant="secondary">Excused</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="glass-panel-strong overflow-hidden">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Attendance Records</h3>
          <p className="text-sm text-muted-foreground">Recent attendance by class</p>
        </div>
        <select
          className="rounded-lg border bg-background px-3 py-2 text-sm"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="all">All Classes</option>
          <option value="class1">Algebra Fundamentals</option>
          <option value="class2">Advanced Geometry</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="pb-3 text-left font-medium text-muted-foreground">Student</th>
              <th className="pb-3 text-left font-medium text-muted-foreground">Class</th>
              <th className="pb-3 text-left font-medium text-muted-foreground">Date</th>
              <th className="pb-3 text-left font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record) => (
              <tr key={record.id} className="border-b last:border-0">
                <td className="py-3">{record.studentName}</td>
                <td className="py-3 text-muted-foreground">{record.className}</td>
                <td className="py-3">{record.date}</td>
                <td className="py-3">{getStatusBadge(record.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Concept Heatmap
function ConceptHeatmapView() {
  const getPerformanceColor = (performance: number) => {
    if (performance >= 80) return 'bg-success/70';
    if (performance >= 70) return 'bg-success/50';
    if (performance >= 60) return 'bg-warning/60';
    return 'bg-danger/60';
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return <Badge variant="secondary" className="bg-success/20 text-success">Easy</Badge>;
      case 'medium':
        return <Badge variant="secondary" className="bg-warning/20 text-warning">Medium</Badge>;
      case 'hard':
        return <Badge variant="secondary" className="bg-danger/20 text-danger">Hard</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="glass-panel-strong overflow-hidden">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Concept Performance Heatmap</h3>
        <p className="text-sm text-muted-foreground">Student mastery rates by concept</p>
      </div>

      <div className="space-y-4">
        {conceptHeatmap.map((concept) => (
          <div key={concept.conceptId} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="font-medium">{concept.conceptName}</p>
                <p className="text-xs text-muted-foreground">{concept.subject} • {concept.studentCount} students</p>
              </div>
              <div className="flex items-center gap-2">
                {getDifficultyBadge(concept.difficulty)}
                <span className="text-sm font-semibold">{concept.performance}%</span>
              </div>
            </div>
            <div className="h-3 rounded-full bg-muted/50 overflow-hidden">
              <div
                className={cn('h-full rounded-full transition-all', getPerformanceColor(concept.performance))}
                style={{ width: `${concept.performance}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Mastery: {concept.masteryRate}%</span>
              <span>Performance: {concept.performance}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Item Analysis Table
function ItemAnalysisView() {
  const getDifficultyColor = (difficulty: number) => {
    if (difficulty < 0.3) return 'text-success';
    if (difficulty < 0.6) return 'text-warning';
    return 'text-danger';
  };

  const getDiscriminationQuality = (discrimination: number) => {
    if (discrimination >= 0.7) return { label: 'Excellent', color: 'text-success' };
    if (discrimination >= 0.5) return { label: 'Good', color: 'text-warning' };
    return { label: 'Poor', color: 'text-danger' };
  };

  return (
    <div className="glass-panel-strong overflow-hidden">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Item Analysis</h3>
        <p className="text-sm text-muted-foreground">Question performance and discrimination metrics</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="pb-3 text-left font-medium text-muted-foreground">Question</th>
              <th className="pb-3 text-left font-medium text-muted-foreground">Concept</th>
              <th className="pb-3 text-right font-medium text-muted-foreground">Attempts</th>
              <th className="pb-3 text-right font-medium text-muted-foreground">Success</th>
              <th className="pb-3 text-right font-medium text-muted-foreground">Avg Time</th>
              <th className="pb-3 text-right font-medium text-muted-foreground">Difficulty</th>
              <th className="pb-3 text-right font-medium text-muted-foreground">Discrimination</th>
            </tr>
          </thead>
          <tbody>
            {itemAnalysisData.map((item) => {
              const discrimination = getDiscriminationQuality(item.discrimination);
              return (
                <tr key={item.questionId} className="border-b last:border-0">
                  <td className="py-3 max-w-xs truncate">{item.questionText}</td>
                  <td className="py-3 text-muted-foreground">{item.conceptName}</td>
                  <td className="py-3 text-right">{item.totalAttempts}</td>
                  <td className="py-3 text-right font-medium">{item.successRate}%</td>
                  <td className="py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Clock className="size-3" />
                      {item.averageTime}s
                    </div>
                  </td>
                  <td className={cn('py-3 text-right font-medium', getDifficultyColor(item.difficulty))}>
                    {item.difficulty.toFixed(2)}
                  </td>
                  <td className={cn('py-3 text-right', discrimination.color)}>
                    {discrimination.label} ({item.discrimination.toFixed(2)})
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Class Performance Cards
function ClassPerformanceCards() {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="size-4 text-success" />;
      case 'down':
        return <TrendingDown className="size-4 text-danger" />;
      default:
        return <Minus className="size-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {classPerformanceData.map((cls) => (
        <div key={cls.classId} className="glass-panel-strong overflow-hidden">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h4 className="font-semibold">{cls.className}</h4>
                <p className="text-sm text-muted-foreground">{cls.teacherName} • {cls.studentCount} students</p>
              </div>
              <div className="flex items-center gap-1">
                {getTrendIcon(cls.trend)}
                <span className={cn(
                  'text-sm font-medium',
                  cls.trend === 'up' && 'text-success',
                  cls.trend === 'down' && 'text-danger'
                )}>
                  {cls.trend}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-lg bg-muted/50 p-3">
                <p className="text-xs text-muted-foreground">Avg Score</p>
                <p className="text-lg font-semibold">{cls.averageScore}%</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-3">
                <p className="text-xs text-muted-foreground">Attendance</p>
                <p className="text-lg font-semibold">{cls.attendanceRate}%</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-3">
                <p className="text-xs text-muted-foreground">Completion</p>
                <p className="text-lg font-semibold">{cls.completionRate}%</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Main Analytics Dashboard
export default function AnalyticsDashboardView() {
  const [activeTab, setActiveTab] = useState('overview');

  const handleExportPDF = () => {
    alert('PDF export would be generated here. In production, this would use a library like jsPDF or @react-pdf/renderer.');
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'attendance', label: 'Attendance' },
    { id: 'heatmaps', label: 'Heatmaps' },
    { id: 'items', label: 'Item Analysis' },
    { id: 'classes', label: 'Class Performance' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="glass-panel-strong overflow-hidden px-6 py-5">
        <div className="flex items-start justify-between">
          <div>
            <span className="eyebrow">Analytics & Reporting</span>
            <h1 className="text-3xl font-semibold">Advanced Analytics Dashboard</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Comprehensive insights into student performance, attendance, and learning outcomes
            </p>
          </div>
          <Button onClick={handleExportPDF} className="gap-2">
            <Download className="size-4" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={cn(
              'pb-2 border-b-2 text-sm font-medium transition-colors capitalize',
              activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            )}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <AnalyticsMetricCard
              title="Total Students"
              value={analyticsSummary.totalStudentsAssessed}
              change="+12 this month"
              icon={Users}
              trend="up"
              sparklineData={studentPerformanceTrend.slice(-10).map(d => d.value)}
            />
            <AnalyticsMetricCard
              title="Avg Performance"
              value={`${analyticsSummary.averagePerformance}%`}
              change={`+${analyticsSummary.performanceImprovement}% improvement`}
              icon={Target}
              trend="up"
              sparklineData={studentPerformanceTrend.slice(-10).map(d => d.value)}
            />
            <AnalyticsMetricCard
              title="Attendance Rate"
              value={`${analyticsSummary.attendanceRate}%`}
              change="+2.1% from last month"
              icon={Calendar}
              trend="up"
              sparklineData={attendanceTrend.slice(-10).map(d => d.value)}
            />
            <AnalyticsMetricCard
              title="Engagement Rate"
              value={`${analyticsSummary.engagementRate}%`}
              change="+5.3% increase"
              icon={Activity}
              trend="up"
              sparklineData={engagementTrend.slice(-10).map(d => d.value)}
            />
          </div>

          {/* Performance Trends */}
          <div className="grid gap-6 lg:grid-cols-2">
            <PerformanceTrendChart />
            <div className="glass-panel-strong overflow-hidden">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Key Metrics Summary</h3>
                <p className="text-sm text-muted-foreground">Platform-wide analytics</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="size-4 text-muted-foreground" />
                    <span>At-Risk Students</span>
                  </div>
                  <Badge className="bg-danger/20 text-danger border-danger/30">
                    {analyticsSummary.atRiskStudents} students
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="size-4 text-muted-foreground" />
                    <span>Top Performers</span>
                  </div>
                  <Badge className="bg-success/20 text-success border-success/30">
                    {analyticsSummary.topPerformers} students
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="size-4 text-muted-foreground" />
                    <span>Mastery Rate</span>
                  </div>
                  <span className="font-semibold">{analyticsSummary.masteryRate}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Reports */}
          <div className="glass-panel-strong overflow-hidden">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Quick Reports</h3>
                <p className="text-sm text-muted-foreground">Export-ready analytics reports</p>
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {[
                { icon: FileText, title: 'Student Performance Report', desc: 'Individual and class performance metrics' },
                { icon: Calendar, title: 'Attendance Summary', desc: 'Monthly attendance records and trends' },
                { icon: Map, title: 'Concept Mastery Report', desc: 'Detailed heatmap and analysis' },
              ].map((report, index) => (
                <button
                  key={index}
                  className="flex items-start gap-3 rounded-lg border p-4 text-left transition-colors hover:bg-muted/50"
                  onClick={() => alert(`Generating: ${report.title}`)}
                >
                  <div className="rounded-lg bg-primary/10 p-2">
                    <report.icon className="size-4 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">{report.title}</p>
                    <p className="text-xs text-muted-foreground">{report.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Attendance Tab */}
      {activeTab === 'attendance' && (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <AnalyticsMetricCard
              title="Overall Attendance"
              value={`${analyticsSummary.attendanceRate}%`}
              icon={Calendar}
              trend="up"
            />
            <AnalyticsMetricCard
              title="Present Today"
              value="156"
              change="78.8% of students"
              icon={Users}
              trend="up"
            />
            <AnalyticsMetricCard
              title="Absent Today"
              value="12"
              change="6.1% of students"
              icon={Eye}
              trend="down"
            />
          </div>
          <AttendanceTable />
        </div>
      )}

      {/* Heatmaps Tab */}
      {activeTab === 'heatmaps' && (
        <div className="space-y-6">
          <ConceptHeatmapView />
        </div>
      )}

      {/* Item Analysis Tab */}
      {activeTab === 'items' && (
        <div className="space-y-6">
          <ItemAnalysisView />
        </div>
      )}

      {/* Class Performance Tab */}
      {activeTab === 'classes' && (
        <div className="space-y-6">
          <ClassPerformanceCards />
        </div>
      )}
    </div>
  );
}
