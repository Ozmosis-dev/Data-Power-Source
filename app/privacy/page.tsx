import type { Metadata } from "next";
import Link from "next/link";

import { Hero } from "@/components/hero";
import { SectionBand } from "@/components/section-band";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy Review | Data Power Source",
  description: "Privacy policy review page for the new Data Power Source website.",
  path: "/privacy",
  index: false,
});

export default function PrivacyPage() {
  return (
    <main id="main-content">
      <Hero
        overline="Privacy"
        title="Privacy policy review"
        lead="This non-indexed route preserves the website’s privacy-policy destination while the final policy is reviewed against the approved forms, analytics, hosting, and data-retention configuration."
        compact
      />
      <SectionBand compact>
        <div className="mx-auto max-w-3xl px-5 sm:px-6">
          <article
            data-testid="legal-review-gate"
            className="rounded-xl border border-neutral-200 bg-neutral-50 p-6 sm:p-8"
          >
            <h2 className="font-display text-h3 font-semibold text-navy-800">
              Client and counsel approval required before launch
            </h2>
            <p className="mt-4 leading-relaxed text-neutral-700">
              No final legal language is being represented as approved. Before this page is added to
              search results or public navigation, the policy must identify the information collected,
              service providers involved, retention practices, user choices, effective date, and policy
              owner for the production website.
            </p>
            <p className="mt-5 leading-relaxed text-neutral-700">
              For current privacy questions, please{" "}
              <Link className="font-semibold text-blue-700 underline" href="/contact">
                contact Data Power Source
              </Link>{" "}
              or call <a className="font-semibold text-blue-700 underline" href="tel:+17704989622">(770) 498-9622</a>.
            </p>
          </article>
        </div>
      </SectionBand>
    </main>
  );
}
