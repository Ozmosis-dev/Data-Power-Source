import type { FaqItem } from "@/content/faq";
import type { Project } from "@/content/projects";
import { site } from "@/content/site";
import { absoluteUrl, SITE_URL } from "@/lib/seo";

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const organizationReference = { "@id": ORGANIZATION_ID } as const;
const websiteReference = { "@id": WEBSITE_ID } as const;

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Electrician",
        "@id": ORGANIZATION_ID,
        name: site.name,
        alternateName: site.shortName,
        description:
          "Metro Atlanta commercial and industrial electrical contractor specializing in full electrical builds, UPS, standby generators, connectivity, and design-build.",
        foundingDate: "2001",
        telephone: "+1-770-498-9622",
        faxNumber: "+1-770-498-9654",
        address: {
          "@type": "PostalAddress",
          streetAddress: site.street,
          addressLocality: "Covington",
          addressRegion: "GA",
          postalCode: "30014",
          addressCountry: "US",
        },
        areaServed: [
          { "@type": "AdministrativeArea", name: "Metro Atlanta" },
          { "@type": "State", name: "Georgia" },
        ],
        url: SITE_URL,
        logo: absoluteUrl("/brand/DPS-icon.svg"),
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        name: site.name,
        alternateName: site.shortName,
        url: SITE_URL,
        publisher: organizationReference,
      },
    ],
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

export function faqPageSchema(items: FaqItem[]) {
  const url = absoluteUrl("/faq");
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#webpage`,
    url,
    isPartOf: websiteReference,
    about: organizationReference,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function contactPageSchema() {
  const url = absoluteUrl("/contact");
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${url}#webpage`,
    name: "Contact Data Power Source",
    description:
      "Request a quote for commercial and industrial electrical, UPS, generator, connectivity, and design-build services in Metro Atlanta.",
    url,
    isPartOf: websiteReference,
    mainEntity: organizationReference,
  };
}

export function serviceSchema(service: {
  name: string;
  description: string;
  href: string;
}) {
  const url = absoluteUrl(service.href);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: service.name,
    description: service.description,
    url,
    isPartOf: websiteReference,
    areaServed: [
      { "@type": "AdministrativeArea", name: "Metro Atlanta" },
      { "@type": "State", name: "Georgia" },
    ],
    provider: organizationReference,
  };
}

export function articleSchema(project: Project) {
  const url = absoluteUrl(`/projects/${project.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: project.title,
    description: project.seoDescription,
    url,
    mainEntityOfPage: { "@id": `${url}#webpage` },
    isPartOf: websiteReference,
    image: project.images.map((image) => absoluteUrl(image.src)),
    about: project.services.map((service) => ({
      "@type": "Thing",
      name: service,
    })),
    contentLocation: {
      "@type": "Place",
      name: project.location,
    },
    author: organizationReference,
    publisher: organizationReference,
  };
}

export function collectionPageSchema({
  name,
  description,
  href,
  items,
}: {
  name: string;
  description: string;
  href: string;
  items: ReadonlyArray<{ name: string; href: string }>;
}) {
  const url = absoluteUrl(href);
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#webpage`,
    name,
    description,
    url,
    isPartOf: websiteReference,
    about: organizationReference,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: absoluteUrl(item.href),
      })),
    },
  };
}
