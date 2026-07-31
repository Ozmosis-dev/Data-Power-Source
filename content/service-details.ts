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
    items: {
      title: string;
      body: string;
      icon: CapabilityIcon;
    }[];
  };
  focus: {
    title: string;
    body: string;
    items?: string[];
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
  };
};

const electrical: ServiceDetail = {
  slug: "commercial-industrial-electrical",
  metadata: {
    title:
      "Commercial & Industrial Electrical Contractor | Metro Atlanta | Data Power Source",
    description:
      "Full-service commercial and industrial electrical in Metro Atlanta: turn-key installations, service upgrades, lighting, switchgear, EV charging, and 24/7 emergency repair.",
    keywords: [
      "commercial industrial electrical contractor Atlanta",
      "electrical service upgrade",
      "commercial lighting installation",
      "switchgear installation",
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
    overline: "Commercial & Industrial",
    title: "Commercial and industrial electrical, done right the first time.",
    lead:
      "Full-service electrical work for Metro Atlanta facilities, from service upgrades to ground-up builds, completed cleanly and built to last.",
    imageSrc: "/images/generated/project-switchboard-modernization.webp",
    imageAlt:
      "Modern commercial switchgear installation inside an industrial electrical room.",
  },
  overview: {
    title: "One contractor, from design to done.",
    body: [
      "We handle design, installation, troubleshooting, and ongoing maintenance under one roof. Fewer handoffs mean clearer accountability and a team that already knows your building.",
      "Facility managers, general contractors, and industrial operators get responsive, professional work backed by a documented safety program.",
    ],
    callout: "The same accountable team can assess it, build it, repair it, and maintain it.",
  },
  capabilities: {
    title: "What we install and service.",
    intro:
      "Complete electrical support for new construction, active facilities, and planned modernization.",
    items: [
      {
        title: "Turn-key electrical installations",
        body: "Complete commercial and industrial builds, coordinated from mobilization through commissioning.",
        icon: "bolt",
      },
      {
        title: "Electrical service upgrades",
        body: "Add capacity for expansions, new equipment, and higher operating demand.",
        icon: "circuit",
      },
      {
        title: "Lighting and controls",
        body: "Installations, retrofits, and replacements for efficiency, performance, and code.",
        icon: "lighting",
      },
      {
        title: "Switchgear",
        body: "Main service switchboards, distribution equipment, replacements, and cutovers.",
        icon: "switchgear",
      },
      {
        title: "EV charging stations",
        body: "Commercial charging infrastructure planned and installed to code.",
        icon: "car",
      },
      {
        title: "Troubleshooting and repair",
        body: "Find the fault, correct the issue, and document the completed work.",
        icon: "repair",
      },
      {
        title: "Maintenance contracts",
        body: "Planned upkeep that keeps small electrical problems from becoming outages.",
        icon: "maintenance",
      },
      {
        title: "Infrared thermography",
        body: "Identify hot spots and failing connections before they interrupt operations.",
        icon: "camera",
      },
      {
        title: "24/7 emergency service",
        body: "A 2-hour response across Metro Atlanta when the problem cannot wait.",
        icon: "bolt",
      },
    ],
  },
  focus: [
    {
      title: "Assess before the first shutdown.",
      body:
        "Every job starts with a site assessment. We verify existing conditions, identify goals and risks, then provide the plan, price, and schedule before work begins.",
      items: [
        "Existing conditions and code requirements",
        "Operational constraints and shutdown windows",
        "A clear scope built around the facility",
      ],
    },
    {
      title: "Coordinate around your operation.",
      body:
        "Installation is sequenced around occupied facilities, active production, and critical business hours. Clean work and clear communication are part of the electrical scope.",
    },
  ],
  proof: {
    label: "Craftsmanship",
    title: "Workmanship is never an accident.",
    body: "Quality and craftsmanship at every turn, on every project.",
    quote: "It is always the result of intelligent effort.",
  },
  process: {
    title: "A clear path from assessment to closeout.",
    body:
      "A defined scope keeps the work accountable and gives your team a schedule it can plan around.",
    steps: [
      { title: "Assess", body: "Document conditions, capacity, risks, and operating constraints." },
      { title: "Scope", body: "Set the plan, price, schedule, and shutdown sequence." },
      { title: "Install", body: "Complete the work cleanly and coordinate every handoff." },
      { title: "Maintain", body: "Protect the investment with planned service and support." },
    ],
  },
  related: {
    industries: ["Data centers", "Healthcare", "Government and military", "Education"],
    services: [
      { label: "Mission critical power", href: "/services/mission-critical-power" },
      { label: "Engineering and design-build", href: "/services/engineering-design-build" },
    ],
  },
  cta: {
    title: "Need it powered? Let's scope it.",
    body: "Start with a site assessment and a clear plan for the work.",
  },
};

const missionCritical: ServiceDetail = {
  slug: "mission-critical-power",
  metadata: {
    title: "UPS & Standby Generator Installation | Mission Critical Power | Atlanta",
    description:
      "Mission-critical power from Data Power Source: commercial UPS systems, standby generator installation, and combined backup for facilities that cannot go dark.",
    keywords: [
      "mission critical electrical Atlanta",
      "commercial UPS installation Atlanta",
      "standby generator installation Georgia",
      "data center electrical services",
      "UPS battery replacement",
    ],
  },
  discipline: "mission-critical",
  theme: {
    accent: "#B9330E",
    surface: "#B9330E",
    soft: "#FFF3EE",
    tint: "#FBDDD2",
  },
  hero: {
    overline: "Mission Critical Power",
    title: "When the grid drops, your operation shouldn't.",
    lead:
      "Integrated UPS and generator systems keep critical loads online through utility loss, transfer, and sustained outages.",
    imageSrc: "/images/generated/project-standby-power.webp",
    imageAlt:
      "Commercial standby generator equipment serving a mission-critical facility.",
  },
  overview: {
    title: "UPS, generators, or both, engineered to your load.",
    body: [
      "Our crews design, build, and maintain systems inside critical environments without taking existing operations offline.",
      "For most facilities, continuity means a UPS for the instantaneous bridge and a standby generator for sustained power. We assess the load and tell you what the facility actually needs.",
    ],
    callout: "Milliseconds matter. The complete system must work as one continuous power path.",
  },
  capabilities: {
    title: "Critical power, from source to load.",
    intro:
      "Design, installation, integration, and maintenance for the equipment between utility loss and restored service.",
    items: [
      {
        title: "UPS installation",
        body: "Single-cabinet and large three-phase systems integrated with existing power.",
        icon: "battery",
      },
      {
        title: "Standby generators",
        body: "Diesel and natural-gas systems with transfer switches and infrastructure.",
        icon: "generator",
      },
      {
        title: "Data-center electrical",
        body: "Power distribution, riser upgrades, PDUs, and coordinated cutovers.",
        icon: "circuit",
      },
      {
        title: "Cable sets",
        body: "Electrical cable sets built, installed, tested, and documented.",
        icon: "cable",
      },
      {
        title: "Battery replacement",
        body: "UPS battery testing, replacement, and preventive maintenance.",
        icon: "battery",
      },
      {
        title: "Precision cooling",
        body: "In-row and CRAC unit installation with containment coordination.",
        icon: "cooling",
      },
    ],
  },
  focus: [
    {
      title: "The instantaneous bridge.",
      body:
        "A UPS carries the critical load the millisecond utility power drops. It protects equipment from outages, sags, and surges until generator power is stable.",
      items: ["UPS installation", "Battery replacement", "Power distribution"],
    },
    {
      title: "Sustained standby power.",
      body:
        "A properly sized generator takes over for the duration of the outage. Transfer switches, fuel, service, and permitting are coordinated as one installation.",
      items: ["Generator installation", "Automatic transfer switches", "Temporary staging"],
    },
    {
      title: "One integrated continuity plan.",
      body:
        "UPS, generator, distribution, and cooling are designed around the same critical load, with cutovers planned to keep the room online.",
    },
  ],
  proof: {
    label: "Continuity",
    title: "The bridge between utility loss and sustained backup.",
    body:
      "A coordinated UPS and generator system protects the load immediately, then carries it for as long as the outage lasts.",
    metrics: [
      { value: "0 ms", label: "The continuity goal at the critical load" },
      { value: "24/7", label: "The standard your operation expects" },
    ],
  },
  process: {
    title: "Ready before the day you need it.",
    body:
      "A backup system is only as reliable as its last service. We support equipment we install and systems already in place.",
    steps: [
      { title: "Assess", body: "Verify the load, runtime, topology, and existing equipment." },
      { title: "Engineer", body: "Design the system and the live-facility cutover plan." },
      { title: "Install", body: "Coordinate equipment, controls, testing, and commissioning." },
      { title: "Maintain", body: "Test batteries, loads, generators, and transfer equipment." },
    ],
  },
  questions: {
    title: "Choosing the right continuity system.",
    items: [
      {
        question: "Do we need a UPS, a generator, or both?",
        answer:
          "A UPS protects the load instantly. A generator provides sustained power. Critical facilities commonly need both.",
      },
      {
        question: "Can you work without taking the facility offline?",
        answer:
          "Yes. We plan phased work, temporary power, and cutovers around the active operation.",
      },
      {
        question: "Do you maintain systems you did not install?",
        answer:
          "Yes. We service existing UPS and generator equipment after assessing its condition and scope.",
      },
    ],
  },
  related: {
    industries: ["Data centers", "Healthcare", "Government and military", "Broadcast and telecom"],
    services: [
      { label: "Commercial and industrial electrical", href: "/services/commercial-industrial-electrical" },
      { label: "Engineering and design-build", href: "/services/engineering-design-build" },
    ],
  },
  cta: {
    title: "Protect your critical load.",
    body: "Plan the full power path before the next utility event finds the weak point.",
  },
};

const connectivity: ServiceDetail = {
  slug: "low-voltage-connectivity",
  metadata: {
    title: "Structured Cabling & Fiber Optic Installation | Low Voltage | Atlanta",
    description:
      "Low-voltage and connectivity work from Data Power Source: structured cabling, voice and data, single-mode and multi-mode fiber, and telemetry systems.",
    keywords: [
      "structured cabling fiber installation Atlanta",
      "low voltage cabling Georgia",
      "voice data cabling",
      "fiber optic installation",
      "telemetry systems installation",
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
    overline: "Connectivity and Low Voltage",
    title: "Structured cabling, installed clean and documented.",
    lead:
      "More than 20 years of neat, documented copper and fiber installations for reliable commercial networks.",
    imageSrc: "/images/generated/service-connectivity-cabling.webp",
    imageAlt:
      "Low-voltage technician organizing structured copper and fiber cabling in a commercial telecom room.",
  },
  overview: {
    title: "Cabling you won't have to think about.",
    body: [
      "Network reliability often comes down to the cabling underneath it. We apply care to every run, termination, and label because clean cabling is easier to maintain and troubleshoot.",
      "As facilities have moved to fiber, our training and field experience have kept pace. Copper and fiber are delivered as one orderly connectivity system.",
    ],
    callout: "Neat routing and clear documentation make the network easier to operate for years.",
  },
  capabilities: {
    title: "Low-voltage and connectivity services.",
    intro:
      "The physical network, installed with the same discipline as the electrical systems supporting it.",
    items: [
      {
        title: "CAT 5, 5E, and 6 data",
        body: "Structured copper runs, terminations, patching, testing, and labeling.",
        icon: "network",
      },
      {
        title: "CAT 3 voice",
        body: "Voice wiring for facilities that still depend on legacy connections.",
        icon: "cable",
      },
      {
        title: "Single-mode fiber",
        body: "Long-distance, high-bandwidth fiber installation and termination.",
        icon: "fiber",
      },
      {
        title: "Multi-mode fiber",
        body: "Reliable fiber links for building and campus network environments.",
        icon: "fiber",
      },
      {
        title: "Demarcation boards",
        body: "Clean transition points that simplify carrier and facility handoffs.",
        icon: "circuit",
      },
      {
        title: "Moves, adds, and changes",
        body: "Practical network updates coordinated around active operations.",
        icon: "repair",
      },
      {
        title: "Telemetry systems",
        body: "Connectivity, monitoring, control, antenna work, and system upgrades.",
        icon: "telemetry",
      },
    ],
  },
  focus: [
    {
      title: "Copper and fiber, one standard of workmanship.",
      body:
        "Cable routing, bend radius, termination, testing, and labels are handled as part of the finished system, not as cleanup after installation.",
      items: ["Orderly pathways", "Tested terminations", "Maintainable documentation"],
    },
    {
      title: "Connectivity beyond the telecom room.",
      body:
        "We connect equipment, monitoring, and field telemetry across commercial and municipal environments, including outdoor and elevated infrastructure.",
    },
  ],
  proof: {
    label: "Featured project",
    title: "50+ telemetry sites for the City of Atlanta.",
    body:
      "DPS upgraded water-pressure monitoring sites from hardwired controls to radio-based telemetry, including field work, panels, antenna poles, networking, and engineered drawings.",
    metrics: [
      { value: "50+", label: "Water-pressure monitoring sites connected" },
      { value: "1", label: "Coordinated network for monitoring and control" },
    ],
  },
  related: {
    industries: ["Municipal and utilities", "Broadcast and telecom", "Data centers"],
    services: [
      { label: "Mission critical power", href: "/services/mission-critical-power" },
      { label: "Engineering and design-build", href: "/services/engineering-design-build" },
    ],
  },
  cta: {
    title: "Planning a cabling or fiber project?",
    body: "Start with the pathways, terminations, documentation, and operating requirements.",
  },
};

const designBuild: ServiceDetail = {
  slug: "engineering-design-build",
  metadata: {
    title: "Electrical Design-Build & Engineering | Concept to Install | Atlanta",
    description:
      "In-house electrical design-build from Data Power Source. We take a need from concept to engineered drawing to finished system in Metro Atlanta.",
    keywords: [
      "electrical design-build contractor Georgia",
      "electrical engineering services Atlanta",
      "data center design",
      "electrical mechanical design build",
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
    overline: "Engineering and Design-Build",
    title: "From a thought to an engineered solution.",
    lead:
      "Bring us the need. We design, engineer, document, build, and commission the working solution.",
    imageSrc: "/images/generated/faq-field-planning.webp",
    imageAlt:
      "Electrical professionals reviewing engineered drawings beside switchgear.",
  },
  overview: {
    title: "No engineer-stamped drawings? No problem.",
    body: [
      "Projects often stall because the customer has a real facility need but no design to build from. We close that gap.",
      "Decades of design-build experience take the project from conceptual design to engineered drawings and a finished system without adding a separate handoff first.",
    ],
    callout: "The people estimating and installing the work help shape the design from the start.",
  },
  capabilities: {
    title: "What we design and build.",
    intro:
      "A single-source path for electrical and mechanical needs that start without a complete drawing set.",
    items: [
      {
        title: "Project design-build",
        body: "Complete delivery under one accountable team and coordinated scope.",
        icon: "blueprint",
      },
      {
        title: "Electrical engineering",
        body: "Engineered drawings, load studies, system design, and field coordination.",
        icon: "circuit",
      },
      {
        title: "Data-center design",
        body: "Power, cooling, distribution, containment, and continuity planning.",
        icon: "network",
      },
      {
        title: "Electrical and mechanical design",
        body: "Integrated systems designed to work together in the real facility.",
        icon: "cooling",
      },
    ],
  },
  focus: [
    {
      title: "Design informed by installation.",
      body:
        "The drawing reflects what can be built, maintained, and commissioned in the actual space. Field constraints surface on paper, not halfway through construction.",
      items: ["Existing conditions verified", "Constructability built in", "Commissioning considered early"],
    },
    {
      title: "Installation accountable to the design.",
      body:
        "The team that develops the scope stays responsible through procurement, field work, testing, and closeout.",
    },
  ],
  proof: {
    label: "The differentiator",
    title: "No engineer-stamped drawings? No problem.",
    body:
      "Start with the operating need. We can develop the concept, engineer the system, create the drawings, and build the finished solution.",
  },
  process: {
    title: "One continuous line from need to operation.",
    body:
      "Single-source design-build reduces handoffs and keeps cost, schedule, constructability, and commissioning connected.",
    steps: [
      { title: "Define", body: "Clarify the need, constraints, load, budget, and outcome." },
      { title: "Design", body: "Develop the concept and coordinate the complete system." },
      { title: "Engineer", body: "Produce the drawings, calculations, and buildable scope." },
      { title: "Build", body: "Install, test, commission, and close out the project." },
    ],
  },
  related: {
    industries: ["Data centers", "Commercial facilities", "Government and military", "Education"],
    services: [
      { label: "Mission critical power", href: "/services/mission-critical-power" },
      { label: "Commercial and industrial electrical", href: "/services/commercial-industrial-electrical" },
    ],
  },
  cta: {
    title: "Have a need but no drawings? Start here.",
    body: "Bring us the operating problem and the facility constraints.",
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
