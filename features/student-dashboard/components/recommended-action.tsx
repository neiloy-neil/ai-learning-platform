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
      </CardHeader>
      <CardContent className="flex flex-col items-center text-center">
        <p className="mb-2 text-sm leading-6 text-muted-foreground">{recommendation.reason}</p>
        <p className="mb-4 text-xl font-semibold">{recommendation.nextConceptName}</p>
        <Button asChild className="w-full">
          <Link href={recommendation.href}>{recommendation.ctaLabel}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
