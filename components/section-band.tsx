import * as React from "react";

import { cn } from "@/lib/utils";

type SectionBandProps = React.HTMLAttributes<HTMLElement> & {
  theme?: "light" | "soft" | "navy";
  compact?: boolean;
  as?: "section" | "div";
};

export function SectionBand({
  theme = "light",
  compact = false,
  as: Comp = "section",
  className,
  children,
  ...props
}: SectionBandProps) {
  return (
    <Comp
      className={cn(
        "relative overflow-hidden",
        compact ? "py-12 md:py-16" : "py-16 md:py-20 lg:py-24",
        theme === "light" && "bg-white text-navy-800",
        theme === "soft" && "technical-grid-light bg-neutral-50 text-navy-800",
        theme === "navy" && "technical-grid bg-navy-900 text-neutral-50",
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

export function SectionHeader({
  overline,
  title,
  body,
  inverse = false,
  className,
}: {
  overline?: string;
  title: string;
  body?: string;
  inverse?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {overline ? (
        <p
          className={cn(
            "font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em]",
            inverse ? "text-blue-200" : "text-brand-600",
          )}
        >
          {overline}
        </p>
      ) : null}
      <h2
        className={cn(
          "mt-4 font-display text-[2rem] font-semibold leading-[1.15] tracking-[-0.035em] md:text-[2.75rem]",
          inverse && "text-white",
        )}
      >
        {title}
      </h2>
      {body ? (
        <p className={cn("mt-5 text-lead", inverse ? "text-navy-200" : "text-neutral-600")}>{body}</p>
      ) : null}
    </div>
  );
}
