import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ActivityItem } from "@/lib/mocks";

type RecentActivityProps = {
  activities: ActivityItem[];
};

export default function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <Card glass>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {activities.map((activity) => (
            <li className="flex items-start justify-between gap-4" key={activity.id}>
              <span className="text-sm text-foreground">{activity.text}</span>
              <span className="whitespace-nowrap text-xs text-muted-foreground">{activity.timeLabel}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
