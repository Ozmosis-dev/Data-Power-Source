import {
  ArrowLeft,
  ArrowRight,
  Buildings,
  CheckCircle,
  Clock,
  CurrencyDollar,
  MapPin,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

import { Breadcrumb } from "@/components/breadcrumb";
import { CTABand } from "@/components/cta-band";
import { Reveal } from "@/components/reveal";
import { SectionBand, SectionHeader } from "@/components/section-band";
import type { Project } from "@/content/projects";

function ProjectPhoto({
  image,
  className,
  sizes,
  priority = false,
}: {
  image: Project["images"][number];
  className: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <figure
      data-testid="project-photo"
      className={`relative overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 ${className}`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />
    </figure>
  );
}

function ProjectFact({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Buildings;
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0 border-t border-white/15 py-5 lg:border-l lg:border-t-0 lg:px-6 lg:first:border-l-0 lg:first:pl-0">
      <div className="flex items-center gap-2 text-blue-200">
        <Icon aria-hidden="true" className="size-4 shrink-0" />
        <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.14em]">
          {label}
        </span>
      </div>
      <p className="mt-2 text-sm font-semibold leading-snug text-white sm:text-base">{value}</p>
    </div>
  );
}

export function ProjectDetailPage({
  project,
  previous,
  next,
}: {
  project: Project;
  previous: Project;
  next: Project;
}) {
  const facts = [
    { icon: Buildings, label: "Client", value: project.client },
    { icon: MapPin, label: "Location", value: project.location },
    ...(project.value
      ? [{ icon: CurrencyDollar, label: "Project value", value: project.value }]
      : []),
    ...(project.duration
      ? [{ icon: Clock, label: "Duration", value: project.duration }]
      : []),
  ];

  return (
    <main id="main-content" data-testid="project-detail-page">
      <section className="technical-grid relative overflow-hidden bg-navy-900 text-white">
        <div aria-hidden="true" className="absolute inset-y-0 right-[10%] w-px bg-white/[0.07]" />
        <div className="relative mx-auto max-w-container px-5 pb-0 pt-8 sm:px-6 md:pt-10">
          <div className="flex flex-col gap-5 border-b border-white/15 pb-7 sm:flex-row sm:items-center sm:justify-between">
            <Breadcrumb
              inverse
              items={[
                { label: "Home", href: "/" },
                { label: "Projects", href: "/projects" },
                { label: project.shortTitle },
              ]}
            />
            <Link
              href="/projects"
              className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-blue-200"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              All projects
            </Link>
          </div>

          <div className="py-10 md:py-14 lg:py-16">
            <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-blue-200">
              {project.market} / Project profile
            </p>
            <h1 className="mt-5 max-w-[1120px] font-display text-[2.35rem] font-semibold leading-[1.05] tracking-[-0.045em] text-white sm:text-[3.1rem] lg:text-[4.5rem]">
              {project.title}
            </h1>
            <p className="mt-6 max-w-[780px] text-base leading-relaxed text-navy-100 sm:text-lg">
              {project.summary}
            </p>
          </div>

          <div className={facts.length === 4 ? "grid pb-7 lg:grid-cols-4" : "grid pb-7 lg:grid-cols-3"}>
            {facts.map((fact) => (
              <ProjectFact key={fact.label} {...fact} />
            ))}
          </div>

          <ProjectPhoto
            image={project.images[0]}
            priority
            sizes="(min-width: 1320px) 1320px, 100vw"
            className="h-[300px] rounded-b-none border-b-0 sm:h-[420px] lg:h-[560px]"
          />
        </div>
      </section>

      <SectionBand>
        <div className="mx-auto grid max-w-container gap-10 px-5 sm:px-6 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-brand-600">
              Project overview
            </p>
            <div className="mt-5 space-y-5 text-[1.08rem] leading-relaxed text-neutral-700 sm:text-lead">
              {project.overview.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={50}>
            <aside className="border-l-2 border-blue-500 bg-neutral-50 p-6 sm:p-8">
              <p className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-brand-600">
                The assignment
              </p>
              <p className="mt-4 font-display text-[1.35rem] font-semibold leading-snug tracking-[-0.02em] text-navy-800">
                {project.challenge}
              </p>
              <div className="mt-7 border-t border-neutral-200 pt-5">
                <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-neutral-500">
                  Services delivered
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.services.map((service) => (
                    <span
                      key={service}
                      className="border border-brand-100 bg-white px-3 py-1.5 text-xs font-semibold text-brand-700"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </Reveal>
        </div>
      </SectionBand>

      <SectionBand theme="soft" data-testid="project-scope">
        <div className="mx-auto max-w-container px-5 sm:px-6">
          <SectionHeader
            overline="Delivered systems"
            title="What the work included."
            body="The field scope, equipment, and coordination documented for this project."
          />
          <div className="mt-12 border-y border-neutral-200 bg-white">
            {project.scope.map((item, index) => (
              <Reveal key={item} delay={(index % 3) * 35}>
                <div className="grid gap-4 border-b border-neutral-200 px-5 py-6 last:border-b-0 sm:grid-cols-[64px_1fr] sm:items-start sm:px-7">
                  <span className="font-mono text-xs font-semibold tracking-[0.12em] text-blue-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="max-w-4xl text-base font-medium leading-relaxed text-navy-800 sm:text-[1.05rem]">
                    {item}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </SectionBand>

      <section className="bg-brand-700 py-14 text-white md:py-16">
        <div className="mx-auto grid max-w-container gap-8 px-5 sm:px-6 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-3">
            <div className="grid size-14 place-items-center rounded-full border border-white/25 bg-white/10">
              <CheckCircle aria-hidden="true" className="size-7" weight="regular" />
            </div>
          </div>
          <div className="lg:col-span-9">
            <p className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-blue-100">
              Project result
            </p>
            <p className="mt-4 max-w-4xl font-display text-[1.7rem] font-semibold leading-snug tracking-[-0.025em] text-white sm:text-[2.25rem]">
              {project.outcome}
            </p>
          </div>
        </div>
      </section>

      {project.images.length > 1 ? (
        <SectionBand data-testid="project-gallery">
          <div className="mx-auto max-w-container px-5 sm:px-6">
            <SectionHeader
              overline="From the field"
              title="Inside the installation."
              body={`${project.images.length} original project photographs document the work from field conditions through delivered infrastructure.`}
            />
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-12">
              {project.images.slice(1).map((image, index) => {
                const wide = index % 5 === 0 || index % 5 === 3;
                return (
                  <Reveal
                    key={image.src}
                    className={wide ? "lg:col-span-7" : "lg:col-span-5"}
                    delay={(index % 2) * 40}
                  >
                    <ProjectPhoto
                      image={image}
                      sizes={wide ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 42vw, 100vw"}
                      className="h-[300px] sm:h-[380px]"
                    />
                  </Reveal>
                );
              })}
            </div>
          </div>
        </SectionBand>
      ) : null}

      <SectionBand compact theme="soft">
        <div className="mx-auto max-w-container px-5 sm:px-6">
          <p className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-brand-600">
            Continue through the work
          </p>
          <div className="mt-7 grid border-y border-neutral-200 bg-white md:grid-cols-2">
            <Link
              href={`/projects/${previous.slug}`}
              className="group flex min-h-40 flex-col justify-between gap-5 border-b border-neutral-200 p-6 transition-colors hover:bg-brand-50 md:border-b-0 md:border-r sm:p-8"
            >
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-600">
                <ArrowLeft aria-hidden="true" className="size-4" /> Previous project
              </span>
              <span className="font-display text-xl font-semibold leading-snug text-navy-800 group-hover:text-brand-700">
                {previous.shortTitle}
              </span>
            </Link>
            <Link
              href={`/projects/${next.slug}`}
              className="group flex min-h-40 flex-col items-end justify-between gap-5 p-6 text-right transition-colors hover:bg-brand-50 sm:p-8"
            >
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-600">
                Next project <ArrowRight aria-hidden="true" className="size-4" />
              </span>
              <span className="font-display text-xl font-semibold leading-snug text-navy-800 group-hover:text-brand-700">
                {next.shortTitle}
              </span>
            </Link>
          </div>
        </div>
      </SectionBand>

      <CTABand
        eyebrow="Plan the next installation"
        title="Have critical infrastructure to upgrade?"
        body="Bring us the operational constraint, the equipment requirement, or the unfinished plan. We will help define the path forward."
      />
    </main>
  );
}
