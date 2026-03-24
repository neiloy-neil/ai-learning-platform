
import { Slot } from "@radix-ui/react-slot";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-glow hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-floating",
        secondary:
          "border border-glass-stroke bg-glass text-foreground shadow-panel hover:-translate-y-0.5 hover:bg-glass-strong hover:shadow-floating",
        ghost: "text-foreground hover:bg-muted/80",
        success: "bg-success text-success-foreground",
        danger: "bg-danger text-danger-foreground",
      },
      size: {
        sm: "h-10 px-4",
        md: "h-11 px-5",
        lg: "h-12 px-6",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

// A simple CSS spinner to avoid external dependencies
const Spinner = () => (
    <div className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin" role="status">
        <span className="sr-only">Loading...</span>
    </div>
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    className?: string;
    loading?: boolean;
    loadingLabel?: string;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    asChild = false,
    children,
    className,
    disabled,
    loading = false,
    loadingLabel = "Loading",
    size,
    variant,
    ...props
  },
  ref,
) {
  const Component = asChild ? Slot : "button";
  const isDisabled = disabled || loading;

  return (
    <Component
      aria-busy={loading || undefined}
      aria-disabled={isDisabled || undefined}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={asChild ? undefined : isDisabled}
      ref={ref}
      {...props}
    >
      {loading ? <Spinner /> : null}
      <span className={cn("inline-flex items-center justify-center", loading && "opacity-90")}>
        {loading ? <span className="sr-only">{loadingLabel}</span> : null}
        {children}
      </span>
    </Component>
  );
});

Button.displayName = "Button";

