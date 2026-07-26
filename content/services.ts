export const servicesMeta = {
  title: "Commercial & Industrial Electrical Services in Metro Atlanta | Data Power Source",
  description:
    "Full-service commercial and industrial electrical from Data Power Source — electrical installations, UPS and generator backup, low-voltage cabling, and in-house engineering. Serving Metro Atlanta for 25 years.",
};

export const servicesHero = {
  overline: "Services",
  title: "Electrical solutions for business continuity.",
  lead:
    "Data Power Source has served the Greater Metro Atlanta area for almost 25 years. We have the knowledge and expertise to design, install, and maintain the systems that support your operations — whether that's a single branch circuit or a full standby-and-UPS system protecting a critical facility. Either way, we get it done without disrupting your day.",
};

export const servicesPillars = {
  title: "Two core strengths, one contractor.",
  items: [
    {
      index: "01",
      title: "Electrical — Commercial & Industrial",
      body:
        "Full-service electrical for commercial and industrial facilities: turn-key installations, service upgrades, lighting and controls, switchgear, EV charging, troubleshooting, and maintenance.",
      href: "/services/commercial-industrial-electrical",
      linkLabel: "Explore electrical",
      discipline: "electrical" as const,
      eyebrow: "Build it",
      callouts: [
        "Turn-key electrical",
        "Service upgrades & switchgear",
        "Lighting, controls & EV charging",
      ],
    },
    {
      index: "02",
      title: "Mission Critical — UPS Backup & Generators",
      body:
        "Standby generators, UPS systems, and combined backup power for facilities that can't go dark — installed and maintained by crews who work in critical environments every day.",
      href: "/services/mission-critical-power",
      linkLabel: "Explore mission critical",
      discipline: "mission-critical" as const,
      eyebrow: "Keep it running",
      callouts: [
        "UPS backup systems",
        "Standby generator systems",
        "Preventive maintenance",
      ],
    },
  ],
};

export const allServices = {
  title: "Everything we do.",
  items: [
    {
      title: "Electrical — Commercial & Industrial",
      description:
        "Turn-key builds, service upgrades, lighting and lighting controls, switchgear, EV charging stations, electrical troubleshooting and repair, maintenance contracts, infrared thermography, and 24/7 emergency service.",
      href: "/services/commercial-industrial-electrical",
      discipline: "electrical" as const,
      callouts: [
        "Turn-key builds",
        "Service upgrades & switchgear",
        "Lighting, controls & EV charging",
        "Troubleshooting & maintenance",
      ],
    },
    {
      title: "Mission Critical — UPS Backup & Generators",
      description:
        "Standby generator installation, UPS installation, combined systems, data-center electrical, cable sets, UPS battery replacement, cooling-unit installs, and preventive-maintenance agreements.",
      href: "/services/mission-critical-power",
      discipline: "mission-critical" as const,
      note: "Covers both UPS and standby generators.",
      callouts: [
        "Standby generator installation",
        "UPS installation",
        "Data-center electrical",
        "Batteries & preventive maintenance",
      ],
    },
    {
      title: "Connectivity — Low Voltage",
      description:
        "Structured cabling (CAT 5/5E/6 data, CAT 3 voice), single- and multi-mode fiber, demarcation, moves/adds/changes, equipment connectivity and monitoring, and telemetry systems.",
      href: "/services/low-voltage-connectivity",
      discipline: "connectivity" as const,
      callouts: [
        "Structured copper cabling",
        "Single- & multi-mode fiber",
        "Equipment connectivity & monitoring",
        "Telemetry systems",
      ],
    },
    {
      title: "Engineering & Design",
      description:
        "In-house design-build: project design, electrical engineering, data-center design, and electrical/mechanical design — from concept to engineered drawing to finished system.",
      href: "/services/engineering-design-build",
      discipline: "design-build" as const,
      callouts: [
        "Project design & engineering",
        "Data-center design",
        "Electrical / mechanical design",
        "Concept through finished system",
      ],
    },
  ],
};

export const process = {
  overline: "How we work",
  title: "Every project starts with a site assessment.",
  body:
    "We don't hand you a guess. We verify existing conditions, identify your goals and risks, and deliver a clear scope of work — so you know the plan, the price, and the schedule before we start.",
  steps: [
    {
      title: "Assess.",
      body: "We document existing conditions, code requirements, and the critical power path on site.",
    },
    {
      title: "Design & engineer.",
      body:
        "We develop a solution that meets your budget, timeline, and goals — and can produce engineered drawings when you don't have them.",
    },
    {
      title: "Install.",
      body:
        "We do the work cleanly and on schedule, coordinating around your operations to avoid downtime.",
    },
    {
      title: "Maintain.",
      body:
        "We keep it running with preventive-maintenance agreements for UPS, generators, and critical systems.",
    },
  ],
};
