import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  ClipboardText,
  FirstAidKit,
  MagnifyingGlass,
  ShieldCheck,
} from "@phosphor-icons/react/dist/ssr";

import { AboutFamilyNav } from "@/components/about-family-nav";
import { CTABand } from "@/components/cta-band";
import { Hero } from "@/components/hero";
import { Reveal } from "@/components/reveal";
import { SafetyAuthorityWall } from "@/components/safety-authority-wall";
import { SectionBand, SectionHeader } from "@/components/section-band";
import {
  arcFlash,
  drugFreeWorkplace,
  safetyCta,
  safetyHero,
  safetyInPractice,
  safetyMeta,
  safetyProgram,
  safetyRecord,
} from "@/content/about-safety";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = safetyMeta;

const practiceIcons = [ClipboardText, MagnifyingGlass, FirstAidKit] as const;

export default function SafetyPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Safety", href: "/about/safety" },
  ]);
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: safetyMeta.title,
    description: safetyMeta.description,
    url: "https://datapowersource.com/about/safety",
    isPartOf: {
      "@type": "AboutPage",
      name: "About Data Power Source",
      url: "https://datapowersource.com/about",
    },
  };

  return (
    <main id="main-content">
      <Hero
        overline={safetyHero.overline}
        title={safetyHero.title}
        lead={safetyHero.lead}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Safety" },
        ]}
        imageSrc={safetyHero.imageSrc}
        imageAlt={safetyHero.imageAlt}
        actions
        compact
      />
      <AboutFamilyNav current="safety" />

      <SectionBand data-testid="safety-program">
        <div className="mx-auto grid max-w-container gap-12 px-5 sm:px-6 lg:grid-cols-12 lg:items-start">
          <Reveal className="lg:col-span-5">
            <SectionHeader title={safetyProgram.title} />
            <div className="mt-7 space-y-5 text-lead leading-relaxed text-neutral-600">
              {safetyProgram.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <div className="grid gap-4 lg:col-span-7 lg:grid-cols-7">
            {safetyProgram.practices.map((practice, index) => {
              const Icon = practiceIcons[index];
              const featured = index === 0;

              return (
                <Reveal
                  key={practice.title}
                  className={featured ? "lg:col-span-3 lg:row-span-2" : "lg:col-span-4"}
                  delay={index * 40}
                >
                  <article
                    className={`h-full rounded-xl border p-6 ${
                      featured
                        ? "border-navy-700 bg-navy-800 text-white shadow-md"
                        : "border-neutral-200 bg-neutral-50 text-navy-800 shadow-sm"
                    }`}
                  >
                    <span
                      className={`grid size-12 place-items-center rounded-lg border ${
                        featured
                          ? "border-blue-300/40 bg-blue-400/10 text-blue-200"
                          : "border-brand-100 bg-white text-brand-600"
                      }`}
                    >
                      <Icon aria-hidden="true" className="size-6" weight="regular" />
                    </span>
                    <h3
                      className={`mt-6 font-display text-xl font-semibold ${
                        featured ? "text-white" : "text-navy-800"
                      }`}
                    >
                      {practice.title}
                    </h3>
                    <p
                      className={`mt-3 text-base leading-relaxed ${
                        featured ? "text-navy-200" : "text-neutral-600"
                      }`}
                    >
                      {practice.body}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="lg:col-span-12" delay={80}>
            <article className="grid gap-8 rounded-xl border border-brand-200 bg-brand-50 p-7 md:grid-cols-[72px_1fr] md:items-start md:p-8">
              <span className="grid size-[72px] place-items-center rounded-lg border border-brand-200 bg-white text-brand-600">
                <ShieldCheck aria-hidden="true" className="size-9" weight="regular" />
              </span>
              <div>
                <h2 className="font-display text-h2 font-semibold tracking-[-0.03em] text-navy-800">
                  {arcFlash.title}
                </h2>
                <p className="mt-4 max-w-4xl text-lead leading-relaxed text-neutral-600">
                  {arcFlash.body}
                </p>
                <div className="mt-6 grid gap-3 md:grid-cols-3">
                  {arcFlash.facts.map((fact) => (
                    <p
                      key={fact}
                      className="border-l-2 border-brand-600 pl-4 text-small font-semibold text-navy-700"
                    >
                      {fact}
                    </p>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </SectionBand>

      <SectionBand theme="navy" data-testid="safety-authority">
        <div className="mx-auto max-w-container px-5 sm:px-6">
          <SectionHeader
            title={safetyRecord.title}
            body={safetyRecord.body}
            inverse
          />
          <SafetyAuthorityWall
            credentials={safetyRecord.credentials}
            emr={safetyRecord.emr}
            controls={safetyRecord.controls}
          />
        </div>
      </SectionBand>

      <SectionBand theme="soft">
        <div className="mx-auto grid max-w-container gap-12 px-5 sm:px-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SectionHeader title={safetyInPractice.title} />
            <div className="mt-10 grid gap-7 md:grid-cols-3">
              {safetyInPractice.items.map((item, index) => (
                <Reveal key={item.title} delay={index * 40}>
                  <article className="border-l-2 border-brand-600 pl-5">
                    <p className="font-display text-3xl font-bold text-brand-100">
                      0{index + 1}
                    </p>
                    <h3 className="mt-3 font-display text-xl font-semibold text-navy-800">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-neutral-600">
                      {item.body}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal className="lg:col-span-4" delay={60}>
            <aside className="flex h-full flex-col rounded-xl border border-neutral-200 bg-white p-7 shadow-sm">
              <ShieldCheck
                aria-hidden="true"
                className="size-8 text-brand-600"
                weight="regular"
              />
              <h2 className="mt-6 font-display text-2xl font-semibold text-navy-800">
                {drugFreeWorkplace.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                {drugFreeWorkplace.body}
              </p>
              <Link
                href="/about/values"
                className="mt-auto flex items-center gap-2 pt-8 font-semibold text-brand-600 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
              >
                Read our values
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </Link>
            </aside>
          </Reveal>
        </div>
      </SectionBand>

      <CTABand
        eyebrow={safetyCta.eyebrow}
        title={safetyCta.title}
        body={safetyCta.body}
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
