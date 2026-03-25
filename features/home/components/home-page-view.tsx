"use client";

import Link from "next/link";
import {
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  Bot,
  BrainCircuit,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Flame,
  Gauge,
  GraduationCap,
  Instagram,
  Linkedin,
  Menu,
  Route,
  Sparkles,
  Star,
  Target,
  Trophy,
  WandSparkles,
  X,
  Zap,
} from "lucide-react";
import { LazyMotion, domAnimation, m, useInView } from "framer-motion";
import { useEffect, useRef, useState, type HTMLAttributes } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  features,
  masteryBreakdown,
  navItems,
  pricingPlans,
  stats,
  steps,
  testimonials,
  weeklyGraphBars,
} from "@/features/home/model/home-content";
import { appRoutes } from "@/lib/app-routes";
import { cn } from "@/lib/cn";

type HomePageViewProps = HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

type IconKey = (typeof features)[number]["icon"] | (typeof steps)[number]["icon"];

const iconMap: Record<IconKey, typeof Route> = {
  route: Route,
  sparkles: Sparkles,
  "bar-chart": BarChart3,
  refresh: Zap,
  clipboard: ClipboardCheck,
  target: Target,
  bolt: Zap,
  gauge: Gauge,
  brain: BrainCircuit,
  trophy: Trophy,
};

const heroParticles = [
  { id: 0, className: "left-[10%] top-[24%]", duration: 3 },
  { id: 1, className: "left-[20%] top-[70%]", duration: 4 },
  { id: 2, className: "left-[42%] top-[18%]", duration: 5 },
  { id: 3, className: "left-[54%] top-[68%]", duration: 3.5 },
  { id: 4, className: "left-[68%] top-[32%]", duration: 4.6 },
  { id: 5, className: "left-[82%] top-[62%]", duration: 3.8 },
  { id: 6, className: "left-[90%] top-[22%]", duration: 4.3 },
  { id: 7, className: "left-[76%] top-[12%]", duration: 5.2 },
  { id: 8, className: "left-[32%] top-[52%]", duration: 3.4 },
  { id: 9, className: "left-[60%] top-[84%]", duration: 4.4 },
  { id: 10, className: "left-[14%] top-[46%]", duration: 3.7 },
  { id: 11, className: "left-[88%] top-[78%]", duration: 5 },
] as const;

function useCountUp(target: number, duration = 1400) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) {
      return;
    }

    let frame = 0;
    let start = 0;

    const tick = (timestamp: number) => {
      if (!start) {
        start = timestamp;
      }

      const progress = Math.min((timestamp - start) / duration, 1);
      setValue(Math.round(progress * target));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [duration, isInView, target]);

  return { ref, value };
}

function CountUpStat({ value, suffix, label, tone }: { value: number; suffix: string; label: string; tone: string }) {
  const { ref, value: animated } = useCountUp(value);

  return (
    <m.div
      className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-[0_20px_80px_-40px_rgba(59,130,246,0.55)] backdrop-blur-xl transition-colors duration-300 hover:border-cyan-300/40"
      initial={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.25 }}
      whileHover={{ y: -6, scale: 1.01 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-80 transition-opacity duration-300 group-hover:opacity-100", tone)} />
      <div className="absolute -right-6 top-4 h-20 w-20 rounded-full bg-white/10 blur-2xl" />
      <div className="relative" ref={ref}>
        <div className="mb-6 inline-flex rounded-full border border-white/10 bg-slate-950/50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">
          Gamified Progress
        </div>
        <div className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          {animated.toLocaleString()}
          {suffix}
        </div>
        <p className="mt-2 text-sm text-slate-200">{label}</p>
      </div>
    </m.div>
  );
}

function SectionHeading({ eyebrow, title, description, align = "left" }: { eyebrow: string; title: string; description: string; align?: "left" | "center" }) {
  return (
    <div className={cn("max-w-2xl space-y-4", align === "center" && "mx-auto text-center")}>
      <Badge className="border-cyan-300/25 bg-cyan-400/10 px-3 py-1 text-cyan-100" variant="outline">
        {eyebrow}
      </Badge>
      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
      <p className="text-base leading-7 text-slate-300">{description}</p>
    </div>
  );
}

function LandingNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 18);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6">
      <div className={cn("mx-auto flex max-w-7xl items-center justify-between rounded-[1.5rem] border px-4 py-3 transition-all duration-300 sm:px-5", isScrolled ? "border-white/15 bg-slate-950/70 shadow-[0_24px_70px_-36px_rgba(76,29,149,0.9)] backdrop-blur-2xl" : "border-white/10 bg-white/5 backdrop-blur-xl")}>
        <Link className="flex items-center gap-3" href="/">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 via-violet-500 to-cyan-400 text-white shadow-[0_0_30px_rgba(99,102,241,0.55)]">
            <BrainCircuit className="size-5" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100">PCDC AI</p>
            <p className="text-xs text-slate-400">Learning Platform</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <Link className="text-sm text-slate-300 transition-colors hover:text-white" href={item.href} key={item.label}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button asChild size="lg">
            <Link href={appRoutes.auth.login}>Start Learning</Link>
          </Button>
        </div>

        <button aria-label="Toggle menu" className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white lg:hidden" onClick={() => setIsOpen((value) => !value)} type="button">
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {isOpen ? (
        <div className="mx-auto mt-3 max-w-7xl rounded-[1.5rem] border border-white/10 bg-slate-950/90 p-4 shadow-[0_24px_70px_-36px_rgba(76,29,149,0.9)] backdrop-blur-2xl lg:hidden">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <Link className="rounded-xl px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-white" href={item.href} key={item.label} onClick={() => setIsOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Button asChild className="mt-2" size="lg">
              <Link href={appRoutes.auth.login}>Start Learning</Link>
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pb-12 pt-12 sm:px-6 sm:pt-16">
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-12 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-fuchsia-500/20 blur-[120px]" />
        <div className="absolute right-0 top-1/4 h-80 w-80 rounded-full bg-cyan-400/20 blur-[110px]" />
        <div className="absolute left-0 top-1/3 h-72 w-72 rounded-full bg-indigo-500/25 blur-[100px]" />
      </div>

      {heroParticles.map((particle) => (
        <m.div animate={{ opacity: [0.25, 0.8, 0.25], y: [0, -18, 0] }} className={cn("absolute h-2 w-2 rounded-full bg-cyan-300/70 blur-[1px]", particle.className)} initial={{ opacity: 0.25 }} key={particle.id} transition={{ duration: particle.duration, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }} />
      ))}

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="space-y-8">
          <m.div animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} transition={{ duration: 0.6 }}>
            <Badge className="border-fuchsia-300/20 bg-fuchsia-400/10 px-4 py-1 text-fuchsia-100" variant="outline">
              Gamified learning for high-performing students
            </Badge>
          </m.div>

          <div className="space-y-6">
            <m.h1 animate={{ opacity: 1, y: 0 }} className="max-w-3xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl" initial={{ opacity: 0, y: 24 }} transition={{ duration: 0.7, delay: 0.05 }}>
              Learn Smarter
              <span className="block bg-gradient-to-r from-cyan-200 via-white to-fuchsia-200 bg-clip-text text-transparent">with AI</span>
            </m.h1>
            <m.p animate={{ opacity: 1, y: 0 }} className="max-w-2xl text-lg leading-8 text-slate-300" initial={{ opacity: 0, y: 24 }} transition={{ duration: 0.7, delay: 0.12 }}>
              Personalized learning paths, instant explanations, smart revision, and mastery tracking designed to keep students motivated, focused, and improving every day.
            </m.p>
          </div>

          <m.div animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-3 sm:flex-row" initial={{ opacity: 0, y: 24 }} transition={{ duration: 0.7, delay: 0.2 }}>
            <Button asChild className="group shadow-[0_18px_50px_-22px_rgba(34,211,238,0.6)]" size="lg">
              <Link href={appRoutes.auth.login}>Start Learning<ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" /></Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="#experience">Explore Demo</Link>
            </Button>
          </m.div>

          <m.div animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center gap-3 text-sm text-slate-300" initial={{ opacity: 0, y: 24 }} transition={{ duration: 0.7, delay: 0.28 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2"><Flame className="size-4 text-amber-300" />32-day streak</div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2"><Award className="size-4 text-fuchsia-300" />12 new badges this month</div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2"><CheckCircle2 className="size-4 text-emerald-300" />94% average accuracy</div>
          </m.div>
        </div>

        <m.div animate={{ opacity: 1, y: 0 }} className="relative" initial={{ opacity: 0, y: 28 }} transition={{ duration: 0.8, delay: 0.15 }}>
          <m.div animate={{ y: [0, -10, 0] }} className="absolute -left-4 top-10 z-20 rounded-2xl border border-emerald-300/20 bg-emerald-400/10 p-4 text-sm text-emerald-100 shadow-[0_20px_60px_-30px_rgba(16,185,129,0.7)] backdrop-blur-xl" transition={{ duration: 3.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}>
            <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-400/20"><Trophy className="size-5 text-emerald-200" /></div><div><p className="font-semibold">Level Up</p><p className="text-xs text-emerald-100/80">+240 XP from algebra sprint</p></div></div>
          </m.div>
          <m.div animate={{ y: [0, 12, 0] }} className="absolute -right-3 top-24 z-20 rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-4 text-sm text-cyan-100 shadow-[0_20px_60px_-30px_rgba(34,211,238,0.8)] backdrop-blur-xl" transition={{ duration: 3.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}>
            <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-400/20"><Flame className="size-5 text-cyan-100" /></div><div><p className="font-semibold">Study Streak</p><p className="text-xs text-cyan-100/80">32 days strong</p></div></div>
          </m.div>
          <m.div animate={{ y: [0, -8, 0] }} className="absolute bottom-6 left-0 z-20 rounded-2xl border border-fuchsia-300/20 bg-fuchsia-400/10 p-4 text-sm text-fuchsia-100 shadow-[0_20px_60px_-30px_rgba(217,70,239,0.75)] backdrop-blur-xl" transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}>
            <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-fuchsia-400/20"><Star className="size-5 text-fuchsia-100" /></div><div><p className="font-semibold">New Badge</p><p className="text-xs text-fuchsia-100/80">Consistency Champion</p></div></div>
          </m.div>
          <Card className="relative overflow-hidden rounded-[2rem] border-white/10 bg-slate-950/70 p-4 shadow-[0_30px_120px_-42px_rgba(76,29,149,0.95)] backdrop-blur-2xl sm:p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(217,70,239,0.18),transparent_28%)]" />
            <div className="relative space-y-5">
              <div className="flex items-center justify-between">
                <div><p className="text-sm font-semibold text-slate-200">Student Dashboard</p><p className="text-xs text-slate-400">Level 12 • Precision Learner</p></div>
                <div className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">94% Accuracy</div>
              </div>
              <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center justify-between">
                    <div><p className="text-xs uppercase tracking-[0.22em] text-slate-400">Progress</p><p className="mt-2 text-2xl font-semibold text-white">AI Algebra Sprint</p></div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 text-white"><GraduationCap className="size-5" /></div>
                  </div>
                  <div className="mt-6 space-y-4">
                    <div><div className="mb-2 flex items-center justify-between text-xs text-slate-300"><span>Mastery</span><span>82%</span></div><div className="h-3 rounded-full bg-white/10"><div className="h-3 w-[82%] rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-500" /></div></div>
                    <div><div className="mb-2 flex items-center justify-between text-xs text-slate-300"><span>Daily XP goal</span><span>240 / 300</span></div><div className="h-3 rounded-full bg-white/10"><div className="h-3 w-4/5 rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400" /></div></div>
                  </div>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4"><p className="text-xs uppercase tracking-[0.22em] text-slate-500">Next</p><p className="mt-2 font-semibold text-white">Functions Challenge</p><p className="mt-1 text-sm text-slate-400">12 questions • 8 min</p></div>
                    <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4"><p className="text-xs uppercase tracking-[0.22em] text-slate-500">Reward</p><p className="mt-2 font-semibold text-white">Unlock Focus Badge</p><p className="mt-1 text-sm text-slate-400">Complete 3 sessions today</p></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                    <div className="flex items-center justify-between"><div><p className="text-xs uppercase tracking-[0.22em] text-slate-400">Achievements</p><p className="mt-2 text-lg font-semibold text-white">Recent Wins</p></div><Award className="size-5 text-amber-300" /></div>
                    <div className="mt-4 space-y-3">
                      {["Quick Solver", "7 Day Streak", "Mastery Boost"].map((badge) => (
                        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-3" key={badge}><span className="text-sm text-slate-200">{badge}</span><Star className="size-4 text-fuchsia-300" /></div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-400">AI Coach</p>
                    <p className="mt-2 text-lg font-semibold text-white">Today&apos;s Focus</p>
                    <p className="mt-3 text-sm leading-6 text-slate-300">Revise quadratic transformations, then take a timed mini assessment for full streak bonus.</p>
                    <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-2 text-xs font-semibold text-emerald-100"><CheckCircle2 className="size-4" />Recommendation ready</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </m.div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeading align="center" description="Students stay engaged when progress feels visible. Every session turns into streaks, XP, badges, and clear growth signals." eyebrow="Gamified Stats" title="Momentum you can see after every session" />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">{stats.map((item) => <CountUpStat key={item.label} {...item} />)}</div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="px-4 py-16 sm:px-6" id="features">
      <div className="mx-auto max-w-7xl">
        <SectionHeading description="Built for students who want clarity, motivation, and visible progress. Every feature pushes learning forward without feeling overwhelming." eyebrow="Features" title="Everything students need to learn with confidence" />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon];
            return (
              <m.div className="group" initial={{ opacity: 0, y: 26 }} key={feature.title} transition={{ duration: 0.45, delay: index * 0.05 }} viewport={{ once: true, amount: 0.2 }} whileHover={{ y: -8 }} whileInView={{ opacity: 1, y: 0 }}>
                <Card className="h-full rounded-[1.75rem] border-white/10 bg-white/5 p-6 backdrop-blur-2xl transition-colors duration-300 group-hover:border-cyan-300/35 group-hover:bg-white/10">
                  <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-violet-500/30 via-fuchsia-500/20 to-cyan-400/20 text-cyan-100 shadow-[0_16px_40px_-24px_rgba(34,211,238,0.9)]"><Icon className="size-6" /></div>
                  <h3 className="mt-6 text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{feature.description}</p>
                  <div className="mt-6 flex items-center gap-2 text-sm font-medium text-cyan-200"><span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.95)]" />Interactive and personalized</div>
                </Card>
              </m.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section className="px-4 py-16 sm:px-6" id="how-it-works">
      <div className="mx-auto max-w-7xl">
        <SectionHeading description="A simple loop keeps learning active: practice first, understand mastery, act on recommendations, then improve again." eyebrow="How It Works" title="A step flow that keeps students moving forward" />
        <div className="mt-10 grid gap-6 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = iconMap[step.icon];
            return (
              <m.div className="relative" initial={{ opacity: 0, y: 26 }} key={step.step} transition={{ duration: 0.45, delay: index * 0.06 }} viewport={{ once: true, amount: 0.2 }} whileInView={{ opacity: 1, y: 0 }}>
                {index < steps.length - 1 ? <div className="absolute left-[calc(100%-0.5rem)] top-10 hidden h-px w-full bg-gradient-to-r from-cyan-300/60 via-violet-400/50 to-transparent lg:block" /> : null}
                <Card className="relative h-full rounded-[1.75rem] border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
                  <div className="flex items-center justify-between"><span className="text-sm font-semibold tracking-[0.24em] text-cyan-200">{step.step}</span><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500/25 to-cyan-400/20 text-white"><Icon className="size-5" /></div></div>
                  <h3 className="mt-6 text-xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{step.description}</p>
                </Card>
              </m.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AISection() {
  return (
    <section className="px-4 py-16 sm:px-6" id="ai">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="space-y-6">
          <SectionHeading description="The AI layer turns practice into coaching. Students get explanations, hints, and study planning that feel immediate and relevant." eyebrow="AI Highlight" title="A study companion that explains, guides, and plans" />
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { title: "Explanations", icon: BookOpen, copy: "Clear concept breakdowns when answers go wrong." },
              { title: "Hints", icon: WandSparkles, copy: "Step-by-step nudges instead of instant spoilers." },
              { title: "Study Plans", icon: Target, copy: "Actionable sessions based on progress and goals." },
            ].map((item) => {
              const Icon = item.icon;
              return <Card className="rounded-[1.5rem] border-white/10 bg-white/5 p-5" key={item.title}><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-cyan-100"><Icon className="size-5" /></div><p className="mt-4 font-semibold text-white">{item.title}</p><p className="mt-2 text-sm leading-6 text-slate-300">{item.copy}</p></Card>;
            })}
          </div>
        </div>

        <m.div initial={{ opacity: 0, y: 26 }} transition={{ duration: 0.55 }} viewport={{ once: true, amount: 0.25 }} whileInView={{ opacity: 1, y: 0 }}>
          <Card className="relative overflow-hidden rounded-[2rem] border-cyan-300/20 bg-slate-950/70 p-6 shadow-[0_30px_120px_-42px_rgba(8,145,178,0.9)] backdrop-blur-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.18),transparent_28%)]" />
            <div className="relative grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="space-y-4">
                <div className="flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-violet-500/25 text-cyan-100"><Bot className="size-5" /></div><div><p className="text-sm font-semibold text-white">AI Tutor</p><p className="text-xs text-slate-400">Live support built into the study flow</p></div></div>
                <div className="space-y-3">
                  <div className="rounded-[1.35rem] border border-white/10 bg-white/5 p-4"><p className="text-sm text-slate-300">Why does the graph shift upward after factoring?</p></div>
                  <div className="rounded-[1.35rem] border border-cyan-300/20 bg-cyan-400/10 p-4"><p className="text-sm leading-7 text-cyan-50">Because the constant outside the brackets moves the whole graph. First identify the base function, then track what changes outside and inside the factor.</p></div>
                  <div className="rounded-[1.35rem] border border-white/10 bg-white/5 p-4"><p className="text-sm text-slate-300">Give me a hint before I try the next one.</p></div>
                  <div className="rounded-[1.35rem] border border-fuchsia-300/20 bg-fuchsia-400/10 p-4"><p className="text-sm leading-7 text-fuchsia-50">Start by checking whether the coefficient changes the width or just the position of the graph.</p></div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5"><p className="text-xs uppercase tracking-[0.22em] text-slate-400">Today&apos;s study plan</p><div className="mt-4 space-y-3">{[{ label: "Quadratic review", time: "20 min", done: true }, { label: "Timed mini quiz", time: "10 min", done: true }, { label: "AI hint session", time: "8 min", done: false }, { label: "Revision streak bonus", time: "5 min", done: false }].map((task) => <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3" key={task.label}><div className="flex items-center gap-3"><div className={cn("h-3 w-3 rounded-full", task.done ? "bg-emerald-400 shadow-[0_0_14px_rgba(74,222,128,0.95)]" : "bg-cyan-300/80")} /><span className="text-sm text-slate-200">{task.label}</span></div><span className="text-xs text-slate-400">{task.time}</span></div>)}</div></div>
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5"><p className="text-xs uppercase tracking-[0.22em] text-slate-400">Hint quality</p><div className="mt-4 h-3 rounded-full bg-white/10"><div className="h-3 w-[88%] rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500" /></div><div className="mt-3 flex items-center justify-between text-sm text-slate-300"><span>Personalization score</span><span>88%</span></div></div>
              </div>
            </div>
          </Card>
        </m.div>
      </div>
    </section>
  );
}
function LearningExperienceSection() {
  return (
    <section className="px-4 py-16 sm:px-6" id="experience">
      <div className="mx-auto max-w-7xl">
        <SectionHeading description="From the dashboard to the learning path, every screen is designed to make progress feel obvious, rewarding, and actionable." eyebrow="Learning Experience" title="A premium student experience that turns effort into momentum" />
        <div className="mt-10 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Card className="rounded-[2rem] border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
            <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-5">
                <div className="flex items-center justify-between"><div><p className="text-xs uppercase tracking-[0.22em] text-slate-500">Dashboard</p><p className="mt-2 text-lg font-semibold text-white">Your growth this week</p></div><div className="rounded-full border border-violet-300/20 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-100">+3 Levels</div></div>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">{[{ label: "XP", value: "2,480" }, { label: "Mastered", value: "18" }, { label: "Streak", value: "32d" }].map((item) => <div className="rounded-2xl border border-white/10 bg-white/5 p-4" key={item.label}><p className="text-xs uppercase tracking-[0.22em] text-slate-500">{item.label}</p><p className="mt-2 text-2xl font-semibold text-white">{item.value}</p></div>)}</div>
                <div className="mt-6 grid grid-cols-7 items-end gap-2">{weeklyGraphBars.map((bar) => <div className="space-y-2" key={bar.label}><div className="flex h-[5.5rem] items-end rounded-full bg-white/5 p-1"><div className={cn("w-full rounded-full bg-gradient-to-t from-cyan-400 via-sky-400 to-violet-500", bar.heightClassName)} /></div><p className="text-center text-[11px] text-slate-500">{bar.label}</p></div>)}</div>
              </div>
              <div className="space-y-5">
                <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-5"><p className="text-xs uppercase tracking-[0.22em] text-slate-500">Learning Path</p><div className="mt-5 space-y-4">{[{ label: "Core Algebra", active: true }, { label: "Functions", active: true }, { label: "Quadratics", active: true }, { label: "Advanced Graphing", active: false }].map((item, index) => <div className="flex items-center gap-3" key={item.label}><div className={cn("flex h-9 w-9 items-center justify-center rounded-full border text-xs font-semibold", item.active ? "border-emerald-300/30 bg-emerald-400/10 text-emerald-100" : "border-white/10 bg-white/5 text-slate-400")}>{index + 1}</div><div className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">{item.label}</div></div>)}</div></div>
                <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-5"><p className="text-xs uppercase tracking-[0.22em] text-slate-500">Achievements</p><div className="mt-4 grid gap-3 sm:grid-cols-2">{["Focus Finisher", "Mastery Climber", "Quiz Spark", "Streak Shield"].map((item) => <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm font-medium text-white" key={item}>{item}</div>)}</div></div>
              </div>
            </div>
          </Card>
          <div className="grid gap-6">
            <Card className="rounded-[2rem] border-white/10 bg-white/5 p-6"><p className="text-xs uppercase tracking-[0.22em] text-slate-500">Progress Graph</p><p className="mt-2 text-xl font-semibold text-white">Mastery by topic</p><div className="mt-6 space-y-4">{masteryBreakdown.map((item) => <div key={item.label}><div className="mb-2 flex items-center justify-between text-sm text-slate-300"><span>{item.label}</span><span>{item.widthLabel}</span></div><div className="h-3 rounded-full bg-white/10"><div className={cn("h-3 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-fuchsia-500", item.widthClassName)} /></div></div>)}</div></Card>
            <Card className="rounded-[2rem] border-white/10 bg-white/5 p-6"><p className="text-xs uppercase tracking-[0.22em] text-slate-500">Reward Loop</p><p className="mt-2 text-xl font-semibold text-white">Level-up incentives that keep students engaged</p><div className="mt-6 grid gap-4 sm:grid-cols-2">{[{ label: "XP Boost", icon: Zap, tone: "bg-cyan-400/10 text-cyan-100" }, { label: "Badge Unlock", icon: Award, tone: "bg-fuchsia-400/10 text-fuchsia-100" }, { label: "Streak Saver", icon: Flame, tone: "bg-amber-400/10 text-amber-100" }, { label: "Goal Hit", icon: Target, tone: "bg-emerald-400/10 text-emerald-100" }].map((item) => { const Icon = item.icon; return <div className="rounded-[1.35rem] border border-white/10 bg-slate-950/40 p-4" key={item.label}><div className={cn("flex h-11 w-11 items-center justify-center rounded-2xl", item.tone)}><Icon className="size-5" /></div><p className="mt-4 font-semibold text-white">{item.label}</p></div>; })}</div></Card>
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section className="px-4 py-16 sm:px-6" id="pricing">
      <div className="mx-auto max-w-7xl">
        <SectionHeading align="center" description="Simple pricing for individual learners, plus upgrade paths for power users and schools." eyebrow="Pricing" title="Choose the plan that matches your learning pace" />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">{pricingPlans.map((plan) => <m.div initial={{ opacity: 0, y: 24 }} key={plan.name} transition={{ duration: 0.45 }} viewport={{ once: true, amount: 0.2 }} whileHover={{ y: -8 }} whileInView={{ opacity: 1, y: 0 }}><Card className={cn("h-full rounded-[1.85rem] border-white/10 bg-white/5 p-6 backdrop-blur-2xl", plan.featured && "border-cyan-300/30 bg-cyan-400/10 shadow-[0_28px_90px_-44px_rgba(34,211,238,0.95)]")}><div className="flex items-start justify-between"><div><p className="text-sm font-semibold text-white">{plan.name}</p><p className="mt-2 text-4xl font-semibold tracking-tight text-white">{plan.price}</p></div>{plan.featured ? <Badge className="border-cyan-300/25 bg-cyan-300/10 text-cyan-100" variant="outline">Most Popular</Badge> : null}</div><p className="mt-4 text-sm leading-7 text-slate-300">{plan.description}</p><div className="mt-6 space-y-3">{plan.features.map((feature) => <div className="flex items-center gap-3 text-sm text-slate-200" key={feature}><CheckCircle2 className="size-4 text-cyan-300" /><span>{feature}</span></div>)}</div><Button asChild className="mt-8 w-full" size="lg" variant={plan.featured ? "primary" : "secondary"}><Link href={appRoutes.auth.login}>{plan.name === "School" ? "Request Demo" : "Start Learning"}</Link></Button></Card></m.div>)}</div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeading align="center" description="Students come back when the platform makes progress feel achievable, rewarding, and easy to understand." eyebrow="Testimonials" title="What students say after using the platform" />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">{testimonials.map((testimonial, index) => <m.div initial={{ opacity: 0, y: 24 }} key={testimonial.name} transition={{ duration: 0.45, delay: index * 0.05 }} viewport={{ once: true, amount: 0.2 }} whileHover={{ y: -6 }} whileInView={{ opacity: 1, y: 0 }}><Card className="h-full rounded-[1.75rem] border-white/10 bg-white/5 p-6 backdrop-blur-2xl"><div className="flex gap-1 text-amber-300">{Array.from({ length: 5 }).map((_, idx) => <Star className="size-4 fill-current" key={idx} />)}</div><p className="mt-5 text-base leading-8 text-slate-200">&ldquo;{testimonial.quote}&rdquo;</p><div className="mt-6"><p className="font-semibold text-white">{testimonial.name}</p><p className="text-sm text-slate-400">{testimonial.role}</p></div></Card></m.div>)}</div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="px-4 pb-20 pt-16 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <Card className="relative overflow-hidden rounded-[2.25rem] border-cyan-300/20 bg-slate-950/75 p-8 shadow-[0_36px_140px_-52px_rgba(34,211,238,0.95)] backdrop-blur-2xl sm:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.24),transparent_26%)]" />
          <m.div animate={{ opacity: [0.55, 1, 0.55] }} className="absolute -top-8 right-8 h-40 w-40 rounded-full bg-cyan-400/20 blur-[70px]" transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }} />
          <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center"><div className="max-w-2xl space-y-4"><Badge className="border-fuchsia-300/20 bg-fuchsia-400/10 px-4 py-1 text-fuchsia-100" variant="outline">Ready to level up?</Badge><h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">Start Your Learning Journey Today</h2><p className="text-lg leading-8 text-slate-300">Build streaks, earn XP, unlock mastery, and get AI-powered support every time you study.</p></div><div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row"><Button asChild className="shadow-[0_20px_70px_-28px_rgba(34,211,238,0.75)]" size="lg"><Link href={appRoutes.auth.login}>Start Learning</Link></Button><Button asChild size="lg" variant="secondary"><Link href="#features">See Features<ChevronDown className="size-4" /></Link></Button></div></div>
        </Card>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div><div className="flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 via-violet-500 to-cyan-400 text-white"><BrainCircuit className="size-5" /></div><div><p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100">PCDC AI</p><p className="text-xs text-slate-400">Learning Platform</p></div></div><p className="mt-4 max-w-md text-sm leading-7 text-slate-400">Premium student learning with adaptive practice, mastery tracking, AI support, and gamified motivation.</p></div>
        <div className="grid gap-8 sm:grid-cols-3">
          <div><p className="text-sm font-semibold text-white">Platform</p><div className="mt-3 space-y-2 text-sm text-slate-400"><Link className="block hover:text-white" href="#features">Features</Link><Link className="block hover:text-white" href="#how-it-works">How it Works</Link><Link className="block hover:text-white" href="#pricing">Pricing</Link></div></div>
          <div><p className="text-sm font-semibold text-white">Contact</p><div className="mt-3 space-y-2 text-sm text-slate-400"><p>hello@pcdc.ai</p><p>+1 (800) 555-0142</p><p>Dhaka, Bangladesh</p></div></div>
          <div><p className="text-sm font-semibold text-white">Social</p><div className="mt-3 flex items-center gap-3 text-slate-400"><a aria-label="Instagram" className="rounded-full border border-white/10 p-2 transition-colors hover:border-cyan-300/30 hover:text-white" href="https://instagram.com" rel="noreferrer" target="_blank"><Instagram className="size-4" /></a><a aria-label="LinkedIn" className="rounded-full border border-white/10 p-2 transition-colors hover:border-cyan-300/30 hover:text-white" href="https://linkedin.com" rel="noreferrer" target="_blank"><Linkedin className="size-4" /></a><a aria-label="X" className="rounded-full border border-white/10 p-2 text-sm font-semibold transition-colors hover:border-cyan-300/30 hover:text-white" href="https://x.com" rel="noreferrer" target="_blank">X</a></div></div>
        </div>
      </div>
    </footer>
  );
}

export function HomePageView({ className, ...props }: HomePageViewProps) {
  return (
    <LazyMotion features={domAnimation}>
      <div className={cn("min-h-screen overflow-x-hidden bg-[linear-gradient(180deg,#060816_0%,#0a1024_18%,#0f1730_45%,#0b1120_100%)] text-white", className)} {...props}>
        <LandingNav />
        <main>
          <HeroSection />
          <StatsSection />
          <FeaturesSection />
          <HowItWorksSection />
          <AISection />
          <LearningExperienceSection />
          <PricingSection />
          <TestimonialsSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </LazyMotion>
  );
}
