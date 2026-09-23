import { pageMetadata } from "@/lib/seo";

export const homeMeta = pageMetadata({
  title: "Commercial & Industrial Electrical Contractor in Metro Atlanta & the SE US | Data Power Source",
  description:
    "Data Power Source has served commercial and industrial facilities across Metro Atlanta & the SE US since 1992 with electrical installation, UPS, standby generator, and low-voltage systems.",
  path: "/",
});

export const homeHero = {
  overline: "Metro Atlanta & the SE US · Commercial & Industrial Electrical",
  title: "Commercial & Industrial Electrical Contractor Serving Metro Atlanta & the SE US",
  lead:
    "Since 1992, Data Power Source has installed and maintained the electrical systems that keep commercial and industrial facilities running across Metro Atlanta & the SE US. Power you can build on, installed right and kept running.",
  imageAlt: "DPS electricians inspecting commercial switchgear in an industrial plant room.",
  imageSrc: "/images/generated/home-hero-switchgear.webp",
  trust: [
    "Serving Metro Atlanta & the SE US since 1992",
    "NFPA 70E arc-flash trained",
    "24/7 emergency",
    "4-hour response",
  ],
};

export const homeCompany = {
  overline: "About Data Power Source",
  title: "Local leadership. Technical depth. Built around your uptime.",
  body: [
    "Data Power Source is an owner-led electrical contractor serving commercial and industrial facilities across Metro Atlanta & the SE US.",
    "Since 1992, our crews have combined design-build capability, disciplined field execution, and responsive service for facilities where downtime carries real cost.",
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
        "Standby generator and UPS installation, data center power, battery replacement, and critical distribution.",
      href: "/services/mission-critical-power",
      discipline: "mission-critical" as const,
      callouts: [
        "UPS & generator installation",
        "Data-center power",
        "Batteries & critical distribution",
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
    { value: "1992", suffix: "", label: "Serving the commercial & industrial market across Metro Atlanta & the SE US since" },
    { value: ".82–.86", suffix: " EMR", label: "A documented safety record, three years running" },
    { value: "50+", suffix: " years", label: "Hands-on expertise behind the company" },
    { value: "4-hour", suffix: "", label: "Emergency response" },
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
      imageSrc: "/images/projects/georgia-tech-holland-plant/05-new-switchboard.jpg",
      imageAlt: "New 5,000A switchboard installed at Georgia Tech's Holland Heating and Cooling Plant.",
      href: "/projects/georgia-institute-of-technology-holland-heating-cooling-plant-480v-upgrade",
    },
    {
      title: "US Army Combat Readiness Center",
      description:
        "New 250kW standby generator and data-center cooling, delivered without interrupting existing operations.",
      tag: "Government / Military",
      index: "02",
      imageSrc: "/images/projects/us-army-combat-readiness/05-generator-courtyard.jpg",
      imageAlt: "Standby generator inside the new US Army Combat Readiness Center equipment courtyard.",
      href: "/projects/us-army-combat-readiness-center-data-center-generator-and-cooling",
    },
    {
      title: "Local School District Data Center",
      description:
        "Full data-center modernization — UPS, generator, cooling, and service — completed while the center stayed online.",
      tag: "Data Center",
      index: "03",
      imageSrc: "/images/projects/clayton-county-schools/03-data-center-cabinets.jpg",
      imageAlt: "New data center cabinets and critical power equipment at a local school district data center.",
      href: "/projects/clayton-county-public-schools-data-center-modifications",
    },
  ],
};

export const homeIndustries = {
  overline: "Industries we serve",
  title: "Built for facilities that have to stay on.",
  items: [
    {
      title: "Data Centers",
      imageSrc: "/images/industries/data-centers-mission-critical.webp",
      imageAlt: "Technician monitoring critical power equipment inside a data center.",
      imagePosition: "center",
    },
    {
      title: "Healthcare & Assisted Living",
      imageSrc: "/images/industries/healthcare.webp",
      imageAlt:
        "Healthcare facility electrical infrastructure supporting continuous patient care.",
      imagePosition: "center",
    },
    {
      title: "Government & Military",
      imageSrc: "/images/industries/military.webp",
      imageAlt: "Military facility electrical systems built for reliable operations.",
      imagePosition: "center",
    },
    {
      title: "Education",
      imageSrc: "/images/industries/education.webp",
      imageAlt: "Campus electrical infrastructure serving an active education facility.",
      imagePosition: "center",
    },
    {
      title: "Broadcast & Telecom",
      imageSrc: "/images/industries/broadcast-media.webp",
      imageAlt: "Broadcast facility infrastructure supporting always-on communications.",
      imagePosition: "center",
    },
    {
      title: "Municipal & Utilities",
      imageSrc: "/images/industries/government-municipal.webp",
      imageAlt: "Municipal utility infrastructure serving essential public operations.",
      imagePosition: "center",
    },
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
      body: "Critical installations completed since 1992 while facilities stayed online.",
    },
  ],
};
