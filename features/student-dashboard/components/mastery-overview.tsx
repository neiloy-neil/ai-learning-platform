
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock Data
const masteryData = [
  { subject: "Algebra", mastery: 75 },
  { subject: "Geometry", mastery: 50 },
  { subject: "Calculus", mastery: 90 },
  { subject: "Trigonometry", mastery: 60 },
];

const ProgressBar = ({ value }: { value: number }) => (
  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
    <div
      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full transition-all duration-500 ease-out"
      style={{ width: `${value}%` }}
    ></div>
  </div>
);

export default function MasteryOverview() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Mastery Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {masteryData.map((item) => (
          <Card key={item.subject}>
            <CardHeader>
              <CardTitle className="text-lg">{item.subject}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Progress</span>
                <span className="text-sm font-bold">{item.mastery}%</span>
              </div>
              <div className="mt-2">
                <ProgressBar value={item.mastery} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
