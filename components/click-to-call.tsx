import { Phone } from "@phosphor-icons/react/dist/ssr";

import { site } from "@/content/site";
import { cn } from "@/lib/utils";

type ClickToCallProps = {
  compact?: boolean;
  inverse?: boolean;
  className?: string;
};

export function ClickToCall({ compact = false, inverse = false, className }: ClickToCallProps) {
  return (
    <a
      href={site.phoneHref}
      className={cn(
        "inline-flex items-center gap-2 rounded-md font-semibold transition-colors duration-[180ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        inverse
          ? "text-neutral-50 hover:text-blue-200 focus-visible:ring-offset-navy-900"
          : "text-navy-800 hover:text-blue-600",
        compact ? "text-small" : "text-base",
        className,
      )}
    >
      <Phone aria-hidden="true" size={compact ? 16 : 20} weight="regular" />
      <span>{site.phoneDisplay}</span>
    </a>
  );
}
