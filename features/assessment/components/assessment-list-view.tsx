'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAssessments } from '@/lib/mocks';

const statusColors: Record<string, string> = {
  Completed: 'bg-success/20 text-success',
  'In Progress': 'bg-primary/15 text-primary',
  Available: 'bg-muted-foreground/20 text-muted-foreground',
};

export default function AssessmentListView() {
  const router = useRouter();
  const assessments = getAssessments();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Assessments</h1>
        <p className="text-md text-muted-foreground">Test your knowledge and track your progress.</p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {assessments.map((assessment) => (
          <Card glass key={assessment.id}>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <CardTitle>{assessment.title}</CardTitle>
                <span className={`rounded-full px-2 py-1 text-xs font-bold ${statusColors[assessment.status]}`}>
                  {assessment.status}
                </span>
              </div>
            </CardHeader>
            <CardContent className="flex h-full flex-col">
              <p className="flex-grow text-muted-foreground">{assessment.description}</p>
              <div className="mt-6 flex items-center justify-between gap-4">
                <span className="text-sm font-semibold">{assessment.questionCount} Questions</span>
                <Button onClick={() => router.push(`/student/practice?assessmentId=${assessment.id}`)}>
                  {assessment.status === 'In Progress' ? 'Continue' : assessment.status === 'Completed' ? 'Review' : 'Start'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
