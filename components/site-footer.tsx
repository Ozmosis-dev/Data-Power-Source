import { ArrowUpRight, Clock, MapPin, Phone } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";
import { QuoteTrigger } from "@/components/quote-dialog";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="technical-grid-subtle bg-navy-950 pb-16 text-neutral-50 lg:pb-0">
      <div className="mx-auto max-w-container px-5 py-14 sm:px-6 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-3">
            <BrandMark
              kind="text"
              tone="white"
              size="default"
              testId="footer-logo"
              className="max-w-[320px]"
            />
            <p
              data-testid="footer-tagline"
              className="mt-6 max-w-[280px] font-display text-base font-semibold leading-[1.35] tracking-[-0.015em] text-white"
            >
              {site.promise}
            </p>
            <div className="mt-6 space-y-3 text-small leading-relaxed text-navy-200">
              <p data-testid="footer-address" className="flex items-center gap-3">
                <MapPin aria-hidden="true" className="size-4 shrink-0 text-blue-200" />
                <span>
                  <span className="block">{site.street}</span>
                  <span className="block">{site.cityStateZip}</span>
                </span>
              </p>
              <p data-testid="footer-region" className="pl-7 text-blue-200">
                {site.region}
              </p>
            </div>
          </div>

          <nav className="lg:col-span-3" aria-label="Footer services">
            <p className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-blue-200">
              Services
            </p>
            <ul className="mt-6 space-y-3">
              {site.services.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-small text-navy-200 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                  >
                    {service.shortLabel}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1.5 text-small font-semibold text-blue-200 hover:text-white"
                >
                  View all services <ArrowUpRight aria-hidden="true" className="size-3.5" />
                </Link>
              </li>
            </ul>
          </nav>

          <nav className="lg:col-span-2" aria-label="Footer company">
            <p className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-blue-200">
              Company
            </p>
            <ul className="mt-6 space-y-3">
              {[...site.nav, { label: "Privacy", href: "/privacy" }].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-small text-navy-200 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="border-l border-navy-700 pl-3">
                <Link
                  href="/about/safety"
                  className="text-[0.78rem] text-navy-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                >
                  Safety
                </Link>
              </li>
              <li className="border-l border-navy-700 pl-3">
                <Link
                  href="/about/values"
                  className="text-[0.78rem] text-navy-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                >
                  Values &amp; integrity
                </Link>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <p className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-blue-200">
              Get in touch
            </p>
            <a
              href={site.phoneHref}
              className="mt-6 flex items-center gap-2 font-display text-[1.35rem] font-semibold text-white transition-colors hover:text-blue-200"
            >
              <Phone aria-hidden="true" className="size-5 text-blue-200" />
              {site.phoneDisplay}
            </a>
            <a href={site.faxHref} className="mt-3 block text-small text-navy-200 hover:text-white">
              Fax {site.faxDisplay}
            </a>
            <div className="mt-4 flex items-start gap-2 text-small text-navy-300">
              <Clock aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
              <span>Business hours pending client confirmation</span>
            </div>
            <Button asChild variant="dark" className="mt-6 w-full">
              <QuoteTrigger>
                Request a quote <ArrowUpRight aria-hidden="true" className="size-4" />
              </QuoteTrigger>
            </Button>
          </div>
        </div>
      </div>

      <div className="border-t border-navy-700 bg-navy-950">
        <div className="mx-auto flex max-w-container flex-col gap-5 border-b border-navy-700 px-5 py-5 sm:px-6 md:flex-row md:items-center md:justify-between">
          <p
            data-testid="footer-proof-line"
            className="min-w-0 flex-1 text-[0.72rem] leading-[1.45] text-navy-400 lg:whitespace-nowrap"
          >
            {site.proofLine}
          </p>
          <div
            data-testid="footer-iec-badge"
            className="inline-flex w-28 shrink-0 items-center opacity-80 transition-opacity duration-[180ms] hover:opacity-100"
          >
            <Image
              src="/brand/iec-atlanta-georgia.png"
              alt="Independent Electrical Contractors, Atlanta and Georgia."
              width={400}
              height={203}
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
        <div className="mx-auto flex max-w-container flex-col gap-4 px-5 py-6 text-small text-navy-400 sm:px-6 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Data Power Source. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="border border-dashed border-navy-600 px-2 py-1">
              License numbers pending
            </span>
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
