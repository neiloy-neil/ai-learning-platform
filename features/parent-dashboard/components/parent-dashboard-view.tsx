'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress-bar';
import { EmptyStatePanel } from '@/components/ui/state-panel';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import PrintableSummaryCard from './printable-summary-card';
import WeeklyActivityWidget from './weekly-activity-widget';
import { useDemoData } from '@/features/demo/components/demo-data-provider';
import { demoUsers, getConceptName, mockConcepts } from '@/lib/mocks';

export default function ParentDashboardView() {
  const { parentProfiles, selectedParentStudentId, selectParentStudent } = useDemoData();
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
