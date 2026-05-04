
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Assignment } from '@/lib/pcdc-types';
import { cn } from '@/lib/cn';

const statusColors: Record<string, string> = {
  Assigned: "bg-primary/15 text-primary",
  Submitted: "bg-secondary",
  Graded: "bg-success/20 text-success",
};

export default function AssignmentOverviewCard({ assignment }: { assignment: Assignment }) {
  const dueDate = assignment.dueDate.toLocaleDateString();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{assignment.title}</CardTitle>
          <Badge className={cn(statusColors[assignment.status])}>{assignment.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground">{assignment.description}</p>
        <p className="text-sm">Due: <strong>{dueDate}</strong></p>
        {assignment.status === 'Graded' && assignment.score !== undefined && (
          <p className="text-sm">Score: <strong>{assignment.score}%</strong></p>
        )}
      </CardContent>
    </Card>
  );
}
