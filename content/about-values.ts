import type { Metadata } from "next";

export const valuesMeta: Metadata = {
  title: "Our Values | Straightforward, Reliable Electrical Work | Data Power Source",
  description:
    "The values behind Data Power Source: engineered precision, reliability, and straightforward answers from a 25-year, owner-led electrical contractor.",
};

export const valuesHero = {
  overline: "Values / Integrity",
  title: "Plain answers. Power that stays on.",
  lead:
    "Experience shapes the plan. Integrity shapes the scope, communication, and finished work.",
  imageSrc: "/images/generated/project-switchboard-modernization.webp",
  imageAlt:
    "Commercial electrical switchboard installation completed with precise cable routing and labeling.",
} as const;

export const valuesStandards = {
  title: "What we stand for.",
  body:
    "Four operating standards guide how DPS plans, communicates, and delivers commercial and industrial electrical work.",
  items: [
    {
      title: "Engineered",
      body:
        "Precision and code compliance belong in every installation. The details are not an afterthought. They are the job.",
      icon: "engineered",
    },
    {
      title: "Reliable",
      body:
        "Power should stay on, and promises should hold. We stay accountable to the agreed scope and schedule.",
      icon: "reliable",
    },
    {
      title: "Straightforward",
      body:
        "You receive plain answers, honest scopes, and practical trade-offs before the work begins.",
      icon: "straightforward",
    },
    {
      title: "Established",
      body:
        "Twenty-five years of commercial and industrial work informs every decision made on your facility.",
      icon: "established",
    },
  ],
} as const;

export const integrityStory = {
  title: "Integrity, in practice.",
  body: [
    "Integrity shows up in the important places: an accurate scope of work, clear communication when conditions change, and craftsmanship you would be comfortable inspecting.",
    "We would rather explain what a job actually requires than win it on a number we cannot deliver. That is how DPS has built long-term commercial and industrial relationships for 25 years.",
  ],
  imageSrc: "/images/generated/project-data-center.webp",
  imageAlt:
    "Electrician inspecting a documented commercial electrical installation in a critical facility.",
} as const;

export const communication = {
  title: "You'll always know where the project stands.",
  body:
    "On critical work, communication means coordinating around operations, flagging risks early, and documenting what was installed.",
  practices: [
    {
      title: "Accurate scope",
      body: "The plan reflects the facility, the load, the access, and the operational constraints.",
    },
    {
      title: "Clear change communication",
      body: "When site conditions change, we explain the impact before proceeding.",
    },
    {
      title: "Documented work",
      body: "The next person who opens the panel should be able to understand what was done.",
    },
  ],
} as const;

export const valuesCta = {
  eyebrow: "Start with a clear scope",
  title: "Work with a contractor who means it.",
  body:
    "Tell us what the facility needs. We will assess the site, explain the trade-offs, and provide a practical path forward.",
} as const;
