import type { Metadata } from "next";

export const valuesMeta: Metadata = {
  title: "Our Values | Safety, Integrity & Workmanship | Data Power Source",
  description:
    "Safety, integrity, workmanship, and responsiveness guide how Data Power Source plans, communicates, installs, and supports critical electrical infrastructure.",
};

export const valuesHero = {
  overline: "Values / Integrity",
  title: "Powering what can't afford to fail.",
  lead:
    "Safety, integrity, workmanship, and responsiveness guide every project and every relationship.",
  imageSrc: "/images/generated/project-switchboard-modernization.webp",
  imageAlt:
    "Commercial electrical switchboard installation completed with precise cable routing and labeling.",
} as const;

export const valuesStandards = {
  title: "What we stand for.",
  body:
    "Four operating values guide how DPS plans, communicates, installs, and responds when the work matters most.",
  items: [
    {
      title: "Safety",
      body:
        "Crews arrive trained and prepared, plan every task with care, and execute with discipline to protect people, facilities, and the team.",
      icon: "safety",
    },
    {
      title: "Integrity",
      body:
        "Honesty, realistic schedules, and clear communication shape the project from the first conversation through closeout.",
      icon: "integrity",
    },
    {
      title: "Workmanship",
      body:
        "Clean, code-compliant installation and attention to detail create reliable power from the main service to the last termination.",
      icon: "workmanship",
    },
    {
      title: "Responsiveness",
      body:
        "Critical facilities cannot wait. Decisive action and follow-through keep urgent outages, failing components, and tight timelines moving.",
      icon: "responsiveness",
    },
  ],
} as const;

export const integrityStory = {
  title: "Integrity you can build on.",
  body: [
    "We believe in a straightforward business approach: honesty, realistic schedules, and clear communication from start to finish.",
    "When the unexpected comes up in complex electrical work, we bring answers and options, not excuses. That approach is why clients return to Data Power Source project after project.",
  ],
  imageSrc: "/images/generated/project-data-center.webp",
  imageAlt:
    "Electrician inspecting a documented commercial electrical installation in a critical facility.",
} as const;

export const communication = {
  title: "Straight answers when plans change.",
  body:
    "Integrity is most visible when site conditions, schedules, or priorities shift. We explain the impact and keep the path forward clear.",
  practices: [
    {
      title: "Honest scope",
      body: "The plan reflects what the facility and the work actually require, not a number that cannot be delivered.",
    },
    {
      title: "Realistic schedules",
      body: "Milestones account for coordination, access, equipment, and the operating constraints of an active facility.",
    },
    {
      title: "Answers and options",
      body: "When the unexpected appears, we explain the choices, recommend a practical response, and follow through.",
    },
  ],
} as const;

export const valuesCta = {
  eyebrow: "Built on trust",
  title: "Bring us the work that matters.",
  body:
    "Expect honest answers, careful workmanship, and a responsive team from the first scope conversation through final turnover.",
} as const;
