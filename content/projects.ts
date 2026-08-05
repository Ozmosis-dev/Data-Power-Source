import type { ServiceDiscipline } from "@/components/brand-service-mark";

export type ProjectImage = {
  src: string;
  alt: string;
};

export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  client: string;
  location: string;
  market: string;
  services: readonly string[];
  serviceDisciplines: readonly ServiceDiscipline[];
  value?: string;
  duration?: string;
  summary: string;
  seoDescription: string;
  challenge: string;
  overview: readonly string[];
  scope: readonly string[];
  outcome: string;
  images: readonly ProjectImage[];
  sourceUrl: string;
};

function projectImage(directory: string, filename: string, alt: string): ProjectImage {
  return {
    src: `/images/projects/${directory}/${filename}`,
    alt,
  };
}

export const projects = [
  {
    slug: "georgia-institute-of-technology-holland-heating-cooling-plant-480v-upgrade",
    title: "Georgia Tech Holland Heating & Cooling Plant 480V Upgrade",
    shortTitle: "Georgia Tech Holland Plant 480V Upgrade",
    client: "Georgia Institute of Technology",
    location: "Atlanta, GA",
    market: "Education",
    services: ["Electrical infrastructure", "Switchgear", "Design-build coordination"],
    serviceDisciplines: ["electrical", "design-build"],
    value: "$800,000",
    summary:
      "A staged 5,000A switchboard and substation replacement completed while the central plant stayed online.",
    seoDescription:
      "See how Data Power Source completed a staged 5,000A switchboard and 480V substation upgrade at Georgia Tech without unscheduled disruption.",
    challenge:
      "Replace major electrical infrastructure inside an operating campus plant without interrupting the equipment and facilities it served.",
    overview: [
      "Georgia Tech engaged Data Power Source to replace the existing switchboard and unit substation at the Holland Heating & Cooling Plant on its Atlanta campus.",
      "The work required a carefully staged approach. Existing electrical equipment had to remain online while the team prepared the replacement of the 5,000A switchboard and rooftop substation.",
    ],
    scope: [
      "Installed a temporary switchboard and temporary feeders to maintain plant operations during the transition.",
      "Removed and replaced the existing 5,000A switchboard.",
      "Replaced the rooftop unit substation serving the plant.",
      "Installed new medium-voltage primary conductors and new secondary feeders.",
      "Sequenced shutdowns and cutovers around active campus operations.",
    ],
    outcome:
      "The 480V upgrade was completed without unscheduled disruption to plant equipment or campus activities.",
    images: [
      projectImage("georgia-tech-holland-plant", "05-new-switchboard.jpg", "New 5,000A switchboard installed at Georgia Tech's Holland Heating and Cooling Plant."),
      projectImage("georgia-tech-holland-plant", "01-existing-switchgear.jpg", "Existing electrical switchgear inside the Holland Heating and Cooling Plant before replacement."),
      projectImage("georgia-tech-holland-plant", "02-substation-removal.jpg", "Rooftop substation equipment being removed during the Georgia Tech plant upgrade."),
      projectImage("georgia-tech-holland-plant", "03-new-transformer.jpg", "New transformer installed for the Holland Heating and Cooling Plant electrical upgrade."),
      projectImage("georgia-tech-holland-plant", "04-feeder-conductors.jpg", "Color-coded feeder conductors routed into new electrical distribution equipment."),
      projectImage("georgia-tech-holland-plant", "06-installation-model.jpg", "Technical model used to coordinate the replacement electrical equipment and feeder routing."),
    ],
    sourceUrl:
      "https://datapowersource.com/projects/georgia-institute-of-technology-holland-heating-cooling-plant-480v-upgrade/",
  },
  {
    slug: "clayton-county-public-schools-data-center-modifications",
    title: "Clayton County Public Schools Data Center Modifications",
    shortTitle: "Clayton County Schools Data Center",
    client: "Clayton County Public Schools",
    location: "Jonesboro, GA",
    market: "Education / Data Center",
    services: ["UPS", "Standby generation", "Cooling", "Electrical service"],
    serviceDisciplines: ["electrical", "mission-critical", "connectivity", "design-build"],
    value: "$1.1 million",
    duration: "Approximately 6 months",
    summary:
      "A full UPS, generator, cooling, and service modernization delivered while the district data center remained operational.",
    seoDescription:
      "Explore Data Power Source's $1.1 million Clayton County Public Schools data center renovation, including UPS, generator, cooling, and electrical service upgrades.",
    challenge:
      "Renovate a live school-system data center from cabinets through standby power while preserving continuous operation.",
    overview: [
      "Data Power Source completed a full renovation of the operational data center serving Clayton County Public Schools in Jonesboro, Georgia.",
      "The project required coordinated temporary power, mechanical work, equipment replacement, and utility service work so the district's technology operations could stay online.",
    ],
    scope: [
      "Installed an APC ISX solution with a 250kW UPS and two 150kW power distribution units.",
      "Replaced the existing IT and server cabinets.",
      "Installed three 30-ton computer-room air-conditioning units.",
      "Added a new 600A electrical service and a 600A service-rated automatic transfer switch.",
      "Installed a 400kW natural-gas standby generator and coordinated replacement of the Georgia Power transformer.",
      "Provided a temporary generator to support the data center through the work.",
    ],
    outcome:
      "The approximately six-month modernization was completed without an unscheduled disruption to data center operations.",
    images: [
      projectImage("clayton-county-schools", "03-data-center-cabinets.jpg", "New data center cabinets and critical power equipment at Clayton County Public Schools."),
      projectImage("clayton-county-schools", "01-natural-gas-generator.jpg", "Natural-gas standby generator installed for the Clayton County schools data center."),
      projectImage("clayton-county-schools", "02-crac-cooling-units.jpg", "Computer-room cooling units installed outside the Clayton County schools data center."),
      projectImage("clayton-county-schools", "04-ups-system.jpg", "APC UPS and power distribution equipment inside the renovated data center."),
    ],
    sourceUrl:
      "https://datapowersource.com/projects/clayton-county-public-schools-data-center-modifications/",
  },
  {
    slug: "charlotte-nc-television-transmitter-site",
    title: "Charlotte, NC Television Transmitter Site",
    shortTitle: "Charlotte Television Transmitter Site",
    client: "Cable News Affiliate",
    location: "Charlotte, NC",
    market: "Broadcast & Telecom",
    services: ["Electrical service", "Standby generation", "UPS", "Distribution"],
    serviceDisciplines: ["electrical", "mission-critical", "connectivity"],
    value: "$900,000",
    summary:
      "A complete power buildout for a remote television transmitter, from underground service through UPS and standby generation.",
    seoDescription:
      "See the $900,000 Charlotte television transmitter electrical buildout by Data Power Source, including an 800A service, 500kW generator, and 350kW UPS.",
    challenge:
      "Build the complete electrical backbone for a new broadcast transmitter at a remote tower site and coordinate it with specialized transmitter and cooling equipment.",
    overview: [
      "The Charlotte transmitter site project delivered the complete electrical buildout for a new television transmitting system at a remote tower site outside Charlotte, North Carolina.",
      "Data Power Source worked closely with the television transmitter installation team so the electrical infrastructure was ready for the equipment racks and cooling systems supporting the new transmitter.",
    ],
    scope: [
      "Installed a new 800A underground electrical service.",
      "Installed a 500kW diesel standby generator.",
      "Installed an 800A bypass-isolation automatic transfer switch.",
      "Installed a 350kW uninterruptible power supply.",
      "Completed the interconnecting feeders and cable tray for the transmitter installation.",
    ],
    outcome:
      "The transmitter power project was completed within the allocated budget and the timeframe established for the work.",
    images: [
      projectImage("charlotte-transmitter", "01-generator-installation.jpeg", "500kW diesel standby generator and steel equipment canopy at the Charlotte transmitter site."),
      projectImage("charlotte-transmitter", "02-electrical-distribution.jpeg", "Electrical distribution panels installed for the Charlotte television transmitter."),
      projectImage("charlotte-transmitter", "03-interior-infrastructure.jpeg", "Conduit, panels, cable tray, and cooling infrastructure inside the transmitter facility."),
    ],
    sourceUrl:
      "https://datapowersource.com/projects/charlotte-nc-television-transmitter-site/",
  },
  {
    slug: "government-data-center-project",
    title: "Government Data Center Project",
    shortTitle: "Government Data Center Power & Cooling",
    client: "Government Agency",
    location: "Marietta, GA",
    market: "Government / Data Center",
    services: ["UPS", "In-row cooling", "Power distribution", "Mechanical"],
    serviceDisciplines: ["electrical", "mission-critical", "design-build"],
    duration: "Approximately 3 months",
    summary:
      "An integrated Schneider UPS, in-row cooling, and hot-aisle containment solution completed on schedule.",
    seoDescription:
      "See how Data Power Source installed a 250kW Schneider UPS, eight InRow cooling units, and hot-aisle containment for a Marietta government data center.",
    challenge:
      "Coordinate critical power and precision cooling as one tightly integrated system within an active government data center.",
    overview: [
      "This Marietta project centered on a new Schneider ISX solution with a 250kW-frame Schneider UPS, eight Schneider InRow Cooling units, and new hot-aisle containment.",
      "Electrical and mechanical routes were coordinated through the building to connect the data-center equipment with exterior condenser units in a mechanical courtyard.",
    ],
    scope: [
      "Installed the 250kW-frame Schneider UPS and its input and output power distribution.",
      "Installed eight Schneider InRow Cooling units inside a new hot-aisle containment system.",
      "Provided electrical feeders for the cooling units and their outdoor condensers.",
      "Routed mechanical supply and return line sets through the building to the courtyard equipment.",
      "Coordinated the complete installation with the owner and other project teams.",
    ],
    outcome: "The coordinated electrical and mechanical project was completed on schedule.",
    images: [
      projectImage("government-data-center", "05-inrow-cooling.jpg", "Schneider InRow cooling units and data cabinets inside the government data center."),
      projectImage("government-data-center", "01-power-equipment.jpg", "Critical power equipment installed for the government data center project."),
      projectImage("government-data-center", "02-ups-distribution.jpg", "UPS distribution and protected power connections inside the data center."),
      projectImage("government-data-center", "03-hot-aisle-containment.jpg", "Hot-aisle containment system under construction in the government data center."),
      projectImage("government-data-center", "04-data-center-aisle.jpg", "Completed equipment aisle with integrated cooling and containment."),
      projectImage("government-data-center", "06-outdoor-condensers.jpg", "Outdoor condenser units serving the data center's in-row cooling system."),
      projectImage("government-data-center", "07-mechanical-courtyard.jpg", "Mechanical courtyard equipment and coordinated refrigerant line routes."),
    ],
    sourceUrl: "https://datapowersource.com/projects/government-data-center-project/",
  },
  {
    slug: "us-army-combat-readiness-center-data-center-generator-and-cooling",
    title: "US Army Combat Readiness Center Data Center Generator & Cooling",
    shortTitle: "US Army Combat Readiness Center",
    client: "US Army Combat Readiness Center",
    location: "Fort Rucker, AL",
    market: "Government / Military",
    services: ["Standby generation", "Data center cooling", "Fire protection", "Site work"],
    serviceDisciplines: ["electrical", "mission-critical", "design-build"],
    duration: "6 months",
    summary:
      "Standby generation, data center cooling, fire protection, and a future-ready equipment courtyard delivered without disruption.",
    seoDescription:
      "Explore the US Army Combat Readiness Center generator and data-center cooling project, completed by Data Power Source without operational disruption.",
    challenge:
      "Expand standby power, cooling, and life-safety systems at an active military facility while maintaining existing operations.",
    overview: [
      "Data Power Source installed a Caterpillar 250kW diesel standby generator and four APC In-Row Cooling units for the US Army Combat Readiness Center at Fort Rucker, Alabama.",
      "The amended scope expanded the project into a broader infrastructure and life-safety upgrade, including a new equipment courtyard and replacement fire-protection systems.",
    ],
    scope: [
      "Installed a 250kW Caterpillar diesel standby generator.",
      "Installed four APC In-Row Cooling units for the data center.",
      "Built a brick equipment courtyard with an accessible ramp and aluminum awning.",
      "Replaced the building-wide fire alarm system.",
      "Installed two FM200 fire-suppression systems in basement vaults.",
    ],
    outcome:
      "The six-month project was completed without disrupting existing operations, and the new courtyard created room for future equipment upgrades.",
    images: [
      projectImage("us-army-combat-readiness", "05-generator-courtyard.jpg", "Standby generator secured inside the new equipment courtyard at the US Army Combat Readiness Center."),
      projectImage("us-army-combat-readiness", "01-site-preparation.jpg", "Site preparation for the Combat Readiness Center equipment courtyard."),
      projectImage("us-army-combat-readiness", "02-equipment-courtyard-pad.jpg", "Concrete pad under construction beside the active military facility."),
      projectImage("us-army-combat-readiness", "03-courtyard-construction.jpg", "Brick equipment courtyard construction at the US Army Combat Readiness Center."),
      projectImage("us-army-combat-readiness", "04-inrow-cooling.jpg", "APC In-Row Cooling units installed along the exterior data center wall."),
      projectImage("us-army-combat-readiness", "06-accessible-ramp-and-awning.jpg", "Completed equipment courtyard with accessible ramp and aluminum awning."),
    ],
    sourceUrl:
      "https://datapowersource.com/projects/us-army-combat-readiness-center-data-center-generator-and-cooling/",
  },
  {
    slug: "chatham-county-data-center-electrical-mechanical-installation",
    title: "Chatham County Data Center Electrical & Mechanical Installation",
    shortTitle: "Chatham County Data Center",
    client: "Chatham County Government",
    location: "Savannah, GA",
    market: "Government / Data Center",
    services: ["UPS", "Precision cooling", "Fire protection", "Equipment rigging"],
    serviceDisciplines: ["electrical", "mission-critical", "design-build"],
    duration: "Approximately 4 months",
    summary:
      "A protected third-floor data center environment engineered for hurricane exposure, critical power, cooling, and fire suppression.",
    seoDescription:
      "See Data Power Source's Chatham County data center installation with a 100kW UPS, in-row cooling, rooftop chillers, and FM200 fire protection.",
    challenge:
      "Create a water- and wind-protected data center environment in coastal Georgia and place major equipment on an upper floor with limited access.",
    overview: [
      "Chatham County required a data center environment designed to protect its infrastructure from hurricanes and tropical storms in Savannah, Georgia.",
      "The APC ISX equipment was housed in a water- and wind-tight third-floor enclosure. Major components had to be lifted by forklift through a temporarily removed third-floor window.",
    ],
    scope: [
      "Installed an APC Symmetra PX 100kW UPS inside the protected enclosure.",
      "Installed APC In-Row RC cooling within the data center.",
      "Connected the cooling system to two Carrier AquaSnap rooftop chillers.",
      "Installed a new FM200 fire-protection system.",
      "Coordinated crane and forklift access for third-floor equipment placement.",
    ],
    outcome:
      "The approximately four-month electrical and mechanical installation was completed on schedule, delivering the protected data center environment the county required.",
    images: [
      projectImage("chatham-county-data-center", "01-data-center-enclosure.jpg", "APC data center equipment inside the protected Chatham County enclosure."),
      projectImage("chatham-county-data-center", "02-rooftop-chillers.jpg", "Carrier AquaSnap chillers installed on the roof for data center cooling."),
      projectImage("chatham-county-data-center", "03-data-center-aisle.jpg", "Completed data center aisle inside the water- and wind-tight enclosure."),
      projectImage("chatham-county-data-center", "04-third-floor-equipment-lift.jpg", "Forklift lifting data center equipment through a third-floor window opening."),
      projectImage("chatham-county-data-center", "05-crane-placement.jpg", "Crane positioning critical equipment at the Chatham County facility."),
    ],
    sourceUrl:
      "https://datapowersource.com/projects/chatham-county-data-center-electrical-mechanical-installation/",
  },
  {
    slug: "pruitt-assisted-living-facility",
    title: "Pruitt Assisted Living Facility Standby Power",
    shortTitle: "Pruitt Assisted Living Standby Power",
    client: "Pruitt Assisted Living",
    location: "Macon, GA",
    market: "Healthcare / Assisted Living",
    services: ["Standby generation", "Automatic transfer", "Service consolidation", "Permitting"],
    serviceDisciplines: ["electrical", "mission-critical", "design-build"],
    duration: "4.4 months",
    summary:
      "A 500kW generator and consolidated 2,000A service delivered around continuous patient-care operations.",
    seoDescription:
      "See the Pruitt Assisted Living standby-power project in Macon, including a 500kW Caterpillar generator and 2,000A automatic transfer system.",
    challenge:
      "Consolidate multiple electrical services and add facility-scale standby power without compromising the continuous power required for patient care.",
    overview: [
      "Data Power Source installed a 500kW Caterpillar diesel standby generator and a 2,000A ASCO automatic transfer switch at Pruitt Assisted Living in Macon, Georgia.",
      "Several overhead electrical services were consolidated into one higher-capacity service feeding a new weather-rated main switchboard and automatic transfer system.",
    ],
    scope: [
      "Installed a 500kW Caterpillar diesel standby generator.",
      "Installed a 2,000A ASCO automatic transfer switch.",
      "Installed a 2,000A Square D NEMA 3R main service switchboard.",
      "Built approximately 100 feet of underground duct bank and a steel- and fiberglass-reinforced concrete generator pad.",
      "Provided electrical engineering and coordinated State Fire Marshal fuel permitting.",
    ],
    outcome:
      "The 4.4-month project was closely coordinated around the facility's constant-power and patient-care requirements.",
    images: [
      projectImage("pruitt-assisted-living", "01-standby-generator.jpg", "500kW Caterpillar standby generator installed at the Pruitt assisted living facility."),
      projectImage("pruitt-assisted-living", "02-underground-duct-bank.jpg", "Underground duct bank construction for the assisted living standby-power system."),
      projectImage("pruitt-assisted-living", "03-service-switchgear.jpg", "New 2,000A service switchgear and automatic transfer equipment."),
    ],
    sourceUrl: "https://datapowersource.com/projects/pruitt-assisted-living-facility/",
  },
  {
    slug: "2010-earthlink-atlanta-network-service-addition",
    title: "EarthLink Atlanta Network Service Addition",
    shortTitle: "EarthLink Atlanta Network Service",
    client: "EarthLink",
    location: "Atlanta, GA",
    market: "Telecom / Data Center",
    services: ["Utility service", "Transformer vault", "Underground distribution", "Live cutover"],
    serviceDisciplines: ["electrical", "mission-critical"],
    duration: "3 months",
    summary:
      "Two new underground utility services and a transformer vault added data-center capacity with no disruption during cutover.",
    seoDescription:
      "Explore EarthLink's Atlanta data center service addition, with two transformers, underground duct banks, and a live cutover completed without disruption.",
    challenge:
      "Add utility capacity to a live downtown Atlanta data center and transfer the load through new services without interrupting network operations.",
    overview: [
      "The EarthLink Atlanta project added new underground electrical services to support additional data-center capacity.",
      "Data Power Source coordinated with the utility contractor on a primary duct bank from the Georgia Power downtown network and constructed a new transformer-vault building for two transformers.",
    ],
    scope: [
      "Built a new transformer-vault structure and installed two new transformers.",
      "Coordinated the primary duct bank connection from the Georgia Power downtown network.",
      "Installed two new secondary services from the transformer vault to the existing main switchboards.",
      "Installed conductors in the primary and secondary underground duct banks.",
      "Transferred the facility load to standby generation for the service cutover.",
    ],
    outcome:
      "Normal power was restored through the new services without disruption to EarthLink's data center operations.",
    images: [
      projectImage("earthlink-atlanta", "05-completed-transformer-vault.jpg", "Completed transformer-vault building for EarthLink's Atlanta network service addition."),
      projectImage("earthlink-atlanta", "01-service-excavation.jpg", "Downtown service-route excavation for the EarthLink project."),
      projectImage("earthlink-atlanta", "02-underground-duct-bank.jpg", "Primary and secondary conduits installed in the underground duct bank."),
      projectImage("earthlink-atlanta", "03-transformer-vault-walls.jpg", "Masonry walls under construction for the new transformer vault."),
      projectImage("earthlink-atlanta", "04-transformer-vault-slab.jpg", "Reinforced concrete slab prepared for the transformer-vault building."),
      projectImage("earthlink-atlanta", "06-primary-conduit-entry.jpg", "Primary conduit entering the completed utility vault."),
      projectImage("earthlink-atlanta", "07-vault-and-service-route.jpg", "Completed vault beside the active downtown data center service route."),
      projectImage("earthlink-atlanta", "08-secondary-conduit.jpg", "Secondary electrical conduits routed toward the existing main switchboards."),
    ],
    sourceUrl:
      "https://datapowersource.com/projects/2010-earthlink-atlanta-network-service-addition/",
  },
  {
    slug: "georgia-state-university-classroom-south-phase-2-transformer",
    title: "Georgia State University Classroom South Transformer",
    shortTitle: "Georgia State Classroom South Transformer",
    client: "Georgia State University",
    location: "Atlanta, GA",
    market: "Education",
    services: ["Transformer vault", "Duct banks", "Switchgear", "Campus infrastructure"],
    serviceDisciplines: ["electrical"],
    value: "$800,000",
    summary:
      "A new network transformer vault, duct banks, and switchgear created future electrical capacity on an active downtown campus.",
    seoDescription:
      "See Georgia State University's $800,000 Classroom South transformer project, including a network vault, duct banks, and low-voltage switchgear.",
    challenge:
      "Build new utility and distribution infrastructure for a future campus addition within a constrained, active downtown Atlanta site.",
    overview: [
      "Data Power Source built a new network-service transformer vault for the Phase 2 addition to Georgia State University's Classroom South building.",
      "The project was located on the active downtown Atlanta campus near Decatur Street SE and Central Avenue SW.",
    ],
    scope: [
      "Constructed the new transformer-vault building.",
      "Installed the high-voltage duct bank serving the vault.",
      "Installed a low-voltage duct bank for distribution to the future addition.",
      "Installed new low-voltage switchgear.",
      "Installed the network-service transformers supporting the planned infrastructure.",
    ],
    outcome:
      "The $800,000 project established the electrical infrastructure required for the future Classroom South expansion on the downtown campus.",
    images: [
      projectImage("georgia-state-classroom-south", "06-completed-site.jpg", "Completed Georgia State Classroom South transformer-vault site in downtown Atlanta."),
      projectImage("georgia-state-classroom-south", "01-site-excavation.jpg", "Initial excavation for the Georgia State transformer-vault project."),
      projectImage("georgia-state-classroom-south", "02-vault-excavation.jpg", "Deep excavation and shoring for the new network transformer vault."),
      projectImage("georgia-state-classroom-south", "03-campus-site-preparation.jpg", "Site preparation beside the active Georgia State campus."),
      projectImage("georgia-state-classroom-south", "04-duct-bank-route.jpg", "Underground duct-bank route under construction on the downtown site."),
      projectImage("georgia-state-classroom-south", "05-vault-construction.jpg", "Transformer-vault construction and concrete work near Classroom South."),
    ],
    sourceUrl:
      "https://datapowersource.com/projects/georgia-state-university-classroom-south-phase-2-transformer/",
  },
] as const satisfies readonly Project[];

export type ProjectSlug = (typeof projects)[number]["slug"];

export const projectBySlug: ReadonlyMap<string, Project> = new Map(
  projects.map((project) => [project.slug, project]),
);

export function getAdjacentProjects(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index < 0) return { previous: undefined, next: undefined };

  return {
    previous: projects[(index - 1 + projects.length) % projects.length],
    next: projects[(index + 1) % projects.length],
  };
}
