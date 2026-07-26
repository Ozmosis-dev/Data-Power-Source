import type { Metadata } from "next";
import Link from "next/link";

import { CTABand } from "@/components/cta-band";
import { FaqAccordion } from "@/components/faq-accordion";
import { Hero } from "@/components/hero";
import { SectionBand } from "@/components/section-band";
import { Button } from "@/components/ui/button";
import { allFaqItems, faqGroups, faqHero, faqMeta } from "@/content/faq";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";

export const metadata: Metadata = faqMeta;

export default function FaqPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "FAQ", href: "/faq" },
  ]);
  const faqSchema = faqPageSchema(allFaqItems);

  return (
    <main id="main-content">
      <Hero
        overline={faqHero.overline}
        title={faqHero.title}
        lead={faqHero.lead}
        imageAlt={faqHero.imageAlt}
        imageSrc={faqHero.imageSrc}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
        compact
      />

      <SectionBand theme="soft">
        <div className="mx-auto max-w-container px-5 sm:px-6">
          <FaqAccordion groups={faqGroups} />
        </div>
      </SectionBand>

      <SectionBand compact>
        <div className="mx-auto flex max-w-container flex-col items-start justify-between gap-6 px-5 sm:px-6 md:flex-row md:items-center">
          <p className="max-w-2xl text-lead text-neutral-600">
            Have a facility-specific question? Tell us what has to stay powered and we’ll help you
            identify the right next step.
          </p>
          <Button asChild variant="outline">
            <Link href="/contact">Ask us directly</Link>
          </Button>
        </div>
      </SectionBand>

      <CTABand title="Still have a question?" />
      {[breadcrumbs, faqSchema].map((schema) => (
        <script
          key={schema["@type"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
        />
      ))}
    </main>
  );
}
