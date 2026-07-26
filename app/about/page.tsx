import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle,
  CompassTool,
  Quotes,
  ShieldCheck,
  ShieldStar,
} from "@phosphor-icons/react/dist/ssr";

import { AboutFamilyNav } from "@/components/about-family-nav";
import { Hero } from "@/components/hero";
import { ProofBand } from "@/components/proof-band";
import { Reveal } from "@/components/reveal";
import { SectionBand, SectionHeader } from "@/components/section-band";
import {
  aboutFounder,
  aboutHero,
  aboutIntro,
  aboutMeta,
  aboutPathways,
  aboutProof,
  aboutQualification,
  aboutStats,
} from "@/content/about";
import { site } from "@/content/site";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = aboutMeta;

export default function AboutPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
  ]);
  const aboutPage = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Data Power Source",
    description: aboutMeta.description,
    url: "https://datapowersource.com/about",
    mainEntity: {
      "@type": "Electrician",
      name: site.name,
      foundingDate: "2001",
      founder: {
        "@type": "Person",
        name: aboutFounder.name,
        jobTitle: aboutFounder.role,
      },
      telephone: "+1-770-498-9622",
      address: {
        "@type": "PostalAddress",
        streetAddress: site.street,
        addressLocality: "Covington",
        addressRegion: "GA",
        postalCode: "30014",
        addressCountry: "US",
      },
    },
  };

  return (
    <main id="main-content">
      <Hero
        overline={aboutHero.overline}
        title={aboutHero.title}
        lead={aboutHero.lead}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        imageSrc={aboutHero.imageSrc}
        imageAlt={aboutHero.imageAlt}
        actions
        compact
      />
      <AboutFamilyNav current="overview" />

      <SectionBand data-testid="about-intro">
        <div className="mx-auto max-w-container px-5 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <Reveal className="lg:col-span-7">
              <div data-testid="about-intro-copy">
                <SectionHeader title={aboutIntro.title} />
                <div className="mt-7 max-w-[700px] space-y-5 text-lead leading-relaxed text-neutral-600">
                  {aboutIntro.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </Reveal>

            <div className="lg:col-span-5 lg:flex lg:h-full lg:items-center">
              <div data-testid="about-intro-commitments" className="w-full">
                {aboutIntro.commitments.map((commitment, index) => (
                  <Reveal key={commitment.title} delay={index * 35}>
                    <article className="grid grid-cols-[28px_1fr] gap-4 border-b border-neutral-100 py-5 first:pt-0 last:border-b-0">
                      <CheckCircle
                        aria-hidden="true"
                        className="mt-0.5 size-6 text-brand-600"
                        weight="regular"
                      />
                      <div>
                        <h3 className="font-display text-lg font-semibold text-navy-800">
                          {commitment.title}
                        </h3>
                        <p className="mt-2 text-base leading-relaxed text-neutral-600">
                          {commitment.body}
                        </p>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionBand>

      <SectionBand theme="soft" data-testid="about-founder">
        <div className="mx-auto grid max-w-container gap-12 px-5 sm:px-6 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-5">
            <figure className="mx-auto max-w-[480px] lg:mx-0">
              <div className="relative mb-10">
                <div
                  data-testid="founder-portrait"
                  className="relative aspect-[4/5] overflow-hidden rounded-xl border border-navy-200 bg-navy-900"
                >
                  <Image
                    src={aboutFounder.imageSrc}
                    alt={aboutFounder.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div
                  data-testid="founder-authority-badge"
                  className="absolute -bottom-7 -left-2 grid min-h-28 w-44 grid-cols-[42px_1fr] items-center gap-3 rounded-lg border border-blue-200 bg-white p-4 shadow-lg sm:-left-5"
                >
                  <span className="grid size-10 place-items-center rounded-md bg-brand-50 text-brand-600">
                    <ShieldStar aria-hidden="true" className="size-6" weight="fill" />
                  </span>
                  <span>
                    <span className="block font-display text-xl font-bold leading-none text-navy-800">
                      50+
                    </span>
                    <span className="mt-1.5 block font-mono text-[0.58rem] font-semibold uppercase leading-snug tracking-[0.1em] text-neutral-600">
                      Years in the trade
                    </span>
                  </span>
                </div>
              </div>
              <figcaption className="border-l-2 border-brand-600 px-4 py-3">
                <p className="font-display text-lg font-semibold text-navy-800">
                  {aboutFounder.name}
                </p>
                <p className="mt-1 text-small text-neutral-600">{aboutFounder.role}</p>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal className="lg:col-span-7 lg:pl-5" delay={50}>
            <h2 className="font-display text-h2 font-semibold tracking-[-0.035em] text-navy-800 md:text-[2.75rem]">
              {aboutFounder.title}
            </h2>
            <div className="mt-7 max-w-[700px] space-y-5 text-lead leading-relaxed text-neutral-600">
              {aboutFounder.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <blockquote className="mt-8 rounded-xl border border-navy-200 bg-white p-6 sm:p-7">
              <Quotes aria-hidden="true" className="size-7 text-brand-600" weight="fill" />
              <p className="mt-4 max-w-2xl font-display text-xl font-semibold leading-relaxed text-navy-800 sm:text-2xl">
                “{aboutFounder.quote}”
              </p>
            </blockquote>

            <div className="mt-8 grid gap-x-7 gap-y-3 sm:grid-cols-2">
              {aboutFounder.milestones.map((milestone) => (
                <div key={milestone} className="flex items-start gap-3 text-base text-navy-700">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 bg-brand-600" />
                  <span>{milestone}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </SectionBand>

      <SectionBand theme="soft" data-testid="about-pathways">
        <div className="mx-auto max-w-container px-5 sm:px-6">
          <SectionHeader title={aboutPathways.title} body={aboutPathways.body} />
          <div className="mt-10 grid gap-5 lg:grid-cols-12">
            {aboutPathways.items.map((pathway, index) => {
              const Icon = index === 0 ? ShieldCheck : CompassTool;
              const inverse = pathway.theme === "navy";

              return (
                <Reveal
                  key={pathway.href}
                  className={index === 0 ? "lg:col-span-7" : "lg:col-span-5"}
                  delay={index * 45}
                >
                  <Link
                    href={pathway.href}
                    aria-label={pathway.cta}
                    className={`group relative flex h-full min-h-[330px] flex-col overflow-hidden rounded-xl border p-7 transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none sm:p-8 ${
                      inverse
                        ? "border-navy-700 bg-navy-800 text-white shadow-md hover:border-blue-300"
                        : "border-neutral-200 bg-white text-navy-800 shadow-sm hover:border-brand-300 hover:shadow-md"
                    }`}
                  >
                    <span
                      className={`grid size-14 place-items-center rounded-lg border ${
                        inverse
                          ? "border-blue-300/40 bg-blue-400/10 text-blue-200"
                          : "border-brand-100 bg-brand-50 text-brand-600"
                      }`}
                    >
                      <Icon aria-hidden="true" className="size-7" weight="regular" />
                    </span>
                    <p
                      className={`mt-8 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.13em] ${
                        inverse ? "text-blue-200" : "text-brand-600"
                      }`}
                    >
                      {pathway.overline}
                    </p>
                    <h3
                      className={`mt-3 font-display text-[1.75rem] font-semibold tracking-[-0.025em] ${
                        inverse ? "text-white" : "text-navy-800"
                      }`}
                    >
                      {pathway.title}
                    </h3>
                    <p
                      className={`mt-4 max-w-2xl text-base leading-relaxed ${
                        inverse ? "text-navy-200" : "text-neutral-600"
                      }`}
                    >
                      {pathway.body}
                    </p>
                    <span
                      className={`mt-auto flex items-center gap-2 pt-8 font-semibold ${
                        inverse ? "text-blue-200" : "text-brand-600"
                      }`}
                    >
                      {pathway.cta}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
                      />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </SectionBand>

      <ProofBand
        overline={aboutProof.overline}
        title={aboutProof.title}
        body={aboutProof.body}
        items={aboutStats}
        metricsTestId="about-stats"
        showHeader={false}
      />

      <SectionBand
        theme="navy"
        className="border-t border-navy-600 bg-navy-800"
        data-testid="about-qualification"
      >
        <div className="mx-auto grid max-w-container gap-12 px-5 sm:px-6 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-blue-200">
              {aboutQualification.overline}
            </p>
            <div className="mt-4 flex items-start gap-4">
              <CheckCircle
                data-testid="qualification-check"
                aria-hidden="true"
                className="mt-1 size-8 shrink-0 text-spark-400"
                weight="fill"
              />
              <h2 className="max-w-xl font-display text-[2rem] font-semibold leading-[1.15] tracking-[-0.035em] text-white md:text-[2.75rem]">
                {aboutQualification.title}
              </h2>
            </div>
            <p className="mt-5 max-w-2xl text-lead text-navy-200">
              {aboutQualification.body}
            </p>
          </div>

          <Reveal className="lg:col-span-6" delay={50}>
            <div className="rounded-xl border border-navy-600 bg-navy-950/95 p-6 sm:p-8">
              <div className="grid gap-7 sm:grid-cols-[180px_1fr] sm:items-center">
                <Image
                  src="/brand/iec-atlanta-georgia.png"
                  alt={aboutQualification.iecAlt}
                  width={400}
                  height={203}
                  className="h-auto w-full max-w-[190px]"
                />
                <div className="border-l-2 border-blue-400 pl-5">
                  <ShieldCheck
                    aria-hidden="true"
                    className="size-6 text-blue-300"
                    weight="regular"
                  />
                  <p className="mt-3 font-display text-lg font-semibold text-white">
                    Independent Electrical Contractors member
                  </p>
                  <p className="mt-2 text-small leading-relaxed text-navy-300">
                    Serving Atlanta and Georgia.
                  </p>
                </div>
              </div>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {["License and insurance details", "Manufacturer credentials"].map(
                  (label) => (
                    <div
                      key={label}
                      className="flex items-center justify-between border border-navy-700 px-4 py-3 text-small text-navy-200"
                    >
                      <span>{label}</span>
                      <span className="font-mono text-[0.55rem] uppercase tracking-[0.1em] text-blue-300">
                        Client confirmation
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </SectionBand>

      {[breadcrumbs, aboutPage].map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </main>
  );
}
