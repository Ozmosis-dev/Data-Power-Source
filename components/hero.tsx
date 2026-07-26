import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Lightning } from "@phosphor-icons/react/dist/ssr";

import { Breadcrumb, type BreadcrumbItem } from "@/components/breadcrumb";
import { HeroPulseRail } from "@/components/hero-pulse-rail";
import { QuoteTrigger } from "@/components/quote-dialog";
import { Reveal } from "@/components/reveal";
import { PowerSystemMatrix, TechnicalStatusRail } from "@/components/technical-grid";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type HeroProps = {
  overline: string;
  title: string;
  lead: string;
  breadcrumbs?: BreadcrumbItem[];
  imageAlt?: string;
  imageSrc?: string;
  trust?: readonly string[];
  actions?: boolean;
  compact?: boolean;
};

export function Hero({
  overline,
  title,
  lead,
  breadcrumbs,
  imageAlt,
  imageSrc,
  trust,
  actions = false,
  compact = false,
}: HeroProps) {
  const hasBackgroundImage = Boolean(imageAlt && imageSrc);

  return (
    <section
      data-testid="page-hero"
      className={cn(
        "relative overflow-x-clip overflow-y-visible bg-navy-900 text-neutral-50",
        hasBackgroundImage ? "technical-grid-subtle" : "technical-grid",
      )}
    >
      {hasBackgroundImage ? (
        <div data-testid="hero-field-visual" className="pointer-events-none absolute inset-0">
          <Image
            src={imageSrc!}
            alt={imageAlt!}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[62%_center] opacity-45 saturate-[0.62]"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-navy-900/70" />
        </div>
      ) : null}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-blue-400/60" />
      {!hasBackgroundImage ? (
        <>
          <div aria-hidden="true" className="absolute bottom-0 left-[8vw] top-0 hidden w-px bg-navy-700 xl:block" />
          <div aria-hidden="true" className="absolute bottom-0 right-[8vw] top-0 hidden w-px bg-navy-700 xl:block" />
        </>
      ) : null}
      <div
        className={cn(
          "relative mx-auto grid max-w-container gap-12 px-5 sm:px-6 lg:grid-cols-12 lg:gap-10",
          compact ? "py-16 md:py-20 lg:py-24" : "py-14 md:py-20 lg:min-h-[650px] lg:items-center",
        )}
      >
        <Reveal
          className={cn(
            hasBackgroundImage
              ? "lg:col-span-8 lg:pr-8"
              : imageAlt
                ? "lg:col-span-7 lg:pr-8"
                : "lg:col-span-8",
          )}
        >
          {breadcrumbs ? <Breadcrumb items={breadcrumbs} inverse /> : null}
          <div className={cn("flex items-center gap-3", breadcrumbs && "mt-8")}>
            <span className="grid size-8 place-items-center border border-blue-400/50 bg-blue-400/10 text-blue-200">
              <Lightning aria-hidden="true" size={15} weight="regular" />
            </span>
            <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-blue-200">
              {overline}
            </p>
          </div>
          <h1
            className={cn(
              "mt-7 max-w-5xl font-display font-bold tracking-[-0.04em] text-white",
              compact
                ? "text-h1 md:text-display lg:text-[4.75rem] lg:leading-[0.98]"
                : "text-h1 md:text-display lg:text-[4.75rem] lg:leading-[0.98]",
            )}
          >
            {title}
          </h1>
          <p className="mt-7 max-w-[640px] border-l-2 border-blue-400 pl-5 text-lead leading-relaxed text-navy-100">
            {lead}
          </p>
          {actions ? (
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="dark">
                <QuoteTrigger>
                  Request a quote <ArrowRight aria-hidden="true" className="size-4" />
                </QuoteTrigger>
              </Button>
              <Button asChild variant="outline-dark">
                <Link href="/projects">View our projects</Link>
              </Button>
            </div>
          ) : null}
        </Reveal>
        {imageAlt && !imageSrc ? (
          <Reveal className="lg:col-span-5" delay={60}>
            <PowerSystemMatrix />
          </Reveal>
        ) : !imageAlt ? (
          <Reveal className="hidden lg:col-span-4 lg:block" delay={60}>
            <div className="ml-auto max-w-[300px] border border-navy-600 bg-navy-950/80 p-3">
              <div className="flex items-center justify-between border-b border-navy-700 px-3 py-3 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-navy-300">
                <span>Page system</span>
                <span className="flex items-center gap-2 text-success">
                  <span className="status-pulse size-1.5 rounded-full bg-success" />
                  Online
                </span>
              </div>
              {["Assess", "Engineer", "Install", "Maintain"].map((label, index) => (
                <div
                  key={label}
                  className="flex items-center justify-between border-b border-navy-700 px-3 py-4 last:border-b-0"
                >
                  <span className="font-mono text-[0.65rem] text-navy-500">0{index + 1}</span>
                  <span className="text-small font-semibold text-navy-100">{label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        ) : null}
      </div>
      {trust?.length ? <TechnicalStatusRail items={trust} /> : null}
      <HeroPulseRail />
    </section>
  );
}
