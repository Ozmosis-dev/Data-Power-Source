"use client";

import { CheckCircle, PaperPlaneTilt, WarningCircle } from "@phosphor-icons/react";
import { FormEvent, useRef, useState } from "react";

import {
  compactChoiceClass,
  compactFieldClass,
  compactLabelClass,
  compactLegendClass,
} from "@/components/form-control-styles";
import { Button } from "@/components/ui/button";
import { projectTimings, serviceInterests } from "@/content/contact";
import { site } from "@/content/site";

type QuoteStatus = "idle" | "submitting" | "success" | "error";

function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/);
  return {
    firstName: parts[0] ?? "",
    lastName: parts.slice(1).join(" "),
  };
}

export function QuoteForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<QuoteStatus>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const formData = new FormData(event.currentTarget);
    const fullName = String(formData.get("fullName") ?? "");
    const { firstName, lastName } = splitName(fullName);
    const payload = {
      firstName,
      lastName,
      company: formData.get("company"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      serviceInterest: formData.get("serviceInterest"),
      projectTiming: formData.get("projectTiming"),
      facilityLocation: formData.get("facilityLocation"),
      message: formData.get("message"),
      website: formData.get("website"),
      formContext: "quote-dialog",
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Request delivery failed");

      formRef.current?.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex min-h-[420px] flex-col items-start justify-center py-8" role="status">
        <span className="grid size-14 place-items-center rounded-xl bg-brand-50 text-brand-600">
          <CheckCircle aria-hidden="true" size={30} weight="regular" />
        </span>
        <h3 className="mt-6 max-w-lg font-display text-h2 font-semibold tracking-[-0.03em] text-navy-800">
          Your request was sent.
        </h3>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-neutral-600">
          A member of our team will follow up with a clear next step.
        </p>
        <a
          href={site.phoneHref}
          className="mt-7 inline-flex h-11 items-center justify-center rounded-md border border-neutral-300 px-5 font-semibold text-navy-800 transition-colors duration-[180ms] hover:border-brand-600 hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
        >
          Call {site.phoneDisplay}
        </a>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="mt-5 space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor="quote-full-name" className={compactLabelClass}>
            Full name
          </label>
          <input
            id="quote-full-name"
            name="fullName"
            type="text"
            autoComplete="name"
            pattern=".*\s+.*"
            title="Enter your first and last name."
            placeholder="Full name"
            required
            data-quote-autofocus
            className={compactFieldClass}
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="quote-company" className={compactLabelClass}>
            Company or facility
          </label>
          <input
            id="quote-company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Company or facility"
            className={compactFieldClass}
          />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor="quote-email" className={compactLabelClass}>
            Work email
          </label>
          <input
            id="quote-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Work email"
            required
            className={compactFieldClass}
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="quote-phone" className={compactLabelClass}>
            Phone
          </label>
          <input
            id="quote-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="Phone"
            required
            className={compactFieldClass}
          />
        </div>
      </div>

      <fieldset>
        <legend className={compactLegendClass}>What can we help with?</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {serviceInterests.map((interest) => (
            <label key={interest.value} className="relative cursor-pointer">
              <input
                type="radio"
                name="serviceInterest"
                value={interest.value}
                required
                className="peer sr-only"
              />
              <span className={compactChoiceClass}>
                {interest.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor="quote-timing" className={compactLabelClass}>
            Project timing
          </label>
          <select
            id="quote-timing"
            name="projectTiming"
            defaultValue=""
            className={compactFieldClass}
          >
            <option value="">Project timing</option>
            {projectTimings.map((timing) => (
              <option key={timing.value} value={timing.value}>
                {timing.label}
              </option>
            ))}
          </select>
        </div>
        <div className="grid gap-2">
          <label htmlFor="quote-location" className={compactLabelClass}>
            Facility location
          </label>
          <input
            id="quote-location"
            name="facilityLocation"
            type="text"
            autoComplete="address-level2"
            placeholder="Facility location"
            className={compactFieldClass}
          />
        </div>
      </div>

      <div className="grid gap-2">
        <label htmlFor="quote-message" className={compactLabelClass}>
          Project details
        </label>
        <textarea
          id="quote-message"
          name="message"
          rows={4}
          required
          aria-describedby="quote-message-help"
          placeholder="Project details"
          className={`${compactFieldClass} h-auto min-h-28 resize-y py-3`}
        />
        <p id="quote-message-help" className="text-[0.76rem] leading-relaxed text-neutral-600">
          A short brief is enough. Include the system, facility, and any uptime requirements.
        </p>
      </div>

      <div className="absolute -left-[10000px] top-auto size-px overflow-hidden" aria-hidden="true">
        <label htmlFor="quote-website">Website</label>
        <input
          id="quote-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="border-t border-neutral-200 pt-5">
        <Button
          type="submit"
          disabled={status === "submitting"}
          className="h-12 w-full text-base"
        >
          <PaperPlaneTilt aria-hidden="true" size={18} weight="regular" />
          {status === "submitting" ? "Sending request..." : "Send request"}
        </Button>
        <p className="mt-3 text-center text-[0.76rem] leading-relaxed text-neutral-600">
          Need immediate service?{" "}
          <a href={site.phoneHref} className="font-semibold text-brand-600 hover:text-brand-700">
            Call {site.phoneDisplay}
          </a>
          .
        </p>
      </div>

      <div aria-live="polite">
        {status === "error" ? (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-md border border-danger/25 bg-danger/5 px-4 py-3 text-small text-navy-800"
          >
            <WarningCircle aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-danger" />
            <p>
              We could not send your request. Please call{" "}
              <a href={site.phoneHref} className="font-semibold text-brand-600">
                {site.phoneDisplay}
              </a>{" "}
              or try again.
            </p>
          </div>
        ) : null}
      </div>
    </form>
  );
}
