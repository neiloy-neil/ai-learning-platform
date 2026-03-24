import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";

export default function AssessmentsPage() {
  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-6 pb-16 pt-4 lg:px-8">
      <Card glass>
        <CardHeader>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Assessments</p>
          <CardTitle>Performance snapshots and readiness checks</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-5">
          <ProgressBar label="Weekly quiz readiness" value={91} />
          <ProgressBar label="Project milestone" value={64} />
          <ProgressBar label="Capstone completion" value={37} />
        </CardContent>
      </Card>
    </div>
  );
}
