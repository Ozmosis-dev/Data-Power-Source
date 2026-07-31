import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServiceDetailPage } from "@/components/service-detail-page";
import {
  serviceDetails,
  type ServiceDetailSlug,
} from "@/content/service-details";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

function isServiceSlug(slug: string): slug is ServiceDetailSlug {
  return slug in serviceDetails;
}

export function generateStaticParams() {
  return Object.keys(serviceDetails).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isServiceSlug(slug)) return {};

  const service = serviceDetails[slug];
  return {
    title: service.metadata.title,
    description: service.metadata.description,
    keywords: service.metadata.keywords,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title: service.metadata.title,
      description: service.metadata.description,
      url: `/services/${service.slug}`,
      images: [
        {
          url: service.hero.imageSrc,
          alt: service.hero.imageAlt,
        },
      ],
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  if (!isServiceSlug(slug)) notFound();

  const service = serviceDetails[slug];
  const href = `/services/${service.slug}`;
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: service.hero.overline, href },
  ]);
  const schema = serviceSchema({
    name: service.hero.overline,
    description: service.metadata.description,
    href,
  });

  return (
    <>
      <ServiceDetailPage service={service} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
