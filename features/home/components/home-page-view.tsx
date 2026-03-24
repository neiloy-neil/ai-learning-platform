import { ArrowRight, CheckCircle2, ShieldAlert, Sparkles } from "lucide-react";
import type { HTMLAttributes } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { homeHighlights } from "@/features/home/model/home-highlights";
import { cn } from "@/lib/cn";
import { designSystem } from "@/lib/design-system";

type HomePageViewProps = HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

const palette = [
  { label: "Primary", value: designSystem.colors.primary, tone: "bg-primary text-primary-foreground" },
  { label: "Secondary", value: designSystem.colors.secondary, tone: "bg-secondary text-secondary-foreground" },
  { label: "Success", value: designSystem.colors.success, tone: "bg-success text-success-foreground" },
  { label: "Danger", value: designSystem.colors.danger, tone: "bg-danger text-danger-foreground" },
] as const;

const foundations = [
  {
    title: "Spacing",
    value: "8, 12, 16, 24, 32, 48, 72",
  },
  {
    title: "Radius",
    value: "8, 14, 20, 28, pill",
  },
  {
    title: "Shadows",
    value: "panel, floating, glow, inset",
  },
] as const;

export function HomePageView({ className, ...props }: HomePageViewProps) {
  return (
    <div className={cn("px-6 pb-20 pt-8 lg:px-10", className)} {...props}>
      <section className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-6">
          <span className="eyebrow">Premium SaaS design system</span>
          <div className="space-y-4">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Modern dashboard tokens with <span className="gradient-text">glassmorphism depth</span> and scalable Tailwind primitives.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              A clean SaaS-ready system covering semantic color roles, blue-to-purple gradients, typography, spacing, radius, and layered shadows for premium dashboards.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button className="group" size="lg">
              Explore tokens
              <ArrowRight className="ml-2 size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Button>
            <Button className="bg-transparent" size="lg" variant="secondary">
              View foundations
            </Button>
          </div>
        </div>

        <Card className="glass-panel-strong overflow-hidden p-6 lg:p-8">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">Color palette</p>
            <div className="grid gap-4">
              {palette.map((item) => (
                <div className="glass-panel rounded-[1.25rem] p-4" key={item.label}>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{item.label}</p>
                      <h2 className="mt-2 text-lg font-semibold text-foreground">{item.value}</h2>
                    </div>
                    <div className={cn("h-14 w-14 rounded-2xl shadow-glow", item.tone)} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </section>

      <section className="mx-auto mt-16 grid max-w-6xl gap-5 md:grid-cols-3" id="tracks">
        {[
          {
            icon: Sparkles,
            title: "Gradient system",
            description: "Brand gradients move from saturated blue to premium purple for hero treatments, active states, and emphasis surfaces.",
          },
          {
            icon: CheckCircle2,
            title: "Typography scale",
            description: "A restrained scale keeps dense dashboards readable while still allowing strong display moments and crisp labels.",
          },
          {
            icon: ShieldAlert,
            title: "Glass surfaces",
            description: "Translucent panels, soft borders, and layered shadows create depth without visual noise or heavy ornament.",
          },
        ].map((item) => {
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

      <section className="mx-auto mt-16 grid max-w-6xl gap-6 lg:grid-cols-[0.95fr_1.05fr]" id="system">
        <Card className="glass-panel p-6 lg:p-8">
          <span className="eyebrow">Typography</span>
          <div className="mt-5 space-y-4">
            <p className="text-5xl font-semibold tracking-tight">Display / 48</p>
            <p className="text-3xl font-semibold tracking-tight">Heading / 30</p>
            <p className="text-lg leading-7 text-muted-foreground">Body Large / 18 with generous line height for dashboard clarity.</p>
            <p className="text-sm leading-6 text-muted-foreground">Body Small / 14 for supporting metrics, helper text, and dense sidebars.</p>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Caption / 12 tracking</p>
          </div>
        </Card>

        <Card className="glass-panel-strong gradient-border p-6 lg:p-8">
          <span className="eyebrow">Foundations</span>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {foundations.map((item) => (
              <div className="rounded-2xl border border-glass-stroke bg-surface/50 p-5" key={item.title}>
                <p className="text-sm font-semibold text-foreground">{item.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">{item.value}</p>
              </div>
            ))}
            <div className="rounded-2xl border border-glass-stroke bg-surface/50 p-5 sm:col-span-2">
              <p className="text-sm font-semibold text-foreground">Gradient</p>
              <div className="mt-3 h-12 rounded-xl bg-dashboard-gradient shadow-glow" />
            </div>
          </div>
        </Card>
      </section>

      <section className="mx-auto mt-16 max-w-6xl">
        <Card className="glass-panel grid gap-6 p-6 lg:grid-cols-[0.9fr_1.1fr] lg:p-8">
          <div className="space-y-3">
            <span className="eyebrow">Reusable tokens</span>
            <h2 className="text-3xl font-semibold tracking-tight">Tailwind config and semantic tokens stay aligned.</h2>
          </div>
          <div className="grid gap-4 text-sm leading-6 text-muted-foreground sm:grid-cols-2">
            {homeHighlights.map((item) => (
              <div key={item.title}>
                <p className="font-semibold text-foreground">{item.title}</p>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
