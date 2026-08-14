import type { Metadata } from "next";
import Link from "next/link";

import { Hero } from "@/components/hero";
import { SectionBand } from "@/components/section-band";

export const metadata: Metadata = {
  title: "Terms of Use Review | Data Power Source",
  description: "Terms of use review page for the new Data Power Source website.",
  alternates: { canonical: "/terms-of-use" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Terms of Use Review | Data Power Source",
    description: "Terms of use review page for the new Data Power Source website.",
    url: "/terms-of-use",
  },
};

export default function TermsOfUsePage() {
  return (
    <main id="main-content">
      <Hero
        overline="Terms"
        title="Terms of use review"
        lead="This non-indexed route preserves the established terms URL while the client and counsel complete the production website terms."
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
              No final terms are being represented as approved. Before this route is added to search
              results or public navigation, the production terms must define permitted website use,
              intellectual-property treatment, warranty and liability language, governing terms,
              effective date, and the responsible review owner.
            </p>
            <p className="mt-5 leading-relaxed text-neutral-700">
              For questions about using this website, please{" "}
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
