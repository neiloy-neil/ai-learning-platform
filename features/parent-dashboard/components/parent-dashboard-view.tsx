'use client';

import Link from 'next/link';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/ui/progress-bar';
import { EmptyStatePanel } from '@/components/ui/state-panel';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import PrintableSummaryCard from './printable-summary-card';
import WeeklyActivityWidget from './weekly-activity-widget';
import { useDemoData } from '@/features/demo/components/demo-data-provider';
import { appRoutes } from '@/lib/app-routes';
import { demoUsers, getConceptName, mockConcepts } from '@/lib/mocks';

export default function ParentDashboardView() {
  const { parentProfiles, selectedParentStudentId, selectParentStudent, selectedParentSupport, generateParentSupport } = useDemoData();
  const selectedProfile =
    parentProfiles.find((profile) => profile.student.id === selectedParentStudentId) ?? parentProfiles[0];
  const strengths = selectedProfile.mastery.filter((item) => item.masteryScore >= 85);
  const weaknesses = selectedProfile.mastery.filter((item) => item.masteryScore < 60);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Parent Dashboard</h1>
          <p className="text-md text-muted-foreground">
            {demoUsers.parent.name} is viewing progress for <strong>{selectedProfile.student.name}</strong>.
          </p>
        </div>
        <div className="w-full max-w-sm">
          <p className="mb-2 text-sm font-semibold text-muted-foreground">Linked children</p>
          <Select value={selectedProfile.student.id} onValueChange={selectParentStudent}>
            <SelectTrigger>{selectedProfile.student.name}</SelectTrigger>
            <SelectContent>
              {parentProfiles.map((profile) => (
                <SelectItem key={profile.student.id} value={profile.student.id}>
                  {profile.student.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <WeeklyActivityWidget activity={selectedProfile.weeklyActivity} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-4">
        <Card glass>
          <CardHeader>
            <CardTitle>Weekly Digest</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">{selectedProfile.digest.summary}</CardContent>
        </Card>
        <Card glass>
          <CardHeader>
            <CardTitle>What Changed This Week</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {selectedProfile.changes.map((change) => (
              <div className="rounded-2xl border border-border/70 p-3" key={change.id}>
                <p className="font-semibold text-foreground">{change.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{change.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card glass>
          <CardHeader>
            <CardTitle>Upcoming Assessments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {selectedProfile.upcomingAssessments.map((assessment) => (
              <div className="rounded-2xl border border-border/70 p-3" key={assessment.id}>
                <p className="font-semibold text-foreground">{assessment.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">Due {assessment.dueLabel}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card glass>
          <CardHeader>
            <CardTitle>Teacher Messages</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {selectedProfile.teacherMessagesPreview.map((message) => (
              <div className="rounded-2xl border border-border/70 p-3" key={message.id}>
                <p className="font-semibold text-foreground">{message.sender}</p>
                <p className="mt-1 text-sm text-muted-foreground">{message.text}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:col-span-2">
          <Card glass>
            <CardHeader>
              <CardTitle>Strengths</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {strengths.length > 0 ? (
                strengths.map((item) => (
                  <div key={item.conceptId}>
                    <p className="font-semibold">{getConceptName(item.conceptId)}</p>
                    <ProgressBar value={item.masteryScore} />
                  </div>
                ))
              ) : (
                <EmptyStatePanel
                  className="border-0 bg-transparent shadow-none"
                  title="No strengths yet"
                  description="Strong concepts will appear once the learner builds stable mastery in a topic."
                />
              )}
            </CardContent>
          </Card>
          <Card glass>
            <CardHeader>
              <CardTitle>Areas for Improvement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {weaknesses.length > 0 ? (
                weaknesses.map((item) => (
                  <div key={item.conceptId}>
                    <p className="font-semibold">{getConceptName(item.conceptId)}</p>
                    <ProgressBar value={item.masteryScore} />
                  </div>
                ))
              ) : (
                <EmptyStatePanel
                  className="border-0 bg-transparent shadow-none"
                  title="No active risk areas"
                  description="Once weaker concepts appear, this section will translate them into parent-friendly support signals."
                />
              )}
            </CardContent>
          </Card>
        </div>
        <Card glass>
          <CardHeader>
            <CardTitle>Alerts and Goals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedProfile.alerts.length === 0 ? (
              <EmptyStatePanel
                className="border-0 bg-transparent shadow-none"
                title="No alerts right now"
                description="Support alerts will show up here if activity drops, assessments are missed, or mastery slips."
              />
            ) : (
              selectedProfile.alerts.map((alert) => (
                <div className="rounded-2xl border border-border/70 p-4" key={alert.id}>
                  <p className="font-semibold">{alert.message}</p>
                  <p className="mt-2 text-sm capitalize text-muted-foreground">
                    Type: {alert.type.replace('_', ' ')}
                  </p>
                </div>
              ))
            )}
            <div className="rounded-2xl border border-border/70 p-4">
              <p className="font-semibold">Current goals</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {selectedProfile.goals.filter((goal) => goal.status === 'active').length} active study goals are helping keep the week on track.
              </p>
            </div>
            <Button className="w-full" onClick={() => generateParentSupport(selectedProfile.student.id)} variant="secondary">
              Refresh AI home support
            </Button>
            {selectedParentSupport ? (
              <div className="rounded-2xl border border-border/70 p-4">
                <p className="font-semibold">AI helper panel</p>
                <p className="mt-2 text-sm text-muted-foreground">{selectedParentSupport.homePlan}</p>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_1fr]">
        <Card glass>
          <CardHeader>
            <CardTitle>Plain-Language Reading</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              Strengths: {strengths.length > 0 ? strengths.map((item) => getConceptName(item.conceptId)).join(', ') : 'No fully stable strengths yet.'}
            </p>
            <p>
              Weaknesses: {weaknesses.length > 0 ? weaknesses.map((item) => getConceptName(item.conceptId)).join(', ') : 'No active risk areas right now.'}
            </p>
            <p>{selectedProfile.digest.attendanceTone}</p>
          </CardContent>
        </Card>
        <Card glass>
          <CardHeader>
            <CardTitle>Support Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {selectedProfile.supportTips.map((tip) => (
              <div className="rounded-2xl border border-border/70 p-4" key={tip.id}>
                <p className="font-semibold text-foreground">{tip.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">{tip.description}</p>
              </div>
            ))}
            <div className="flex flex-col gap-3 md:flex-row">
              <Button asChild className="md:flex-1" variant="secondary">
                <Link href={appRoutes.parent.supportTips}>Open support tips</Link>
              </Button>
              <Button asChild className="md:flex-1" variant="ghost">
                <Link href={appRoutes.parent.messages}>Open messages</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <PrintableSummaryCard
        alerts={selectedProfile.alerts}
        concepts={mockConcepts}
        goals={selectedProfile.goals.map((goal) => ({ id: goal.id, progress: goal.progress, text: goal.text }))}
        mastery={selectedProfile.mastery}
        student={selectedProfile.student}
        weeklyActivity={selectedProfile.weeklyActivity}
      />
    </div>
  );
}
