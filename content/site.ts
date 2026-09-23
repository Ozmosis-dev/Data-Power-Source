export const siteFacts = {
  foundedYear: 1992,
  serviceArea: "Based in Covington and serving Metro Atlanta & the SE US.",
  projectFootprint:
    "Documented project experience in Georgia, North Carolina, and Alabama.",
  emergencyResponse: "24/7 emergency service with a 4-hour response across Metro Atlanta & the SE US",
} as const;

export const site = {
  name: "Data Power Source",
  shortName: "DPS",
  promise: "Power you can build on — installed right, kept running.",
  tagline: "Electrical Solutions for Business Continuity",
  copyrightYear: new Date().getUTCFullYear(),
  phoneDisplay: "(770) 498-9622",
  phoneHref: "tel:+17704989622",
  faxDisplay: "(770) 498-9654",
  faxHref: "tel:+17704989654",
  street: "11187 Bob Williams Parkway",
  cityStateZip: "Covington, GA 30014",
  region: siteFacts.serviceArea,
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
  proofLine: `Serving Metro Atlanta & the SE US since ${siteFacts.foundedYear} · Owner-led · NFPA 70E arc-flash trained · EMR .82–.86 (3-yr) · Drug- & alcohol-free · 24/7 emergency · 4-hour response.`,
} as const;
