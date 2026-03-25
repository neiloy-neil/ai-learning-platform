import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DashboardRecommendation } from "@/lib/mocks";

type RecommendedActionProps = {
  recommendation: DashboardRecommendation | null;
};

export default function RecommendedAction({ recommendation }: RecommendedActionProps) {
  if (!recommendation) {
    return null;
  }

  return (
    <Card glass>
      <CardHeader>
        <CardTitle>Recommended For You</CardTitle>
        <p className="text-sm leading-6 text-muted-foreground">
          The next best move based on the latest mastery evidence.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-2xl border border-border/70 bg-surface/70 p-4">
          <p className="text-sm leading-6 text-muted-foreground">{recommendation.reason}</p>
          <p className="mt-3 text-xl font-semibold text-foreground">{recommendation.nextConceptName}</p>
        </div>
        <Button asChild className="w-full">
          <Link href={recommendation.href}>{recommendation.ctaLabel}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
