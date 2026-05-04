"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type ProgressBarProps = HTMLAttributes<HTMLDivElement> & {
  className?: string;
  label?: string;
  value: number;
};

function clampValue(value: number) {
  return Math.min(100, Math.max(0, value));
}

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(function ProgressBar(
  { className, label, value, ...props },
  ref,
) {
  const normalizedValue = clampValue(value);

  return (
    <div className={cn("w-full space-y-2", className)} ref={ref} {...props}>
      {label ? (
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-medium text-foreground">{label}</span>
          <span className="text-sm font-semibold text-primary">{normalizedValue}%</span>
        </div>
      ) : null}
      <div
        aria-label={label ?? "Progress"}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={normalizedValue}
        className="relative h-3 w-full overflow-hidden rounded-pill border border-glass-stroke bg-muted/80 shadow-inset"
        role="progressbar"
      >
        <div
          className="h-full rounded-pill bg-dashboard-gradient shadow-glow transition-[width] duration-500 ease-out"
          style={{ width: `${normalizedValue}%` }}
        />
      </div>
    </div>
  );
});

ProgressBar.displayName = "ProgressBar";
