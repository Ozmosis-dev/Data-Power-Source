import type { Metadata } from "next";
import { ArrowDown, ArrowRight, CheckCircle, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { Breadcrumb } from "@/components/breadcrumb";
import { CTABand } from "@/components/cta-band";
import { HeroPulseRail } from "@/components/hero-pulse-rail";
import { ProjectGalleryCard } from "@/components/project-gallery-card";
import { ProjectMarketRail } from "@/components/project-market-rail";
import {
  ProjectServiceIndicators,
  projectServiceDisciplines,
} from "@/components/project-service-indicators";
import { Reveal } from "@/components/reveal";
import { SectionBand, SectionHeader } from "@/components/section-band";
import { projects } from "@/content/projects";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Commercial Electrical Projects & Case Studies | Data Power Source",
  description:
    "Explore nine Data Power Source electrical and mission-critical infrastructure projects across education, government, healthcare, broadcast, telecom, and data centers.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Commercial Electrical Projects & Case Studies | Data Power Source",
    description:
      "Field-proven electrical, standby power, UPS, cooling, and design-build projects across Georgia and the Southeast.",
    url: "/projects",
    images: [projects[0].images[0].src],
  },
};

const schema = breadcrumbSchema([
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
]);

export default function ProjectsPage() {
  const [featured, ...portfolio] = projects;

  return (
    <main id="main-content" data-testid="projects-page">
      <section
        data-testid="page-hero"
        className="technical-grid relative overflow-hidden border-b border-navy-700 bg-navy-900 text-white"
      >
        <div aria-hidden="true" className="absolute inset-y-0 left-[8%] w-px bg-white/[0.06]" />
        <div aria-hidden="true" className="absolute bottom-0 right-0 h-px w-[38%] bg-blue-400/60" />
        <div className="relative mx-auto max-w-container px-5 pb-12 pt-8 sm:px-6 md:pb-14 md:pt-10 lg:pb-16">
          <Breadcrumb inverse items={[{ label: "Home", href: "/" }, { label: "Projects" }]} />

          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-blue-200">
                Project portfolio
              </p>
              <h1 className="mt-5 max-w-[900px] font-display text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.05em] text-white sm:text-[3.7rem] lg:text-[4.5rem]">
                Power installed. Operations protected.
              </h1>
              <p className="mt-7 max-w-[720px] text-base leading-relaxed text-navy-100 sm:text-lg">
                Nine field-proven case studies spanning utility service, switchgear, UPS, standby generation, cooling, and live-facility cutovers.
              </p>
            </div>

            <div className="lg:col-span-4 lg:pl-8">
              <div className="border-l border-white/20 pl-6">
                <span className="font-display text-[4.5rem] font-semibold leading-none tracking-[-0.06em] text-white">
                  09
                </span>
                <p className="mt-2 font-mono text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-blue-200">
                  Documented projects
                </p>
                <Link
                  href="#project-gallery"
                  className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-blue-200"
                >
                  View projects <ArrowDown aria-hidden="true" className="size-4" />
                </Link>
              </div>
            </div>
          </div>

          <ProjectMarketRail />
        </div>
        <HeroPulseRail />
      </section>

      <SectionBand id="project-gallery">
        <div className="mx-auto max-w-container px-5 sm:px-6">
          <div className="mb-7 flex flex-col gap-3 border-b border-neutral-200 pb-5 md:flex-row md:items-center md:justify-between">
            <p className="text-sm font-semibold text-navy-800">Service work shown</p>
            <ProjectServiceIndicators labelled disciplines={projectServiceDisciplines} />
          </div>

          <div data-testid="project-featured">
            <Reveal>
              <ProjectGalleryCard project={featured} featured />
            </Reveal>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-12">
            {portfolio.map((project, index) => {
              const position = index % 4;
              const wide = position === 0 || position === 3;
              return (
                <Reveal
                  key={project.slug}
                  className={wide ? "h-full lg:col-span-7" : "h-full lg:col-span-5"}
                  delay={(index % 2) * 40}
                >
                  <ProjectGalleryCard
                    project={project}
                    className="lg:min-h-[500px]"
                  />
                </Reveal>
              );
            })}
          </div>
        </div>
      </SectionBand>

      <SectionBand theme="soft">
        <div className="mx-auto grid max-w-container gap-10 px-5 sm:px-6 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <SectionHeader
              overline="The common thread"
              title="Complex work, planned around uptime."
              body="The equipment changes from project to project. The operating constraint does not: keep the facility working while the infrastructure is transformed."
            />
          </div>
          <div className="lg:col-span-5 lg:pl-10">
            <div className="border-y border-neutral-200 bg-white">
              {[
                { icon: ShieldCheck, text: "Live-facility sequencing and controlled cutovers" },
                { icon: CheckCircle, text: "Electrical and mechanical systems coordinated together" },
                { icon: ArrowRight, text: "A clear route from existing conditions to final operation" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex gap-4 border-b border-neutral-200 px-5 py-5 last:border-b-0">
                  <Icon aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-blue-600" />
                  <p className="text-sm font-semibold leading-relaxed text-navy-800">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionBand>

      <CTABand
        eyebrow="Your project starts here"
        title="Planning work that cannot interrupt operations?"
        body="Tell us what has to change and what has to stay online. We will help build the path between them."
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />
    </main>
  );
}
