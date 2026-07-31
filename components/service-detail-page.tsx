import {
  ArrowRight,
  ArrowsClockwise,
  BatteryCharging,
  Blueprint,
  Broadcast,
  Camera,
  CarProfile,
  CellSignalFull,
  Circuitry,
  Fan,
  GitBranch,
  HardDrives,
  LightbulbFilament,
  Lightning,
  Network,
  Phone,
  PlugsConnected,
  Wrench,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import type { ComponentType, CSSProperties } from "react";

import { BrandServiceMark } from "@/components/brand-service-mark";
import { Breadcrumb } from "@/components/breadcrumb";
import { HeroPulseRail } from "@/components/hero-pulse-rail";
import { QuoteTrigger } from "@/components/quote-dialog";
import { Reveal } from "@/components/reveal";
import type { CapabilityIcon, ServiceDetail } from "@/content/service-details";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

type IconComponent = ComponentType<{
  "aria-hidden"?: boolean;
  className?: string;
  size?: number | string;
  weight?: "bold" | "duotone" | "fill" | "light" | "regular" | "thin";
}>;

const capabilityIcons: Record<CapabilityIcon, IconComponent> = {
  battery: BatteryCharging,
  blueprint: Blueprint,
  bolt: Lightning,
  cable: PlugsConnected,
  camera: Camera,
  car: CarProfile,
  circuit: Circuitry,
  cooling: Fan,
  fiber: GitBranch,
  generator: ArrowsClockwise,
  lighting: LightbulbFilament,
  maintenance: HardDrives,
  monitoring: CellSignalFull,
  network: Network,
  repair: Wrench,
  switchgear: PlugsConnected,
  telemetry: Broadcast,
};

const capabilityLayouts: Record<number, string[]> = {
  4: ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"],
  6: [
    "lg:col-span-7",
    "lg:col-span-5",
    "lg:col-span-4",
    "lg:col-span-4",
    "lg:col-span-4",
    "lg:col-span-12",
  ],
  7: [
    "lg:col-span-7",
    "lg:col-span-5",
    "lg:col-span-4",
    "lg:col-span-4",
    "lg:col-span-4",
    "lg:col-span-5",
    "lg:col-span-7",
  ],
  9: [
    "lg:col-span-7",
    "lg:col-span-5",
    "lg:col-span-4",
    "lg:col-span-4",
    "lg:col-span-4",
    "lg:col-span-5",
    "lg:col-span-7",
    "lg:col-span-6",
    "lg:col-span-6",
  ],
};

function ServiceHeading({
  title,
  body,
  inverse = false,
  monochrome = false,
}: {
  title: string;
  body?: string;
  inverse?: boolean;
  monochrome?: boolean;
}) {
  return (
    <div>
      <h2
        className={cn(
          "max-w-4xl font-display text-[2.2rem] font-semibold leading-[1.08] tracking-[-0.035em] md:text-[3.25rem]",
          inverse ? "text-white" : monochrome ? "text-[#1A1A1A]" : "text-navy-800",
        )}
      >
        {title}
      </h2>
      {body ? (
        <p
          className={cn(
            "mt-5 max-w-2xl text-lead leading-relaxed",
            inverse ? "text-white/75" : monochrome ? "text-[#595959]" : "text-neutral-600",
          )}
        >
          {body}
        </p>
      ) : null}
    </div>
  );
}

function PrimaryAction({ inverse = false }: { inverse?: boolean }) {
  return (
    <QuoteTrigger
      className={cn(
        "inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-md px-6 text-small font-semibold transition-[background-color,color,transform] duration-[180ms] active:scale-[0.98] motion-reduce:transition-none",
        inverse
          ? "bg-white text-[var(--service-surface)] hover:bg-neutral-50"
          : "bg-[var(--service-surface)] text-white hover:brightness-90",
      )}
    >
      Request a quote
      <ArrowRight aria-hidden="true" size={16} weight="bold" />
    </QuoteTrigger>
  );
}

function CapabilityGrid({
  content,
  monochrome = false,
}: {
  content: ServiceDetail["capabilities"];
  monochrome?: boolean;
}) {
  const layout = capabilityLayouts[content.items.length] ?? [];

  return (
    <section
      data-testid="service-capabilities"
      className={cn(
        "border-y py-20 md:py-28",
        monochrome
          ? "border-[#D9D9D9] bg-[#F3F3F3] text-[#1A1A1A]"
          : "border-neutral-100 bg-[var(--service-soft)]",
      )}
    >
      <div className="mx-auto max-w-container px-5 sm:px-6">
        <ServiceHeading
          title={content.title}
          body={content.intro}
          monochrome={monochrome}
        />
        <div className="mt-12 grid gap-4 lg:grid-cols-12">
          {content.items.map((item, index) => {
            const Icon = capabilityIcons[item.icon];
            return (
              <Reveal
                key={item.title}
                className={cn(
                  "group min-w-0 rounded-xl border p-6 transition-[border-color,transform] duration-[180ms] hover:-translate-y-1 hover:border-[color:var(--service-accent)] motion-reduce:transform-none motion-reduce:transition-none",
                  monochrome
                    ? "border-[#D7D7D7] bg-[#FAFAFA]"
                    : "border-[color:var(--service-tint)] bg-white",
                  layout[index] ?? "lg:col-span-6",
                )}
                delay={(index % 3) * 40}
              >
                <div className="flex items-start gap-5">
                  <span
                    className={cn(
                      "grid size-11 shrink-0 place-items-center rounded-lg",
                      monochrome
                        ? "bg-[#EAEAEA] text-[#1A1A1A]"
                        : "bg-[var(--service-soft)] text-[var(--service-accent)]",
                    )}
                  >
                    <Icon aria-hidden={true} size={21} weight="regular" />
                  </span>
                  <div>
                    <h3
                      className={cn(
                        "font-display text-h3 font-semibold tracking-[-0.02em]",
                        monochrome ? "text-[#1A1A1A]" : "text-navy-800",
                      )}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-3 max-w-xl text-small leading-relaxed",
                        monochrome ? "text-[#595959]" : "text-neutral-600",
                      )}
                    >
                      {item.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ServiceDetailPage({ service }: { service: ServiceDetail }) {
  const style = {
    "--service-accent": service.theme.accent,
    "--service-surface": service.theme.surface,
    "--service-soft": service.theme.soft,
    "--service-tint": service.theme.tint,
  } as CSSProperties;

  return (
    <main
      id="main-content"
      data-testid="service-detail-page"
      className="service-detail-page overflow-x-clip bg-white"
      style={style}
    >
      <section
        data-testid="page-hero"
        className="service-page-hero relative overflow-x-clip overflow-y-visible bg-[var(--service-surface)] text-white"
      >
        <div aria-hidden="true" className="service-detail-grid absolute inset-0 opacity-60" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(115deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.03)_58%,rgba(0,0,0,0.15)_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-1 bg-white/60"
        />
        <div className="relative mx-auto grid min-h-[calc(100dvh-72px)] max-w-container items-center gap-10 px-5 py-14 sm:px-6 md:py-16 lg:grid-cols-12 lg:py-20">
          <Reveal className="lg:col-span-8 lg:pr-6">
            <Breadcrumb
              inverse
              items={[
                { label: "Home", href: "/" },
                { label: "Services", href: "/services" },
                { label: service.hero.overline },
              ]}
            />
            <div className="mt-8 flex items-center gap-4">
              <BrandServiceMark
                discipline={service.discipline}
                testId="service-hero-mark"
                className="h-11 w-14 rounded-lg bg-white/95 p-2 shadow-sm"
              />
              <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white">
                {service.hero.overline}
              </p>
            </div>
            <h1 className="mt-7 max-w-[860px] font-display text-[2.7rem] font-bold leading-[1.02] tracking-[-0.045em] text-white sm:text-[3.25rem] lg:text-[3rem]">
              {service.hero.title}
            </h1>
            <p
              data-testid="service-hero-lead"
              className="mt-6 max-w-[610px] border-l-2 border-white/55 pl-5 text-lead leading-relaxed text-white"
            >
              {service.hero.lead}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <PrimaryAction inverse />
              <a
                href={site.phoneHref}
                className="inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-white/55 px-6 text-small font-semibold text-white transition-[background-color,border-color,transform] duration-[180ms] hover:border-white hover:bg-white/15 active:scale-[0.98] motion-reduce:transition-none"
                aria-label={`Call Data Power Source at ${site.phoneDisplay}`}
              >
                <Phone aria-hidden="true" size={16} weight="regular" />
                Call {site.phoneDisplay}
              </a>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-4" delay={60}>
            <div
              data-testid="service-hero-image"
              className="relative min-h-[360px] overflow-hidden rounded-xl border border-white/30 shadow-[0_28px_60px_rgba(0,0,0,0.22)] sm:min-h-[460px] lg:min-h-[560px]"
            >
              <Image
                src={service.hero.imageSrc}
                alt={service.hero.imageAlt}
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 42vw"
                className="object-cover"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-navy-950/15" />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-2 bg-white/80"
              />
            </div>
          </Reveal>
        </div>
        <HeroPulseRail />
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-container gap-12 px-5 sm:px-6 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-7">
            <ServiceHeading title={service.overview.title} />
            <div className="mt-7 max-w-2xl space-y-5 text-lead leading-relaxed text-neutral-600">
              {service.overview.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={60}>
            <div className="relative rounded-xl border border-[color:var(--service-tint)] bg-[var(--service-soft)] p-7 md:p-9">
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 top-0 w-1 rounded-l-xl bg-[var(--service-accent)]"
              />
              <BrandServiceMark
                discipline={service.discipline}
                className="h-20 w-24"
              />
              <p className="mt-8 font-display text-[1.55rem] font-semibold leading-snug tracking-[-0.025em] text-navy-800">
                {service.overview.callout}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CapabilityGrid
        content={service.capabilities}
        monochrome={service.discipline === "design-build"}
      />

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-container px-5 sm:px-6">
          <div className="grid gap-5 lg:grid-cols-12">
            {service.focus.map((item, index) => (
              <Reveal
                key={item.title}
                className={cn(
                  "min-w-0 rounded-xl border border-neutral-100 p-7 md:p-9",
                  index === 0
                    ? "bg-navy-900 text-white lg:col-span-7"
                    : service.focus.length === 3 && index === 2
                      ? "bg-[var(--service-soft)] lg:col-span-12"
                      : "bg-white lg:col-span-5",
                )}
                delay={index * 40}
              >
                <div className="h-1 w-16 rounded-full bg-[var(--service-accent)]" />
                <h2
                  className={cn(
                    "mt-7 font-display text-[2rem] font-semibold leading-[1.1] tracking-[-0.03em] md:text-[2.6rem]",
                    index === 0 ? "text-white" : "text-navy-800",
                  )}
                >
                  {item.title}
                </h2>
                <p
                  className={cn(
                    "mt-5 max-w-2xl text-base leading-relaxed",
                    index === 0 ? "text-navy-100" : "text-neutral-600",
                  )}
                >
                  {item.body}
                </p>
                {item.items?.length ? (
                  <div className="mt-7 grid gap-3 sm:grid-cols-3">
                    {item.items.map((label) => (
                      <div
                        key={label}
                        className={cn(
                          "rounded-lg border px-4 py-3 text-small font-semibold",
                          index === 0
                            ? "border-white/20 bg-white/5 text-white"
                            : "border-[color:var(--service-tint)] bg-[var(--service-soft)] text-navy-800",
                        )}
                      >
                        {label}
                      </div>
                    ))}
                  </div>
                ) : null}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--service-surface)] py-20 text-white md:py-24">
        <div className="mx-auto grid max-w-container gap-10 px-5 sm:px-6 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-8">
            <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white/70">
              {service.proof.label}
            </p>
            <h2 className="mt-5 max-w-4xl font-display text-[2.4rem] font-semibold leading-[1.06] tracking-[-0.04em] text-white md:text-[3.5rem]">
              {service.proof.title}
            </h2>
            <p className="mt-6 max-w-2xl text-lead leading-relaxed text-white/80">
              {service.proof.body}
            </p>
            {service.proof.quote ? (
              <p className="mt-6 border-l-2 border-white/60 pl-5 text-h3 font-medium text-white">
                {service.proof.quote}
              </p>
            ) : null}
          </Reveal>
          {service.proof.metrics?.length ? (
            <Reveal className="grid gap-4 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1" delay={60}>
              {service.proof.metrics.map((metric) => (
                <div key={metric.label} className="rounded-xl border border-white/25 p-6">
                  <p className="font-display text-[2.6rem] font-semibold tracking-[-0.04em] text-white">
                    {metric.value}
                  </p>
                  <p className="mt-2 max-w-xs text-small leading-relaxed text-white/75">
                    {metric.label}
                  </p>
                </div>
              ))}
            </Reveal>
          ) : null}
        </div>
      </section>

      {service.process ? (
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-container px-5 sm:px-6">
            <ServiceHeading title={service.process.title} body={service.process.body} />
            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {service.process.steps.map((step, index) => (
                <Reveal
                  key={step.title}
                  className="rounded-xl border border-neutral-100 bg-white p-6"
                  delay={index * 40}
                >
                  <span className="font-mono text-[0.68rem] font-semibold text-[var(--service-accent)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-7 font-display text-h3 font-semibold text-navy-800">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-small leading-relaxed text-neutral-600">{step.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {service.questions ? (
        <section className="border-y border-neutral-100 bg-[var(--service-soft)] py-20 md:py-24">
          <div className="mx-auto max-w-container px-5 sm:px-6">
            <ServiceHeading title={service.questions.title} />
            <div className="mt-10 grid gap-4 lg:grid-cols-12">
              {service.questions.items.map((item, index) => (
                <div
                  key={item.question}
                  className={cn(
                    "rounded-xl border border-[color:var(--service-tint)] bg-white p-7",
                    index === 0 ? "lg:col-span-5" : index === 1 ? "lg:col-span-7" : "lg:col-span-12",
                  )}
                >
                  <h3 className="font-display text-h3 font-semibold text-navy-800">
                    {item.question}
                  </h3>
                  <p className="mt-4 max-w-3xl text-base leading-relaxed text-neutral-600">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
            <Link
              href="/faq"
              className="mt-8 inline-flex items-center gap-2 font-semibold text-[var(--service-accent)] hover:underline"
            >
              View all frequently asked questions
              <ArrowRight aria-hidden="true" size={16} weight="bold" />
            </Link>
          </div>
        </section>
      ) : null}

      <section data-testid="service-related-links" className="py-20 md:py-24">
        <div className="mx-auto grid max-w-container gap-10 px-5 sm:px-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="font-display text-[2.2rem] font-semibold tracking-[-0.035em] text-navy-800 md:text-[3rem]">
              Built for active facilities.
            </h2>
            <div className="mt-7 flex flex-wrap gap-3">
              {service.related.industries.map((industry) => (
                <Link
                  key={industry}
                  href="/industries"
                  className="rounded-md border border-[color:var(--service-tint)] bg-[var(--service-soft)] px-4 py-3 text-small font-semibold text-navy-800 transition-colors hover:border-[color:var(--service-accent)]"
                >
                  {industry}
                </Link>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[var(--service-accent)]">
              Related services
            </p>
            <div className="mt-5 grid gap-3">
              {service.related.services.map((related) => (
                <Link
                  key={related.href}
                  href={related.href}
                  className="group flex items-center justify-between rounded-xl border border-neutral-100 px-5 py-4 font-semibold text-navy-800 transition-colors hover:border-[color:var(--service-accent)]"
                >
                  {related.label}
                  <ArrowRight
                    aria-hidden="true"
                    size={16}
                    weight="bold"
                    className="text-[var(--service-accent)] transition-transform group-hover:translate-x-1"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="service-detail-grid bg-navy-900 py-16 text-white md:py-20">
        <div className="mx-auto grid max-w-container items-center gap-9 px-5 sm:px-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2 className="max-w-4xl font-display text-[2.35rem] font-semibold leading-[1.08] tracking-[-0.04em] text-white md:text-[3.5rem]">
              {service.cta.title}
            </h2>
            <p className="mt-5 max-w-2xl text-lead text-navy-100">{service.cta.body}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col lg:items-end">
            <PrimaryAction inverse />
            <a
              href={site.phoneHref}
              className="inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-white/35 px-6 text-small font-semibold text-white transition-[background-color,border-color,transform] duration-[180ms] hover:border-white hover:bg-white/10 active:scale-[0.98] motion-reduce:transition-none"
              aria-label={`Call Data Power Source at ${site.phoneDisplay}`}
            >
              <Phone aria-hidden="true" size={16} weight="regular" />
              Call {site.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
