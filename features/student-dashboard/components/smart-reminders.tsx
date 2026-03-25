'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { appRoutes } from '@/lib/app-routes';
import type { SmartReminder } from '@/lib/mocks';

type SmartRemindersProps = {
  reminders: SmartReminder[];
};

export default function SmartReminders({ reminders }: SmartRemindersProps) {
  const router = useRouter();

  if (reminders.length === 0) {
    return null;
  }

  return (
    <Card glass>
      <CardHeader>
        <CardTitle>Smart Reminders</CardTitle>
        <p className="text-sm leading-6 text-muted-foreground">
          Quick follow-ups based on weak mastery or stale revision timing.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {reminders.map((reminder) => (
          <div className="flex flex-col gap-4 rounded-2xl border border-border/70 bg-surface/70 p-4 sm:flex-row sm:items-center sm:justify-between" key={reminder.concept.id}>
            <div>
              <p className="font-semibold">{reminder.concept.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">{reminder.reason}</p>
            </div>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => router.push(`${appRoutes.student.practice}?conceptId=${reminder.concept.id}&mode=revision`)}
            >
              Review
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
