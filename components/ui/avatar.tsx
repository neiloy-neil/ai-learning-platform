import * as React from "react";
import Image from "next/image";

import { cn } from "@/lib/cn";

type AvatarProps = React.HTMLAttributes<HTMLDivElement>;

type AvatarImageProps = Omit<React.ComponentPropsWithoutRef<typeof Image>, "alt"> & {
  alt?: string;
};

type AvatarFallbackProps = React.HTMLAttributes<HTMLDivElement>;

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(function Avatar(
  { className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        "relative flex size-10 shrink-0 overflow-hidden rounded-full",
        className,
      )}
      {...props}
    />
  );
});

const AvatarImage = React.forwardRef<HTMLSpanElement, AvatarImageProps>(
  function AvatarImage({ alt = "", className, fill = true, sizes = "40px", ...props }, ref) {
    return (
      <span ref={ref} className="contents">
        <Image
          alt={alt}
          className={cn("object-cover", className)}
          fill={fill}
          sizes={sizes}
          {...props}
        />
      </span>
    );
  },
);

const AvatarFallback = React.forwardRef<HTMLDivElement, AvatarFallbackProps>(
  function AvatarFallback({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          "flex h-full w-full items-center justify-center rounded-full bg-muted",
          className,
        )}
        {...props}
      />
    );
  },
);

export { Avatar, AvatarFallback, AvatarImage };
