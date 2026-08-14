import type { Metadata } from "next";
import Link from "next/link";

import { Hero } from "@/components/hero";
import { SectionBand, SectionHeader } from "@/components/section-band";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Site Map | Data Power Source",
  description:
    "Browse Data Power Source services, industries, project case studies, company information, and contact resources.",
  path: "/site-map",
});

const primaryPages = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Projects", href: "/projects" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

function LinkList({ links }: { links: ReadonlyArray<{ label: string; href: string }> }) {
  return (
    <ul className="mt-6 space-y-3">
      {links.map((link) => (
        <li key={link.href}>
          <Link className="font-semibold text-blue-700 underline-offset-4 hover:underline" href={link.href}>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function SiteMapPage() {
  return (
    <main id="main-content">
      <Hero
        overline="Navigation"
        title="Site map"
        lead="A complete index of the services, company information, and documented project work on this website."
        compact
      />

      <SectionBand>
        <div className="mx-auto grid max-w-container gap-12 px-5 sm:px-6 md:grid-cols-2 lg:grid-cols-3">
          <section>
            <SectionHeader overline="Explore" title="Main pages" />
            <LinkList links={primaryPages} />
          </section>

          <section>
            <SectionHeader overline="Capabilities" title="Services" />
            <LinkList
              links={site.services.map((service) => ({
                label: service.label,
                href: service.href,
              }))}
            />
          </section>

          <section>
            <SectionHeader overline="Company" title="About Data Power Source" />
            <LinkList
              links={site.about.map((page) => ({ label: page.label, href: page.href }))}
            />
          </section>
        </div>
      </SectionBand>

      <SectionBand theme="soft">
        <div className="mx-auto max-w-container px-5 sm:px-6">
          <SectionHeader
            overline="Case studies"
            title="Project portfolio"
            body="Documented electrical and mission-critical infrastructure work across the Southeast."
          />
          <div className="mt-8 grid gap-x-10 gap-y-4 md:grid-cols-2">
            {projects.map((project) => (
              <Link
                key={project.slug}
                className="border-b border-neutral-200 py-3 font-semibold text-navy-800 underline-offset-4 hover:text-blue-700 hover:underline"
                href={`/projects/${project.slug}`}
              >
                {project.shortTitle}
              </Link>
            ))}
          </div>
        </div>
      </SectionBand>
    </main>
  );
}
