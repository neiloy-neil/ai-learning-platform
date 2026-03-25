'use client';

import { useEffect, useMemo, useState } from 'react';

import PageHeader from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { EmptyStatePanel } from '@/components/ui/state-panel';
import { useDemoData } from '@/features/demo/components/demo-data-provider';

type MessagesViewProps = {
  role: 'teacher' | 'parent';
};

export default function MessagesView({ role }: MessagesViewProps) {
  const { teacherState, sendThreadMessage } = useDemoData();
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

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[320px_1fr]">
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
      </div>
    </div>
  );
}
