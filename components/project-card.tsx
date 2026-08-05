import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

export function ProjectCard({
  title,
  description,
  tag,
  index,
  imageSrc,
  imageAlt,
  href,
}: {
  title: string;
  description: string;
  tag: string;
  index: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group block rounded-xl border border-neutral-200 bg-white p-3 shadow-sm transition-[transform,box-shadow,border-color] duration-[180ms] hover:-translate-y-1 hover:border-brand-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 motion-reduce:transform-none"
    >
      <div className="relative min-h-[230px] overflow-hidden rounded-lg border border-neutral-200 bg-navy-800">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025] motion-reduce:transform-none"
        />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-white/15 bg-navy-950/90 px-4 py-3 backdrop-blur-sm">
          <span className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-navy-200">
            Project photography
          </span>
          <span className="font-mono text-[0.62rem] font-semibold tracking-[0.1em] text-blue-200">
            {index}
          </span>
        </div>
      </div>
      <div className="p-4 pb-5">
        <div className="flex items-center justify-between gap-4">
          <span className="border border-brand-100 bg-brand-50 px-3 py-1 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-brand-700">
            {tag}
          </span>
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 text-blue-500 transition-transform duration-[180ms] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>
        <h3 className="mt-5 font-display text-h3 font-semibold text-navy-800">{title}</h3>
        <p className="mt-3 text-base text-neutral-600">{description}</p>
      </div>
    </Link>
  );
}
