"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/cn";
import { getPracticeQuestions } from "@/lib/mocks";

function PracticeQuestionCore() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const assessmentId = searchParams.get("assessmentId");
  const conceptId = searchParams.get("conceptId");

  const questions = getPracticeQuestions({ assessmentId, conceptId });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [answers, setAnswers] = useState<{ questionId: string; isCorrect: boolean }[]>([]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleSubmit = () => {
    if (!selectedOption || !currentQuestion) return;
    const correct = selectedOption === currentQuestion.correctOptionId;
    setIsSubmitted(true);
    setIsCorrect(correct);
    setAnswers((current) => [...current, { questionId: currentQuestion.id, isCorrect: correct }]);
  };

  const handleNext = () => {
    setIsSubmitted(false);
    setSelectedOption(null);
    setIsCorrect(null);
    setCurrentQuestionIndex((current) => current + 1);
  };

  const handleFinish = () => {
    router.push("/student/dashboard");
  };

  if (!currentQuestion) {
    const score = questions.length === 0 ? 0 : Math.round((answers.filter((item) => item.isCorrect).length / questions.length) * 100);

    return (
      <Card className="w-full max-w-2xl text-center" glass>
        <CardHeader>
          <CardTitle>Assessment Complete</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-4xl font-bold">Your Score: {score}%</p>
          <p className="text-muted-foreground">
            You got {answers.filter((item) => item.isCorrect).length} out of {questions.length} questions correct.
          </p>
          <Button className="mt-6" onClick={handleFinish}>
            Back to Dashboard
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex items-start justify-center pt-10">
      <Card
        className={cn(
          "w-full max-w-2xl transition-all duration-300",
          isSubmitted && isCorrect && "shadow-glow",
          isSubmitted && !isCorrect && "ring-2 ring-danger/40",
        )}
        glass
      >
        <CardHeader>
          <CardTitle>
            Question {currentQuestionIndex + 1} of {questions.length}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-lg">{currentQuestion.text}</p>
          <div className="mb-6 space-y-4">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedOption === option.id;
              let variant: "primary" | "secondary" | "success" | "danger" = "secondary";

              if (isSubmitted) {
                if (option.id === currentQuestion.correctOptionId) variant = "success";
                else if (isSelected && !isCorrect) variant = "danger";
              } else if (isSelected) {
                variant = "primary";
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

          {!isSubmitted ? (
            <Button className="w-full" disabled={!selectedOption} onClick={handleSubmit}>
              Submit
            </Button>
          ) : currentQuestionIndex < questions.length - 1 ? (
            <Button className="w-full" onClick={handleNext}>
              Next Question
            </Button>
          ) : (
            <Button className="w-full" onClick={handleFinish}>
              Finish Assessment
            </Button>
          )}

          {isSubmitted ? (
            <div className="mt-6 rounded-lg bg-muted p-4">
              <h3 className="mb-2 text-lg font-bold">{isCorrect ? "Correct!" : "Incorrect"}</h3>
              <p>{currentQuestion.explanation}</p>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}

export default function PracticeQuestionView() {
  return (
    <Suspense fallback={<Skeleton className="h-96 w-full max-w-2xl" />}>
      <PracticeQuestionCore />
    </Suspense>
  );
}
