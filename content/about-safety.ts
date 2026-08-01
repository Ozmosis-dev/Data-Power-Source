import type { Metadata } from "next";

export const safetyMeta: Metadata = {
  title: "Electrical Safety Program | NFPA 70E & Arc Flash | Data Power Source",
  description:
    "Safety is built into every Data Power Source job with NFPA 70E arc-flash procedures, First Aid and CPR-trained crews, a drug-free workplace, and a three-year EMR of .82-.86.",
};

export const safetyHero = {
  overline: "Safety",
  title: "Safety first, always.",
  lead:
    "Trained crews, careful planning, and disciplined execution protect your people, your facility, and our team.",
  imageSrc: "/images/generated/faq-field-planning.webp",
  imageAlt:
    "Commercial electricians reviewing a safe work plan beside electrical equipment.",
} as const;

export const safetyProgram = {
  title: "Safety is how we operate.",
  body: [
    "Safety is not a slogan for us. Our crews arrive trained, prepared, and committed to doing the job right. Whether we are working in a live data center, an occupied healthcare facility, or an active industrial plant, we plan every task with care and execute with discipline.",
    "Our comprehensive written safety program defines safe work practices. Every new hire is briefed on that program and issued the required Personal Protective Equipment (PPE) before stepping onto a site. Regular safety meetings and spot checks keep the standard active in the field.",
  ],
  practices: [
    {
      title: "Prepared before the work",
      body: "Every new hire receives a program briefing, required PPE, and clear expectations before entering the job site.",
      icon: "clipboard",
    },
    {
      title: "Checked in the field",
      body: "Careful task planning, regular safety meetings, and spot checks turn the written standard into daily practice.",
      icon: "inspection",
    },
    {
      title: "Ready to respond",
      body: "All employees complete an 8-hour First Aid and CPR training course so crews are prepared when seconds matter.",
      icon: "first-aid",
    },
  ],
} as const;

export const arcFlash = {
  title: "An early adopter of NFPA 70E arc-flash safety.",
  body:
    "Data Power Source was one of the first electrical companies in Atlanta to incorporate and implement NFPA 70E arc-flash hazard procedures into its training program. Around energized equipment, a disciplined procedure is the difference between routine work and unacceptable risk.",
  facts: [
    "Arc-flash procedures embedded in training",
    "Planning for energized-equipment hazards",
    "Documented practices for contractor review",
  ],
} as const;

export const safetyRecord = {
  title: "A safety record you can put a number on.",
  body:
    "Our Experience Modification Rate has held at .86, .86, and .82 over the last three years. That is below the 1.0 industry baseline, where lower is better, and gives risk teams a measurable record to review.",
  emr: {
    value: ".82-.86",
    label: "Three-year EMR range",
    note: "Lower is better than the 1.0 industry baseline.",
    years: [".86", ".86", ".82"],
  },
  controls: [
    "Written safety program",
    "Regular safety meetings",
    "Spot safety checks",
    "PPE issued to new hires",
  ],
  credentials: [
    {
      title: "NFPA 70E arc-flash procedures",
      category: "Electrical safety program",
      icon: "shield",
    },
    {
      title: "Bloodborne pathogens",
      category: "Safety training",
      icon: "drop",
    },
    {
      title: "CPR",
      category: "Required employee training",
      icon: "heartbeat",
    },
    {
      title: "Crane and lifting safety",
      category: "Job-site training",
      icon: "crane",
    },
    {
      title: "First aid",
      category: "Required employee training",
      icon: "first-aid",
    },
    {
      title: "OSHA 10",
      category: "Safety training",
      icon: "hard-hat",
    },
    {
      title: "Aerial-lift operation",
      category: "Qualified operator",
      icon: "ladder",
    },
    {
      title: "Safe digging",
      category: "Field practice",
      icon: "shovel",
    },
    {
      title: "Trench and excavation safety",
      category: "Safety training",
      icon: "traffic-cone",
    },
    {
      title: "Drug- and alcohol-free workplace",
      category: "Workplace policy",
      icon: "prohibit",
    },
  ],
} as const;

export const safetyInPractice = {
  title: "Protection without exception.",
  items: [
    {
      title: "Plan around operations",
      body: "Crews coordinate access, energized conditions, shutdown requirements, and facility continuity before installation begins.",
    },
    {
      title: "Keep the site accountable",
      body: "Trained teams follow the same documented expectations in live data centers, healthcare facilities, and active industrial plants.",
    },
    {
      title: "Protect people and continuity",
      body: "Disciplined execution protects your people, your facility, our team, and the operation that depends on the work.",
    },
  ],
} as const;

export const drugFreeWorkplace = {
  title: "A drug- and alcohol-free workplace.",
  body:
    "Our policy includes testing for all new hires, random testing of current employees, and testing immediately after any accident. It is one more control that helps keep every job site safer for everyone on it.",
} as const;

export const safetyCta = {
  eyebrow: "Plan the work safely",
  title: "Safety-first from the first site visit.",
  body:
    "Bring DPS into the planning process early so scope, access, hazards, and facility continuity are addressed together.",
} as const;
