import { pageMetadata } from "@/lib/seo";

export type IndustryMarket = {
  readonly id: string;
  readonly number: string;
  readonly title: string;
  readonly description: string;
  readonly operatingConstraint: string;
  readonly services: readonly string[];
  readonly image: {
    readonly src: string;
    readonly alt: string;
    readonly position?: string;
  };
  readonly link: {
    readonly label: string;
    readonly href: string;
  };
  readonly featured?: boolean;
};

export const industriesMeta = pageMetadata({
  title: "Industries We Serve | Data Power Source Electrical Contractor",
  description:
    "Explore Data Power Source electrical, standby power, UPS, generator, and low-voltage capabilities for commercial, industrial, healthcare, data center, government, education, military, telecom, and broadcast facilities.",
  path: "/industries",
  image: {
    url: "/images/industries/data-centers-mission-critical.webp",
    alt: "Data center electrical infrastructure served by Data Power Source.",
  },
});

export const industriesHero = {
  overline: "Industries we serve",
  title: "Power systems built around your operating reality.",
  lead:
    "From offices and hospitals to data centers, campuses, public infrastructure, and broadcast facilities, Data Power Source installs power distribution, standby and backup systems, and low-voltage infrastructure around the way each facility has to operate.",
} as const;

export const industries: readonly IndustryMarket[] = [
  {
    id: "commercial",
    number: "01",
    title: "Commercial",
    description:
      "Office buildings, hospitality properties, financial institutions, and occupied facilities need electrical work that supports the business without taking over the building.",
    operatingConstraint:
      "Keep tenants, customers, and daily operations moving while service work proceeds.",
    services: [
      "Power distribution, panelboards, and branch circuitry for tenant spaces",
      "Service upgrades and metering",
      "EV charging stations for parking structures and lots",
    ],
    image: {
      src: "/images/industries/commercial.webp",
      alt: "Commercial electricians reviewing panelboards and distribution equipment beside an occupied office floor.",
      position: "center",
    },
    link: {
      label: "Explore commercial electrical services",
      href: "/services/commercial-industrial-electrical",
    },
  },
  {
    id: "industrial-manufacturing",
    number: "02",
    title: "Industrial & manufacturing",
    description:
      "Plants, warehouses, and processing facilities depend on safe distribution, clean machine power, and fast response when production is at risk.",
    operatingConstraint:
      "Protect production uptime while coordinating work around machinery, process equipment, and shift schedules.",
    services: [
      "Switchgear, motor control centers, and feeder distribution",
      "Machine power, conveyors, and process equipment connections",
      "Power-quality correction and load studies",
      "Rapid-response electrical service to limit downtime",
    ],
    image: {
      src: "/images/industries/industrial-manufacturing.webp",
      alt: "Industrial electricians inspecting a motor control center beside an active manufacturing line.",
      position: "center",
    },
    link: {
      label: "Explore industrial electrical services",
      href: "/services/commercial-industrial-electrical",
    },
  },
  {
    id: "healthcare",
    number: "03",
    title: "Healthcare",
    description:
      "Hospitals, clinics, laboratories, and assisted-living facilities require electrical systems planned around patient care, life safety, and continuous operation.",
    operatingConstraint:
      "Coordinate cutovers and emergency-power work around occupied clinical environments.",
    services: [
      "Life-safety, critical, and equipment branch systems",
      "Standby generators and automatic transfer switches",
      "Phased upgrades planned around active healthcare operations",
    ],
    image: {
      src: "/images/industries/healthcare.webp",
      alt: "Healthcare facility engineers reviewing automatic transfer and emergency distribution equipment beside a hospital corridor.",
      position: "center",
    },
    link: {
      label: "View healthcare project experience",
      href: "/projects/pruitt-assisted-living-facility",
    },
  },
  {
    id: "data-centers-mission-critical",
    number: "04",
    title: "Data centers & mission-critical",
    description:
      "Colocation, enterprise, edge, and other 24/7 facilities need redundant infrastructure that can be maintained, tested, and expanded without compromising the load.",
    operatingConstraint:
      "Preserve continuous operation through every installation, cutover, and maintenance window.",
    services: [
      "UPS systems, battery plants, and redundant distribution",
      "Standby generators, paralleling switchgear, and transfer switches",
      "N+1 and 2N architectures with concurrent-maintainability planning",
    ],
    image: {
      src: "/images/industries/data-centers-mission-critical.webp",
      alt: "Commissioning specialist checking redundant UPS and power equipment in a mission-critical data center.",
      position: "center",
    },
    link: {
      label: "View mission-critical project experience",
      href: "/projects/government-data-center-project",
    },
    featured: true,
  },
  {
    id: "government-municipal",
    number: "05",
    title: "Government & municipal",
    description:
      "Administrative, public-safety, and water or wastewater facilities require durable infrastructure, clear documentation, and dependable public-service continuity.",
    operatingConstraint:
      "Meet procurement, documentation, inspection, and continuity requirements across essential public facilities.",
    services: [
      "Standby power and transfer switches for essential facilities",
      "Distribution, controls, and instrumentation for water and wastewater plants",
      "Site lighting, security power, and communications infrastructure",
      "Bid-compliant submittals and closeout packages",
    ],
    image: {
      src: "/images/industries/government-municipal.webp",
      alt: "Municipal plant operator and electrician inspecting distribution and control equipment at a water facility.",
      position: "center",
    },
    link: {
      label: "View government project experience",
      href: "/projects/chatham-county-data-center-electrical-mechanical-installation",
    },
  },
  {
    id: "education",
    number: "06",
    title: "Education",
    description:
      "K-12 schools, universities, laboratories, and campus support facilities need upgrades sequenced around instruction, research, and fixed academic calendars.",
    operatingConstraint:
      "Use breaks, summer windows, and phased work to minimize disruption to students, staff, and campus operations.",
    services: [
      "Classroom, laboratory, and administrative power and lighting",
      "Campus distribution, service upgrades, and generator backup",
      "Low-voltage data cabling and technology infrastructure",
      "Break-scheduled and phased construction",
    ],
    image: {
      src: "/images/industries/education.webp",
      alt: "Campus facilities manager and electrician reviewing electrical distribution and structured cabling in an academic building.",
      position: "center",
    },
    link: {
      label: "View education project experience",
      href: "/projects/georgia-institute-of-technology-holland-heating-cooling-plant-480v-upgrade",
    },
  },
  {
    id: "military",
    number: "07",
    title: "Military",
    description:
      "Defense installations and federal facilities add demanding security, specification, coordination, and inspection requirements to already critical infrastructure work.",
    operatingConstraint:
      "Deliver reliable upgrades within controlled-access sites and formal federal contracting protocols.",
    services: [
      "Mission-critical standby generation and redundant distribution",
      "Facility power upgrades to federal and military specifications",
      "Secure communications and low-voltage cabling",
      "Coordination with contracting, security, and inspection protocols",
    ],
    image: {
      src: "/images/industries/military.webp",
      alt: "Civilian electrical specialists inspecting standby generation and secure distribution at a defense facility.",
      position: "center",
    },
    link: {
      label: "View military project experience",
      href: "/projects/us-army-combat-readiness-center-data-center-generator-and-cooling",
    },
  },
  {
    id: "telecommunications",
    number: "08",
    title: "Telecommunications",
    description:
      "Carrier and enterprise central offices, cell sites, and network facilities depend on clean, continuous power and tested connectivity to protect the network.",
    operatingConstraint:
      "Maintain service continuity while power, battery, fiber, and cabling systems are installed or upgraded.",
    services: [
      "Battery backup for network equipment",
      "Standby generators and transfer switches for site continuity",
      "Fiber-optic and low-voltage data cabling",
      "Certification and testing for structured cabling systems",
    ],
    image: {
      src: "/images/industries/telecommunications.webp",
      alt: "Telecommunications specialists testing battery-backed network power and organized fiber infrastructure.",
      position: "center",
    },
    link: {
      label: "View telecommunications project experience",
      href: "/projects/2010-earthlink-atlanta-network-service-addition",
    },
  },
  {
    id: "broadcast-media",
    number: "09",
    title: "Broadcast & media",
    description:
      "Studios, transmitter sites, and technical production facilities need stable power behind every on-air signal, control room, and transmission system.",
    operatingConstraint:
      "Keep the signal and production environment online while power systems are built, tested, or maintained.",
    services: [
      "Studio and transmitter power distribution",
      "UPS systems for broadcast and control equipment",
      "Standby generation and transfer for site continuity",
    ],
    image: {
      src: "/images/industries/broadcast-media.webp",
      alt: "Broadcast engineer and electrician reviewing UPS and power distribution beside an active television control room.",
      position: "center",
    },
    link: {
      label: "View broadcast project experience",
      href: "/projects/charlotte-nc-television-transmitter-site",
    },
  },
] as const;
