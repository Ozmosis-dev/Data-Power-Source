import { ArrowUpRight, MapPin } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

import { ProjectServiceIndicators } from "@/components/project-service-indicators";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";

export function ProjectGalleryCard({
  project,
  featured = false,
  className,
}: {
  project: Project;
  featured?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      data-testid="project-gallery-card"
      {...(featured ? { "data-featured": "true" } : {})}
      className={cn(
        "project-gallery-card group relative isolate flex h-full min-h-[440px] transform-gpu overflow-hidden rounded-xl border border-navy-700 bg-navy-900 text-white shadow-sm transition-[transform,box-shadow,border-color] duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-blue-300 hover:shadow-[0_24px_60px_-30px_rgba(2,91,210,0.7)] active:scale-[0.995] focus-visible:-translate-y-1 focus-visible:border-blue-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none",
        featured && "min-h-[520px]",
        className,
      )}
    >
      <Image
        src={project.images[0].src}
        alt={project.images[0].alt}
        fill
        sizes={
          featured
            ? "(min-width: 1024px) 90vw, 100vw"
            : "(min-width: 1024px) 55vw, (min-width: 768px) 50vw, 100vw"
        }
        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035] group-focus-visible:scale-[1.035] motion-reduce:transform-none motion-reduce:transition-none"
      />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-navy-950 via-navy-950/55 to-navy-950/5" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-navy-950/35 to-transparent opacity-70" />
      <div
        data-testid="project-card-blue-overlay"
        aria-hidden="true"
        className="absolute inset-0 z-[2] bg-blue-500 opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-[0.42] group-focus-visible:opacity-[0.42] motion-reduce:transition-none"
      />

      <div
        data-testid="project-card-content"
        className="relative z-[3] mt-auto w-full transform-gpu p-6 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-focus-visible:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none sm:p-8 lg:p-10"
      >
        <div className="flex items-center justify-between gap-4 border-b border-white/20 pb-4">
          <span className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-blue-200">
            {project.market}
          </span>
          <ProjectServiceIndicators disciplines={project.serviceDisciplines} />
        </div>
        <span
          aria-hidden="true"
          className="block h-px w-20 origin-left -translate-y-px scale-x-0 bg-blue-200 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
        />

        <div className={cn("mt-6", featured && "max-w-4xl")}>
          <h2
            className={cn(
              "font-display text-[1.75rem] font-semibold leading-[1.12] tracking-[-0.035em] text-white sm:text-[2.1rem]",
              featured && "md:text-[3rem]",
            )}
          >
            {project.shortTitle}
          </h2>
          <p className={cn("mt-4 max-w-2xl text-sm leading-relaxed text-navy-100 sm:text-base", !featured && "line-clamp-3")}>
            {project.summary}
          </p>
        </div>

        <div className="mt-7 flex items-end justify-between gap-5">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-white">
            <MapPin aria-hidden="true" className="size-4 text-blue-300" />
            {project.location}
          </span>
          <span className="grid size-11 shrink-0 place-items-center rounded-full border border-white/25 bg-white/10 transition-[background-color,transform] duration-[180ms] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:bg-white group-hover:text-navy-900 motion-reduce:transform-none">
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
