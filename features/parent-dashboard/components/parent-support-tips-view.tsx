'use client';

import { useEffect } from 'react';

import PageHeader from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDemoData } from '@/features/demo/components/demo-data-provider';

export default function ParentSupportTipsView() {
  const { parentProfiles, selectedParentStudentId, generateParentSupport, selectedParentSupport, teacherState } = useDemoData();
  const selectedProfile = parentProfiles.find((profile) => profile.student.id === selectedParentStudentId) ?? parentProfiles[0];
  const latestThread = teacherState.threads.find(
    (thread) => thread.studentId === selectedProfile.student.id && thread.participantRole === 'parent',
  );

  useEffect(() => {
    if (!selectedParentSupport && selectedProfile) {
      generateParentSupport(selectedProfile.student.id);
    }
  }, [generateParentSupport, selectedParentSupport, selectedProfile]);

  return (
    <div className="space-y-8">
      <PageHeader />

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[0.9fr_1.1fr]">
        <Card glass>
          <CardHeader>
            <CardTitle>At-Home Support Suggestions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedProfile.supportTips.map((tip) => (
              <div className="rounded-3xl border border-border/70 p-4" key={tip.id}>
                <p className="font-semibold text-foreground">{tip.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">{tip.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card glass>
          <CardHeader>
            <CardTitle>AI Helper</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full" onClick={() => generateParentSupport(selectedProfile.student.id)} variant="secondary">
              Refresh AI support message
            </Button>
            {selectedParentSupport ? (
              <div className="space-y-4 rounded-3xl border border-border/70 p-5">
                <div>
                  <p className="font-semibold text-foreground">Explain the weakness</p>
                  <p className="mt-2 text-sm text-muted-foreground">{selectedParentSupport.explanation}</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Create a home plan</p>
                  <p className="mt-2 text-sm text-muted-foreground">{selectedParentSupport.homePlan}</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Encouragement message</p>
                  <p className="mt-2 text-sm text-muted-foreground">{selectedParentSupport.encouragement}</p>
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_1fr]">
        <Card glass>
          <CardHeader>
            <CardTitle>Support Action Bridge</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-3xl border border-border/70 p-4">
              <p className="font-semibold text-foreground">At-home action</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Use one short support action, then check the child dashboard or report view to see whether the weak concept is becoming clearer.
              </p>
            </div>
            <div className="rounded-3xl border border-border/70 p-4">
              <p className="font-semibold text-foreground">Teacher handoff</p>
              <p className="mt-2 text-sm text-muted-foreground">
                If the weakness still feels unclear after one guided session, escalate it into a teacher follow-up request instead of repeating generic practice.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card glass>
          <CardHeader>
            <CardTitle>Latest Parent-Teacher Context</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {latestThread ? (
              latestThread.messages.slice(-2).map((message) => (
                <div className="rounded-3xl border border-border/70 p-4" key={message.id}>
                  <p className="text-sm font-semibold capitalize text-foreground">{message.senderRole}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{message.text}</p>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-border/70 p-4 text-sm text-muted-foreground">
                Parent-teacher support context will appear here once a follow-up conversation is active.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
