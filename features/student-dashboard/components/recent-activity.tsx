import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyStatePanel } from "@/components/ui/state-panel";
import type { ActivityItem } from "@/lib/mocks";

type RecentActivityProps = {
  activities: ActivityItem[];
};

export default function RecentActivity({ activities }: RecentActivityProps) {
  if (activities.length === 0) {
    return (
      <EmptyStatePanel
        title="Recent Activity"
        description="Student activity will appear here once a practice session, assessment, or revision step is completed."
      />
    );
  }

  return (
    <Card glass>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <p className="text-sm leading-6 text-muted-foreground">
          A live feed of the latest practice, assessment, and revision steps.
        </p>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {activities.map((activity) => (
            <li className="flex items-start justify-between gap-4 rounded-2xl border border-border/70 bg-surface/70 p-4" key={activity.id}>
              <span className="text-sm leading-6 text-foreground">{activity.text}</span>
              <span className="whitespace-nowrap rounded-full bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                {activity.timeLabel}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
