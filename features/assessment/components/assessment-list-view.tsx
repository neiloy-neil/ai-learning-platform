'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDemoData } from '@/features/demo/components/demo-data-provider';
import { appRoutes } from '@/lib/app-routes';

const statusColors: Record<string, string> = {
  Reviewed: 'bg-success/20 text-success',
  Completed: 'bg-primary/15 text-primary',
  'In Progress': 'bg-amber-500/15 text-amber-600',
  Assigned: 'bg-muted-foreground/20 text-muted-foreground',
  Overdue: 'bg-danger/20 text-danger',
};

export default function AssessmentListView() {
  const router = useRouter();
  const { assessments, generatedQuizzes, generatedQuizAssessments } = useDemoData();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Assessments</h1>
        <p className="text-md text-muted-foreground">Test your knowledge, revisit graded work, and track concept-level performance.</p>
      </div>
      {generatedQuizzes.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {generatedQuizzes.slice(0, 2).map((quiz) => {
            const result = generatedQuizAssessments[quiz.id];
            return (
              <Card glass key={quiz.id}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <CardTitle>{quiz.title}</CardTitle>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">AI Generated</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    {quiz.questionCount} questions on {quiz.conceptName} at {quiz.difficulty} difficulty.
                  </p>
                  {result ? (
                    <div className="rounded-2xl border border-border/70 p-4">
                      <p className="font-semibold">Latest AI assessment</p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {result.score}% with follow-up on {result.nextConcepts.join(', ')}.
                      </p>
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-border/70 p-4">
                      <p className="font-semibold">Ready to attempt</p>
                      <p className="mt-2 text-sm text-muted-foreground">This generated quiz is waiting for an AI assessment pass.</p>
                    </div>
                  )}
                  <Button asChild variant="secondary">
                    <Link href={appRoutes.student.aiTutor}>Open in AI Tutor</Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : null}
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
            <CardContent className="flex h-full flex-col gap-4">
              <p className="flex-grow text-muted-foreground">{assessment.description}</p>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>{assessment.questionCount} questions</p>
                <p>Due {new Date(assessment.dueDate).toLocaleDateString()}</p>
                {assessment.lastScore !== undefined ? <p>Latest score: {assessment.lastScore}%</p> : null}
              </div>
              <Button onClick={() => router.push(`${appRoutes.student.practice}?assessmentId=${assessment.id}`)}>
                {assessment.status === 'In Progress' ? 'Resume' : assessment.status === 'Reviewed' ? 'Review' : 'Start'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
