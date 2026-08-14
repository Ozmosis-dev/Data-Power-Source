import { ArrowRight, Check } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/reveal";
import type { IndustryMarket } from "@/content/industries";
import { cn } from "@/lib/utils";

export function IndustryChapter({
  industry,
  index,
}: {
  industry: IndustryMarket;
  index: number;
}) {
  const imageFirst = index % 2 === 0;
  const inverse = industry.featured === true;

  return (
    <section
      id={industry.id}
      data-testid="industry-chapter"
      className={cn(
        "scroll-mt-24 overflow-hidden border-b py-16 md:py-24 lg:py-28",
        inverse
          ? "technical-grid border-navy-700 bg-navy-900 text-white"
          : index % 2 === 0
            ? "border-neutral-200 bg-white text-navy-800"
            : "technical-grid-light border-neutral-200 bg-neutral-50 text-navy-800",
      )}
    >
      <div className="mx-auto grid max-w-container gap-10 px-5 sm:px-6 lg:grid-cols-12 lg:items-center lg:gap-12">
        <Reveal
          className={cn(
            "lg:col-span-5",
            imageFirst ? "lg:order-2 lg:pl-4" : "lg:order-1 lg:pr-4",
          )}
        >
          <div className="flex items-center gap-4">
            <span
              className={cn(
                "font-mono text-[0.72rem] font-semibold tracking-[0.14em]",
                inverse ? "text-blue-200" : "text-brand-600",
              )}
            >
              {industry.number}
            </span>
            <span className={cn("h-px w-12", inverse ? "bg-blue-300/70" : "bg-blue-300")} />
            <span
              className={cn(
                "font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em]",
                inverse ? "text-navy-200" : "text-neutral-500",
              )}
            >
              Market profile
            </span>
          </div>

          <h2
            className={cn(
              "mt-6 font-display text-[2.35rem] font-semibold leading-[1.04] tracking-[-0.045em] sm:text-[3rem]",
              inverse && "text-white",
            )}
          >
            {industry.title}
          </h2>
          <p className={cn("mt-6 text-lead leading-relaxed", inverse ? "text-navy-100" : "text-neutral-600")}>
            {industry.description}
          </p>

          <div
            className={cn(
              "mt-7 border-l-2 py-1 pl-5",
              inverse ? "border-blue-300" : "border-brand-600",
            )}
          >
            <p
              className={cn(
                "font-mono text-[0.65rem] font-semibold uppercase tracking-[0.12em]",
                inverse ? "text-blue-200" : "text-brand-600",
              )}
            >
              Operating constraint
            </p>
            <p className={cn("mt-2 text-sm font-medium leading-relaxed", inverse ? "text-white" : "text-navy-800")}>
              {industry.operatingConstraint}
            </p>
          </div>

          <div className="mt-8">
            <h3
              className={cn(
                "font-display text-base font-semibold",
                inverse ? "text-white" : "text-navy-800",
              )}
            >
              Representative services
            </h3>
            <ul className="mt-4 space-y-3">
              {industry.services.map((service) => (
                <li
                  key={service}
                  className={cn(
                    "flex gap-3 text-sm leading-relaxed",
                    inverse ? "text-navy-100" : "text-neutral-600",
                  )}
                >
                  <Check
                    aria-hidden="true"
                    weight="bold"
                    className={cn(
                      "mt-1 size-4 shrink-0",
                      inverse ? "text-blue-200" : "text-brand-600",
                    )}
                  />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>

          <Link
            href={industry.link.href}
            className={cn(
              "group mt-8 inline-flex items-center gap-2 text-sm font-semibold underline-offset-4 transition-colors hover:underline",
              inverse ? "text-blue-100 hover:text-white" : "text-brand-600 hover:text-brand-700",
            )}
          >
            {industry.link.label}
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none"
            />
          </Link>
        </Reveal>

        <Reveal
          className={cn(
            "lg:col-span-7",
            imageFirst ? "lg:order-1" : "lg:order-2",
          )}
          delay={60}
        >
          <div
            className={cn(
              "group relative aspect-[3/2] overflow-hidden rounded-xl border shadow-[0_24px_70px_rgba(5,33,70,0.16)]",
              inverse ? "border-white/15" : "border-neutral-200",
            )}
          >
            <Image
              src={industry.image.src}
              alt={industry.image.alt}
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025] motion-reduce:transform-none"
              style={{ objectPosition: industry.image.position ?? "center" }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-navy-950/45 via-transparent to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 sm:p-6">
              <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white/80">
                Power · continuity · connectivity
              </span>
              <span className="font-display text-[2.75rem] font-semibold leading-none tracking-[-0.06em] text-white/90">
                {industry.number}
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
