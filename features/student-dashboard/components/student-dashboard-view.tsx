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
  const { dashboardData } = useDemoData();
  const { concepts, mastery, recommendation, recentActivity, reminders, user, streakDays, todayPlan, revisionQueue, recentQuizHistory } = dashboardData;

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
              <div className="rounded-2xl border border-border/70 p-3" key={item.id}>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-foreground">{item.label}</p>
                  <span className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{item.timeLabel}</span>
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
