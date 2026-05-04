'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LearningPathTimeline from './learning-path-timeline';
import MasteryOverview from './mastery-overview';
import RecentActivity from './recent-activity';
import RecommendedAction from './recommended-action';
import SmartReminders from './smart-reminders';
import WelcomeHeader from './welcome-header';
import { useDemoData } from '@/features/demo/components/demo-data-provider';
import { appRoutes } from '@/lib/app-routes';

export default function StudentDashboardView() {
  const { dashboardData, assessments, latestStudyPlan, generatedQuizzes, generatedQuizAssessments } = useDemoData();
  const { concepts, mastery, recommendation, recentActivity, reminders, user, streakDays, todayPlan, revisionQueue, recentQuizHistory } = dashboardData;
  const nextAssessment = assessments.find((item) => item.status === 'Assigned' || item.status === 'In Progress') ?? assessments[0];
  const latestAiQuiz = generatedQuizzes[0];
  const latestAiAssessment = latestAiQuiz ? generatedQuizAssessments[latestAiQuiz.id] : null;
  const completedReviewCount = assessments.filter((assessment) => assessment.status === 'Reviewed' || assessment.status === 'Completed').length;

  return (
    <div className="space-y-8">
      <WelcomeHeader user={user} />
      <SmartReminders reminders={reminders} />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card glass>
          <CardHeader>
            <CardTitle>Study Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-semibold text-foreground">{streakDays} days</p>
            <p className="mt-2 text-sm text-muted-foreground">Daily evidence is active. Keep the streak alive with one short focused session today.</p>
          </CardContent>
        </Card>
        <Card glass>
          <CardHeader>
            <CardTitle>Today&apos;s Plan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {todayPlan.map((item) => (
              <div className="flex items-start gap-3 rounded-2xl border border-border/70 p-3" key={item.id}>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                  {item.type.slice(0, 3)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-foreground">{item.label}</p>
                    <span className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{item.timeLabel}</span>
                  </div>
                  <p className="mt-1 text-xs uppercase tracking-[0.12em] text-muted-foreground">{item.type}</p>
                </div>
              </div>
            ))}
            <Button asChild className="w-full" variant="secondary">
              <Link href={appRoutes.student.studyPlan}>Open AI study plan</Link>
            </Button>
          </CardContent>
        </Card>
        <Card glass>
          <CardHeader>
            <CardTitle>AI Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full">
              <Link href={appRoutes.student.aiTutor}>Open AI Tutor</Link>
            </Button>
            <Button asChild className="w-full" variant="secondary">
              <Link href={appRoutes.student.revision}>Review revision queue</Link>
            </Button>
            <Button asChild className="w-full" variant="ghost">
              <Link href={appRoutes.student.practice}>Generate practice from a topic</Link>
            </Button>
            <div className="rounded-2xl border border-border/70 p-3 text-sm text-muted-foreground">
              {completedReviewCount} reviewed assessment
              {completedReviewCount === 1 ? '' : 's'} and {recentQuizHistory.length} recent quiz signals are active in your planning loop.
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_0.9fr_1fr]">
        <Card glass>
          <CardHeader>
            <CardTitle>Agenda and Checkpoints</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {nextAssessment ? (
              <div className="rounded-2xl border border-border/70 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-foreground">{nextAssessment.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {nextAssessment.status} · due {new Date(nextAssessment.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    checkpoint
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{nextAssessment.description}</p>
              </div>
            ) : null}
            {latestStudyPlan ? (
              <div className="rounded-2xl border border-border/70 p-4">
                <p className="font-semibold text-foreground">AI coach note</p>
                <p className="mt-2 text-sm text-muted-foreground">{latestStudyPlan.rationale}</p>
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-border/70 p-4 text-sm text-muted-foreground">
                Generate a study plan to turn today&apos;s work into a clearer agenda.
              </div>
            )}
            <div className="rounded-2xl border border-border/70 p-4">
              <p className="font-semibold text-foreground">Next planning pressure</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {revisionQueue[0]
                  ? `${revisionQueue[0].conceptName} is the current weakest point in the queue. Clear it before the next scored assessment.`
                  : 'No active revision pressure right now. Keep practice momentum steady.'}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card glass>
          <CardHeader>
            <CardTitle>AI Quiz Review</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {latestAiQuiz && latestAiAssessment ? (
              <>
                <div className="rounded-2xl border border-border/70 p-4">
                  <p className="font-semibold text-foreground">{latestAiQuiz.title}</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {latestAiAssessment.score}% · next concepts: {latestAiAssessment.nextConcepts.join(', ')}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">{latestAiAssessment.studyAdvice}</p>
              </>
            ) : (
              <div className="rounded-2xl border border-dashed border-border/70 p-4 text-sm text-muted-foreground">
                Use AI Tutor to generate a quiz and surface a fresh review signal here.
              </div>
            )}
            <Button asChild className="w-full" variant="ghost">
              <Link href={appRoutes.student.aiTutor}>Open AI Tutor</Link>
            </Button>
          </CardContent>
        </Card>

        <Card glass>
          <CardHeader>
            <CardTitle>Planner Shortcuts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full">
              <Link href={appRoutes.student.assessments}>Review assessments</Link>
            </Button>
            <Button asChild className="w-full" variant="secondary">
              <Link href={appRoutes.student.revision}>Clear revision queue</Link>
            </Button>
            <Button asChild className="w-full" variant="ghost">
              <Link href={appRoutes.student.progress}>Check progress trends</Link>
            </Button>
            <Button asChild className="w-full" variant="ghost">
              <Link href={appRoutes.student.studyPlan}>Rebuild today&apos;s plan</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_1fr]">
        <Card glass>
          <CardHeader>
            <CardTitle>Coaching Timeline Snapshot</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivity.slice(0, 4).map((item) => (
              <div className="rounded-2xl border border-border/70 p-4" key={`coach-${item.id}`}>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-foreground">{item.text}</p>
                  <span className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{item.timeLabel}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card glass>
          <CardHeader>
            <CardTitle>Planning Signals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl border border-border/70 p-4">
              <p className="font-semibold text-foreground">Recommended concept</p>
              <p className="mt-2 text-sm text-muted-foreground">{recommendation.nextConceptName}</p>
            </div>
            <div className="rounded-2xl border border-border/70 p-4">
              <p className="font-semibold text-foreground">Next checkpoint</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {nextAssessment ? `${nextAssessment.title} is the next formal checkpoint.` : 'No checkpoint scheduled yet.'}
              </p>
            </div>
            <div className="rounded-2xl border border-border/70 p-4">
              <p className="font-semibold text-foreground">AI quiz signal</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {latestAiAssessment ? `${latestAiAssessment.score}% on ${latestAiQuiz?.title}.` : 'No AI quiz assessed yet.'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      <MasteryOverview concepts={concepts} mastery={mastery} />
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1.4fr_0.9fr_0.9fr]">
        <div>
          <LearningPathTimeline concepts={concepts} mastery={mastery} />
        </div>
        <div className="space-y-8">
          <RecommendedAction recommendation={recommendation} />
          <RecentActivity activities={recentActivity} />
        </div>
        <div className="space-y-8">
          <Card glass>
            <CardHeader>
              <CardTitle>Revision Queue</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {revisionQueue.slice(0, 3).map((task) => (
                <div className="rounded-2xl border border-border/70 p-3" key={task.id}>
                  <p className="text-sm font-semibold text-foreground">{task.conceptName}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{task.reason}</p>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card glass>
            <CardHeader>
              <CardTitle>Recent Quiz History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentQuizHistory.slice(0, 4).map((item) => (
                <div className="rounded-2xl border border-border/70 p-3" key={item.id}>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-foreground">{item.title}</p>
                    <span className="text-sm font-semibold text-primary">{item.score}%</span>
                  </div>
                  <p className="mt-1 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                    {item.mode} · {item.completedAtLabel}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
