import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";

export default function LearningPathPage() {
  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-6 pb-16 pt-4 lg:px-8">
      <Card glass>
        <CardHeader>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Learning Path</p>
          <CardTitle>Track progression across current modules</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-5">
          <ProgressBar label="Foundations" value={84} />
          <ProgressBar label="Prompt Engineering" value={68} />
          <ProgressBar label="AI Workflows" value={42} />
        </CardContent>
      </Card>
    </div>
  );
}
