import type { Metadata } from "next";
import { ArrowRight, Buildings, Factory } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { CTABand } from "@/components/cta-band";
import { Hero } from "@/components/hero";
import { PillarSplit } from "@/components/pillar-split";
import { ProcessSteps } from "@/components/process-steps";
import { Reveal } from "@/components/reveal";
import { SectionBand, SectionHeader } from "@/components/section-band";
import { ServiceCard } from "@/components/service-card";
import { Button } from "@/components/ui/button";
import { allServices, process, servicesHero, servicesMeta, servicesPillars } from "@/content/services";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = servicesMeta;

export default function ServicesPage() {
  const schema = breadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
  ]);

  return (
    <main id="main-content">
      <Hero
        overline={servicesHero.overline}
        title={servicesHero.title}
        lead={servicesHero.lead}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        compact
      />

      <SectionBand>
        <div className="mx-auto max-w-container px-5 sm:px-6">
          <SectionHeader title={servicesPillars.title} />
          <div className="mt-12">
            <PillarSplit items={servicesPillars.items} />
          </div>
        </div>
      </SectionBand>

      <SectionBand theme="soft">
        <div className="mx-auto max-w-container px-5 sm:px-6">
          <SectionHeader title={allServices.title} />
          <div className="mt-12 grid gap-5 lg:grid-cols-12">
            {allServices.items.map((service, index) => (
              <Reveal
                key={service.href}
                className={index === 0 ? "lg:col-span-7" : index === 1 ? "lg:col-span-5" : "lg:col-span-6"}
                delay={(index % 2) * 40}
              >
                <ServiceCard
                  {...service}
                  feature={index === 1}
                  className={index < 2 ? "lg:min-h-[390px]" : undefined}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </SectionBand>

      <SectionBand theme="navy">
        <div className="mx-auto max-w-container px-5 sm:px-6">
          <SectionHeader overline={process.overline} title={process.title} body={process.body} inverse />
          <ProcessSteps steps={process.steps} />
        </div>
      </SectionBand>

      <SectionBand>
        <div className="mx-auto max-w-container px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <SectionHeader
              title="Proven on the facilities that can't fail."
              body="Data centers, hospitals and assisted-living, government and military, schools, broadcast, and municipal utilities — see the work."
              className="lg:col-span-7"
            />
            <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
              <Button asChild>
                <Link href="/projects">
                  View projects <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/industries">Industries we serve</Link>
              </Button>
            </div>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <Link
              href="/projects"
              className="group flex min-h-44 items-end justify-between rounded-xl border border-neutral-100 bg-neutral-50 p-7 transition-colors hover:border-blue-200 hover:bg-blue-50"
            >
              <span>
                <Factory aria-hidden="true" className="size-6 text-blue-600" />
                <span className="mt-5 block font-display text-h3 font-semibold text-navy-800">Selected projects</span>
              </span>
              <ArrowRight aria-hidden="true" className="size-5 text-blue-600 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/industries"
              className="group flex min-h-44 items-end justify-between rounded-xl border border-navy-700 bg-navy-800 p-7 text-white transition-colors hover:bg-navy-700"
            >
              <span>
              <Buildings aria-hidden="true" className="size-6 text-blue-300" />
                <span className="mt-5 block font-display text-h3 font-semibold">Industries we serve</span>
              </span>
              <ArrowRight aria-hidden="true" className="size-5 text-blue-300 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </SectionBand>

      <CTABand
        title="Not sure which service you need?"
        body="Tell us the problem. We'll assess it and point you to the right solution — even if it's a simple one."
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />
    </main>
  );
}
