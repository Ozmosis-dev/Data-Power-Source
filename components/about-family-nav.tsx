import {
  Buildings,
  CompassTool,
  ShieldCheck,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const icons = {
  overview: Buildings,
  safety: ShieldCheck,
  values: CompassTool,
} as const;

export function AboutFamilyNav({ current }: { current: "overview" | "safety" | "values" }) {
  const currentHref =
    current === "overview"
      ? "/about"
      : current === "safety"
        ? "/about/safety"
        : "/about/values";

  return (
    <nav
      aria-label="About Data Power Source"
      data-testid="about-family-nav"
      className="border-b border-neutral-200 bg-white"
    >
      <div
        data-testid="about-family-nav-gutter"
        className="mx-auto max-w-container bg-white px-5 sm:px-6"
      >
        <div
          data-testid="about-family-nav-grid"
          className="grid gap-px border-x border-neutral-200 bg-neutral-200 sm:grid-cols-3"
        >
          {site.about.map((item) => {
            const Icon = icons[item.key];
            const active = item.href === currentHref;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.label}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group grid min-h-[92px] grid-cols-[42px_1fr] items-center gap-4 bg-white px-5 py-4 transition-colors duration-200 focus-visible:relative focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-600 motion-reduce:transition-none",
                  active
                    ? "bg-navy-800 text-white"
                    : "text-navy-800 hover:bg-brand-50",
                )}
              >
                <span
                  className={cn(
                    "grid size-[42px] place-items-center rounded-md border transition-colors duration-200",
                    active
                      ? "border-blue-300/50 bg-blue-400/10 text-blue-200"
                      : "border-neutral-200 bg-neutral-50 text-brand-600 group-hover:border-brand-200",
                  )}
                >
                  <Icon aria-hidden="true" className="size-5" weight="regular" />
                </span>
                <span>
                  <span className="block font-display text-base font-semibold">
                    {item.label}
                  </span>
                  <span
                    className={cn(
                      "mt-1 block text-[0.78rem] leading-snug",
                      active ? "text-navy-200" : "text-neutral-600",
                    )}
                  >
                    {item.description}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
