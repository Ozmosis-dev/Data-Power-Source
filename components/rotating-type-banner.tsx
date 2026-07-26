"use client";

import { useEffect, useState } from "react";

export function RotatingTypeBanner({
  phrases,
}: {
  phrases: readonly string[];
}) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(media.matches);

    updateMotionPreference();
    media.addEventListener("change", updateMotionPreference);

    return () => media.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (!phrases.length) return;

    if (reducedMotion) {
      return;
    }

    const phrase = phrases[phraseIndex];
    let delay = deleting ? 24 : 44;

    if (!deleting && displayText === phrase) {
      delay = 1500;
    } else if (deleting && displayText === "") {
      delay = 260;
    }

    const timer = window.setTimeout(() => {
      if (!deleting && displayText === phrase) {
        setDeleting(true);
        return;
      }

      if (deleting && displayText === "") {
        setDeleting(false);
        setPhraseIndex((current) => (current + 1) % phrases.length);
        return;
      }

      const nextLength = deleting ? displayText.length - 1 : displayText.length + 1;
      setDisplayText(phrase.slice(0, nextLength));
    }, delay);

    return () => window.clearTimeout(timer);
  }, [deleting, displayText, phraseIndex, phrases, reducedMotion]);

  if (!phrases.length) return null;

  return (
    <section
      data-testid="rotating-type-banner"
      data-motion-state={reducedMotion ? "static" : "typing"}
      className="rotating-banner-surface relative isolate overflow-hidden border-y border-navy-600 py-10 text-white sm:py-12"
    >
      <div
        data-testid="rotating-banner-grid"
        aria-hidden="true"
        className="technical-grid pointer-events-none absolute inset-0 opacity-55"
      />
      <div className="relative mx-auto max-w-container px-5 sm:px-6">
        <p
          data-testid="typewriter-output"
          aria-hidden="true"
          className="min-h-[1.1em] whitespace-nowrap text-center font-display text-[clamp(0.75rem,4.1vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-white"
        >
          {reducedMotion ? phrases[0] : displayText}
          {!reducedMotion ? (
            <span
              aria-hidden="true"
              className="ml-1 inline-block h-[0.82em] w-[0.1em] translate-y-[0.05em] animate-pulse bg-blue-300 motion-reduce:animate-none"
            />
          ) : null}
        </p>
      </div>
      <ul data-testid="rotating-phrase-list" className="sr-only">
        {phrases.map((phrase) => (
          <li key={phrase}>{phrase}</li>
        ))}
      </ul>
    </section>
  );
}
