'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

import PageHeader from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { EmptyStatePanel } from '@/components/ui/state-panel';
import { useDemoData } from '@/features/demo/components/demo-data-provider';
import { appRoutes, getTeacherStudentRoute } from '@/lib/app-routes';

type MessagesViewProps = {
  role: 'teacher' | 'parent';
};

export default function MessagesView({ role }: MessagesViewProps) {
  const { teacherState, parentProfiles, selectedParentStudentId } = useDemoData();
  const { sendThreadMessage } = useDemoData();
  const [selectedThreadId, setSelectedThreadId] = useState('');
  const [draft, setDraft] = useState('');

  const threads = useMemo(() => {
    if (role === 'teacher') {
      return teacherState.threads;
    }

    return teacherState.threads.filter((thread) => thread.participantRole === 'parent');
  }, [role, teacherState.threads]);

  useEffect(() => {
    if (!selectedThreadId && threads[0]) {
      setSelectedThreadId(threads[0].id);
    }

    if (selectedThreadId && !threads.some((thread) => thread.id === selectedThreadId)) {
      setSelectedThreadId(threads[0]?.id ?? '');
    }
  }, [selectedThreadId, threads]);

  const selectedThread = threads.find((thread) => thread.id === selectedThreadId) ?? threads[0];
  const selectedTeacherStudent = selectedThread
    ? teacherState.students.find((student) => student.id === selectedThread.studentId)
    : null;
  const selectedParentProfile = parentProfiles.find((profile) => profile.student.id === selectedParentStudentId) ?? parentProfiles[0];
  const linkedAssignments = selectedThread
    ? teacherState.assignments.filter((assignment) => assignment.assignedToStudentId === selectedThread.studentId).slice(0, 3)
    : [];
  const linkedContactRequests = selectedThread
    ? teacherState.contactRequests.filter((request) => request.studentId === selectedThread.studentId).slice(0, 2)
    : [];

  function handleSend() {
    const text = draft.trim();
    if (!selectedThread || !text) {
      return;
    }

    sendThreadMessage({
      threadId: selectedThread.id,
      senderRole: role,
      text,
    });
    setDraft('');
  }

  return (
    <div className="space-y-8">
      <PageHeader />

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[320px_1fr_320px]">
        <Card>
          <CardHeader>
            <CardTitle>{role === 'teacher' ? 'Conversation Threads' : 'Teacher Conversations'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {threads.length === 0 ? (
              <EmptyStatePanel
                className="border-0 bg-transparent shadow-none"
                title="No conversations yet"
                description="Threads will appear here once follow-up messages start flowing between roles."
              />
            ) : (
              threads.map((thread) => {
                const latestMessage = thread.messages[thread.messages.length - 1];
                return (
                  <button
                    className={`w-full rounded-2xl border p-4 text-left transition ${
                      selectedThread?.id === thread.id ? 'border-primary/60 bg-primary/5' : 'border-border/70'
                    }`}
                    key={thread.id}
                    onClick={() => setSelectedThreadId(thread.id)}
                    type="button"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold">{thread.participantName}</p>
                        <p className="text-sm text-muted-foreground">{thread.topic}</p>
                      </div>
                      <span className="text-xs uppercase text-muted-foreground">{thread.participantRole}</span>
                    </div>
                    {latestMessage ? (
                      <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{latestMessage.text}</p>
                    ) : null}
                  </button>
                );
              })
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{selectedThread ? selectedThread.topic : 'Messages'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!selectedThread ? (
              <EmptyStatePanel
                className="border-0 bg-transparent shadow-none"
                title="Pick a thread"
                description="Choose a conversation to review messages and send the next follow-up."
              />
            ) : (
              <>
                <div className="space-y-3">
                  {selectedThread.messages.map((message) => (
                    <div
                      className={`rounded-2xl p-4 ${
                        message.senderRole === role ? 'ml-auto bg-primary text-primary-foreground' : 'bg-muted'
                      } max-w-[80%]`}
                      key={message.id}
                    >
                      <p className="text-sm font-semibold capitalize">{message.senderRole}</p>
                      <p className="mt-1 text-sm">{message.text}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 rounded-2xl border border-border/70 p-4">
                  <Input
                    placeholder={role === 'teacher' ? 'Send a follow-up message...' : 'Reply to the teacher...'}
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                  />
                  <Button onClick={handleSend} variant="secondary">
                    Send message
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{role === 'teacher' ? 'Follow-up Context' : 'Child Context'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {role === 'teacher' ? (
              selectedThread && selectedTeacherStudent ? (
                <>
                  <div className="rounded-2xl border border-border/70 p-4">
                    <p className="font-semibold">{selectedTeacherStudent.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {selectedTeacherStudent.cohort} cohort · {selectedTeacherStudent.avgScore}% average score
                    </p>
                    <div className="mt-4 flex flex-col gap-3">
                      <Button asChild size="sm" variant="secondary">
                        <Link href={getTeacherStudentRoute(selectedTeacherStudent.id)}>Open student workspace</Link>
                      </Button>
                      <Button asChild size="sm" variant="ghost">
                        <Link href={appRoutes.teacher.assignments}>Open assignment desk</Link>
                      </Button>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-border/70 p-4">
                    <p className="font-semibold">Linked assignments</p>
                    <div className="mt-3 space-y-3">
                      {linkedAssignments.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No assignments linked to this thread yet.</p>
                      ) : (
                        linkedAssignments.map((assignment) => (
                          <div key={assignment.id}>
                            <p className="text-sm font-semibold">{assignment.title}</p>
                            <p className="text-sm text-muted-foreground">{assignment.status}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-border/70 p-4">
                    <p className="font-semibold">Parent requests</p>
                    <div className="mt-3 space-y-3">
                      {linkedContactRequests.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No parent requests tied to this learner right now.</p>
                      ) : (
                        linkedContactRequests.map((request) => (
                          <div key={request.id}>
                            <p className="text-sm font-semibold">{request.parentName}</p>
                            <p className="text-sm text-muted-foreground">{request.topic}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <EmptyStatePanel
                  className="border-0 bg-transparent shadow-none"
                  title="No thread selected"
                  description="Choose a conversation to load the linked student and parent follow-up context."
                />
              )
            ) : (
              <>
                <div className="rounded-2xl border border-border/70 p-4">
                  <p className="font-semibold">{selectedParentProfile.student.name}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{selectedParentProfile.digest.summary}</p>
                </div>
                <div className="rounded-2xl border border-border/70 p-4">
                  <p className="font-semibold">Current alerts</p>
                  <div className="mt-3 space-y-3">
                    {selectedParentProfile.alerts.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No current alerts.</p>
                    ) : (
                      selectedParentProfile.alerts.slice(0, 2).map((alert) => (
                        <p className="text-sm text-muted-foreground" key={alert.id}>
                          {alert.message}
                        </p>
                      ))
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <Button asChild size="sm" variant="secondary">
                    <Link href={appRoutes.parent.dashboard}>Open dashboard</Link>
                  </Button>
                  <Button asChild size="sm" variant="ghost">
                    <Link href={appRoutes.parent.supportTips}>Open support tips</Link>
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
