"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { AboutMegaMenu } from "@/components/about-mega-menu";
import { BrandMark } from "@/components/brand-mark";
import { ClickToCall } from "@/components/click-to-call";
import { MobileNav } from "@/components/mobile-nav";
import { QuoteTrigger } from "@/components/quote-dialog";
import { ServicesMegaMenu } from "@/components/services-mega-menu";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 h-20 border-b border-neutral-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-container items-center justify-between gap-5 px-4 sm:px-6">
        <BrandMark />
        <div className="hidden items-center gap-1 xl:flex">
          <ServicesMegaMenu active={pathname.startsWith("/services")} />
          {site.nav.map((item) => {
            if (item.href === "/about") {
              return (
                <AboutMegaMenu
                  key={item.href}
                  active={pathname.startsWith("/about")}
                />
              );
            }

            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative inline-flex h-10 items-center px-3 text-sm font-semibold text-navy-700 transition-colors duration-300 hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600",
                  active && "text-brand-600",
                )}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-x-3 -bottom-[18px] h-0.5 origin-left bg-brand-600 transition-transform duration-300",
                    active ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </Link>
            );
          })}
        </div>
        <div className="hidden shrink-0 items-center gap-4 xl:flex">
          <div className="border-l border-neutral-200 pl-4">
            <ClickToCall compact />
          </div>
          <Button asChild>
            <QuoteTrigger>Request a quote</QuoteTrigger>
          </Button>
        </div>
        <MobileNav />
      </div>
    </header>
  );
}
