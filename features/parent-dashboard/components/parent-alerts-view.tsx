'use client';

import Link from 'next/link';
import { useState } from 'react';

import PageHeader from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useDemoData } from '@/features/demo/components/demo-data-provider';
import { appRoutes } from '@/lib/app-routes';

export default function ParentAlertsView() {
  const { parentProfiles, selectedParentStudentId, createParentContactRequest, generateParentSupport, teacherState } = useDemoData();
  const selectedProfile = parentProfiles.find((profile) => profile.student.id === selectedParentStudentId) ?? parentProfiles[0];
  const [requestTopic, setRequestTopic] = useState('Can we review the best support plan for this week?');
  const linkedRequests = teacherState.contactRequests.filter((request) => request.studentId === selectedProfile.student.id).slice(0, 3);
  const linkedParentThread = teacherState.threads.find(
    (thread) => thread.studentId === selectedProfile.student.id && thread.participantRole === 'parent',
  );

  return (
    <div className="space-y-8">
      <PageHeader />

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_1fr_0.9fr]">
        <Card glass>
          <CardHeader>
            <CardTitle>Active Alerts and Changes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedProfile.alerts.map((alert) => (
              <div className="rounded-3xl border border-border/70 p-4" key={alert.id}>
                <p className="font-semibold text-foreground">{alert.message}</p>
                <p className="mt-2 text-sm capitalize text-muted-foreground">{alert.type.replace('_', ' ')}</p>
              </div>
            ))}
            {selectedProfile.changes.map((item) => (
              <div className="rounded-3xl border border-border/70 p-4" key={item.id}>
                <p className="font-semibold text-foreground">{item.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card glass>
          <CardHeader>
            <CardTitle>Upcoming and Missed Work</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedProfile.upcomingAssessments.map((assessment) => (
              <div className="rounded-3xl border border-border/70 p-4" key={assessment.id}>
                <p className="font-semibold text-foreground">{assessment.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">Due {assessment.dueLabel}</p>
              </div>
            ))}
            {selectedProfile.missedWork.map((item) => (
              <div className="rounded-3xl border border-border/70 p-4" key={item.id}>
                <p className="font-semibold text-foreground">{item.title}</p>
                <p className="mt-2 text-sm text-danger">{item.status}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card glass>
          <CardHeader>
            <CardTitle>Teacher Follow-up</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-3xl border border-border/70 p-4">
              <p className="font-semibold text-foreground">Request teacher support</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Turn the current alerts into a concrete follow-up request that appears in the teacher workspace.
              </p>
            </div>
            <Input value={requestTopic} onChange={(event) => setRequestTopic(event.target.value)} />
            <Button
              className="w-full"
              onClick={() => {
                createParentContactRequest({
                  studentId: selectedProfile.student.id,
                  topic: requestTopic,
                });
                setRequestTopic('Please suggest the next intervention after the latest alert.');
              }}
              variant="secondary"
            >
              Send follow-up request
            </Button>
            <Button className="w-full" onClick={() => generateParentSupport(selectedProfile.student.id)} variant="ghost">
              Refresh AI home support plan
            </Button>
            <Button asChild className="w-full" variant="ghost">
              <Link href={appRoutes.parent.messages}>Open messages</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_1fr]">
        <Card glass>
          <CardHeader>
            <CardTitle>Open Family Requests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {linkedRequests.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border/70 p-4 text-sm text-muted-foreground">
                No family follow-up requests are currently open for this learner.
              </div>
            ) : (
              linkedRequests.map((request) => (
                <div className="rounded-3xl border border-border/70 p-4" key={request.id}>
                  <p className="font-semibold text-foreground">{request.topic}</p>
                  <p className="mt-2 text-sm text-muted-foreground">Logged {request.requestedAtLabel}</p>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card glass>
          <CardHeader>
            <CardTitle>Conversation Snapshot</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {linkedParentThread ? (
              <>
                {linkedParentThread.messages.slice(-2).map((message) => (
                  <div className="rounded-3xl border border-border/70 p-4" key={message.id}>
                    <p className="text-sm font-semibold capitalize text-foreground">{message.senderRole}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{message.text}</p>
                  </div>
                ))}
                <Button asChild className="w-full" variant="secondary">
                  <Link href={appRoutes.parent.messages}>Continue conversation</Link>
                </Button>
              </>
            ) : (
              <div className="rounded-2xl border border-dashed border-border/70 p-4 text-sm text-muted-foreground">
                Message context will appear here once a teacher or parent follow-up is sent.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
