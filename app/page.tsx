import type { Metadata } from "next";
import {
  ArrowRight,
  ArrowUpRight,
  Broadcast,
  Buildings,
  Database,
  Factory,
  FileText,
  GraduationCap,
  Heartbeat,
  SealCheck,
  ShieldCheck,
  ShieldChevron,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

import { CTABand } from "@/components/cta-band";
import { DisciplineStrip } from "@/components/discipline-strip";
import { Hero } from "@/components/hero";
import { ProjectCard } from "@/components/project-card";
import { ProofBand } from "@/components/proof-band";
import { Reveal } from "@/components/reveal";
import { RotatingTypeBanner } from "@/components/rotating-type-banner";
import { SectionBand, SectionHeader } from "@/components/section-band";
import { ServiceCard } from "@/components/service-card";
import { Button } from "@/components/ui/button";
import {
  homeHero,
  homeCompany,
  homeIndustries,
  homeMeta,
  homeProjects,
  homeReasons,
  homeServices,
  homeStats,
} from "@/content/home";

export const metadata: Metadata = homeMeta;

const industryIcons = [Database, Heartbeat, ShieldChevron, GraduationCap, Broadcast, Factory];

const organizations = [
  {
    name: "Georgia Tech",
    src: "/brand/clients/georgia-tech.svg",
    width: 157,
    height: 69,
  },
  {
    name: "U.S. Army",
    src: "/brand/clients/us-army.svg",
    width: 539,
    height: 720,
  },
  {
    name: "Clayton County Public Schools",
    src: "/brand/clients/clayton-county-public-schools.png",
    width: 1080,
    height: 280,
  },
  {
    name: "EarthLink",
    src: "/brand/clients/earthlink.svg",
    width: 460,
    height: 113,
  },
  {
    name: "PruittHealth",
    src: "/brand/clients/pruitthealth.png",
    width: 1280,
    height: 356,
  },
  {
    name: "City of Atlanta",
    src: "/brand/clients/city-of-atlanta.png",
    width: 250,
    height: 255,
  },
] as const;

export default function HomePage() {
  return (
    <main id="main-content">
      <Hero
        overline={homeHero.overline}
        title={homeHero.title}
        lead={homeHero.lead}
        imageAlt={homeHero.imageAlt}
        imageSrc={homeHero.imageSrc}
        trust={homeHero.trust}
        actions
      />

      <DisciplineStrip />

      <SectionBand data-testid="company-preview">
        <div className="mx-auto grid max-w-container gap-10 px-5 sm:px-6 lg:grid-cols-12 lg:items-stretch lg:gap-12">
          <Reveal className="lg:col-span-7">
            <div className="flex h-full flex-col justify-center py-2 lg:pr-10">
              <SectionHeader
                overline={homeCompany.overline}
                title={homeCompany.title}
                className="max-w-[780px]"
              />
              <div className="mt-7 max-w-[680px] space-y-4 text-lead leading-relaxed text-neutral-600">
                {homeCompany.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-9">
                <Button asChild>
                  <Link href={homeCompany.href}>
                    {homeCompany.linkLabel}
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={60}>
            <figure className="relative h-full min-h-[404px] pb-6 pl-3 sm:pl-5">
              <div
                data-testid="company-image-frame"
                className="relative h-full min-h-[380px] overflow-hidden rounded-xl border border-navy-200 bg-navy-900 shadow-[0_26px_70px_-45px_rgba(5,33,70,0.75)]"
              >
                <Image
                  data-testid="company-leadership-image"
                  src="/images/generated/dps-leadership-team.webp"
                  alt="Representative leadership team at a commercial electrical facility."
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover object-[62%_center]"
                />
              </div>
              <aside
                data-testid="company-iec-badge"
                aria-label={homeCompany.credentialLabel}
                className="absolute bottom-0 left-0 w-[180px] rounded-lg border border-white/15 bg-navy-950/95 p-3 shadow-[0_18px_42px_-20px_rgba(2,14,31,0.95)] sm:w-[200px]"
              >
                <Image
                  src="/brand/iec-atlanta-georgia.png"
                  alt="Independent Electrical Contractors, Atlanta and Georgia."
                  width={400}
                  height={203}
                  className="h-auto w-full object-contain"
                />
                <span className="sr-only">{homeCompany.credentialBody}</span>
              </aside>
            </figure>
          </Reveal>
        </div>
      </SectionBand>

      <RotatingTypeBanner phrases={homeCompany.rotatingPhrases} />

      <SectionBand theme="soft">
        <div className="mx-auto max-w-container px-5 sm:px-6">
          <SectionHeader overline={homeServices.overline} title={homeServices.title} />
          <div
            data-testid="service-bento"
            className="mt-12 grid gap-5 lg:grid-cols-12"
          >
            {homeServices.items.map((service, index) => (
              <Reveal
                key={service.href}
                className={
                  index === 0
                    ? "h-full lg:col-span-7"
                    : index === 1
                      ? "h-full lg:col-span-5"
                      : index === 2
                        ? "h-full lg:col-span-5"
                        : "h-full lg:col-span-7"
                }
                delay={(index % 2) * 50}
              >
                <ServiceCard
                  {...service}
                  className="h-full min-h-[390px]"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </SectionBand>

      <ProofBand
        overline="Proof, not promises"
        title={homeStats.title}
        body={homeStats.body}
        items={homeStats.items}
      />

      <SectionBand>
        <div className="mx-auto max-w-container px-5 sm:px-6">
          <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
            <SectionHeader overline={homeProjects.overline} title={homeProjects.title} />
            <Button asChild variant="outline">
              <Link href="/projects">
                View all projects <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {homeProjects.items.map((project, index) => (
              <Reveal key={project.title} delay={index * 40}>
                <ProjectCard {...project} />
              </Reveal>
            ))}
          </div>
        </div>
      </SectionBand>

      <SectionBand theme="soft" compact>
        <div className="mx-auto max-w-container px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <SectionHeader
              overline={homeIndustries.overline}
              title={homeIndustries.title}
              className="lg:col-span-7"
            />
            <div className="lg:col-span-5 lg:text-right">
              <Link href="/industries" className="inline-flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-700">
                See how we serve your industry <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </div>
          <div className="mt-10 grid overflow-hidden rounded-xl border-l border-t border-neutral-200 sm:grid-cols-2 lg:grid-cols-3">
            {homeIndustries.items.map((industry, index) => {
              const Icon = industryIcons[index];
              return (
                <Link
                  key={industry}
                  href="/industries"
                  data-testid="industry-card"
                  className="group relative isolate flex min-h-44 flex-col justify-between overflow-hidden border-b border-r border-neutral-200 bg-white p-6 transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-brand-700 active:bg-brand-800 focus-visible:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500"
                >
                  <div className="relative z-[1] flex items-start justify-between gap-5">
                    <span
                      data-testid="industry-icon"
                      className="grid size-12 place-items-center rounded-lg border border-neutral-200 bg-neutral-50 text-brand-700 transition-colors duration-300 group-hover:border-white/25 group-hover:bg-white/10 group-hover:text-white group-focus-visible:text-white"
                    >
                      <Icon aria-hidden="true" size={24} weight="regular" />
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 text-neutral-400 transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white group-focus-visible:text-white motion-reduce:transform-none"
                    />
                  </div>
                  <span className="relative z-[1] mt-8 max-w-[13rem] font-display text-[1.14rem] font-semibold leading-snug text-navy-800 transition-colors group-hover:text-white group-focus-visible:text-white">
                    {industry}
                  </span>
                  <span
                    data-testid="industry-number"
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-7 right-4 font-display text-[5rem] font-bold leading-none tracking-[-0.07em] text-brand-700/[0.07] transition-colors duration-300 group-hover:text-white/[0.12] group-focus-visible:text-white/[0.12]"
                  >
                    0{index + 1}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </SectionBand>

      <SectionBand>
        <div className="mx-auto max-w-container px-5 sm:px-6">
          <div
            data-testid="why-dps-header"
            className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between"
          >
            <SectionHeader overline={homeReasons.overline} title={homeReasons.title} />
            <Button asChild variant="outline">
              <Link href="/about">
                Learn more about us <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-12">
            <Reveal className="lg:col-span-6 lg:row-span-2">
              <article className="relative flex h-full min-h-[430px] flex-col overflow-hidden rounded-xl border border-navy-600 bg-navy-800 p-7 text-white md:p-9">
                <Image
                  src="/images/generated/owner-led-team-placeholder.webp"
                  alt="Representative field-planning image for owner-led expertise."
                  fill
                  sizes="(max-width: 1023px) 100vw, 50vw"
                  className="object-cover object-center opacity-45 saturate-[0.58]"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-navy-800/70" />
                <div aria-hidden="true" className="technical-grid-subtle absolute inset-0 opacity-30" />
                <div className="relative z-[1] flex items-center justify-between">
                  <SealCheck aria-hidden="true" className="size-7 text-blue-200" />
                  <span className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-blue-200">
                    Why / 01
                  </span>
                </div>
                <h3 className="relative z-[1] mt-auto max-w-lg font-display text-[2rem] font-semibold tracking-[-0.02em] text-white">
                  {homeReasons.items[0].title}
                </h3>
                <p className="relative z-[1] mt-4 max-w-lg text-lead text-navy-100">
                  {homeReasons.items[0].body}
                </p>
              </article>
            </Reveal>
            {homeReasons.items.slice(1).map((reason, index) => {
              const icons = [FileText, ShieldCheck, Buildings];
              const Icon = icons[index];
              return (
                <Reveal key={reason.title} className={index === 2 ? "lg:col-span-6" : "lg:col-span-3"} delay={index * 40}>
                  <article className="h-full min-h-[205px] rounded-xl border border-neutral-200 border-l-2 border-l-brand-600 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <Icon aria-hidden="true" className="size-5 text-brand-600" />
                      <span className="font-mono text-[0.65rem] font-semibold text-neutral-400">0{index + 2}</span>
                    </div>
                    <h3 className="mt-8 font-display text-h3 font-semibold text-navy-800">{reason.title}</h3>
                    <p className="mt-3 text-base text-neutral-600">{reason.body}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </SectionBand>

      <SectionBand theme="soft">
        <div className="mx-auto max-w-container px-5 sm:px-6">
          <SectionHeader
            overline="Social proof"
            title="Trusted by facilities across Georgia and the Southeast."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-12">
            <div className="grid gap-px overflow-hidden rounded-xl border border-neutral-200 bg-neutral-200 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">
              {organizations.map((organization) => (
                <div
                  key={organization.name}
                  data-status="pending-client-approval"
                  className="grid min-h-32 place-items-center bg-white p-6"
                >
                  <Image
                    data-testid="organization-logo"
                    src={organization.src}
                    alt={`${organization.name} logo`}
                    width={organization.width}
                    height={organization.height}
                    unoptimized
                    className="max-h-14 w-auto max-w-[82%] object-contain grayscale opacity-55 contrast-125 transition-opacity duration-300 hover:opacity-85"
                  />
                </div>
              ))}
            </div>
            <div
              data-testid="social-proof-card"
              className="flex min-h-[300px] flex-col justify-between rounded-xl border border-navy-700 bg-navy-800 p-7 text-white lg:col-span-4"
            >
              <span className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-blue-100">
                Testimonial
              </span>
              <blockquote className="font-display text-h3 font-semibold leading-snug text-white">
                “Verified client quote pending approval. This space is reserved for feedback on
                planning, workmanship, and keeping the facility online.”
              </blockquote>
              <p className="text-small text-blue-50/75">
                Client name and facility pending approval
              </p>
            </div>
          </div>
        </div>
      </SectionBand>

      <CTABand
        title="Power you can build on."
        body="Tell us what you need to power — we'll assess the site, scope the work, and give you a clear plan, price, and schedule."
      />
    </main>
  );
}
