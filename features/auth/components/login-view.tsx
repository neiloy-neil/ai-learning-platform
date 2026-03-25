'use client';

import { GraduationCap, ShieldCheck, Users } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/features/auth/components/auth-provider';
import { demoUsers, type DemoUserKey } from '@/lib/mocks';

const roleCards: Array<{
  key: DemoUserKey;
  label: string;
  description: string;
  icon: typeof GraduationCap;
}> = [
  {
    key: 'student',
    label: 'Student Demo',
    description: 'Show personalized practice, assessments, learning path, goals, and progress.',
    icon: GraduationCap,
  },
  {
    key: 'teacher',
    label: 'Teacher Demo',
    description: 'Show class analytics, weak concepts, assignments, and student drill-down.',
    icon: Users,
  },
  {
    key: 'parent',
    label: 'Parent Demo',
    description: 'Show progress summaries, alerts, and at-home support visibility.',
    icon: ShieldCheck,
  },
];

export default function LoginView() {
  const { loginAsDemo } = useAuth();

  return (
    <div className="w-full max-w-5xl space-y-8">
      <div className="space-y-3 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Client Demo Access</p>
        <h1 className="text-4xl font-semibold tracking-tight text-foreground">Choose a role and enter the product instantly.</h1>
        <p className="mx-auto max-w-2xl text-base leading-7 text-muted-foreground">
          The demo uses seeded users and shared mock data so each role has a polished, realistic walkthrough.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {roleCards.map((roleCard) => {
          const user = demoUsers[roleCard.key];
          const Icon = roleCard.icon;

          return (
            <Card className="border-border/70 bg-surface/90 shadow-sm" key={roleCard.key}>
              <CardHeader className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <div className="space-y-2">
                  <CardTitle>{roleCard.label}</CardTitle>
                  <p className="text-sm leading-6 text-muted-foreground">{roleCard.description}</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-2xl bg-muted/60 p-4 text-sm text-muted-foreground">
                  <p className="font-semibold text-foreground">{user.name}</p>
                  <p>{user.email}</p>
                </div>
                <Button className="w-full" onClick={() => loginAsDemo(roleCard.key)}>
                  Enter as {user.role}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
