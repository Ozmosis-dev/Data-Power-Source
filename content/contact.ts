export const contactMeta = {
  title: "Contact Data Power Source | Metro Atlanta Electrical Contractor",
  description:
    "Request a quote from Data Power Source for commercial electrical, UPS, and generator services in Metro Atlanta. Call (770) 498-9622 or share your project.",
};

export const contactHero = {
  overline: "Contact",
  title: "Request a quote.",
  lead:
    "Share the facility, scope, and timing. We will review the work and follow up with a clear next step.",
  imageAlt: "An electrician and facility manager reviewing an electrical plan.",
  imageSrc: "/images/generated/faq-field-planning.webp",
};

export const serviceInterests = [
  { value: "commercial-industrial", label: "Commercial and industrial electrical" },
  { value: "mission-critical", label: "Mission critical: UPS and generators" },
  { value: "connectivity", label: "Connectivity and low voltage" },
  { value: "engineering-design", label: "Engineering and design-build" },
  { value: "maintenance", label: "Maintenance or emergency service" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

export const projectTimings = [
  { value: "emergency", label: "Emergency service" },
  { value: "immediate", label: "As soon as possible" },
  { value: "near-term", label: "Within 30 to 90 days" },
  { value: "planning", label: "Planning or budgeting" },
] as const;

export const contactCopy = {
  formTitle: "Send us your project details.",
  formBody:
    "Tell us what needs power, where the work is located, and the timing you are working toward.",
  detailsTitle: "Get in touch.",
  detailsBody:
    "Call to discuss the work directly, or send a project brief and our team will follow up.",
  emergencyTitle: "Need help now?",
  emergencyBody:
    "DPS offers 24/7 emergency service with a 2-hour response across Metro Atlanta.",
  nextTitle: "What happens next.",
  nextSteps: [
    {
      title: "Review the request",
      body: "We review the facility, service need, location, and timing.",
    },
    {
      title: "Assess the site",
      body: "For scoped work, we verify existing conditions, loads, access, and uptime constraints.",
    },
    {
      title: "Define the work",
      body: "You receive a clear next step for scope, price, and schedule.",
    },
  ],
} as const;
