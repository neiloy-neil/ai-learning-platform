export default function WelcomeHeader({ user }: { user: { name: string } | null }) {
  const studentName = user?.name ?? 'Student';

  return (
    <div className="glass-panel-strong overflow-hidden px-6 py-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="eyebrow">Student Workspace</span>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
            Welcome back, <span className="gradient-text">{studentName}</span>
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            Continue your adaptive path, clear today&apos;s revision targets, and move one concept closer to mastery.
          </p>
        </div>
        <div className="rounded-2xl border border-border/70 bg-surface/70 px-4 py-3 text-sm text-muted-foreground">
          Practice outcomes, goals, and recommendations refresh together in this demo.
        </div>
      </div>
    </div>
  );
}
