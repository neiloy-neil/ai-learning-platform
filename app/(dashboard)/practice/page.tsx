import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";

export default function PracticePage() {
  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-6 pb-16 pt-4 lg:px-8">
      <Card glass>
        <CardHeader>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Practice</p>
          <CardTitle>Daily drills and mastery repetitions</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-5">
          <ProgressBar label="Prompt drills" value={76} />
          <ProgressBar label="Model evaluation" value={59} />
          <ProgressBar label="Debugging exercises" value={88} />
        </CardContent>
      </Card>
    </div>
  );
}
