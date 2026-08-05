export const site = {
  name: "Data Power Source",
  shortName: "DPS",
  promise: "Power you can build on — installed right, kept running.",
  tagline: "Electrical Solutions for Business Continuity",
  phoneDisplay: "(770) 498-9622",
  phoneHref: "tel:+17704989622",
  faxDisplay: "(770) 498-9654",
  faxHref: "tel:+17704989654",
  street: "11187 Bob Williams Parkway",
  cityStateZip: "Covington, GA 30014",
  region: "Serving Metro Atlanta and Georgia.",
  nav: [
    { label: "Industries", href: "/industries" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
  about: [
    {
      key: "overview",
      label: "Overview",
      menuLabel: "About overview",
      href: "/about",
      description: "Company, leadership, and experience",
    },
    {
      key: "safety",
      label: "Safety",
      menuLabel: "Safety",
      href: "/about/safety",
      description: "Program, training, and EMR record",
    },
    {
      key: "values",
      label: "Values & integrity",
      menuLabel: "Values & integrity",
      href: "/about/values",
      description: "How DPS scopes and delivers work",
    },
  ],
  services: [
    {
      label: "Commercial & Industrial Electrical",
      shortLabel: "Electrical",
      href: "/services/commercial-industrial-electrical",
      discipline: "electrical",
      description: "Full-service installations, upgrades, controls, switchgear, and maintenance.",
    },
    {
      label: "Mission Critical Power (UPS & Generators)",
      shortLabel: "Mission Critical Power",
      href: "/services/mission-critical-power",
      discipline: "mission-critical",
      description: "UPS, standby generators, and combined systems for facilities that cannot go dark.",
    },
    {
      label: "Low Voltage & Connectivity",
      shortLabel: "Low Voltage & Connectivity",
      href: "/services/low-voltage-connectivity",
      discipline: "connectivity",
      description: "Structured cabling, fiber, equipment connectivity, and telemetry.",
    },
    {
      label: "Engineering & Design-Build",
      shortLabel: "Engineering & Design-Build",
      href: "/services/engineering-design-build",
      discipline: "design-build",
      description: "Concept, engineering, drawings, installation, and commissioning under one roof.",
    },
  ],
  proofLine:
    "25 years in commercial & industrial electrical · Owner-led · NFPA 70E arc-flash trained · EMR .82–.86 (3-yr) · Drug- & alcohol-free workplace · 24/7 emergency, 2-hour response.",
} as const;

export const stubRoutes = {
  industries: {
    overline: "Industries / Markets",
    title: "Coming in the next pass.",
    body: "Industry-specific proof for critical facilities is already mapped and will be built in the next pass.",
  },
} as const;
