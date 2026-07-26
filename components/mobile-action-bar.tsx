import { FileText, Phone } from "@phosphor-icons/react/dist/ssr";

import { QuoteTrigger } from "@/components/quote-dialog";
import { site } from "@/content/site";

export function MobileActionBar() {
  return (
    <nav
      aria-label="Mobile actions"
      className="fixed inset-x-0 bottom-0 z-50 grid h-[64px] grid-cols-2 border-t border-navy-700 bg-navy-900 px-3 pb-[env(safe-area-inset-bottom)] text-white lg:hidden"
    >
      <a
        href={site.phoneHref}
        className="flex items-center justify-center gap-2 border-r border-navy-700 text-small font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-400"
      >
        <Phone aria-hidden="true" size={16} weight="regular" />
        Call now
      </a>
      <QuoteTrigger
        className="flex items-center justify-center gap-2 text-small font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-400"
      >
        <FileText aria-hidden="true" size={16} weight="regular" />
        Request a quote
      </QuoteTrigger>
    </nav>
  );
}
