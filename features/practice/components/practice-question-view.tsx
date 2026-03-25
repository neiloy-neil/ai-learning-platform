'use client';

import Link from 'next/link';
import { Suspense, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/cn';
import { appRoutes } from '@/lib/app-routes';
import { getDemoPracticeTitle, useDemoData } from '@/features/demo/components/demo-data-provider';
import { getConceptName, type DemoAssessmentResult } from '@/lib/mocks';

function PracticeQuestionCore() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const assessmentId = searchParams.get('assessmentId');
  const conceptId = searchParams.get('conceptId');
  const mode = searchParams.get('mode');
  const { completeSession } = useDemoData();

  const session = getDemoPracticeTitle({ assessmentId, conceptId, mode });
  const questions = session.questions;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [confidenceRating, setConfidenceRating] = useState(3);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [answers, setAnswers] = useState<Array<{ questionId: string; selectedOptionId: string; confidenceRating: number; isCorrect: boolean }>>([]);
  const [sessionResult, setSessionResult] = useState<DemoAssessmentResult | null>(null);

  const currentQuestion = questions[currentQuestionIndex];

  const score = useMemo(() => {
    if (answers.length === 0) return 0;
    return Math.round((answers.filter((item) => item.isCorrect).length / answers.length) * 100);
  }, [answers]);

  const handleSubmit = () => {
    if (!selectedOption || !currentQuestion) return;
    const correct = selectedOption === currentQuestion.correctOptionId;
    setIsSubmitted(true);
    setIsCorrect(correct);
    setAnswers((current) => [
      ...current,
      {
        questionId: currentQuestion.id,
        selectedOptionId: selectedOption,
        confidenceRating,
        isCorrect: correct,
      },
    ]);
  };

  const handleNext = () => {
    setIsSubmitted(false);
    setSelectedOption(null);
    setConfidenceRating(3);
    setIsCorrect(null);
    setCurrentQuestionIndex((current) => current + 1);
  };

  const handleFinish = () => {
    const result = completeSession({
      answers: answers.map((answer) => ({
        questionId: answer.questionId,
        selectedOptionId: answer.selectedOptionId,
        confidenceRating: answer.confidenceRating,
      })),
      mode: session.mode,
      conceptId,
      assessmentId,
    });
    setSessionResult(result);
  };

  if (sessionResult || (!currentQuestion && answers.length > 0)) {
    const conceptBreakdown = sessionResult?.conceptBreakdown ?? [];

    return (
      <Card className="mx-auto w-full max-w-3xl text-center" glass>
        <CardHeader>
          <CardTitle>{assessmentId ? 'Assessment Complete' : 'Practice Session Complete'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-4xl font-bold">{sessionResult?.score ?? score}%</p>
            <p className="text-muted-foreground">
              You answered {answers.filter((item) => item.isCorrect).length} of {answers.length} correctly.
            </p>
          </div>

          <div className="grid gap-4 text-left md:grid-cols-2">
            {conceptBreakdown.length > 0 ? (
              conceptBreakdown.map((item) => (
                <div className="rounded-2xl border border-border/70 p-4" key={item.conceptId}>
                  <p className="font-semibold">{item.conceptName}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.correct}/{item.total} correct
                  </p>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-border/70 p-4 md:col-span-2">
                <p className="font-semibold">Updated mastery and recommendations</p>
                <p className="text-sm text-muted-foreground">Your dashboard, progress chart, goals, and reminders have been refreshed from this session.</p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button className="flex-1" onClick={() => router.push(appRoutes.student.dashboard)}>
              Back to Dashboard
            </Button>
            <Button className="flex-1" variant="secondary" onClick={() => router.push(appRoutes.student.progress)}>
              View Progress
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!currentQuestion) {
    return null;
  }

  return (
    <div className="flex items-start justify-center pt-10">
      <Card
        className={cn(
          'w-full max-w-3xl transition-all duration-300',
          isSubmitted && isCorrect && 'shadow-glow',
          isSubmitted && !isCorrect && 'ring-2 ring-danger/40',
        )}
        glass
      >
        <CardHeader className="space-y-3">
          <div className="space-y-1 text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{session.mode.replace('-', ' ')}</p>
            <CardTitle>{session.title}</CardTitle>
            <p className="text-sm text-muted-foreground">{session.subtitle}</p>
          </div>
          <p className="text-sm text-muted-foreground">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg">{currentQuestion.text}</p>
          <div className="space-y-4">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedOption === option.id;
              let variant: 'primary' | 'secondary' | 'success' | 'danger' = 'secondary';

              if (isSubmitted) {
                if (option.id === currentQuestion.correctOptionId) variant = 'success';
                else if (isSelected && !isCorrect) variant = 'danger';
              } else if (isSelected) {
                variant = 'primary';
              }

              return (
                <Button
                  className="h-auto w-full justify-start px-4 py-3 text-left"
                  key={option.id}
                  variant={variant}
                  onClick={() => !isSubmitted && setSelectedOption(option.id)}
                >
                  <span className="mr-4 font-bold">{option.id.toUpperCase()}</span>
                  <span>{option.text}</span>
                </Button>
              );
            })}
          </div>

          <div className="rounded-2xl bg-muted/70 p-4 text-left">
            <p className="text-sm font-semibold text-foreground">Confidence</p>
            <p className="mb-3 text-sm text-muted-foreground">How confident are you in this answer?</p>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <Button key={value} size="sm" variant={confidenceRating === value ? 'primary' : 'secondary'} onClick={() => setConfidenceRating(value)}>
                  {value}
                </Button>
              ))}
            </div>
          </div>

          {!isSubmitted ? (
            <Button className="w-full" disabled={!selectedOption} onClick={handleSubmit}>
              Submit Answer
            </Button>
          ) : currentQuestionIndex < questions.length - 1 ? (
            <Button className="w-full" onClick={handleNext}>
              Next Question
            </Button>
          ) : (
            <Button className="w-full" onClick={handleFinish}>
              Finish Session
            </Button>
          )}

          {isSubmitted ? (
            <div className="rounded-lg bg-muted p-4">
              <h3 className="mb-2 text-lg font-bold">{isCorrect ? 'Correct!' : 'Incorrect'}</h3>
              <p>{currentQuestion.explanation}</p>
              <p className="mt-3 text-sm text-muted-foreground">Concept focus: {currentQuestion.conceptIds.map((item) => getConceptName(item)).join(', ')}</p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="sm" variant="secondary">
                  <Link href={appRoutes.student.aiTutor}>Ask AI to explain this</Link>
                </Button>
                <Button asChild size="sm" variant="ghost">
                  <Link href={appRoutes.student.aiTutor}>Simplify this concept</Link>
                </Button>
              </div>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}

export default function PracticeQuestionView() {
  return (
    <Suspense fallback={<Skeleton className="h-96 w-full max-w-3xl" />}>
      <PracticeQuestionCore />
    </Suspense>
  );
}
