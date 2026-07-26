export const homeMeta = {
  title: "Commercial & Industrial Electrical Contractor in Metro Atlanta | Data Power Source",
  description:
    "Data Power Source is a Metro Atlanta commercial and industrial electrical contractor with 25 years installing power that stays on — full electrical, UPS, and standby generator systems. Request a quote.",
};

export const homeHero = {
  overline: "Metro Atlanta · Commercial & Industrial Electrical",
  title: "Power you can build on — installed right, kept running.",
  lead:
    "For 25 years, Data Power Source has installed and maintained the electrical systems that keep commercial and industrial facilities running across Metro Atlanta.",
  imageAlt: "DPS electricians inspecting commercial switchgear in an industrial plant room.",
  imageSrc: "/images/generated/home-hero-switchgear.webp",
  trust: [
    "25 years in the field",
    "NFPA 70E arc-flash trained",
    "24/7 emergency",
    "2-hour response",
  ],
};

export const homeCompany = {
  overline: "About Data Power Source",
  title: "Local leadership. Technical depth. Built around your uptime.",
  body: [
    "Data Power Source is an owner-led electrical contractor serving commercial and industrial facilities across Metro Atlanta.",
    "For 25 years, our crews have combined design-build capability, disciplined field execution, and responsive service for facilities where downtime carries real cost.",
  ],
  credentialLabel: "Recognized contractor",
  credentialBody:
    "Independent Electrical Contractors member serving Atlanta and Georgia.",
  linkLabel: "Learn more about us",
  href: "/about",
  rotatingPhrases: [
    "Industry knowledge",
    "Track record of successful projects",
    "Dynamically responsive",
    "Industry knowledge & design build expertise",
  ],
};

export const homeServices = {
  overline: "Services",
  title: "Design, install, and maintain — under one roof.",
  items: [
    {
      title: "Electrical — Commercial & Industrial",
      description:
        "Turn-key installations, service upgrades, lighting, switchgear, EV charging, 24/7 emergency service.",
      href: "/services/commercial-industrial-electrical",
      discipline: "electrical" as const,
      callouts: [
        "Turn-key installations",
        "Service upgrades & switchgear",
        "Lighting, controls & EV charging",
        "Troubleshooting & maintenance",
      ],
    },
    {
      title: "Mission Critical — UPS Backup & Generators",
      description:
        "Standby generator and UPS installation, data center power, battery replacement, preventive maintenance agreements.",
      href: "/services/mission-critical-power",
      discipline: "mission-critical" as const,
      callouts: [
        "UPS & generator installation",
        "Data-center power",
        "Batteries & preventive maintenance",
        "Cooling & critical distribution",
      ],
    },
    {
      title: "Connectivity — Low Voltage",
      description: "Structured cabling, voice/data, fiber, and telemetry systems installed clean and documented.",
      href: "/services/low-voltage-connectivity",
      discipline: "connectivity" as const,
      callouts: [
        "Structured cabling",
        "Voice/data & fiber",
        "Telemetry systems",
        "Equipment monitoring",
      ],
    },
    {
      title: "Engineering & Design",
      description: "In-house design-build — from a concept to an engineered drawing to a finished system.",
      href: "/services/engineering-design-build",
      discipline: "design-build" as const,
      callouts: [
        "Project design & engineering",
        "Data-center design",
        "Electrical / mechanical design",
        "Engineered drawings",
      ],
    },
  ],
};

export const homeStats = {
  title: "A track record you can verify.",
  body:
    "We don't lead with slogans. We lead with proof — the years we've been doing this, the projects we've delivered, and a safety record we're glad to put in writing.",
  items: [
    { value: "25", suffix: " years", label: "Serving Metro Atlanta's commercial & industrial market" },
    { value: ".82–.86", suffix: " EMR", label: "A documented safety record, three years running" },
    { value: "50+", suffix: " years", label: "Hands-on expertise behind the company" },
    { value: "2-hour", suffix: "", label: "Emergency response" },
  ],
};

export const homeProjects = {
  overline: "Selected work",
  title: "Power delivered where downtime isn't an option.",
  items: [
    {
      title: "Georgia Tech — Holland Heating & Cooling Plant",
      description:
        "Replaced a live 5,000A switchboard and substation in stages, with zero unscheduled disruption to campus.",
      tag: "Education",
      index: "01",
      imageSrc: "/images/generated/project-switchboard-modernization.webp",
      imageAlt: "Representative view of a large institutional switchboard modernization.",
    },
    {
      title: "US Army Combat Readiness Center",
      description:
        "New 250kW standby generator and data-center cooling, delivered without interrupting existing operations.",
      tag: "Government / Military",
      index: "02",
      imageSrc: "/images/generated/project-standby-power.webp",
      imageAlt: "Representative view of a commercial standby generator and cooling installation.",
    },
    {
      title: "Clayton County Public Schools",
      description:
        "Full data-center modernization — UPS, generator, cooling, and service — completed while the center stayed online.",
      tag: "Data Center",
      index: "03",
      imageSrc: "/images/generated/project-data-center.webp",
      imageAlt: "Representative view of UPS and critical distribution equipment in a data center.",
    },
  ],
};

export const homeIndustries = {
  overline: "Industries we serve",
  title: "Built for facilities that have to stay on.",
  items: [
    "Data Centers",
    "Healthcare & Assisted Living",
    "Government & Military",
    "Education",
    "Broadcast & Telecom",
    "Municipal & Utilities",
  ],
};

export const homeReasons = {
  overline: "Why Data Power Source",
  title: "Engineered, established, reliable.",
  items: [
    {
      title: "Owner-led expertise.",
      body: "Founded and still led by a 50+ year electrical veteran — the experience runs through every crew.",
    },
    {
      title: "We design and build in-house.",
      body:
        "No engineer-stamped drawings? No problem. We take your need from concept to engineered drawing to finished system.",
    },
    {
      title: "Safety is documented, not claimed.",
      body: "NFPA 70E trained, drug- and alcohol-free workplace, EMR .82–.86.",
    },
    {
      title: "We work without disrupting yours.",
      body: "25 years of critical installs completed while facilities stayed online.",
    },
  ],
};
