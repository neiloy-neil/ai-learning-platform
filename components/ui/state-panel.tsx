import type { ReactNode } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/cn";

type StatePanelProps = {
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
};

export function EmptyStatePanel({ title, description, action, className }: StatePanelProps) {
  return (
    <Card className={cn("border-dashed", className)} glass>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm leading-6 text-muted-foreground">{description}</p>
        {action}
      </CardContent>
    </Card>
  );
}

export function ErrorStatePanel({ title, description, action, className }: StatePanelProps) {
  return (
    <Card className={cn("border-danger/30", className)} glass>
      <CardHeader>
        <CardTitle className="text-danger">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm leading-6 text-muted-foreground">{description}</p>
        {action}
      </CardContent>
    </Card>
  );
}

export function LoadingStatePanel({ className }: { className?: string }) {
  return (
    <Card className={className} glass>
      <CardHeader className="space-y-3">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-56" />
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </CardContent>
    </Card>
  );
}
