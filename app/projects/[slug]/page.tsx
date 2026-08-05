import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectDetailPage } from "@/components/project-detail-page";
import { getAdjacentProjects, projectBySlug, projects } from "@/content/projects";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug.get(slug);
  if (!project) return {};

  const url = `/projects/${project.slug}`;
  return {
    title: `${project.title} | Data Power Source`,
    description: project.seoDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: project.title,
      description: project.seoDescription,
      url,
      images: [{ url: project.images[0].src, alt: project.images[0].alt }],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectBySlug.get(slug);
  if (!project) notFound();

  const { previous, next } = getAdjacentProjects(slug);
  if (!previous || !next) notFound();

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: project.shortTitle, href: `/projects/${project.slug}` },
  ]);
  const article = articleSchema(project);

  return (
    <>
      <ProjectDetailPage project={project} previous={previous} next={next} />
      {[breadcrumbs, article].map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}
