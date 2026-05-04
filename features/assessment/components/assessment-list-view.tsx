'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDemoData } from '@/features/demo/components/demo-data-provider';
import { appRoutes } from '@/lib/app-routes';
import { buildAssessmentResult } from '@/lib/mocks';

const statusColors: Record<string, string> = {
  Reviewed: 'bg-success/20 text-success',
  Completed: 'bg-primary/15 text-primary',
  'In Progress': 'bg-amber-500/15 text-amber-600',
  Assigned: 'bg-muted-foreground/20 text-muted-foreground',
  Overdue: 'bg-danger/20 text-danger',
};

export default function AssessmentListView() {
  const router = useRouter();
  const { assessments, generatedQuizzes, generatedQuizAssessments, state, latestStudyPlan } = useDemoData();
  const reviewedAssessments = assessments.filter((assessment) => assessment.status === 'Reviewed' || assessment.status === 'Completed');

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
              {assessment.status === 'Reviewed' || assessment.status === 'Completed' ? (
                <>
                  <div className="rounded-2xl border border-border/70 p-4 text-sm text-muted-foreground">
                    {buildAssessmentResult(assessment, state.attempts).conceptBreakdown.map((item) => (
                      <p key={`${assessment.id}-${item.conceptId}`}>
                        {item.conceptName}: {item.correct}/{item.total} correct
                      </p>
                    ))}
                  </div>
                  <div className="rounded-2xl border border-border/70 p-4">
                    <p className="font-semibold">Post-assessment coaching</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {latestStudyPlan
                        ? latestStudyPlan.tasks[0]?.title ?? 'A follow-up study block is ready.'
                        : 'Generate a study plan or ask AI for coaching to turn this review into the next study block.'}
                    </p>
                  </div>
                </>
              ) : null}
              <div className="flex flex-col gap-3">
                <Button onClick={() => router.push(`${appRoutes.student.practice}?assessmentId=${assessment.id}`)}>
                  {assessment.status === 'In Progress' ? 'Resume' : assessment.status === 'Reviewed' ? 'Review' : 'Start'}
                </Button>
                <Button asChild variant="secondary">
                  <Link href={appRoutes.student.aiTutor}>Ask AI for assessment help</Link>
                </Button>
                {(assessment.status === 'Reviewed' || assessment.status === 'Completed') ? (
                  <Button asChild variant="ghost">
                    <Link href={appRoutes.student.studyPlan}>Open coaching plan</Link>
                  </Button>
                ) : null}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_1fr]">
        <Card glass>
          <CardHeader>
            <CardTitle>Assessment Review Desk</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {reviewedAssessments.length > 0 ? (
              reviewedAssessments.map((assessment) => {
                const result = buildAssessmentResult(assessment, state.attempts);
                return (
                  <div className="rounded-3xl border border-border/70 p-4" key={`review-${assessment.id}`}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-foreground">{assessment.title}</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {result.correctAnswers}/{result.totalQuestions} correct
                        </p>
                      </div>
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        {assessment.lastScore ?? result.score}%
                      </span>
                    </div>
                    <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                      {result.conceptBreakdown.map((item) => (
                        <p key={`${assessment.id}-desk-${item.conceptId}`}>
                          {item.conceptName}: {item.correct}/{item.total} ready
                        </p>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-col gap-3 md:flex-row">
                      <Button asChild className="md:flex-1" variant="secondary">
                        <Link href={appRoutes.student.aiTutor}>Ask AI to explain gaps</Link>
                      </Button>
                      <Button asChild className="md:flex-1" variant="ghost">
                        <Link href={appRoutes.student.studyPlan}>Turn into study plan</Link>
                      </Button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="rounded-2xl border border-dashed border-border/70 p-4 text-sm text-muted-foreground">
                Reviewed and completed assessments will collect here with concept-level follow-up actions.
              </div>
            )}
          </CardContent>
        </Card>

        <Card glass>
          <CardHeader>
            <CardTitle>Post-Assessment Coaching Rail</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-3xl border border-border/70 p-4">
              <p className="font-semibold text-foreground">What to do next</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Use the reviewed results to explain mistakes, refresh a study plan, and close one weak concept before taking the next scored set.
              </p>
            </div>
            {latestStudyPlan ? (
              latestStudyPlan.tasks.slice(0, 3).map((task) => (
                <div className="rounded-3xl border border-border/70 p-4" key={`coaching-task-${task.id}`}>
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-foreground">{task.title}</p>
                    <span className="text-sm font-semibold text-primary">{task.minutes} min</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{task.reason}</p>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-border/70 p-4 text-sm text-muted-foreground">
                Generate a study plan to turn reviewed assessments into an explicit coaching sequence.
              </div>
            )}
            <div className="flex flex-col gap-3">
              <Button asChild variant="secondary">
                <Link href={appRoutes.student.aiTutor}>Open AI Tutor coaching</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href={appRoutes.student.progress}>Open progress signals</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card glass>
        <CardHeader>
          <CardTitle>Assessment History Loop</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-border/70 p-4">
            <p className="font-semibold text-foreground">Reviewed items</p>
            <p className="mt-2 text-3xl font-semibold text-primary">{reviewedAssessments.length}</p>
            <p className="mt-2 text-sm text-muted-foreground">Scored assessments ready for explanation and follow-up planning.</p>
          </div>
          <div className="rounded-3xl border border-border/70 p-4">
            <p className="font-semibold text-foreground">AI-generated quizzes</p>
            <p className="mt-2 text-3xl font-semibold text-primary">{generatedQuizzes.length}</p>
            <p className="mt-2 text-sm text-muted-foreground">Short checkpoints that can feed the same coaching loop as formal assessments.</p>
          </div>
          <div className="rounded-3xl border border-border/70 p-4">
            <p className="font-semibold text-foreground">Next handoff</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Move from assessment review into AI explanation, then into the study plan or progress loop.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
