import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import {
  BrandServiceMark,
  getDisciplineColor,
  getDisciplineSurfaceColor,
  type ServiceDiscipline,
} from "@/components/brand-service-mark";
import { cn } from "@/lib/utils";
import type { CSSProperties } from "react";

export function ServiceCard({
  title,
  description,
  href,
  discipline,
  callouts,
  note,
  feature = false,
  className,
}: {
  title: string;
  description: string;
  href: string;
  discipline: ServiceDiscipline;
  callouts: readonly string[];
  note?: string;
  feature?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      data-testid="service-card"
      data-discipline={discipline}
      className={cn(
        "group relative flex min-h-[360px] flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white p-7 shadow-sm transition-[transform,background-color,border-color,box-shadow,color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-[var(--discipline-surface)] hover:bg-[var(--discipline-surface)] hover:text-white hover:shadow-[0_0_0_1px_var(--discipline-color),0_24px_58px_-20px_var(--discipline-color)] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 motion-reduce:transform-none",
        feature && "min-h-[410px]",
        className,
      )}
      style={
        {
          "--discipline-color": getDisciplineColor(discipline),
          "--discipline-surface": getDisciplineSurfaceColor(discipline),
        } as CSSProperties
      }
    >
      <div className="flex items-start justify-between gap-4">
        <BrandServiceMark discipline={discipline} plate className="h-16 w-20" />
        <span
          aria-hidden="true"
          className={cn(
            "mt-1 h-px flex-1 origin-left bg-[var(--discipline-color)] opacity-70 transition-transform duration-300 group-hover:scale-x-90",
            "group-hover:bg-white group-hover:opacity-70",
          )}
        />
      </div>
      {note ? (
        <span
          className="mt-5 w-fit border border-[var(--discipline-color)] bg-neutral-50 px-3 py-1 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-neutral-700 group-hover:border-white/40 group-hover:bg-white group-hover:text-[var(--discipline-surface)]"
        >
          {note}
        </span>
      ) : null}
      <h3
        className="mt-8 max-w-xl font-display text-[1.4rem] font-semibold leading-[1.16] tracking-[-0.025em] text-navy-800 transition-colors duration-300 group-hover:text-white md:text-[1.6rem]"
      >
        {title}
      </h3>
      <p className="mt-4 text-base leading-relaxed text-neutral-600 transition-colors duration-300 group-hover:text-white">
        {description}
      </p>
      <ul
        className="mt-6 grid gap-x-5 gap-y-2 border-t border-neutral-200 pt-5 text-small text-navy-700 transition-colors duration-300 group-hover:border-white/25 group-hover:text-white sm:grid-cols-2"
      >
        {callouts.map((callout) => (
          <li key={callout} className="flex items-start gap-2 leading-snug">
            <span
              aria-hidden="true"
              className="mt-[0.4rem] size-1.5 shrink-0 bg-[var(--discipline-color)] transition-colors duration-300 group-hover:bg-white"
            />
            {callout}
          </li>
        ))}
      </ul>
      <span
        className="mt-auto flex items-center justify-between pt-8 text-small font-semibold text-brand-600 transition-colors duration-300 group-hover:text-white"
      >
        Explore service
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 transition-transform duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1 bg-[var(--discipline-color)] transition-colors duration-300 group-hover:bg-white/70"
      />
    </Link>
  );
}
