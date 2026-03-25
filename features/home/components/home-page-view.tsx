import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  BrainCircuit,
  ClipboardList,
  GraduationCap,
  LineChart,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { HTMLAttributes } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { homeHighlights } from "@/features/home/model/home-highlights";
import { appRoutes } from "@/lib/app-routes";
import { cn } from "@/lib/cn";

type HomePageViewProps = HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

const roleJourneys = [
  {
    title: "For Students",
    description: "Practice, assessments, revision, study planning, and AI Tutor support come together in one guided learning journey.",
    icon: GraduationCap,
  },
  {
    title: "For Teachers",
    description: "Track class performance, spot weak concepts, assign support work, and follow up with learners from one workspace.",
    icon: Users,
  },
  {
    title: "For Parents",
    description: "Get clear progress updates, alerts, reports, and practical support tips without needing to interpret complex data.",
    icon: ShieldCheck,
  },
] as const;

const proofPoints = [
  {
    label: "User roles",
    value: "Students, teachers, and parents",
  },
  {
    label: "Core workflows",
    value: "Practice, assessments, progress, and communication",
  },
  {
    label: "Support layer",
    value: "AI Tutor, study plans, and targeted interventions",
  },
] as const;

const platformPillars = [
  {
    title: "Personalized learning",
    description: "Students receive focused practice, revision guidance, and next-step recommendations based on performance.",
    icon: BrainCircuit,
  },
  {
    title: "Assessment and progress tracking",
    description: "The platform connects learning activity to mastery, progress views, reports, and follow-up actions.",
    icon: LineChart,
  },
  {
    title: "Teacher intervention tools",
    description: "Teachers can identify weak areas, assign support work, and monitor learner progress at class and student level.",
    icon: ClipboardList,
  },
  {
    title: "Parent engagement",
    description: "Parents stay informed through summaries, alerts, and clear guidance on how to support learning at home.",
    icon: BookOpenCheck,
  },
] as const;

export function HomePageView({ className, ...props }: HomePageViewProps) {
  return (
    <div className={cn("px-6 pb-20 pt-8 lg:px-10", className)} {...props}>
      <section className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="space-y-6">
          <span className="eyebrow">AI Learning Platform</span>
          <div className="space-y-4">
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              One learning platform for <span className="gradient-text">students, teachers, and parents</span>.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Bring together personalized study support, assessments, progress tracking, teacher oversight, parent visibility,
              and AI-powered guidance in a single connected learning experience.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="group" size="lg">
              <Link href={appRoutes.auth.login}>
                Login
                <ArrowRight className="ml-2 size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button asChild className="bg-transparent" size="lg" variant="secondary">
              <Link href="#features">Explore Features</Link>
            </Button>
          </div>
        </div>

        <Card className="glass-panel-strong overflow-hidden p-6 lg:p-8">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">Platform overview</p>
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
                  <p className="font-semibold text-foreground">Connected learning journey</p>
                  <p className="text-sm text-muted-foreground">
                    Practice, assessments, goals, alerts, reporting, and AI support work together across every role.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      <section className="mx-auto mt-16 grid max-w-6xl gap-5 md:grid-cols-3">
        {roleJourneys.map((item) => {
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

      <section className="mx-auto mt-16 grid max-w-6xl gap-6 lg:grid-cols-2" id="features">
        <Card className="glass-panel p-6 lg:p-8">
          <span className="eyebrow">Product pillars</span>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {platformPillars.map((item) => {
              const Icon = item.icon;

              return (
                <div className="rounded-2xl border border-glass-stroke bg-surface/50 p-5" key={item.title}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-foreground">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="glass-panel-strong gradient-border p-6 lg:p-8">
          <span className="eyebrow">Key features</span>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {homeHighlights.map((item) => (
              <div className="rounded-2xl border border-glass-stroke bg-surface/50 p-5" key={item.title}>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{item.eyebrow}</p>
                <p className="mt-2 text-sm font-semibold text-foreground">{item.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
            <div className="rounded-2xl border border-glass-stroke bg-surface/50 p-5 sm:col-span-2">
              <p className="text-sm font-semibold text-foreground">Role-based demo access</p>
              <p className="mt-2 text-sm text-muted-foreground">
                The login page provides separate demo entry points for student, teacher, and parent experiences.
              </p>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
