import { Lightning } from "@phosphor-icons/react/dist/ssr";
import type { CSSProperties } from "react";

import {
  BrandServiceMark,
  getDisciplineColor,
  type ServiceDiscipline,
} from "@/components/brand-service-mark";
import { cn } from "@/lib/utils";

const systems: {
  discipline: ServiceDiscipline;
  label: string;
  code: string;
  callouts: readonly [string, string];
}[] = [
  {
    discipline: "electrical",
    label: "Electrical",
    code: "ELC",
    callouts: ["Builds & upgrades", "Controls & switchgear"],
  },
  {
    discipline: "connectivity",
    label: "Connectivity",
    code: "NET",
    callouts: ["Structured cabling", "Fiber & telemetry"],
  },
  {
    discipline: "mission-critical",
    label: "Mission critical",
    code: "MCP",
    callouts: ["UPS systems", "Standby generators"],
  },
  {
    discipline: "design-build",
    label: "Design-build",
    code: "ENG",
    callouts: ["Engineering", "Concept to install"],
  },
];

export function PowerSystemMatrix({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <div
      data-testid="power-system-matrix"
      className={cn(
        "technical-grid-light relative overflow-hidden rounded-xl border border-neutral-200 bg-white p-3 shadow-[0_24px_70px_-42px_rgba(3,17,38,0.55)]",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-neutral-200 px-3 py-3">
        <div className="flex items-center gap-2 font-mono text-[0.64rem] font-semibold uppercase tracking-[0.12em] text-brand-700">
          <Lightning aria-hidden="true" size={15} weight="regular" />
          Core systems
        </div>
        <span className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-neutral-500">
          <span className="status-pulse size-1.5 rounded-full bg-success" />
          One partner
        </span>
      </div>
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-neutral-200">
        {systems.map((system) => (
          <div
            key={system.code}
            className={cn(
              "group relative bg-white",
              compact ? "min-h-[126px] p-3" : "min-h-[190px] p-4 sm:min-h-[220px] sm:p-5",
            )}
            style={{ "--discipline-color": getDisciplineColor(system.discipline) } as CSSProperties}
          >
            <div className="flex items-start justify-between gap-3">
              <BrandServiceMark
                discipline={system.discipline}
                className={cn(
                  "transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1",
                  compact ? "h-9 w-11" : "h-14 w-16 sm:h-16 sm:w-20",
                )}
              />
              <span className="font-mono text-[0.6rem] font-semibold tracking-[0.12em] text-neutral-400">
                {system.code}
              </span>
            </div>
            <p
              className={cn(
                "font-display font-semibold text-[var(--discipline-color)]",
                compact ? "mt-2 text-[0.78rem]" : "mt-4 text-[0.94rem] sm:text-[1.04rem]",
              )}
            >
              {system.label}
            </p>
            <ul
              className={cn(
                "leading-snug text-neutral-500",
                compact ? "mt-1.5 space-y-1 text-[0.6rem]" : "mt-3 space-y-1.5 text-[0.72rem]",
              )}
            >
              {system.callouts.map((callout) => (
                <li key={callout} className="flex gap-2">
                  <span aria-hidden="true" className="mt-[0.38rem] size-1 shrink-0 bg-[var(--discipline-color)]" />
                  {callout}
                </li>
              ))}
            </ul>
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-[var(--discipline-color)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function TechnicalStatusRail({ items }: { items: readonly string[] }) {
  const accents = ["#162792", "#0C9E1F", "#EB3B08", "#162792"] as const;

  return (
    <div
      data-testid="technical-status-rail"
      className="relative z-[2] border-y border-navy-600 bg-navy-950/95"
    >
      <div className="mx-auto grid max-w-container grid-cols-2 px-5 sm:px-6 lg:grid-cols-4">
        {items.map((item, index) => (
          <div
            key={item}
            data-testid="trust-item"
            className={cn(
              "flex min-h-[82px] items-center gap-3 border-navy-700 py-4 text-[14px] text-white",
              index % 2 === 1 && "border-l pl-4",
              index > 1 && "border-t lg:border-t-0",
              index > 0 && "lg:border-l lg:pl-5",
              "lg:px-5",
            )}
            style={{ "--trust-accent": accents[index] } as CSSProperties}
          >
            <span
              aria-hidden="true"
              className="h-7 w-0.5 shrink-0 bg-[var(--trust-accent)]"
            />
            <span className="font-mono font-semibold uppercase tracking-[0.07em] text-current">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
