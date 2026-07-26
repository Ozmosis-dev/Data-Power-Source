import { Hero } from "@/components/hero";
import { SectionBand } from "@/components/section-band";

export default function PrivacyPage() {
  return (
    <main id="main-content">
      <Hero
        overline="Privacy"
        title="Privacy policy pending."
        lead="Final policy language will be added when the site’s forms, analytics, and deployment configuration are confirmed."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy" }]}
        compact
      />
      <SectionBand compact>
        <div className="mx-auto max-w-container px-5 sm:px-6">
          <p className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50 p-6 text-neutral-600">
            Client-approved privacy policy content pending.
          </p>
        </div>
      </SectionBand>
    </main>
  );
}
