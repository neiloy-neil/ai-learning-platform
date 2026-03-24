
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BarChart = ({ data }: { data: { day: string, minutes: number }[] }) => {
    const maxValue = Math.max(...data.map(d => d.minutes), 60); // Ensure a minimum height
  
    return (
      <div className="w-full h-48 flex items-end space-x-2 p-4 bg-muted/50 rounded-lg">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div
              className="w-full bg-gradient-to-t from-primary/50 to-primary rounded-t-md transition-all duration-500 ease-out hover:scale-y-105 origin-bottom"
              style={{ height: `${(item.minutes / maxValue) * 100}%` }}
              title={`${item.minutes} minutes`}
            ></div>
            <span className="text-xs text-muted-foreground mt-2 text-center">{item.day}</span>
          </div>
        ))}
      </div>
    );
};

export default function WeeklyActivityWidget({ activity }: { activity: { day: string, minutes: number }[] }) {
    const totalMinutes = activity.reduce((acc, curr) => acc + curr.minutes, 0);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Weekly Activity</CardTitle>
                <p className="text-sm text-muted-foreground">Total study time this week: <strong>{totalMinutes} minutes</strong></p>
            </CardHeader>
            <CardContent>
                <BarChart data={activity} />
            </CardContent>
        </Card>
    );
}
