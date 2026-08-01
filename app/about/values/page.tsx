import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ChatCircleText,
  CheckCircle,
  Medal,
  ShieldCheck,
} from "@phosphor-icons/react/dist/ssr";

import { AboutFamilyNav } from "@/components/about-family-nav";
import { CTABand } from "@/components/cta-band";
import { Hero } from "@/components/hero";
import { Reveal } from "@/components/reveal";
import { SectionBand, SectionHeader } from "@/components/section-band";
import {
  communication,
  integrityStory,
  valuesCta,
  valuesHero,
  valuesMeta,
  valuesStandards,
} from "@/content/about-values";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = valuesMeta;

const standardIcons = [ShieldCheck, CheckCircle, Medal, ChatCircleText] as const;

export default function ValuesPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Values & integrity", href: "/about/values" },
  ]);
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: valuesMeta.title,
    description: valuesMeta.description,
    url: "https://datapowersource.com/about/values",
    isPartOf: {
      "@type": "AboutPage",
      name: "About Data Power Source",
      url: "https://datapowersource.com/about",
    },
  };

  return (
    <main id="main-content">
      <Hero
        overline={valuesHero.overline}
        title={valuesHero.title}
        lead={valuesHero.lead}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Values & integrity" },
        ]}
        imageSrc={valuesHero.imageSrc}
        imageAlt={valuesHero.imageAlt}
        actions
        compact
      />
      <AboutFamilyNav current="values" />

      <SectionBand theme="soft" data-testid="values-standards">
        <div className="mx-auto max-w-container px-5 sm:px-6">
          <SectionHeader title={valuesStandards.title} body={valuesStandards.body} />
          <div className="mt-10 grid gap-5 lg:grid-cols-12">
            {valuesStandards.items.map((standard, index) => {
              const Icon = standardIcons[index];
              const featured = index === 0 || index === 3;
              const span =
                index === 0
                  ? "lg:col-span-7"
                  : index === 1
                    ? "lg:col-span-5"
                    : index === 2
                      ? "lg:col-span-5"
                      : "lg:col-span-7";

              return (
                <Reveal key={standard.title} className={span} delay={index * 35}>
                  <article
                    className={`relative h-full min-h-[270px] overflow-hidden rounded-xl border p-7 transition-[transform,border-color] duration-200 hover:-translate-y-1 motion-reduce:transform-none motion-reduce:transition-none sm:p-8 ${
                      featured
                        ? "border-navy-700 bg-navy-800 text-white shadow-md hover:border-blue-300"
                        : "border-neutral-200 bg-white text-navy-800 shadow-sm hover:border-brand-300"
                    }`}
                  >
                    <p
                      aria-hidden="true"
                      className={`absolute -bottom-5 right-4 font-display text-[6rem] font-bold leading-none tracking-[-0.08em] ${
                        featured ? "text-white/5" : "text-navy-800/[0.04]"
                      }`}
                    >
                      0{index + 1}
                    </p>
                    <span
                      className={`grid size-14 place-items-center rounded-lg border ${
                        featured
                          ? "border-blue-300/40 bg-blue-400/10 text-blue-200"
                          : "border-brand-100 bg-brand-50 text-brand-600"
                      }`}
                    >
                      <Icon aria-hidden="true" className="size-7" weight="regular" />
                    </span>
                    <h2
                      className={`mt-8 font-display text-[1.75rem] font-semibold tracking-[-0.025em] ${
                        featured ? "text-white" : "text-navy-800"
                      }`}
                    >
                      {standard.title}
                    </h2>
                    <p
                      className={`relative z-10 mt-4 max-w-2xl text-base leading-relaxed ${
                        featured ? "text-navy-200" : "text-neutral-600"
                      }`}
                    >
                      {standard.body}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </SectionBand>

      <SectionBand>
        <div className="mx-auto grid max-w-container gap-12 px-5 sm:px-6 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-neutral-200 bg-navy-900 shadow-sm">
              <Image
                src={integrityStory.imageSrc}
                alt={integrityStory.imageAlt}
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover saturate-[0.72]"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-navy-900/20" />
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7 lg:pl-5" delay={50}>
            <SectionHeader title={integrityStory.title} />
            <div className="mt-7 max-w-[700px] space-y-5 text-lead leading-relaxed text-neutral-600">
              {integrityStory.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <blockquote className="mt-8 border-l-2 border-brand-600 bg-brand-50 px-6 py-5 font-display text-xl font-semibold leading-relaxed text-navy-800">
              Answers and options, not excuses.
            </blockquote>
          </Reveal>
        </div>
      </SectionBand>

      <SectionBand theme="navy" data-testid="integrity-practices">
        <div className="mx-auto max-w-container px-5 sm:px-6">
          <SectionHeader title={communication.title} body={communication.body} inverse />
          <div className="mt-10 grid gap-y-8 md:grid-cols-3">
            {communication.practices.map((practice, index) => (
              <Reveal key={practice.title} delay={index * 40}>
                <article className="h-full border-l border-navy-600 px-5 first:pl-0 first:border-l-0 md:first:border-l md:first:pl-5">
                  <CheckCircle
                    aria-hidden="true"
                    className="size-7 text-blue-300"
                    weight="regular"
                  />
                  <h3 className="mt-5 font-display text-xl font-semibold text-white">
                    {practice.title}
                  </h3>
                  <p className="mt-3 max-w-sm text-base leading-relaxed text-navy-200">
                    {practice.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
          <Link
            href="/about/safety"
            className="mt-10 inline-flex items-center gap-2 font-semibold text-blue-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900"
          >
            Review our safety program
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </SectionBand>

      <CTABand
        eyebrow={valuesCta.eyebrow}
        title={valuesCta.title}
        body={valuesCta.body}
      />

      {[breadcrumbs, webPage].map((schema, index) => (
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
