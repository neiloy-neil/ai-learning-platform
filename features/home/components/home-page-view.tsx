import Link from "next/link";
import { ArrowRight, BrainCircuit, GraduationCap, LineChart, ShieldCheck, Users } from "lucide-react";
import type { HTMLAttributes } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { homeHighlights } from "@/features/home/model/home-highlights";
import { cn } from "@/lib/cn";
import { appRoutes } from "@/lib/app-routes";

type HomePageViewProps = HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

const demoJourneys = [
  {
    title: "Student Journey",
    description: "Adaptive practice, assessment sessions, learning paths, goals, and progress insights move together in one demo flow.",
    icon: GraduationCap,
  },
  {
    title: "Teacher Workspace",
    description: "Class performance, weak concept visibility, assignments, and student drill-downs are presented as one coherent analytics surface.",
    icon: Users,
  },
  {
    title: "Parent Visibility",
    description: "Progress summaries, alerts, and at-home support cues keep parent-facing reporting clear and non-technical.",
    icon: ShieldCheck,
  },
] as const;

const proofPoints = [
  {
    label: "Adaptive engine",
    value: "Mastery + recommendation",
  },
  {
    label: "Demo roles",
    value: "Student, Teacher, Parent",
  },
  {
    label: "Client-ready flows",
    value: "Practice, goals, alerts, analytics",
  },
] as const;

export function HomePageView({ className, ...props }: HomePageViewProps) {
  return (
    <div className={cn("px-6 pb-20 pt-8 lg:px-10", className)} {...props}>
      <section className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="space-y-6">
          <span className="eyebrow">AI Learning Platform Demo</span>
          <div className="space-y-4">
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Personalized learning workflows for <span className="gradient-text">students, teachers, and parents</span>.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              This demo shows a role-based education product with adaptive practice, assessment tracking, mastery insights,
              intervention-oriented teacher dashboards, and parent progress visibility.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="group" size="lg">
              <Link href={appRoutes.auth.login}>
                Open Demo Access
                <ArrowRight className="ml-2 size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button asChild className="bg-transparent" size="lg" variant="secondary">
              <Link href={appRoutes.student.dashboard}>View Student Flow</Link>
            </Button>
          </div>
        </div>

        <Card className="glass-panel-strong overflow-hidden p-6 lg:p-8">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">What the demo proves</p>
            <div className="grid gap-4">
              {proofPoints.map((item) => (
                <div className="glass-panel rounded-[1.25rem] p-4" key={item.label}>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{item.label}</p>
                  <h2 className="mt-2 text-lg font-semibold text-foreground">{item.value}</h2>
                </div>
              ))}
            </div>
            <div className="rounded-[1.5rem] border border-glass-stroke bg-surface/55 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-dashboard-gradient text-white shadow-glow">
                  <BrainCircuit className="size-5" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Live adaptive story</p>
                  <p className="text-sm text-muted-foreground">
                    Practice outcomes update mastery, recommendations, goals, notifications, and role dashboards in one shared demo state.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      <section className="mx-auto mt-16 grid max-w-6xl gap-5 md:grid-cols-3">
        {demoJourneys.map((item) => {
          const Icon = item.icon;

          return (
            <Card className="glass-panel p-6" key={item.title}>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-dashboard-gradient text-white shadow-glow">
                <Icon className="size-5" />
              </div>
              <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p>
            </Card>
          );
        })}
      </section>

      <section className="mx-auto mt-16 grid max-w-6xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <Card className="glass-panel p-6 lg:p-8">
          <span className="eyebrow">Product pillars</span>
          <div className="mt-6 space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <BrainCircuit className="size-5" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Adaptive learning guidance</p>
                <p className="text-sm leading-6 text-muted-foreground">Mastery, recommendation, and revision logic keeps the demo focused on next-best actions.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <LineChart className="size-5" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Cross-role analytics</p>
                <p className="text-sm leading-6 text-muted-foreground">Students, teachers, and parents all see the same learning story from role-appropriate angles.</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="glass-panel-strong gradient-border p-6 lg:p-8">
          <span className="eyebrow">Feature map</span>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {homeHighlights.map((item) => (
              <div className="rounded-2xl border border-glass-stroke bg-surface/50 p-5" key={item.title}>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{item.eyebrow}</p>
                <p className="mt-2 text-sm font-semibold text-foreground">{item.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
            <div className="rounded-2xl border border-glass-stroke bg-surface/50 p-5 sm:col-span-2">
              <p className="text-sm font-semibold text-foreground">Fast demo entry</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Role-card login at <code>/login</code> opens directly into the demo dashboards without backend setup.
              </p>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
