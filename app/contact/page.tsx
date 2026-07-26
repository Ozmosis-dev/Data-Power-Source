import {
  ArrowSquareOut,
  Buildings,
  Clock,
  MapPin,
  Phone,
  Printer,
} from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";

import { ContactForm } from "@/components/contact-form";
import { Hero } from "@/components/hero";
import { Reveal } from "@/components/reveal";
import { SectionBand } from "@/components/section-band";
import { contactCopy, contactHero, contactMeta } from "@/content/contact";
import { site } from "@/content/site";
import { breadcrumbSchema, contactPageSchema } from "@/lib/schema";

export const metadata: Metadata = contactMeta;

const mapHref =
  "https://www.google.com/maps/search/?api=1&query=11187%20Bob%20Williams%20Parkway%2C%20Covington%2C%20GA%2030014";

export default function ContactPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Contact", href: "/contact" },
  ]);
  const contactSchema = contactPageSchema();

  return (
    <main id="main-content">
      <Hero
        overline={contactHero.overline}
        title={contactHero.title}
        lead={contactHero.lead}
        imageAlt={contactHero.imageAlt}
        imageSrc={contactHero.imageSrc}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        compact
      />

      <SectionBand theme="soft">
        <div className="mx-auto grid max-w-container gap-7 px-5 sm:px-6 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-8">
            <section className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
              <h2 className="max-w-2xl font-display text-h2 font-semibold tracking-[-0.03em] text-navy-800 md:text-h1">
                {contactCopy.formTitle}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600">
                {contactCopy.formBody}
              </p>
              <ContactForm />
            </section>
          </Reveal>

          <Reveal className="lg:col-span-4" delay={60}>
            <aside
              data-testid="contact-details"
              className="technical-grid-subtle overflow-hidden rounded-xl border border-navy-600 bg-navy-800 text-white shadow-md lg:sticky lg:top-28"
            >
              <div className="p-6 sm:p-8">
                <h2 className="font-display text-h2 font-semibold tracking-[-0.03em]">
                  {contactCopy.detailsTitle}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-navy-200">
                  {contactCopy.detailsBody}
                </p>

                <div className="mt-8 space-y-6">
                  <div className="flex items-start gap-4">
                    <Phone aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-blue-200" />
                    <div>
                      <p className="text-small font-semibold text-navy-300">Phone</p>
                      <a
                        href={site.phoneHref}
                        className="mt-1 block font-display text-[1.35rem] font-semibold text-white hover:text-blue-100"
                      >
                        {site.phoneDisplay}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Printer aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-blue-200" />
                    <div>
                      <p className="text-small font-semibold text-navy-300">Fax</p>
                      <p className="mt-1 text-base text-white">Fax {site.faxDisplay}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-blue-200" />
                    <div>
                      <p className="text-small font-semibold text-navy-300">Office</p>
                      <address className="mt-1 not-italic leading-relaxed text-white">
                        <span className="block">{site.street}</span>
                        <span className="block">{site.cityStateZip}</span>
                      </address>
                      <a
                        href={mapHref}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-flex items-center gap-2 rounded-sm text-small font-semibold text-blue-100 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
                      >
                        Open in Google Maps
                        <ArrowSquareOut aria-hidden="true" className="size-4" />
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Buildings
                      aria-hidden="true"
                      className="mt-0.5 size-5 shrink-0 text-blue-200"
                    />
                    <div>
                      <p className="text-small font-semibold text-navy-300">Service area</p>
                      <p className="mt-1 text-base text-white">Metro Atlanta and Georgia</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-navy-600 bg-navy-900 p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <Clock aria-hidden="true" className="size-5 text-blue-200" />
                  <h3 className="font-display text-h3 font-semibold text-white">
                    {contactCopy.emergencyTitle}
                  </h3>
                </div>
                <p className="mt-4 text-base leading-relaxed text-navy-200">
                  {contactCopy.emergencyBody}
                </p>
                <Link
                  href={site.phoneHref}
                  className="mt-5 inline-flex rounded-md border border-navy-500 px-4 py-3 text-small font-semibold text-white transition-colors hover:border-blue-200 hover:bg-navy-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
                >
                  Call {site.phoneDisplay}
                </Link>
              </div>
            </aside>
          </Reveal>
        </div>
      </SectionBand>

      <SectionBand compact>
        <div className="mx-auto max-w-container px-5 sm:px-6">
          <h2 className="font-display text-h2 font-semibold tracking-[-0.03em] text-navy-800">
            {contactCopy.nextTitle}
          </h2>
          <div className="mt-8 grid border-y border-neutral-200 md:grid-cols-3 md:divide-x md:divide-neutral-200">
            {contactCopy.nextSteps.map((step) => (
              <article
                key={step.title}
                className="border-b border-neutral-200 py-6 last:border-b-0 md:border-b-0 md:px-7 md:first:pl-0 md:last:pr-0"
              >
                <h3 className="font-display text-h3 font-semibold text-navy-800">{step.title}</h3>
                <p className="mt-3 max-w-sm text-base leading-relaxed text-neutral-600">
                  {step.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </SectionBand>

      {[breadcrumbs, contactSchema].map((schema) => (
        <script
          key={schema["@type"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
        />
      ))}
    </main>
  );
}
