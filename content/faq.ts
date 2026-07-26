export type FaqItem = {
  question: string;
  answer: string;
  links?: { label: string; href: string }[];
  pending?: string;
};

export type FaqGroup = {
  label: string;
  title: string;
  description: string;
  items: FaqItem[];
};

export const faqMeta = {
  title: "UPS, Generator & Electrical Contractor FAQs | Data Power Source",
  description:
    "Answers about Metro Atlanta commercial electrical work, UPS and generator systems, switchgear upgrades, EV charging, safety, scheduling, and service.",
};

export const faqHero = {
  overline: "FAQ",
  title: "Questions about power, answered plainly.",
  lead:
    "Straight answers to the questions we hear most — no jargon for its own sake. If yours isn't here, ask us directly.",
  imageAlt: "An electrician and facility engineer reviewing an electrical one-line diagram.",
  imageSrc: "/images/generated/faq-field-planning.webp",
};

export const faqGroups: FaqGroup[] = [
  {
    label: "Power continuity",
    title: "Mission-critical power",
    description: "UPS, standby generators, combined systems, sizing, and ongoing service.",
    items: [
      {
        question: "What's the difference between a UPS and a standby generator?",
        answer:
          "A UPS (uninterruptible power supply) uses batteries to carry your critical load the instant utility power drops — with zero gap — protecting equipment from outages, sags, and surges. A standby generator starts within seconds and provides sustained power for the length of an outage. They solve different halves of the same problem, which is why many critical facilities use both.",
      },
      {
        question: "Do I need a UPS, a generator, or both?",
        answer:
          "It depends on two things: whether your equipment can tolerate even a few seconds without power, and how long you need to run during an outage. Equipment that can't drop for a millisecond (servers, life-safety systems) needs a UPS. Anything that has to run for the duration of an outage needs a generator. For true continuity, a UPS bridges the gap until the generator takes the load. We'll assess your loads and tell you straight what you actually need.",
      },
      {
        question: "How is a UPS sized?",
        answer:
          "A UPS is matched to the load it protects — its capacity should cover your critical equipment with appropriate headroom for growth. We evaluate your critical loads during the site assessment before recommending a size, rather than guessing.",
      },
      {
        question: "What generator sizes do you install?",
        answer:
          "We've installed diesel and natural-gas standby units from 250kW to 500kW and up, with the transfer switches, service, and fuel systems to match. The right size comes from your facility's real demand, not a catalog default.",
      },
      {
        question: "Can you service a UPS or generator you didn't install?",
        answer:
          "Yes. We offer preventive-maintenance agreements — battery testing, load checks, and routine service — for UPS and generators regardless of who installed them.",
      },
      {
        question: "What does an automatic transfer switch do in a standby generator system?",
        answer:
          "An automatic transfer switch monitors the utility supply. If utility power falls outside acceptable limits, it signals the standby generator to start and transfers the designated load once generator power is stable. When utility power returns and stabilizes, the switch transfers the load back. The exact transition and load sequence depend on the facility and system design.",
      },
      {
        question: "How often should commercial UPS batteries be inspected or tested?",
        answer:
          "There is no single schedule for every UPS. Battery age, temperature, operating conditions, and the manufacturer's requirements all matter. Regular visual inspection, system monitoring, and battery testing are part of a sound preventive-maintenance plan. We can test the battery system, document its condition, and replace batteries when the results show it is time.",
      },
    ],
  },
  {
    label: "Electrical systems",
    title: "General electrical",
    description: "The full scope of DPS electrical, connectivity, and design-build services.",
    items: [
      {
        question: "What does Data Power Source do?",
        answer:
          "We're a full-service commercial and industrial electrical contractor. That includes general electrical (turn-key installs, service upgrades, lighting, switchgear, EV charging, troubleshooting, maintenance), mission-critical power (UPS and standby generators), low-voltage and fiber cabling, and in-house engineering and design-build.",
      },
      {
        question: "Do you handle general electrical work, or only backup power?",
        answer:
          "Both. We're a full-service electrical contractor for commercial and industrial facilities — backup power is a specialty, not our only offering.",
      },
      {
        question: "Can you design a system if we don't have engineered drawings?",
        answer:
          'Yes. "No engineer-stamped drawings, no problem." We take a need from concept to engineered drawing to finished system in-house, without sending you to a separate engineering firm first.',
      },
      {
        question: "Do you offer maintenance agreements?",
        answer:
          "Yes — for UPS, generators, and general electrical systems. Planned maintenance keeps small issues from becoming outages.",
      },
      {
        question:
          "Can you upgrade commercial switchgear or electrical service while a facility is occupied?",
        answer:
          "Often, yes. The work may require staged sequencing, temporary power, and planned cutovers so critical operations can stay online. We confirm the existing equipment, loads, and shutdown constraints during the site assessment before setting the work plan.",
      },
      {
        question: "Do you install commercial EV charging stations in Metro Atlanta?",
        answer:
          "Yes. Commercial EV charging is part of our electrical service offering. We evaluate the facility's available capacity and distribution equipment first, then identify whether the project also needs service or switchgear upgrades.",
      },
      {
        question: "Do you install low-voltage cabling and fiber?",
        answer:
          "Yes. We install structured voice and data cabling, fiber, telemetry, and equipment connectivity and monitoring for commercial and industrial facilities.",
      },
    ],
  },
  {
    label: "Safety standards",
    title: "Safety & credentials",
    description: "How training, planning, and a documented record shape field work.",
    items: [
      {
        question: "How do you handle safety?",
        answer:
          "Safety is built into every job. Our electricians are NFPA 70E arc-flash trained and First Aid/CPR certified, we maintain a drug- and alcohol-free workplace, and our EMR has held between .82 and .86 for three years.",
        links: [{ label: "More on our safety program", href: "/about/safety" }],
      },
      {
        question: "What does NFPA 70E arc-flash training cover?",
        answer:
          "NFPA 70E training addresses safe work practices for electrical shock and arc-flash hazards. It covers risk assessment, approach boundaries, personal protective equipment, and the steps used to establish an electrically safe work condition.",
      },
      {
        question:
          "What is an EMR, and why does it matter when choosing an electrical contractor?",
        answer:
          "An Experience Modification Rate compares a company's workers' compensation claims experience with similar businesses. A rate below 1.0 generally reflects better-than-expected claims experience. It is one useful safety indicator, and it is best considered alongside training, planning, supervision, and the contractor's overall record. DPS has maintained an EMR between .82 and .86 for three years.",
      },
    ],
  },
  {
    label: "Project delivery",
    title: "Process & scheduling",
    description: "Starting, sequencing, and completing work around live operations.",
    items: [
      {
        question: "Can you do the work without shutting down our facility?",
        answer:
          "In most cases, yes. Much of our critical work — data-center modernizations, service upgrades, generator cutovers — is completed while the facility stays online, using temporary power and carefully staged sequencing. Avoiding downtime is a core part of how we plan every critical job.",
      },
      {
        question: "How do we get started?",
        answer:
          "Every project starts with a site assessment. Request a quote or call (770) 498-9622, and we'll assess the site, scope the work, and give you a clear plan, price, and schedule.",
        links: [{ label: "Request a quote", href: "/contact" }],
      },
      {
        question: "What happens during a commercial electrical site assessment?",
        answer:
          "We review the facility, existing equipment, available drawings, critical loads, operating constraints, and the work you need completed. That gives us the information to define scope, sequencing, and the next steps for a clear plan, price, and schedule.",
      },
    ],
  },
  {
    label: "Service coverage",
    title: "Service area",
    description: "Where we work, the facilities we serve, and emergency response.",
    items: [
      {
        question: "Are you a commercial electrical contractor serving Covington and Metro Atlanta?",
        answer:
          "We're based in Covington, Georgia and serve the Greater Metro Atlanta area. We've also completed projects across the Southeast, including North Carolina and Alabama.",
        pending: "Broader marketed service radius — pending client confirmation",
      },
      {
        question: "What industries do you work in?",
        answer:
          "Data centers, healthcare and assisted living, government and military, education, broadcast and telecom, and municipal utilities.",
        links: [{ label: "See our industries", href: "/industries" }],
      },
      {
        question: "Do you offer emergency service?",
        answer: "Yes — 24/7 emergency service with a 2-hour response across Metro Atlanta.",
      },
    ],
  },
];

export const allFaqItems = faqGroups.flatMap((group) => group.items);
