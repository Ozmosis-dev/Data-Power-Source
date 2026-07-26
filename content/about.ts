import type { Metadata } from "next";

export const aboutMeta: Metadata = {
  title: "About Data Power Source | Metro Atlanta Electrical Contractor, 25 Years",
  description:
    "Meet Data Power Source, an owner-led commercial and industrial electrical contractor serving Metro Atlanta for 25 years and founded by a 50+ year industry veteran.",
};

export const aboutHero = {
  overline: "About Data Power Source",
  title: "25 years of getting the power right.",
  lead:
    "Owner-led commercial and industrial electrical work for Metro Atlanta, built on craftsmanship, responsiveness, and 25 years of field experience.",
  imageSrc: "/images/generated/dps-leadership-team.webp",
  imageAlt:
    "DPS electricians reviewing electrical drawings beside commercial switchgear.",
} as const;

export const aboutIntro = {
  title: "A contractor built around craftsmanship.",
  body: [
    "Data Power Source is an electrical services provider focused on customer service, responsiveness, and quality installations. Our philosophy has not changed since day one: give the customer professional electrical work of exceptional quality and value, delivered by trained, uniformed electricians who take pride in the craft.",
    "Every member of the team, from company leadership and project managers to electricians and apprentices, is committed to a consistent, professional, and customer-focused experience. We communicate clearly, do what we say, and finish the job so expectations are exceeded, not simply met.",
  ],
  commitments: [
    {
      title: "Clear communication",
      body: "Straight answers, visible scope, and accountable follow-through.",
    },
    {
      title: "Quality installation",
      body: "Commercial and industrial work finished with care and discipline.",
    },
    {
      title: "Business continuity",
      body: "Electrical, backup power, connectivity, and design-build under one roof.",
    },
  ],
} as const;

export const aboutFounder = {
  title: "Founded on 50 years in the field.",
  name: "Robert L. Kent",
  role: "Founder and President",
  imageSrc: "/images/about/robert-kent-enhanced.png",
  imageAlt: "Portrait of founder Robert L. Kent.",
  body: [
    "Robert L. Kent is a seasoned industry veteran with more than 50 years in the electrical trade. He began as an electrician's helper wiring houses at 15, then served as an electrician in the Marine Corps during the Vietnam War.",
    "When he returned home, Robert continued in the only vocation he had ever known. He worked through every position in the field and then the office before opening his own company. That hands-on experience still guides how Data Power Source works today.",
  ],
  quote:
    "We place the highest level of emphasis on craftsmanship and workmanship in all things.",
  milestones: [
    "Started in the trade at age 15",
    "Served as a Marine Corps electrician",
    "Worked through field and office leadership",
    "Built DPS on hands-on electrical experience",
  ],
} as const;

export const aboutPathways = {
  title: "How we work.",
  body:
    "The company story is only useful if it explains what clients can expect on site. Two operating commitments make that standard visible.",
  items: [
    {
      overline: "Contractor safety",
      title: "Safety, documented.",
      body:
        "A written program, NFPA 70E arc-flash procedures, First Aid and CPR-trained crews, and a three-year EMR of .82-.86.",
      href: "/about/safety",
      cta: "Read about our safety program",
      theme: "navy",
    },
    {
      overline: "Values and integrity",
      title: "Integrity in every job.",
      body:
        "Plain answers, honest scopes, clear change communication, and workmanship built to stand up to inspection.",
      href: "/about/values",
      cta: "Explore our values",
      theme: "light",
    },
  ],
} as const;

export const aboutStats = [
  {
    value: "25",
    suffix: " years",
    label: "Serving Metro Atlanta's commercial and industrial market",
  },
  {
    value: "50+",
    suffix: " years",
    label: "Hands-on founder expertise in the electrical trade",
  },
  {
    value: ".82-.86",
    suffix: " EMR",
    label: "Documented three-year safety record",
  },
  {
    value: "2-hour",
    suffix: "",
    label: "Emergency response across Metro Atlanta",
  },
] as const;

export const aboutProof = {
  overline: "Proof, not promises",
  title: "A track record you can verify.",
  body:
    "The years in the field, the documented safety range, and the response standard behind the work.",
} as const;

export const aboutQualification = {
  overline: "Contractor qualification",
  title: "Recognized. Documented. Ready for review.",
  body:
    "DPS is an Independent Electrical Contractors member serving Atlanta and Georgia. Additional license, insurance, and manufacturer credential details are pending client confirmation.",
  iecAlt: "Independent Electrical Contractors, Atlanta and Georgia.",
} as const;
