import type { SystemMetrics } from '@/lib/pcdc-types';

export interface TrendDataPoint {
  date: string;
  value: number;
  label?: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  classId: string;
  className: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
}

export interface HeatmapData {
  conceptId: string;
  conceptName: string;
  subject: string;
  performance: number; // 0-100
  studentCount: number;
  masteryRate: number; // percentage
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface ItemAnalysis {
  questionId: string;
  questionText: string;
  conceptId: string;
  conceptName: string;
  totalAttempts: number;
  correctAttempts: number;
  successRate: number;
  averageTime: number; // seconds
  difficulty: number; // 0-1 calculated
  discrimination: number; // -1 to 1
}

export interface ClassPerformance {
  classId: string;
  className: string;
  subject: string;
  teacherName: string;
  studentCount: number;
  averageScore: number;
  attendanceRate: number;
  completionRate: number;
  trend: 'up' | 'down' | 'stable';
}

// Mock trend data
export const studentPerformanceTrend: TrendDataPoint[] = [
  { date: '2026-01-01', value: 68, label: 'Week 1' },
  { date: '2026-01-08', value: 71, label: 'Week 2' },
  { date: '2026-01-15', value: 69, label: 'Week 3' },
  { date: '2026-01-22', value: 73, label: 'Week 4' },
  { date: '2026-01-29', value: 75, label: 'Week 5' },
  { date: '2026-02-05', value: 74, label: 'Week 6' },
  { date: '2026-02-12', value: 77, label: 'Week 7' },
  { date: '2026-02-19', value: 76, label: 'Week 8' },
  { date: '2026-02-26', value: 78, label: 'Week 9' },
  { date: '2026-03-05', value: 80, label: 'Week 10' },
  { date: '2026-03-12', value: 79, label: 'Week 11' },
  { date: '2026-03-19', value: 82, label: 'Week 12' },
  { date: '2026-03-26', value: 81, label: 'Week 13' },
  { date: '2026-04-02', value: 83, label: 'Week 14' },
  { date: '2026-04-09', value: 85, label: 'Week 15' },
  { date: '2026-04-16', value: 84, label: 'Week 16' },
  { date: '2026-04-23', value: 86, label: 'Week 17' },
  { date: '2026-04-30', value: 87, label: 'Week 18' },
];

export const attendanceTrend: TrendDataPoint[] = [
  { date: '2026-01-01', value: 88, label: 'Week 1' },
  { date: '2026-01-08', value: 90, label: 'Week 2' },
  { date: '2026-01-15', value: 87, label: 'Week 3' },
  { date: '2026-01-22', value: 91, label: 'Week 4' },
  { date: '2026-01-29', value: 89, label: 'Week 5' },
  { date: '2026-02-05', value: 92, label: 'Week 6' },
  { date: '2026-02-12', value: 90, label: 'Week 7' },
  { date: '2026-02-19', value: 93, label: 'Week 8' },
  { date: '2026-02-26', value: 91, label: 'Week 9' },
  { date: '2026-03-05', value: 94, label: 'Week 10' },
  { date: '2026-03-12', value: 92, label: 'Week 11' },
  { date: '2026-03-19', value: 95, label: 'Week 12' },
  { date: '2026-03-26', value: 93, label: 'Week 13' },
  { date: '2026-04-02', value: 94, label: 'Week 14' },
  { date: '2026-04-09', value: 96, label: 'Week 15' },
  { date: '2026-04-16', value: 95, label: 'Week 16' },
  { date: '2026-04-23', value: 96, label: 'Week 17' },
  { date: '2026-04-30', value: 97, label: 'Week 18' },
];

export const engagementTrend: TrendDataPoint[] = [
  { date: '2026-01-01', value: 45, label: 'Week 1' },
  { date: '2026-01-08', value: 52, label: 'Week 2' },
  { date: '2026-01-15', value: 58, label: 'Week 3' },
  { date: '2026-01-22', value: 61, label: 'Week 4' },
  { date: '2026-01-29', value: 65, label: 'Week 5' },
  { date: '2026-02-05', value: 68, label: 'Week 6' },
  { date: '2026-02-12', value: 72, label: 'Week 7' },
  { date: '2026-02-19', value: 70, label: 'Week 8' },
  { date: '2026-02-26', value: 74, label: 'Week 9' },
  { date: '2026-03-05', value: 76, label: 'Week 10' },
  { date: '2026-03-12', value: 78, label: 'Week 11' },
  { date: '2026-03-19', value: 80, label: 'Week 12' },
  { date: '2026-03-26', value: 82, label: 'Week 13' },
  { date: '2026-04-02', value: 84, label: 'Week 14' },
  { date: '2026-04-09', value: 86, label: 'Week 15' },
  { date: '2026-04-16', value: 85, label: 'Week 16' },
  { date: '2026-04-23', value: 88, label: 'Week 17' },
  { date: '2026-04-30', value: 90, label: 'Week 18' },
];

// Mock attendance records
export const attendanceRecords: AttendanceRecord[] = [
  { id: 'att1', studentId: 'user1', studentName: 'Alice Johnson', classId: 'class1', className: 'Algebra Fundamentals', date: '2026-05-01', status: 'present' },
  { id: 'att2', studentId: 'user2', studentName: 'Bob Smith', classId: 'class1', className: 'Algebra Fundamentals', date: '2026-05-01', status: 'present' },
  { id: 'att3', studentId: 'user3', studentName: 'Carol White', classId: 'class1', className: 'Algebra Fundamentals', date: '2026-05-01', status: 'late' },
  { id: 'att4', studentId: 'user4', studentName: 'David Brown', classId: 'class1', className: 'Algebra Fundamentals', date: '2026-05-01', status: 'absent' },
  { id: 'att5', studentId: 'user5', studentName: 'Emma Davis', classId: 'class2', className: 'Advanced Geometry', date: '2026-05-01', status: 'present' },
  { id: 'att6', studentId: 'user1', studentName: 'Alice Johnson', classId: 'class1', className: 'Algebra Fundamentals', date: '2026-04-30', status: 'present' },
  { id: 'att7', studentId: 'user2', studentName: 'Bob Smith', classId: 'class1', className: 'Algebra Fundamentals', date: '2026-04-30', status: 'excused' },
  { id: 'att8', studentId: 'user3', studentName: 'Carol White', classId: 'class1', className: 'Algebra Fundamentals', date: '2026-04-30', status: 'present' },
  { id: 'att9', studentId: 'user4', studentName: 'David Brown', classId: 'class1', className: 'Algebra Fundamentals', date: '2026-04-30', status: 'present' },
  { id: 'att10', studentId: 'user5', studentName: 'Emma Davis', classId: 'class2', className: 'Advanced Geometry', date: '2026-04-30', status: 'present' },
];

// Mock heatmap data
export const conceptHeatmap: HeatmapData[] = [
  { conceptId: 'concept1', conceptName: 'Linear Equations', subject: 'Algebra', performance: 82, studentCount: 45, masteryRate: 78, difficulty: 'easy' },
  { conceptId: 'concept2', conceptName: 'Variables and Expressions', subject: 'Algebra', performance: 88, studentCount: 45, masteryRate: 85, difficulty: 'easy' },
  { conceptId: 'concept3', conceptName: 'Algebraic Fractions', subject: 'Algebra', performance: 65, studentCount: 38, masteryRate: 62, difficulty: 'medium' },
  { conceptId: 'concept4', conceptName: 'Quadratic Equations', subject: 'Algebra', performance: 58, studentCount: 32, masteryRate: 54, difficulty: 'hard' },
  { conceptId: 'concept5', conceptName: 'Pythagorean Theorem', subject: 'Geometry', performance: 75, studentCount: 40, masteryRate: 71, difficulty: 'medium' },
  { conceptId: 'concept6', conceptName: 'Circle Theorems', subject: 'Geometry', performance: 62, studentCount: 35, masteryRate: 58, difficulty: 'hard' },
  { conceptId: 'concept7', conceptName: 'Trigonometric Ratios', subject: 'Trigonometry', performance: 70, studentCount: 28, masteryRate: 66, difficulty: 'medium' },
  { conceptId: 'concept8', conceptName: 'Functions and Graphs', subject: 'Algebra', performance: 79, studentCount: 42, masteryRate: 75, difficulty: 'medium' },
];

// Mock item analysis
export const itemAnalysisData: ItemAnalysis[] = [
  { questionId: 'q1', questionText: 'Solve: 2x + 5 = 15', conceptId: 'concept1', conceptName: 'Linear Equations', totalAttempts: 156, correctAttempts: 142, successRate: 91, averageTime: 45, difficulty: 0.15, discrimination: 0.72 },
  { questionId: 'q2', questionText: 'Simplify: 3(x + 2) - 4', conceptId: 'concept2', conceptName: 'Variables and Expressions', totalAttempts: 148, correctAttempts: 125, successRate: 84, averageTime: 52, difficulty: 0.25, discrimination: 0.65 },
  { questionId: 'q3', questionText: 'Solve: x² + 5x + 6 = 0', conceptId: 'concept4', conceptName: 'Quadratic Equations', totalAttempts: 98, correctAttempts: 52, successRate: 53, averageTime: 120, difficulty: 0.68, discrimination: 0.81 },
  { questionId: 'q4', questionText: 'Find the hypotenuse: a=3, b=4', conceptId: 'concept5', conceptName: 'Pythagorean Theorem', totalAttempts: 132, correctAttempts: 118, successRate: 89, averageTime: 38, difficulty: 0.18, discrimination: 0.58 },
  { questionId: 'q5', questionText: 'Simplify: (x² - 1)/(x - 1)', conceptId: 'concept3', conceptName: 'Algebraic Fractions', totalAttempts: 112, correctAttempts: 67, successRate: 60, averageTime: 95, difficulty: 0.52, discrimination: 0.74 },
];

// Mock class performance
export const classPerformanceData: ClassPerformance[] = [
  { classId: 'class1', className: 'Algebra Fundamentals', subject: 'Mathematics', teacherName: 'Mr. Anderson', studentCount: 25, averageScore: 78, attendanceRate: 92, completionRate: 85, trend: 'up' },
  { classId: 'class2', className: 'Advanced Geometry', subject: 'Mathematics', teacherName: 'Ms. Taylor', studentCount: 20, averageScore: 82, attendanceRate: 95, completionRate: 88, trend: 'up' },
  { classId: 'class3', className: 'Pre-Calculus Prep', subject: 'Mathematics', teacherName: 'Mrs. Martinez', studentCount: 15, averageScore: 75, attendanceRate: 88, completionRate: 80, trend: 'stable' },
  { classId: 'class4', className: 'Basic Math Skills', subject: 'Mathematics', teacherName: 'Mr. Anderson', studentCount: 30, averageScore: 71, attendanceRate: 90, completionRate: 82, trend: 'up' },
];

// Analytics summary
export const analyticsSummary = {
  totalStudentsAssessed: 198,
  averagePerformance: 76.4,
  performanceImprovement: 12.3, // percentage improvement over time
  attendanceRate: 93.2,
  engagementRate: 87.5,
  masteryRate: 72.8,
  atRiskStudents: 15,
  topPerformers: 42,
};
