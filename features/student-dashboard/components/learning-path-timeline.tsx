import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type TimelineStatus = "Completed" | "In Progress" | "Locked";

type TimelineItem = {
  concept: string;
  status: TimelineStatus;
};

const timelineData: TimelineItem[] = [
  { concept: "Solving Linear Equations", status: "Completed" },
  { concept: "Graphing Inequalities", status: "Completed" },
  { concept: "Understanding Polynomials", status: "In Progress" },
  { concept: "Mastering Quadratic Equations", status: "Locked" },
  { concept: "Introduction to Calculus", status: "Locked" },
];

const statusColors: Record<TimelineStatus, string> = {
  Completed: "bg-green-500",
  "In Progress": "bg-blue-500",
  Locked: "bg-gray-400 dark:bg-gray-600",
};

export default function LearningPathTimeline() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Learning Path</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-8 pl-6">
          <div className="absolute bottom-0 left-8 top-0 w-0.5 -translate-x-1/2 bg-gray-200 dark:bg-gray-700" />

          {timelineData.map((item, index) => (
            <div className="relative flex items-center" key={`${item.concept}-${index}`}>
              <div className={`z-10 h-4 w-4 rounded-full ${statusColors[item.status]}`} />
              <div className="pl-6">
                <p className="font-semibold">{item.concept}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Status: {item.status}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
