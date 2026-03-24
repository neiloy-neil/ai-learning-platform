'use client';

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SmartReminder } from "@/lib/mocks";

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
      </CardHeader>
      <CardContent className="space-y-4">
        {reminders.map((reminder) => (
          <div className="flex items-center justify-between gap-4" key={reminder.concept.id}>
            <div>
              <p className="font-semibold">{reminder.concept.name}</p>
              <p className="text-sm text-muted-foreground">Reason: {reminder.reason}</p>
            </div>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => router.push(`/student/practice?conceptId=${reminder.concept.id}`)}
            >
              Review
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
