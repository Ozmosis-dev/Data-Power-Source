"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Clock, Phone, ShieldCheck, X } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import {
  AnchorHTMLAttributes,
  createContext,
  forwardRef,
  MouseEvent,
  ReactNode,
  useContext,
  useRef,
  useState,
} from "react";

import { BrandMark } from "@/components/brand-mark";
import { QuoteForm } from "@/components/quote-form";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

type QuoteDialogContextValue = {
  openQuote: (trigger: HTMLAnchorElement) => void;
};

const QuoteDialogContext = createContext<QuoteDialogContextValue | null>(null);

type QuoteTriggerProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href?: string;
};

export const QuoteTrigger = forwardRef<HTMLAnchorElement, QuoteTriggerProps>(
  ({ className, children, href = "/contact", onClick, ...props }, forwardedRef) => {
    const context = useContext(QuoteDialogContext);

    if (!context) {
      throw new Error("QuoteTrigger must be used within QuoteDialogProvider.");
    }

    function handleClick(event: MouseEvent<HTMLAnchorElement>) {
      onClick?.(event);
      if (event.defaultPrevented) return;
      event.preventDefault();
      context?.openQuote(event.currentTarget);
    }

    return (
      <Link
        ref={forwardedRef}
        href={href}
        onClick={handleClick}
        data-quote-trigger="true"
        className={className}
        {...props}
      >
        {children}
      </Link>
    );
  },
);
QuoteTrigger.displayName = "QuoteTrigger";

export function QuoteDialogProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const activeTrigger = useRef<HTMLAnchorElement | null>(null);

  function openQuote(trigger: HTMLAnchorElement) {
    activeTrigger.current = trigger;
    setOpen(true);
  }

  return (
    <QuoteDialogContext.Provider value={{ openQuote }}>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        {children}
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[90] bg-navy-950/80 backdrop-blur-[2px] duration-[180ms] data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 motion-reduce:animate-none" />
          <Dialog.Content
            data-testid="quote-dialog-content"
            onOpenAutoFocus={(event) => {
              event.preventDefault();
              requestAnimationFrame(() => {
                document
                  .querySelector<HTMLInputElement>("[data-quote-autofocus]")
                  ?.focus();
              });
            }}
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              activeTrigger.current?.focus();
            }}
            className={cn(
              "fixed inset-0 z-[100] h-[100dvh] w-full overflow-y-auto bg-white outline-none duration-[180ms] data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 motion-reduce:animate-none",
              "lg:left-1/2 lg:top-1/2 lg:h-[min(860px,calc(100dvh-48px))] lg:w-[min(1180px,calc(100vw-48px))] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:overflow-hidden lg:rounded-xl lg:border lg:border-navy-700 lg:shadow-[0_32px_90px_-28px_rgba(3,20,45,0.65)]",
              "lg:data-[state=closed]:zoom-out-95 lg:data-[state=open]:zoom-in-95",
            )}
          >
            <div className="grid min-h-full lg:h-full lg:grid-cols-[0.82fr_1.35fr]">
              <aside className="relative min-h-[220px] overflow-hidden bg-navy-900 text-white lg:min-h-0">
                <Image
                  src="/images/generated/faq-field-planning.webp"
                  alt="Electricians reviewing plans for a commercial power project."
                  fill
                  sizes="(max-width: 1023px) 100vw, 430px"
                  data-testid="quote-field-image"
                  className="object-cover"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-navy-950/80" />
                <div className="relative flex h-full min-h-[220px] flex-col justify-between p-5 pr-16 sm:p-7 sm:pr-20 lg:min-h-0 lg:p-9">
                  <BrandMark
                    kind="full"
                    tone="white"
                    testId="quote-brand-mark"
                    className="max-w-[360px]"
                  />

                  <div className="mt-10 hidden lg:block">
                    <p className="max-w-sm font-display text-[2.1rem] font-semibold leading-[1.05] tracking-[-0.035em]">
                      Power you can build on.
                    </p>
                    <p className="mt-4 max-w-sm text-[0.95rem] leading-relaxed text-navy-100">
                      Commercial electrical, critical power, connectivity, and design-build from one
                      accountable team.
                    </p>

                    <div className="mt-8 grid gap-3 border-t border-white/20 pt-6">
                      <div className="flex items-center gap-3 text-small text-navy-100">
                        <ShieldCheck aria-hidden="true" size={18} weight="regular" />
                        <span>25 years in commercial and industrial electrical</span>
                      </div>
                      <div className="flex items-center gap-3 text-small text-navy-100">
                        <Clock aria-hidden="true" size={18} weight="regular" />
                        <span>24/7 emergency service and 2-hour response</span>
                      </div>
                    </div>

                    <a
                      href={site.phoneHref}
                      className="mt-8 inline-flex h-11 items-center gap-2 rounded-md border border-white/30 px-4 font-semibold text-white transition-colors duration-[180ms] hover:border-white hover:bg-white hover:text-navy-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
                    >
                      <Phone aria-hidden="true" size={17} weight="regular" />
                      Call {site.phoneDisplay}
                    </a>
                  </div>
                </div>
              </aside>

              <div className="min-h-0 bg-white lg:overflow-y-auto">
                <div className="px-5 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-9">
                  <Dialog.Title className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-brand-600">
                    Request a quote
                  </Dialog.Title>
                  <h2 className="mt-3 max-w-xl font-display text-[2rem] font-semibold leading-[1.08] tracking-[-0.035em] text-navy-800 sm:text-[2.35rem]">
                    Tell us what needs power.
                  </h2>
                  <Dialog.Description className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-neutral-600">
                    Share a few project details. We will review the scope and follow up with a clear
                    next step.
                  </Dialog.Description>
                  <QuoteForm />
                </div>
              </div>
            </div>

            <Dialog.Close
              aria-label="Close quote form"
              className="fixed right-4 top-4 z-[110] grid size-11 place-items-center rounded-md border border-white/25 bg-navy-950/55 text-white backdrop-blur-sm transition-[background-color,border-color,transform] duration-[180ms] hover:border-white/60 hover:bg-navy-900 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 motion-reduce:transition-none lg:absolute lg:right-5 lg:top-5 lg:border-neutral-200 lg:bg-white lg:text-navy-800 lg:hover:border-brand-300 lg:hover:bg-brand-50 lg:focus-visible:ring-brand-600"
            >
              <X aria-hidden="true" size={20} weight="regular" />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </QuoteDialogContext.Provider>
  );
}
