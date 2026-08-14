import type { Metadata } from "next";
import { ArrowDown, ArrowRight, Buildings, CheckCircle, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { CTABand } from "@/components/cta-band";
import { HeroPulseRail } from "@/components/hero-pulse-rail";
import { IndustryChapter } from "@/components/industry-chapter";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { industries, industriesHero, industriesMeta } from "@/content/industries";
import { breadcrumbSchema, collectionPageSchema } from "@/lib/schema";

export const metadata: Metadata = industriesMeta;

const breadcrumb = breadcrumbSchema([
  { name: "Home", href: "/" },
  { name: "Industries", href: "/industries" },
]);

const collection = collectionPageSchema({
  name: "Industries served by Data Power Source",
  description: industriesMeta.description as string,
  href: "/industries",
  items: industries.map((industry) => ({
    name: industry.title,
    href: `/industries#${industry.id}`,
  })),
});

export default function IndustriesPage() {
  return (
    <main id="main-content" data-testid="industries-page">
      <section
        data-testid="page-hero"
        className="technical-grid relative overflow-hidden border-b border-navy-700 bg-navy-900 text-white"
      >
        <div aria-hidden="true" className="absolute inset-y-0 left-[8%] w-px bg-white/[0.06]" />
        <div aria-hidden="true" className="absolute bottom-0 right-0 h-px w-[42%] bg-blue-400/60" />
        <div className="relative mx-auto max-w-container px-5 pb-24 pt-16 sm:px-6 md:pb-28 md:pt-20 lg:pb-32 lg:pt-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-blue-200">
                {industriesHero.overline}
              </p>
              <h1 className="mt-5 max-w-[920px] font-display text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.055em] text-white sm:text-[3.7rem] lg:text-[4.65rem]">
                {industriesHero.title}
              </h1>
              <p className="mt-7 max-w-[760px] text-base leading-relaxed text-navy-100 sm:text-lg">
                {industriesHero.lead}
              </p>
              <Button asChild variant="outline-dark" className="mt-8">
                <Link href="#market-index">
                  Explore the markets <ArrowDown aria-hidden="true" className="size-4" />
                </Link>
              </Button>
            </div>

            <div className="lg:col-span-4 lg:pl-8">
              <div className="border-l border-white/20 pl-6">
                <span className="font-display text-[5rem] font-semibold leading-none tracking-[-0.07em] text-white">
                  09
                </span>
                <p className="mt-2 font-mono text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-blue-200">
                  Distinct operating environments
                </p>
                <p className="mt-5 max-w-xs text-sm leading-relaxed text-navy-200">
                  One disciplined approach, adapted to the codes, schedules, security, and uptime demands of each market.
                </p>
              </div>
            </div>
          </div>
        </div>
        <HeroPulseRail />
      </section>

      <section id="market-index" className="relative z-10 -mt-12 pb-16 md:-mt-14 md:pb-20">
        <div className="mx-auto max-w-container px-5 sm:px-6">
          <Reveal>
            <nav
              aria-label="Industries on this page"
              data-testid="industry-index"
              className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-[0_18px_55px_rgba(5,33,70,0.12)]"
            >
              <div className="flex items-center justify-between gap-4 border-b border-neutral-200 px-5 py-4 sm:px-6">
                <div className="flex items-center gap-3">
                  <Buildings aria-hidden="true" className="size-5 text-brand-600" />
                  <span className="font-display text-sm font-semibold text-navy-800">Market index</span>
                </div>
                <span className="hidden font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-neutral-500 sm:inline">
                  Select an industry
                </span>
              </div>
              <div className="grid grid-cols-2 gap-px bg-neutral-200 sm:grid-cols-3">
                {industries.map((industry) => (
                  <Link
                    key={industry.id}
                    href={`#${industry.id}`}
                    className="group flex min-h-[76px] items-center gap-3 bg-white px-4 py-4 text-sm font-semibold text-navy-800 transition-colors hover:bg-blue-50 focus-visible:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500 sm:px-5"
                  >
                    <span className="font-mono text-[0.64rem] text-brand-600">{industry.number}</span>
                    <span className="leading-tight">{industry.title}</span>
                  </Link>
                ))}
              </div>
            </nav>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-neutral-200 bg-white pb-16 md:pb-20">
        <div className="mx-auto grid max-w-container gap-8 px-5 sm:px-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-brand-600">
              Mission-critical electrical contracting capabilities
            </p>
            <h2 className="mt-4 max-w-3xl font-display text-[2rem] font-semibold leading-[1.12] tracking-[-0.04em] text-navy-800 md:text-[2.75rem]">
              Different facilities. The same requirement: do the work without losing the operation.
            </h2>
          </div>
          <p className="max-w-lg text-base leading-relaxed text-neutral-600 lg:col-span-4">
            Each market below pairs its operating constraint with the electrical, backup-power, and connectivity work DPS brings to it.
          </p>
        </div>
      </section>

      {industries.map((industry, index) => (
        <IndustryChapter key={industry.id} industry={industry} index={index} />
      ))}

      <section className="technical-grid relative overflow-hidden border-b border-navy-700 bg-navy-800 py-16 text-white md:py-20">
        <div aria-hidden="true" className="absolute inset-y-0 right-[12%] w-px bg-white/[0.08]" />
        <div className="relative mx-auto grid max-w-container gap-10 px-5 sm:px-6 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-blue-200">
              Field-proven across the Southeast
            </p>
            <h2 className="mt-4 max-w-3xl font-display text-[2.35rem] font-semibold leading-[1.08] tracking-[-0.04em] text-white md:text-[3rem]">
              Industry context changes the plan. It does not change the standard.
            </h2>
            <p className="mt-5 max-w-2xl text-lead leading-relaxed text-navy-100">
              DPS has delivered documented work for Georgia Tech, the U.S. Army, Clayton County Public Schools, EarthLink, PruittHealth, and government facilities—often while the operation stayed online.
            </p>
          </div>
          <div className="lg:col-span-5 lg:pl-10">
            <div className="border-y border-white/15">
              {[
                "Site assessment before scope and sequencing",
                "Live-facility planning and controlled cutovers",
                "Electrical, standby power, and connectivity coordinated together",
              ].map((item, index) => (
                <div key={item} className="flex gap-4 border-b border-white/15 px-2 py-5 last:border-b-0">
                  {index === 0 ? (
                    <ShieldCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-blue-200" />
                  ) : (
                    <CheckCircle aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-blue-200" />
                  )}
                  <p className="text-sm font-semibold leading-relaxed text-white">{item}</p>
                </div>
              ))}
            </div>
            <Link
              href="/projects"
              className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-blue-100 hover:text-white"
            >
              View documented projects
              <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
            </Link>
          </div>
        </div>
      </section>

      <CTABand
        eyebrow="Plan around your facility"
        title="Bring us the operating constraint first."
        body="Tell us what must stay online, when the work can happen, and what the facility needs next. We will help define the safest path from existing conditions to finished operation."
      />

      {[breadcrumb, collection].map((schema) => (
        <script
          key={schema["@type"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
        />
      ))}
    </main>
  );
}
