"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { CaretDown, List, Phone } from "@phosphor-icons/react";
import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";
import { QuoteTrigger } from "@/components/quote-dialog";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { site } from "@/content/site";

export function MobileNav() {
  return (
    <div className="flex items-center gap-2 xl:hidden">
      <a
        href={site.phoneHref}
        aria-label={`Call Data Power Source at ${site.phoneDisplay}`}
        className="grid size-11 place-items-center rounded-md text-navy-800 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        <Phone aria-hidden="true" size={20} weight="regular" />
      </a>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open menu">
            <List aria-hidden="true" size={24} weight="regular" />
          </Button>
        </SheetTrigger>
        <SheetContent aria-label="Site navigation">
          <SheetTitle className="sr-only">Site navigation</SheetTitle>
          <SheetDescription className="sr-only">
            Navigate Data Power Source services and company pages.
          </SheetDescription>
          <BrandMark inverse className="pr-14" />
          <nav className="mt-12 flex-1 overflow-y-auto" aria-label="Mobile">
            <Accordion.Root type="single" collapsible>
              <Accordion.Item value="services" className="border-y border-navy-700">
                <Accordion.Header>
                  <Accordion.Trigger className="group flex w-full items-center justify-between py-5 font-display text-h3 font-semibold">
                    Services
                    <CaretDown
                      aria-hidden="true"
                      size={20}
                      weight="bold"
                      className="transition-transform duration-300 group-data-[state=open]:rotate-180"
                    />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden pb-4 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <div className="grid gap-1">
                    {site.services.map((service) => (
                      <SheetClose asChild key={service.href}>
                        <Link
                          href={service.href}
                          className="rounded-md border-l-2 border-transparent px-3 py-3 text-small text-navy-200 transition-colors hover:border-blue-400 hover:bg-navy-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                        >
                          {service.shortLabel}
                        </Link>
                      </SheetClose>
                    ))}
                    <SheetClose asChild>
                      <Link href="/services" className="mt-2 px-3 py-3 font-semibold text-blue-300">
                        View all services
                      </Link>
                    </SheetClose>
                  </div>
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value="about" className="border-b border-navy-700">
                <Accordion.Header>
                  <Accordion.Trigger className="group flex w-full items-center justify-between py-5 font-display text-h3 font-semibold">
                    About
                    <CaretDown
                      aria-hidden="true"
                      size={20}
                      weight="bold"
                      className="transition-transform duration-300 group-data-[state=open]:rotate-180"
                    />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden pb-4 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <div className="grid gap-1">
                    {site.about.map((item) => (
                      <SheetClose asChild key={item.href}>
                        <Link
                          href={item.href}
                          aria-label={item.menuLabel}
                          className="rounded-md border-l-2 border-transparent px-3 py-3 text-small text-navy-200 transition-colors hover:border-blue-400 hover:bg-navy-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                        >
                          <span className="block font-semibold text-white">
                            {item.menuLabel}
                          </span>
                          <span className="mt-1 block text-[0.76rem] leading-snug text-navy-300">
                            {item.description}
                          </span>
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>
            <div className="divide-y divide-navy-700">
              {site.nav.filter((item) => item.href !== "/about").map((item) => (
                <SheetClose asChild key={item.href}>
                  <Link
                    href={item.href}
                    className="flex py-5 font-display text-h3 font-semibold text-neutral-50 transition-colors hover:text-blue-300"
                  >
                    {item.label}
                  </Link>
                </SheetClose>
              ))}
            </div>
          </nav>
          <div className="border-t border-navy-700 pt-5">
            <p className="text-small text-navy-300">24/7 emergency · 2-hour response</p>
            <Button asChild variant="dark" className="mt-4 w-full">
              <QuoteTrigger>Request a quote</QuoteTrigger>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
