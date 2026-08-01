import type { ServiceDiscipline } from "@/components/brand-service-mark";

export type CapabilityIcon =
  | "battery"
  | "blueprint"
  | "bolt"
  | "cable"
  | "camera"
  | "car"
  | "circuit"
  | "cooling"
  | "fiber"
  | "generator"
  | "lighting"
  | "maintenance"
  | "monitoring"
  | "network"
  | "repair"
  | "switchgear"
  | "telemetry";

export type ServiceSectionKey =
  | "overview"
  | "proof"
  | "capabilities"
  | "focus"
  | "process"
  | "questions"
  | "related";

export type CapabilityPresentation = "cards" | "ledger" | "split" | "benefit-rail";
export type SectionTone = "white" | "soft" | "accent" | "monochrome";

export type DescriptiveItem = {
  title: string;
  body: string;
  icon?: CapabilityIcon;
};

export type ServiceDetail = {
  slug: string;
  metadata: {
    title: string;
    description: string;
    keywords: string[];
  };
  discipline: ServiceDiscipline;
  theme: {
    accent: string;
    surface: string;
    soft: string;
    tint: string;
  };
  presentation?: {
    sectionOrder?: ServiceSectionKey[];
    focusTone?: SectionTone;
  };
  hero: {
    overline: string;
    title: string;
    lead: string;
    imageSrc: string;
    imageAlt: string;
  };
  overview: {
    title: string;
    body: string[];
    callout: string;
  };
  capabilities: {
    title: string;
    intro: string;
    variant?: CapabilityPresentation;
    tone?: SectionTone;
    items: {
      title: string;
      body: string;
      icon: CapabilityIcon;
      details?: string[];
      groups?: { title: string; details: string[] }[];
    }[];
  };
  focus: {
    title: string;
    body: string;
    items?: string[];
    details?: DescriptiveItem[];
    variant?: "feature-cards" | "systems-directory";
  }[];
  proof: {
    label: string;
    title: string;
    body: string;
    metrics?: { value: string; label: string }[];
    quote?: string;
  };
  process?: {
    title: string;
    body: string;
    steps: { title: string; body: string }[];
  };
  questions?: {
    title: string;
    items: { question: string; answer: string }[];
  };
  related: {
    industries: string[];
    services: { label: string; href: string }[];
  };
  cta: {
    title: string;
    body: string;
    actionLabel?: string;
  };
};

const electrical: ServiceDetail = {
  slug: "commercial-industrial-electrical",
  metadata: {
    title:
      "Commercial & Industrial Electrical Contractor | Metro Atlanta | Data Power Source",
    description:
      "Commercial and industrial electrical installation in Metro Atlanta, including distribution, service upgrades, equipment connections, grounding, and EV charging infrastructure.",
    keywords: [
      "commercial industrial electrical contractor Atlanta",
      "electrical service upgrade",
      "commercial power distribution",
      "switchboard installation",
      "EV charging station installation Georgia",
    ],
  },
  discipline: "electrical",
  theme: {
    accent: "#162792",
    surface: "#162792",
    soft: "#F1F3FB",
    tint: "#E3E7F7",
  },
  hero: {
    overline: "Commercial & Industrial Electrical",
    title: "Electrical installation services, built for business.",
    lead:
      "Complete commercial and industrial installations, power distribution, equipment connections, and EV charging infrastructure.",
    imageSrc: "/images/generated/project-switchboard-modernization.webp",
    imageAlt:
      "Modern commercial switchgear installation inside an industrial electrical room.",
  },
  overview: {
    title: "Complete installations from source to equipment.",
    body: [
      "Data Power Source delivers the electrical infrastructure commercial and industrial facilities need to operate, expand, and connect new equipment.",
      "Our scope runs from design-build delivery and service-entrance upgrades through feeders, branch circuits, raceways, grounding, and final equipment connections.",
    ],
    callout:
      "One installation team coordinates distribution, pathways, equipment, and the capacity your operation needs next.",
  },
  capabilities: {
    title: "Commercial Electrical Installation & EV Charging Services",
    intro:
      "Two coordinated service areas cover the building power system and the charging infrastructure connected to it.",
    variant: "split",
    items: [
      {
        title: "Commercial & industrial installations",
        body:
          "Core electrical distribution and connection work for new construction, active facilities, modernization, and expansion.",
        icon: "switchgear",
        details: [
          "Design-build project delivery",
          "Panelboards, switchboards, and power distribution",
          "Branch circuit and feeder installation",
          "Service entrance and service equipment upgrades",
          "Surge protective devices (SPD) and power quality",
          "Conduit, raceway, cable tray, and busway / bus duct",
          "Machinery and process equipment connections",
          "Grounding and bonding systems",
        ],
        groups: [
          {
            title: "Distribution & protection",
            details: [
              "Panelboards, switchboards, and power distribution",
              "Surge protective devices (SPD) and power quality",
              "Grounding and bonding systems",
            ],
          },
          {
            title: "Pathways & feeders",
            details: [
              "Branch circuit and feeder installation",
              "Conduit, raceway, cable tray, and busway / bus duct",
            ],
          },
          {
            title: "Equipment & delivery",
            details: [
              "Design-build project delivery",
              "Service entrance and service equipment upgrades",
              "Machinery and process equipment connections",
            ],
          },
        ],
      },
      {
        title: "EV charging stations",
        body:
          "Charging systems and make-ready capacity planned around the site, vehicle use, and available electrical service.",
        icon: "car",
        details: [
          "Level 2 (AC) charger installation",
          "DC fast charging (DCFC) installation",
          "Workplace, fleet, and commercial charging",
          "Multi-family, retail, and parking deck charging",
          "EV make-ready infrastructure, including conduit, panels, and transformers",
        ],
        groups: [
          {
            title: "Charger types",
            details: [
              "Level 2 (AC) charger installation",
              "DC fast charging (DCFC) installation",
            ],
          },
          {
            title: "Site applications",
            details: [
              "Workplace, fleet, and commercial charging",
              "Multi-family, retail, and parking deck charging",
            ],
          },
          {
            title: "Make-ready infrastructure",
            details: [
              "EV make-ready infrastructure, including conduit, panels, and transformers",
            ],
          },
        ],
      },
    ],
  },
  focus: [
    {
      title: "Distribution designed for the real load.",
      body:
        "Panelboards, switchboards, feeders, branch circuits, surge protection, grounding, and bonding are coordinated as one power path instead of isolated pieces.",
      items: ["Service entrance", "Distribution", "Equipment connections"],
    },
    {
      title: "Capacity for what comes next.",
      body:
        "Service upgrades and EV make-ready infrastructure create a practical foundation for facility growth, new process equipment, workplace charging, and fleet electrification.",
    },
  ],
  proof: {
    label: "Workmanship",
    title: "From service entrance to final connection.",
    body:
      "Clean, code-compliant installation and close attention to detail help every system perform as designed today and for years to come.",
  },
  related: {
    industries: ["Commercial facilities", "Industrial operations", "Fleet and workplace", "Multi-family and retail"],
    services: [
      { label: "Mission critical power", href: "/services/mission-critical-power" },
      { label: "Engineering and design-build", href: "/services/engineering-design-build" },
    ],
  },
  cta: {
    title: "Plan the complete electrical scope.",
    body:
      "Tell us about the facility, the equipment, and the capacity you need to bring online.",
  },
};

const missionCritical: ServiceDetail = {
  slug: "mission-critical-power",
  metadata: {
    title: "UPS & Standby Generator Installation | Mission Critical Power | Atlanta",
    description:
      "Mission-critical power systems for facilities that cannot go dark, including UPS, generators, transfer switches, distribution, commissioning, and lifecycle support.",
    keywords: [
      "mission critical electrical Atlanta",
      "commercial UPS installation Atlanta",
      "standby generator installation Georgia",
      "automatic transfer switch installation",
      "critical power commissioning",
    ],
  },
  discipline: "mission-critical",
  theme: {
    accent: "#B9330E",
    surface: "#B9330E",
    soft: "#FFF3EE",
    tint: "#FBDDD2",
  },
  presentation: {
    sectionOrder: ["overview", "proof", "capabilities", "focus", "related"],
    focusTone: "soft",
  },
  hero: {
    overline: "Mission-Critical Power",
    title: "When downtime isn't an option, power can't be an afterthought.",
    lead:
      "Power that has to be there through every outage, transfer, and load swing.",
    imageSrc: "/images/generated/project-standby-power.webp",
    imageAlt:
      "Commercial standby generator equipment serving a mission-critical facility.",
  },
  overview: {
    title: "Some facilities simply cannot go dark.",
    body: [
      "Data centers, hospitals, control rooms, distribution hubs, and continuous-process manufacturing lines depend on power every second, including the moments when the utility cannot provide it.",
      "Data Power Source designs, installs, and maintains the critical power infrastructure that carries demanding commercial and industrial operations across the Southeast through outages, transfers, and load swings.",
    ],
    callout:
      "A critical power system is not a collection of parts. It is one engineered, integrated continuity system.",
  },
  capabilities: {
    title: "What we deliver.",
    intro:
      "A complete critical power system, engineered and integrated around the loads that cannot tolerate interruption.",
    tone: "white",
    items: [
      {
        title: "Uninterruptible power supply systems",
        body:
          "UPS battery systems ride through disturbances and bridge the gap to standby power for loads that cannot tolerate even a momentary interruption.",
        icon: "battery",
      },
      {
        title: "Standby & emergency generators",
        body:
          "Diesel and natural-gas gensets are engineered to the outage profile, from single units to paralleled plants that scale with the load.",
        icon: "generator",
      },
      {
        title: "Automatic transfer switches",
        body:
          "Automatic and manual transfer schemes move the facility to backup power and return it to utility when the grid stabilizes.",
        icon: "bolt",
      },
      {
        title: "Power distribution & switchgear",
        body:
          "Service-entrance to branch-circuit distribution is coordinated, selectively protected, and built to NEC standard.",
        icon: "switchgear",
      },
    ],
  },
  focus: [
    {
      title: "Built on proven equipment.",
      body:
        "We design and install around Schneider Electric, Eaton, Vertiv, Cummins, Kohler, and Caterpillar, matching equipment to load, runtime, and redundancy requirements instead of forcing one standard solution.",
      items: ["Specified on merit", "Manufacturer-supported", "Built to last"],
    },
    {
      title: "Engineered to code, proven under load.",
      body:
        "Deep NEC fluency guides feeder sizing, parallel conductors, equipment grounding, and overcurrent coordination. We commission under real load and document the results before the system is needed in an emergency.",
    },
    {
      title: "Support that doesn't stop at startup.",
      body:
        "Critical power is a lifecycle, not a one-time install. Responsive service keeps the infrastructure ready for the day the utility is not.",
    },
  ],
  proof: {
    label: "What's at stake",
    title: "We build for that instant.",
    body:
      "When the grid drops, the cost is measured in lost production, spoiled product, dropped transactions, and safety systems that cannot be allowed to fail. The system has to perform flawlessly the instant it is called on.",
  },
  related: {
    industries: ["Data centers", "Hospitals", "Control rooms", "Distribution hubs", "Continuous-process manufacturing"],
    services: [
      { label: "Commercial and industrial electrical", href: "/services/commercial-industrial-electrical" },
      { label: "Engineering and design-build", href: "/services/engineering-design-build" },
    ],
  },
  cta: {
    title: "Keep the power on.",
    body: "Start with an assessment of your critical load, runtime, and redundancy needs.",
    actionLabel: "Let's Talk",
  },
};

const connectivity: ServiceDetail = {
  slug: "low-voltage-connectivity",
  metadata: {
    title: "Structured Cabling & Fiber Optic Installation | Low Voltage | Atlanta",
    description:
      "Structured cabling, fiber optic infrastructure, certified copper and fiber testing, and adjacent low-voltage systems for commercial and critical facilities.",
    keywords: [
      "structured cabling fiber installation Atlanta",
      "low voltage cabling Georgia",
      "copper cable certification",
      "fiber optic installation",
      "OTDR testing Atlanta",
    ],
  },
  discipline: "connectivity",
  theme: {
    accent: "#08751A",
    surface: "#08751A",
    soft: "#EFFAF1",
    tint: "#D6F0DB",
  },
  hero: {
    overline: "Low Voltage Services",
    title: "Structured cabling, fiber, and testing for critical facilities.",
    lead:
      "Installed, certified, labeled, and documented for commercial, industrial, and mission-critical environments.",
    imageSrc: "/images/generated/service-connectivity-cabling.webp",
    imageAlt:
      "Low-voltage technician organizing structured copper and fiber cabling in a commercial telecom room.",
  },
  overview: {
    title: "The physical network, complete and accountable.",
    body: [
      "Data Power Source installs structured copper cabling, fiber optic infrastructure, rooms, racks, pathways, and adjacent low-voltage connections as one coordinated system.",
      "Certification, labeling, as-built drawings, and turnover packages make the installation easier to verify on day one and easier to operate for years.",
    ],
    callout:
      "Every pathway, termination, test result, and label contributes to a network your team can trust and maintain.",
  },
  capabilities: {
    title: "Structured Cabling, Fiber Optic & Low-Voltage Services",
    intro:
      "Four connected disciplines carry the project from pathway and cable installation through certification and turnover.",
    variant: "ledger",
    items: [
      {
        title: "Structured cabling & data communications",
        body:
          "Copper, voice, rooms, racks, pathways, and administration for complete building and data-center networks.",
        icon: "network",
        details: [
          "Category copper cabling installation: Cat5e, Cat6, Cat6A, and Cat8 for short-reach data center runs",
          "Horizontal cabling and backbone / riser cabling",
          "Voice cabling and integrated voice / data drops",
          "Termination of jacks, patch panels, and 110/66 blocks",
          "Telecom / equipment room (TR/ER) and IDF / MDF build-outs",
          "Racks, cabinets, ladder rack, and cable management",
          "Pathways and support: cable tray, J-hooks, conduit, sleeves, and firestopping",
          "Move / add / change (MAC) work and cabling remediation",
          "ANSI/TIA-606 labeling and administration",
        ],
      },
      {
        title: "Fiber optic cabling",
        body:
          "Inside and outside plant fiber installation, splicing, termination, enclosure, and backbone work.",
        icon: "fiber",
        details: [
          "Single-mode (OS2) and multimode (OM3 / OM4 / OM5) installation",
          "Indoor, indoor/outdoor, and outside plant (OSP) fiber: aerial, direct burial, and innerduct",
          "Fusion splicing and mechanical splicing",
          "Field termination and connectorization, including splice-on connectors and pigtails",
          "Fiber patch panels, enclosures / LIUs, and cassettes",
          "Backbone, riser, and campus / inter-building links",
        ],
      },
      {
        title: "Certification & testing",
        body:
          "Standards-based proof, fault location, and complete documentation for copper and fiber infrastructure.",
        icon: "monitoring",
        details: [
          "Copper certification to TIA/ISO standards with Fluke DSX-class testers",
          "Fiber Tier 1 certification: insertion loss / optical loss (OLTS)",
          "Fiber Tier 2 certification: OTDR trace and analysis",
          "Fiber end-face inspection to IEC standards",
          "Test result documentation, as-built drawings, and turnover packages",
          "Troubleshooting and fault location on existing copper / fiber plant",
        ],
      },
      {
        title: "Adjacent low-voltage systems",
        body:
          "Coordinated cabling and infrastructure for connected building, wireless, cellular, surveillance, and data-center systems.",
        icon: "telemetry",
        details: [
          "IP video surveillance / CCTV cabling",
          "Wireless access point (WAP) cabling and coordination",
          "Distributed antenna systems (DAS) and in-building cellular",
          "Data center structured cabling and containment",
        ],
      },
    ],
  },
  focus: [
    {
      title: "Install cleanly. Prove performance.",
      body:
        "Cable routing, support, bend radius, termination, splicing, and inspection are completed as part of one quality standard, then verified with the right test method for the medium.",
      items: ["TIA/ISO copper", "OLTS and OTDR fiber", "IEC end-face inspection"],
    },
    {
      title: "Turn over a system your team understands.",
      body:
        "ANSI/TIA-606 administration, test results, as-built drawings, labels, and turnover packages document what was installed and how it performs.",
    },
  ],
  proof: {
    label: "Certification",
    title: "Certified, documented, ready for turnover.",
    body:
      "Copper and fiber infrastructure is tested to the applicable standards, with results and as-built records prepared for the team that will operate it.",
  },
  related: {
    industries: ["Commercial facilities", "Industrial facilities", "Data centers", "Campus environments"],
    services: [
      { label: "Mission critical power", href: "/services/mission-critical-power" },
      { label: "Engineering and design-build", href: "/services/engineering-design-build" },
    ],
  },
  cta: {
    title: "Plan a network built for turnover.",
    body:
      "Bring us the pathways, media, test requirements, and operating environment.",
  },
};

const designBuild: ServiceDetail = {
  slug: "engineering-design-build",
  metadata: {
    title: "Electrical Design-Build & Engineering | Concept to Install | Atlanta",
    description:
      "Single-source electrical and critical-power design-build, from discovery and engineered drawings through construction, commissioning, and documentation.",
    keywords: [
      "electrical design-build contractor Georgia",
      "electrical engineering services Atlanta",
      "critical power design build",
      "data center power design",
    ],
  },
  discipline: "design-build",
  theme: {
    accent: "#1A1A1A",
    surface: "#1A1A1A",
    soft: "#F1F2F4",
    tint: "#DFE2E7",
  },
  hero: {
    overline: "Design-Build",
    title: "One team. One contract. One point of accountability.",
    lead:
      "Electrical and critical-power systems carried from the first sketch to the final commissioning report.",
    imageSrc: "/images/generated/faq-field-planning.webp",
    imageAlt:
      "Electrical professionals reviewing engineered drawings beside switchgear.",
  },
  overview: {
    title: "Concept to energized equipment, under one roof.",
    body: [
      "Data Power Source engineers and installs electrical and critical-power systems as one integrated team, so design decisions are grounded in what actually gets built.",
      "The crew building the system understands the intent behind every line on the drawing, reducing coordination time and keeping responsibility in one place through commissioning.",
    ],
    callout:
      "We own the outcome from the first sketch to the final commissioning report.",
  },
  capabilities: {
    title: "Why design-build works for critical power.",
    intro:
      "Mission-critical power isn't a place for handoffs and finger-pointing. A gap between the designer and installer is where schedules slip, costs creep, and reliability suffers. Bringing both under one agreement closes that gap.",
    variant: "benefit-rail",
    tone: "monochrome",
    items: [
      {
        title: "Single-source responsibility",
        body:
          "One team is accountable for design, procurement, installation, and startup. When questions come up in the field, they're answered by the same people who drew the plan, not routed through a chain of subcontractors.",
        icon: "blueprint",
      },
      {
        title: "Faster to energized",
        body:
          "Design and construction overlap instead of running end to end. Long-lead equipment gets ordered early, permitting moves in parallel with detailing, and the facility comes online sooner.",
        icon: "bolt",
      },
      {
        title: "Cost certainty, earlier",
        body:
          "Because we price what we design, budget surprises get caught on paper before switchgear is on order. You get realistic numbers early and fewer change orders late.",
        icon: "circuit",
      },
      {
        title: "Buildability baked in",
        body:
          "Field expertise informs the design from day one. Feeder routing, equipment access, grounding, and maintenance clearances are considered before they become problems on site.",
        icon: "cooling",
      },
    ],
  },
  focus: [
    {
      title: "What we design and build.",
      body:
        "Complete electrical and critical-power systems are built around the requirements of the operation, not around a catalog.",
      variant: "systems-directory",
      details: [
        {
          title: "Uninterruptible power supply systems",
          body: "Sized, configured, and integrated for the loads that can't go dark.",
          icon: "battery",
        },
        {
          title: "Standby and emergency power",
          body: "Generators and automatic transfer switches.",
          icon: "generator",
        },
        {
          title: "Power distribution and switchgear",
          body:
            "From the service entrance to the branch circuit, coordinated and code-compliant.",
          icon: "switchgear",
        },
        {
          title: "IT and server room power upgrades",
          body:
            "Clean, redundant power and cooling infrastructure for the spaces your business runs on.",
          icon: "cooling",
        },
        {
          title: "Electrical service upgrades",
          body: "Capacity for growth, planned around your operations and your uptime.",
          icon: "bolt",
        },
      ],
    },
    {
      title: "Built around your business.",
      body:
        "A data center, distribution hub, and manufacturing floor define reliable power differently. We match redundancy, runtime, and resilience to the risk your operation actually carries.",
    },
  ],
  proof: {
    label: "One accountable outcome",
    title: "Designed to the load, the site, and the reliability standard.",
    body:
      "Buildability and budget stay in view throughout design, and the same team tests, verifies, documents, and commissions the installed system under load.",
  },
  process: {
    title: "Our process.",
    body:
      "A continuous four-step path keeps design intent, field execution, and final proof connected.",
    steps: [
      {
        title: "Discovery",
        body:
          "Define the loads, constraints, acceptable risk, required runtime, and growth plan.",
      },
      {
        title: "Design",
        body:
          "Develop one-lines, equipment selections, load calculations, and code coordination with buildability and budget in view.",
      },
      {
        title: "Build",
        body:
          "The same team installs what it designed, with field crews who understand the intent behind every detail.",
      },
      {
        title: "Commission",
        body:
          "Test, verify, and prove the system under load, then document exactly what the facility has.",
      },
    ],
  },
  related: {
    industries: ["Data centers", "Distribution hubs", "Manufacturing", "Commercial facilities"],
    services: [
      { label: "Mission critical power", href: "/services/mission-critical-power" },
      { label: "Commercial and industrial electrical", href: "/services/commercial-industrial-electrical" },
    ],
  },
  cta: {
    title: "Let's talk about your project.",
    body:
      "Start with the loads, constraints, reliability requirements, and growth plan.",
  },
};

export type ServiceDetailSlug =
  | "commercial-industrial-electrical"
  | "mission-critical-power"
  | "low-voltage-connectivity"
  | "engineering-design-build";

export const serviceDetails: Record<ServiceDetailSlug, ServiceDetail> = {
  "commercial-industrial-electrical": electrical,
  "mission-critical-power": missionCritical,
  "low-voltage-connectivity": connectivity,
  "engineering-design-build": designBuild,
};
