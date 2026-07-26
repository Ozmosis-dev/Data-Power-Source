import { notFound } from "next/navigation";

import { ClickToCall } from "@/components/click-to-call";
import { Hero } from "@/components/hero";
import { SectionBand } from "@/components/section-band";
import { stubRoutes } from "@/content/site";
import { breadcrumbSchema } from "@/lib/schema";

export function generateStaticParams() {
  return Object.keys(stubRoutes).map((slug) => ({ slug }));
}

export default async function StubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = stubRoutes[slug as keyof typeof stubRoutes];
  if (!content) notFound();

  const label = slug.charAt(0).toUpperCase() + slug.slice(1);
  const schema = breadcrumbSchema([
    { name: "Home", href: "/" },
    { name: label, href: `/${slug}` },
  ]);

  return (
    <main id="main-content">
      <Hero
        overline={content.overline}
        title={content.title}
        lead={content.body}
        breadcrumbs={[{ label: "Home", href: "/" }, { label }]}
        compact
      />
      <SectionBand compact>
        <div className="mx-auto max-w-container px-5 sm:px-6">
          <p className="text-overline font-semibold uppercase text-blue-600">Need help now?</p>
          <ClickToCall className="mt-5 text-h3" />
        </div>
      </SectionBand>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />
    </main>
  );
}
