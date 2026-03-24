
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock Data
const activities = [
  { text: "Completed a quiz on 'Graphing Inequalities'", time: "2h ago" },
  { text: "Spent 25 minutes practicing 'Linear Equations'", time: "1d ago" },
  { text: "Achieved 90% mastery in 'Basic Algebra'", time: "2d ago" },
];

export default function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {activities.map((activity, index) => (
            <li key={index} className="flex justify-between items-start">
              <span className="text-sm">{activity.text}</span>
              <span className="text-xs text-gray-500 whitespace-nowrap pl-4">{activity.time}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
