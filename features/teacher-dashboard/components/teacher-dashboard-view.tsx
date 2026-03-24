
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";

// Mock Data for Teacher Dashboard
const classStats = {
  averageScore: 78,
  completionRate: 85,
  studentsAtRisk: 3,
};

const weakConcepts = [
  { concept: "Quadratic Equations", performance: 45 },
  { concept: "Trigonometric Identities", performance: 52 },
  { concept: "Logarithms", performance: 61 },
];

const studentList = [
  { id: "s1", name: "Alice", avgScore: 92, status: "Strong" },
  { id: "s2", name: "Bob", avgScore: 75, status: "Good" },
  { id: "s3", name: "Charlie", avgScore: 55, status: "Weak" },
  { id: "s4", name: "David", avgScore: 81, status: "Good" },
];

const StatCard = ({ title, value }: { title: string, value: string | number }) => (
    <Card>
        <CardHeader>
            <CardTitle className="text-md text-muted-foreground">{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-3xl font-bold">{value}</p>
        </CardContent>
    </Card>
);

export default function TeacherDashboardView() {
  return (
    <div className="space-y-8">
      <div>
          <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
          <p className="text-md text-muted-foreground">Overview of your class performance.</p>
      </div>

      {/* Class Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Average Score" value={`${classStats.averageScore}%`} />
        <StatCard title="Completion Rate" value={`${classStats.completionRate}%`} />
        <StatCard title="Students at Risk" value={classStats.studentsAtRisk} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weak Concept Heatmap */}
        <Card>
          <CardHeader>
            <CardTitle>Weakest Concepts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {weakConcepts.map(item => (
                <div key={item.concept}>
                    <div className="flex justify-between items-center mb-1">
                        <h3 className="font-semibold text-sm">{item.concept}</h3>
                        <span className="text-xs font-bold text-danger">{item.performance}% Avg.</span>
                    </div>
                    <ProgressBar value={item.performance} />
                </div>
            ))}
          </CardContent>
        </Card>

        {/* Student List */}
        <Card>
            <CardHeader>
                <CardTitle>Student Overview</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    {studentList.map(student => (
                        <div key={student.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                            <span className="font-semibold">{student.name}</span>
                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-muted-foreground">{student.avgScore}%</span>
                                <span className={`text-xs font-bold px-2 py-1 rounded-full ${student.status === 'Weak' ? 'bg-danger/20 text-danger' : 'bg-success/20 text-success'}`}>
                                    {student.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
