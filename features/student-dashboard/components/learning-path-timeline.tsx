
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/cn";
import type { Concept, ConceptMastery } from "@/lib/pcdc-types";

type TimelineStatus = "Completed" | "In Progress" | "Locked";

const statusColors: Record<TimelineStatus, string> = {
  Completed: "bg-success",
  "In Progress": "bg-primary",
  Locked: "bg-muted-foreground/40",
};

const weakThreshold = 60;
const strongThreshold = 80;

export default function LearningPathTimeline({ mastery, concepts }: { mastery: ConceptMastery[], concepts: Concept[] }) {
  const getStatus = (conceptId: string): TimelineStatus => {
    const masteryScore = mastery.find((item) => item.conceptId === conceptId)?.masteryScore;

    if (masteryScore === undefined) return "Locked";
    if (masteryScore >= strongThreshold) return "Completed";
    if (masteryScore >= weakThreshold) return "In Progress";
    return "In Progress";
  };

  const getConceptName = (conceptId: string) => {
    return concepts.find(c => c.id === conceptId)?.name || "Unknown Concept";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Learning Path</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative pl-6">
          <div className="absolute bottom-0 left-8 top-0 w-0.5 -translate-x-1/2 bg-border" />

          {concepts.map((item) => {
            const status = getStatus(item.id);
            const content = (
              <div
                className={cn(
                  "relative -ml-4 flex items-center rounded-lg p-4 transition-colors duration-200",
                  status !== "Locked" && "cursor-pointer hover:bg-muted/50",
                )}
              >
                <div className={cn("z-10 h-4 w-4 flex-shrink-0 rounded-full", statusColors[status])} />
                <div className="pl-6">
                  <p className="font-semibold">{getConceptName(item.id)}</p>
                  <p className="text-sm text-muted-foreground">Status: {status}</p>
                </div>
              </div>
            );

            if (status === "Locked") {
              return <div key={item.id}>{content}</div>;
            }

            return (
              <Link href={`/student/practice?conceptId=${item.id}`} key={item.id}>
                {content}
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

