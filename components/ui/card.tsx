import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  className?: string;
  glass?: boolean;
};

type CardSectionProps = HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { className, glass = false, ...props },
  ref,
) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border/80 bg-surface text-surface-foreground shadow-panel transition-all duration-200",
        glass && "border-glass-stroke bg-glass backdrop-blur-xl",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

export const CardHeader = forwardRef<HTMLDivElement, CardSectionProps>(function CardHeader(
  { className, ...props },
  ref,
) {
  return <div className={cn("flex flex-col gap-2 p-6", className)} ref={ref} {...props} />;
});

export const CardTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(function CardTitle(
  { className, ...props },
  ref,
) {
  return <p className={cn("text-xl font-semibold tracking-tight text-foreground", className)} ref={ref} {...props} />;
});

export const CardContent = forwardRef<HTMLDivElement, CardSectionProps>(function CardContent(
  { className, ...props },
  ref,
) {
  return <div className={cn("px-6 pb-6", className)} ref={ref} {...props} />;
});

export const CardFooter = forwardRef<HTMLDivElement, CardSectionProps>(function CardFooter(
  { className, ...props },
  ref,
) {
  return <div className={cn("flex items-center gap-3 px-6 pb-6 pt-2", className)} ref={ref} {...props} />;
});

Card.displayName = "Card";
CardHeader.displayName = "CardHeader";
CardTitle.displayName = "CardTitle";
CardContent.displayName = "CardContent";
CardFooter.displayName = "CardFooter";
