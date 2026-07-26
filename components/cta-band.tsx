import { ArrowRight, Phone } from "@phosphor-icons/react/dist/ssr";

import { QuoteTrigger } from "@/components/quote-dialog";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";

export function CTABand({
  title,
  body,
  eyebrow = "Start with a site assessment",
}: {
  title: string;
  body?: string;
  eyebrow?: string;
}) {
  return (
    <section className="technical-grid relative overflow-hidden border-y border-navy-600 bg-navy-800 py-16 text-white md:py-20">
      <div aria-hidden="true" className="absolute inset-y-0 right-[14%] w-px bg-navy-600" />
      <div aria-hidden="true" className="absolute right-[14%] top-1/2 h-px w-[12%] bg-blue-400" />
      <div className="relative mx-auto grid max-w-container items-center gap-10 px-5 sm:px-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-blue-200">
            {eyebrow}
          </p>
          <h2 className="mt-4 max-w-3xl font-display text-h1 font-semibold tracking-[-0.025em] text-white md:text-display">
            {title}
          </h2>
          {body ? <p className="mt-5 max-w-2xl text-lead text-navy-200">{body}</p> : null}
        </div>
        <div
          data-testid="cta-actions"
          className="grid w-full gap-3 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1 lg:justify-items-end"
        >
          <Button asChild variant="dark" className="w-full lg:w-[240px]">
            <QuoteTrigger>
              Request a quote <ArrowRight aria-hidden="true" className="size-4" />
            </QuoteTrigger>
          </Button>
          <Button asChild variant="outline-dark" className="w-full lg:w-[240px]">
            <a href={site.phoneHref} aria-label={`Call Data Power Source at ${site.phoneDisplay}`}>
              <Phone aria-hidden="true" className="size-4" />
              Call {site.phoneDisplay}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
