import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import type { CSSProperties } from "react";

import {
  BrandServiceMark,
  getDisciplineColor,
  getDisciplineSurfaceColor,
  type ServiceDiscipline,
} from "@/components/brand-service-mark";

const disciplines: {
  title: string;
  href: string;
  discipline: ServiceDiscipline;
}[] = [
  {
    title: "Electrical",
    href: "/services/commercial-industrial-electrical",
    discipline: "electrical",
  },
  {
    title: "Connectivity",
    href: "/services/low-voltage-connectivity",
    discipline: "connectivity",
  },
  {
    title: "Mission critical",
    href: "/services/mission-critical-power",
    discipline: "mission-critical",
  },
  {
    title: "Design-build",
    href: "/services/engineering-design-build",
    discipline: "design-build",
  },
];

export function DisciplineStrip() {
  return (
    <section
      data-testid="discipline-band"
      aria-label="Core service disciplines"
      className="bg-neutral-50 py-6 sm:py-8"
    >
      <div className="mx-auto max-w-container px-5 sm:px-6">
        <div
          data-testid="discipline-strip"
          className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-neutral-200 bg-neutral-200 lg:grid-cols-4"
        >
          {disciplines.map((item) => (
            <Link
              key={item.discipline}
              href={item.href}
              data-testid="discipline-link"
              data-discipline={item.discipline}
              className="group flex min-h-24 min-w-0 items-center gap-3 bg-white px-4 py-4 transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[var(--discipline-surface)] focus-visible:bg-[var(--discipline-surface)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-300 sm:gap-4 sm:px-7"
              style={
                {
                  "--discipline-color": getDisciplineColor(item.discipline),
                  "--discipline-surface": getDisciplineSurfaceColor(item.discipline),
                } as CSSProperties
              }
            >
              <BrandServiceMark
                discipline={item.discipline}
                plate
                className="size-12 shrink-0 transition-[transform,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:border-white/30 group-hover:shadow-none group-focus-visible:border-white/30 group-focus-visible:shadow-none sm:h-14 sm:w-16 motion-reduce:transform-none"
              />
              <span className="min-w-0">
                <span
                  data-testid="discipline-title"
                  className="block font-display text-[0.88rem] font-semibold leading-tight text-[var(--discipline-color)] transition-colors duration-300 group-hover:text-white group-focus-visible:text-white sm:text-[1.1rem]"
                >
                  {item.title}
                </span>
                <span className="mt-1 hidden items-center gap-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-[var(--discipline-color)] opacity-70 transition-colors duration-300 group-hover:text-white group-hover:opacity-100 group-focus-visible:text-white group-focus-visible:opacity-100 sm:inline-flex">
                  View service <ArrowUpRight aria-hidden="true" className="size-3" />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
