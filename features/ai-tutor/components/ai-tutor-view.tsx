'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

import PageHeader from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { useDemoData } from '@/features/demo/components/demo-data-provider';
import { appRoutes } from '@/lib/app-routes';
import { mockConcepts } from '@/lib/mocks';

export default function AiTutorView() {
  const {
    aiTutorMessages,
    assessments,
    generatedQuizzes,
    generatedQuizAssessments,
    latestStudyPlan,
    sendAiTutorPrompt,
    generateQuiz,
    assessGeneratedQuiz,
    generateStudyPlan,
    dashboardData,
  } = useDemoData();
  const [prompt, setPrompt] = useState('');
  const [conceptId, setConceptId] = useState(dashboardData.recommendation.nextConceptId);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [questionCount, setQuestionCount] = useState('3');
  const [activeQuizId, setActiveQuizId] = useState('');
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});

  const activeQuiz = generatedQuizzes.find((quiz) => quiz.id === activeQuizId) ?? generatedQuizzes[0];
  const activeQuizAssessment = activeQuiz ? generatedQuizAssessments[activeQuiz.id] : null;
  const selectedConcept = mockConcepts.find((concept) => concept.id === conceptId) ?? mockConcepts[0];
  const latestReviewedAssessment = assessments.find((assessment) => assessment.status === 'Reviewed' || assessment.status === 'Completed');

  const quickPrompts = [
    'Explain this concept',
    'Simplify the answer',
    'Give me a hint',
    'Recommend my next step',
    'Motivate me for today',
    'Help me review an assessment',
    'Build a revision plan',
  ];

  const unansweredCount = useMemo(() => {
    if (!activeQuiz) {
      return 0;
    }
    return activeQuiz.questions.filter((question) => !quizAnswers[question.id]).length;
  }, [activeQuiz, quizAnswers]);

  function handlePromptSubmit() {
    const nextPrompt = prompt.trim();
    if (!nextPrompt) {
      return;
    }
    sendAiTutorPrompt({
      prompt: nextPrompt,
      conceptName: selectedConcept.name,
    });
    setPrompt('');
  }

  function handleGenerateQuiz() {
    const quiz = generateQuiz({
      conceptId: selectedConcept.id,
      conceptName: selectedConcept.name,
      subject: selectedConcept.subject,
      difficulty,
      questionCount: Number(questionCount),
      ownerRole: 'student',
    });
    setActiveQuizId(quiz.id);
    setQuizAnswers({});
  }

  function handleAssessQuiz() {
    if (!activeQuiz) {
      return;
    }
    assessGeneratedQuiz({
      quizId: activeQuiz.id,
      answers: Object.entries(quizAnswers).map(([questionId, selectedOptionId]) => ({ questionId, selectedOptionId })),
    });
  }

  return (
    <div className="space-y-8">
      <PageHeader />

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1.25fr_0.85fr]">
        <Card glass>
          <CardHeader>
            <CardTitle>AI Tutor Chat</CardTitle>
            <p className="text-sm text-muted-foreground">
              Deterministic demo AI for explanations, hints, motivation, and next-step guidance.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-wrap gap-3">
              {quickPrompts.map((item) => (
                <Button
                  key={item}
                  onClick={() =>
                    sendAiTutorPrompt({
                      prompt: item,
                      conceptName: selectedConcept.name,
                    })
                  }
                  size="sm"
                  variant="secondary"
                >
                  {item}
                </Button>
              ))}
            </div>

            <div className="space-y-4 rounded-3xl border border-border/70 bg-muted/30 p-4">
              {aiTutorMessages.map((message) => (
                <div
                  className={`max-w-[85%] rounded-2xl p-4 ${
                    message.sender === 'assistant' ? 'bg-surface shadow-panel' : 'ml-auto bg-primary text-primary-foreground'
                  }`}
                  key={message.id}
                >
                  {message.title ? <p className="text-sm font-semibold">{message.title}</p> : null}
                  <p className="mt-1 text-sm leading-6">{message.text}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-[220px_1fr_auto]">
              <Select value={conceptId} onValueChange={setConceptId}>
                <SelectTrigger>{selectedConcept.name}</SelectTrigger>
                <SelectContent>
                  {mockConcepts.map((concept) => (
                    <SelectItem key={concept.id} value={concept.id}>
                      {concept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                placeholder="Ask the AI tutor for help..."
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
              />
              <Button onClick={handlePromptSubmit}>Send</Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card glass>
            <CardHeader>
              <CardTitle>Today with AI</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <div className="rounded-2xl border border-border/70 p-4">
                <p className="font-semibold text-foreground">Recommended focus</p>
                <p className="mt-2">{dashboardData.recommendation.reason}</p>
                <Button asChild className="mt-4 w-full" variant="secondary">
                  <Link href={dashboardData.recommendation.href}>{dashboardData.recommendation.ctaLabel}</Link>
                </Button>
              </div>
              <div className="rounded-2xl border border-border/70 p-4">
                <p className="font-semibold text-foreground">Latest study plan</p>
                <p className="mt-2">
                  {latestStudyPlan
                    ? latestStudyPlan.rationale
                    : 'No AI study plan generated yet. Create one from the study-plan page or here.'}
                </p>
                <Button className="mt-4 w-full" onClick={() => generateStudyPlan(75)} variant="secondary">
                  Generate a 75-minute plan
                </Button>
              </div>
              <div className="rounded-2xl border border-border/70 p-4">
                <p className="font-semibold text-foreground">Assessment coaching</p>
                <p className="mt-2">
                  {latestReviewedAssessment
                    ? `${latestReviewedAssessment.title} is ready for post-assessment coaching and next-step planning.`
                    : 'Complete or review an assessment to unlock a stronger coaching workflow here.'}
                </p>
                <div className="mt-4 flex flex-col gap-3">
                  <Button
                    onClick={() =>
                      sendAiTutorPrompt({
                        prompt: 'Help me review an assessment',
                        conceptName: selectedConcept.name,
                      })
                    }
                    variant="secondary"
                  >
                    Generate coaching message
                  </Button>
                  <Button asChild variant="ghost">
                    <Link href={appRoutes.student.assessments}>Open assessments</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card glass>
            <CardHeader>
              <CardTitle>AI Quiz Generator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={difficulty} onValueChange={(value) => setDifficulty(value as 'easy' | 'medium' | 'hard')}>
                <SelectTrigger>{difficulty}</SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">easy</SelectItem>
                  <SelectItem value="medium">medium</SelectItem>
                  <SelectItem value="hard">hard</SelectItem>
                </SelectContent>
              </Select>
              <Select value={questionCount} onValueChange={setQuestionCount}>
                <SelectTrigger>{questionCount} questions</SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 questions</SelectItem>
                  <SelectItem value="4">4 questions</SelectItem>
                </SelectContent>
              </Select>
              <Button className="w-full" onClick={handleGenerateQuiz}>
                Generate quiz from {selectedConcept.name}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {activeQuiz ? (
        <Card glass>
          <CardHeader>
            <CardTitle>{activeQuiz.title}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {activeQuiz.questionCount} generated questions for {activeQuiz.conceptName}. {unansweredCount > 0 ? `${unansweredCount} question(s) left.` : 'Ready for AI assessment.'}
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 lg:grid-cols-2">
              {activeQuiz.questions.map((question) => (
                <div className="rounded-3xl border border-border/70 p-4" key={question.id}>
                  <p className="font-semibold">{question.text}</p>
                  <div className="mt-4 space-y-2">
                    {question.options.map((option) => (
                      <button
                        className={`w-full rounded-2xl border px-4 py-3 text-left text-sm transition ${
                          quizAnswers[question.id] === option.id ? 'border-primary bg-primary/10 text-foreground' : 'border-border/70 text-muted-foreground'
                        }`}
                        key={option.id}
                        onClick={() => setQuizAnswers((current) => ({ ...current, [question.id]: option.id }))}
                        type="button"
                      >
                        {option.text}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 md:flex-row">
              <Button className="md:flex-1" disabled={unansweredCount > 0} onClick={handleAssessQuiz}>
                AI assess this quiz
              </Button>
              <Button asChild className="md:flex-1" variant="secondary">
                <Link href={appRoutes.student.studyPlan}>Open study plan</Link>
              </Button>
            </div>

            {activeQuizAssessment ? (
              <div className="grid gap-4 rounded-3xl border border-border/70 bg-muted/30 p-5 lg:grid-cols-2">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">AI assessment</p>
                  <p className="mt-2 text-4xl font-semibold text-foreground">{activeQuizAssessment.score}%</p>
                  <p className="mt-3 text-sm text-muted-foreground">{activeQuizAssessment.studyAdvice}</p>
                </div>
                <div className="grid gap-4">
                  <div>
                    <p className="font-semibold text-foreground">Strengths</p>
                    {activeQuizAssessment.strengths.map((item) => (
                      <p className="mt-2 text-sm text-muted-foreground" key={item}>
                        {item}
                      </p>
                    ))}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Mistakes</p>
                    {activeQuizAssessment.mistakes.map((item) => (
                      <p className="mt-2 text-sm text-muted-foreground" key={item}>
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}

            {activeQuizAssessment ? (
              <div className="flex flex-col gap-3 md:flex-row">
                <Button
                  className="md:flex-1"
                  onClick={() =>
                    sendAiTutorPrompt({
                      prompt: 'Build a revision plan',
                      conceptName: activeQuiz.conceptName,
                    })
                  }
                  variant="secondary"
                >
                  Turn result into revision plan
                </Button>
                <Button asChild className="md:flex-1" variant="ghost">
                  <Link href={appRoutes.student.assessments}>Open assessment review</Link>
                </Button>
              </div>
            ) : null}
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
