"use client";

import Link from "next/link";
import {
  BatteryCharging,
  Circuitry,
  ClipboardText,
  MapPinLine,
  ShieldCheck,
} from "@phosphor-icons/react";

import { QuoteTrigger } from "@/components/quote-dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FaqGroup } from "@/content/faq";

const groupIcons = [
  BatteryCharging,
  Circuitry,
  ShieldCheck,
  ClipboardText,
  MapPinLine,
] as const;

export function FaqAccordion({ groups }: { groups: FaqGroup[] }) {
  return (
    <div className="space-y-12 md:space-y-16">
      {groups.map((group, groupIndex) => {
        const Icon = groupIcons[groupIndex] ?? Circuitry;

        return (
          <section
            key={group.title}
            aria-labelledby={`faq-group-${groupIndex}`}
            className="grid gap-7 rounded-xl border border-neutral-200/80 bg-white/55 p-5 shadow-sm md:p-7 lg:grid-cols-12 lg:gap-10 lg:bg-white/35 lg:p-8"
          >
            <div className="lg:col-span-4">
              <div
                data-testid="faq-group-icon"
                className="grid size-12 place-items-center rounded-xl border border-blue-200 bg-blue-50 text-brand-600 shadow-sm"
              >
                <Icon aria-hidden="true" size={24} weight="regular" />
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
                <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-brand-600">
                  {group.label}
                </p>
                <span aria-hidden="true" className="size-1 rounded-full bg-blue-300" />
                <p className="font-mono text-[0.64rem] font-semibold uppercase tracking-[0.12em] text-neutral-500">
                  {group.items.length} {group.items.length === 1 ? "question" : "questions"}
                </p>
              </div>
              <h2
                id={`faq-group-${groupIndex}`}
                className="mt-3 max-w-sm font-display text-h2 font-semibold tracking-[-0.03em] text-navy-800"
              >
                {group.title}
              </h2>
              <p className="mt-4 max-w-sm text-base leading-relaxed text-neutral-600">
                {group.description}
              </p>
            </div>
            <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white px-5 shadow-sm sm:px-7 lg:col-span-8 lg:px-8">
              <Accordion type="single" collapsible>
                {group.items.map((item, itemIndex) => (
                  <AccordionItem
                    key={item.question}
                    value={`${groupIndex}-${itemIndex}`}
                    className="border-neutral-200 last:border-b-0"
                  >
                    <AccordionTrigger
                      data-faq-question
                      className="py-6 text-[1.08rem] sm:text-[1.16rem]"
                    >
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="leading-relaxed">
                      <p>{item.answer}</p>
                      {item.links?.length ? (
                        <div className="mt-4 flex flex-wrap gap-4">
                          {item.links.map((link) =>
                            link.href === "/contact" && link.label === "Request a quote" ? (
                              <QuoteTrigger
                                key={link.href}
                                className="rounded-sm font-semibold text-brand-600 transition-colors duration-[180ms] hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                              >
                                {link.label} →
                              </QuoteTrigger>
                            ) : (
                              <Link
                                key={link.href}
                                href={link.href}
                                className="rounded-sm font-semibold text-brand-600 transition-colors duration-[180ms] hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                              >
                                {link.label} →
                              </Link>
                            ),
                          )}
                        </div>
                      ) : null}
                      {item.pending ? (
                        <p className="mt-5 inline-flex border border-dashed border-neutral-300 bg-neutral-50 px-3 py-2 font-mono text-small font-medium text-neutral-600">
                          {item.pending}
                        </p>
                      ) : null}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>
        );
      })}
    </div>
  );
}
