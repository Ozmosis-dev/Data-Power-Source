import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { BrandServiceMark, getDisciplineColor, type ServiceDiscipline } from "@/components/brand-service-mark";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";
import type { CSSProperties } from "react";

type Pillar = {
  index: string;
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  linkLabel: string;
  discipline: ServiceDiscipline;
  callouts: readonly string[];
};

export function PillarSplit({ items }: { items: readonly Pillar[] }) {
  return (
    <div className="grid gap-5 lg:grid-cols-12">
      {items.map((item, index) => {
        return (
          <Reveal key={item.href} className="lg:col-span-6" delay={index * 50}>
            <Link
              href={item.href}
              data-testid="pillar-card"
              data-discipline={item.discipline}
              className={cn(
                "group relative flex h-full min-h-[500px] flex-col overflow-hidden rounded-xl border p-7 transition-[transform,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 motion-reduce:transform-none md:p-9",
                index === 0
                  ? "border-neutral-200 bg-white shadow-sm hover:border-brand-300 hover:shadow-md"
                  : "border-navy-700 bg-navy-800 text-white shadow-[0_24px_55px_-42px_rgba(5,33,70,0.72)] hover:border-blue-400 hover:shadow-md",
              )}
              style={{ "--discipline-color": getDisciplineColor(item.discipline) } as CSSProperties}
            >
              <div className="flex items-start justify-between">
                <BrandServiceMark discipline={item.discipline} plate className="h-20 w-24" />
                <span
                  className={cn(
                    "grid size-16 place-items-center border font-mono text-[0.72rem] font-semibold",
                    index === 0
                      ? "border-neutral-200 bg-neutral-50 text-brand-600"
                      : "border-white/20 bg-white/5 text-blue-100",
                  )}
                >
                  {item.index}
                </span>
              </div>
              <p
                className={cn(
                  "mt-8 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em]",
                  index === 0 ? "text-brand-600" : "text-blue-100",
                )}
              >
                {item.eyebrow}
              </p>
              <h3
                className={cn(
                  "mt-3 max-w-xl font-display text-[1.9rem] font-semibold leading-[1.12] tracking-[-0.03em] md:text-[2.25rem]",
                  index === 0 ? "text-navy-800" : "text-white",
                )}
              >
                {item.title}
              </h3>
              <p className={cn("mt-5 max-w-2xl text-base leading-relaxed", index === 0 ? "text-neutral-600" : "text-blue-50/80")}>
                {item.body}
              </p>
              <ul
                className={cn(
                  "mt-7 grid gap-3 border-t pt-6 text-small sm:grid-cols-2",
                  index === 0 ? "border-neutral-200 text-navy-700" : "border-white/20 text-white",
                )}
              >
                {item.callouts.map((callout) => (
                  <li key={callout} className="flex items-start gap-2 leading-snug">
                    <span
                      aria-hidden="true"
                      className={cn("mt-[0.42rem] size-1.5 shrink-0", index === 0 ? "bg-brand-600" : "bg-white")}
                    />
                    {callout}
                  </li>
                ))}
              </ul>
              <span
                className={cn(
                  "mt-auto inline-flex items-center gap-2 pt-7 text-small font-semibold",
                  index === 0 ? "text-brand-600" : "text-white",
                )}
              >
                {item.linkLabel}
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-[180ms] group-hover:translate-x-1"
                />
              </span>
              <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1 bg-[var(--discipline-color)]" />
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
