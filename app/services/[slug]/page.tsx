import { notFound } from "next/navigation";

import { ClickToCall } from "@/components/click-to-call";
import { Hero } from "@/components/hero";
import { SectionBand } from "@/components/section-band";
import { site } from "@/content/site";
import { breadcrumbSchema } from "@/lib/schema";

const serviceBySlug = Object.fromEntries(
  site.services.map((service) => [service.href.split("/").at(-1), service]),
);

export function generateStaticParams() {
  return Object.keys(serviceBySlug).map((slug) => ({ slug }));
}

export default async function ServiceStubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = serviceBySlug[slug];
  if (!service) notFound();

  const schema = breadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: service.shortLabel, href: service.href },
  ]);

  return (
    <main id="main-content">
      <Hero
        overline="Service detail"
        title="Coming in the next pass."
        lead={`${service.label} is mapped in the approved specification. This pass builds the overview and shared system first.`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.shortLabel },
        ]}
        compact
      />
      <SectionBand compact>
        <div className="mx-auto max-w-container px-5 sm:px-6">
          <p className="max-w-2xl text-lead text-neutral-600">{service.description}</p>
          <ClickToCall className="mt-6" />
        </div>
      </SectionBand>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />
    </main>
  );
}
