"use client";

import { PaperPlaneTilt, WarningCircle } from "@phosphor-icons/react";
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

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

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

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      data-testid="contact-form"
      className="mt-7 space-y-4"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor="firstName" className={compactLabelClass}>
            First name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            placeholder="First name"
            required
            className={compactFieldClass}
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="lastName" className={compactLabelClass}>
            Last name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            placeholder="Last name"
            required
            className={compactFieldClass}
          />
        </div>
      </div>

      <div className="grid gap-2">
        <label htmlFor="company" className={compactLabelClass}>
          Company or facility
        </label>
        <input
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          placeholder="Company or facility"
          className={compactFieldClass}
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor="email" className={compactLabelClass}>
            Work email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Work email"
            required
            className={compactFieldClass}
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="phone" className={compactLabelClass}>
            Phone
          </label>
          <input
            id="phone"
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
          <label htmlFor="projectTiming" className={compactLabelClass}>
            Project timing
          </label>
          <select
            id="projectTiming"
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
          <label htmlFor="facilityLocation" className={compactLabelClass}>
            Facility location
          </label>
          <input
            id="facilityLocation"
            name="facilityLocation"
            type="text"
            autoComplete="address-level2"
            placeholder="Facility location"
            className={compactFieldClass}
          />
        </div>
      </div>

      <div className="grid gap-2">
        <label htmlFor="message" className={compactLabelClass}>
          Project details
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          aria-describedby="message-help"
          placeholder="Project details"
          className={`${compactFieldClass} h-auto min-h-28 resize-y py-3`}
        />
        <p id="message-help" className="text-[0.76rem] leading-relaxed text-neutral-600">
          A short brief is enough. Include the system, facility, and any uptime requirements.
        </p>
      </div>

      <div className="absolute -left-[10000px] top-auto size-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
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
        {status === "success" ? (
          <div
            role="status"
            className="rounded-md border border-success/25 bg-success/10 px-4 py-3 text-small font-medium text-navy-800"
          >
            Thanks. We have your request and will be in touch shortly. For anything urgent, call{" "}
            <a href={site.phoneHref} className="font-semibold text-brand-600">
              {site.phoneDisplay}
            </a>
            .
          </div>
        ) : null}
        {status === "error" ? (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-md border border-danger/25 bg-danger/5 px-4 py-3 text-small text-navy-800"
          >
            <WarningCircle aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-danger" />
            <p>
              We could not send your request. Please call us at{" "}
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
