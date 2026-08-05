import type { FaqItem } from "@/content/faq";
import type { Project } from "@/content/projects";
import { site } from "@/content/site";

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Electrician",
    name: site.name,
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
    url: "https://datapowersource.com",
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
      item: `https://datapowersource.com${item.href}`,
    })),
  };
}

export function faqPageSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
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
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Data Power Source",
    description:
      "Request a quote for commercial and industrial electrical, UPS, generator, connectivity, and design-build services in Metro Atlanta.",
    url: "https://datapowersource.com/contact",
    mainEntity: {
      "@type": "Electrician",
      name: site.name,
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
    },
  };
}

export function serviceSchema(service: {
  name: string;
  description: string;
  href: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: `https://datapowersource.com${service.href}`,
    areaServed: [
      { "@type": "AdministrativeArea", name: "Metro Atlanta" },
      { "@type": "State", name: "Georgia" },
    ],
    provider: {
      "@type": "Electrician",
      name: site.name,
      telephone: "+1-770-498-9622",
      url: "https://datapowersource.com",
    },
  };
}

export function articleSchema(project: Project) {
  const url = `https://datapowersource.com/projects/${project.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: project.title,
    description: project.seoDescription,
    url,
    mainEntityOfPage: url,
    image: project.images.map((image) => `https://datapowersource.com${image.src}`),
    about: project.services.map((service) => ({
      "@type": "Thing",
      name: service,
    })),
    contentLocation: {
      "@type": "Place",
      name: project.location,
    },
    author: {
      "@type": "Organization",
      name: site.name,
      url: "https://datapowersource.com",
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: "https://datapowersource.com",
    },
  };
}
