
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";

// Mock Data
const masteryData = [
  { concept: "Solving Linear Equations", mastery: 95 },
  { concept: "Graphing Inequalities", mastery: 80 },
  { concept: "Understanding Polynomials", mastery: 65 },
  { concept: "Mastering Quadratic Equations", mastery: 40 },
  { concept: "Introduction to Calculus", mastery: 15 },
];

// A simple bar chart component
const BarChart = ({ data }: { data: { concept: string, mastery: number }[] }) => {
  const maxValue = 100;

  return (
    <div className="w-full h-64 flex items-end space-x-4 p-4 bg-muted rounded-lg">
      {data.map((item, index) => (
        <div key={index} className="flex-1 flex flex-col items-center">
          <div
            className="w-full bg-gradient-to-t from-blue-500 to-purple-600 rounded-t-md transition-all duration-500 ease-out"
            style={{ height: `${(item.mastery / maxValue) * 100}%` }}
          ></div>
          <span className="text-xs text-muted-foreground mt-2 text-center">{item.concept}</span>
        </div>
      ))}
    </div>
  );
};

export default function ProgressView() {
  return (
    <div className="space-y-8">
        <div>
            <h1 className="text-3xl font-bold">Your Progress</h1>
            <p className="text-md text-muted-foreground">A detailed overview of your concept mastery.</p>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Mastery Chart</CardTitle>
            </CardHeader>
            <CardContent>
                <BarChart data={masteryData} />
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Mastery by Concept</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {masteryData.map(item => (
                    <div key={item.concept}>
                        <div className="flex justify-between items-center mb-1">
                            <h3 className="font-semibold">{item.concept}</h3>
                            <span className="text-sm font-bold text-primary">{item.mastery}%</span>
                        </div>
                        <ProgressBar value={item.mastery} />
                    </div>
                ))}
            </CardContent>
        </Card>
    </div>
  );
}
