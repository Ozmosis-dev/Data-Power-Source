import { expect, test, type Page } from "playwright/test";

import { projects } from "../content/projects";
import { serviceDetails } from "../content/service-details";

type TrailItem = { label: string; href?: string };

async function expectVisibleTrail(page: Page, path: string, expected: TrailItem[]) {
  await page.goto(path);
  const breadcrumb = page.getByRole("navigation", { name: "Breadcrumb" });
  await expect(breadcrumb).toBeVisible();

  const items = breadcrumb.locator("li");
  await expect(items).toHaveCount(expected.length);

  for (const [index, item] of expected.entries()) {
    const listItem = items.nth(index);
    await expect(listItem).toContainText(item.label);
    if (item.href) {
      await expect(listItem.getByRole("link", { name: item.label, exact: true })).toHaveAttribute(
        "href",
        item.href,
      );
    } else {
      await expect(listItem.locator('[aria-current="page"]')).toHaveText(item.label);
      await expect(listItem.getByRole("link")).toHaveCount(0);
    }
  }

  const schemas = await page
    .locator('script[type="application/ld+json"]')
    .evaluateAll((nodes) => nodes.map((node) => JSON.parse(node.textContent ?? "{}")));
  const schema = schemas.find((item) => item["@type"] === "BreadcrumbList");
  expect(schema?.itemListElement.map((item: { name: string }) => item.name)).toEqual(
    expected.map((item) => item.label),
  );
}

test("nested About pages expose visible trails that match their schema", async ({ page }) => {
  await expectVisibleTrail(page, "/about/safety", [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Safety" },
  ]);
  await expectVisibleTrail(page, "/about/values", [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Values & integrity" },
  ]);
});

test("service detail pages expose Home, Services, and the current service", async ({ page }) => {
  for (const service of Object.values(serviceDetails)) {
    await expectVisibleTrail(page, `/services/${service.slug}`, [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: service.hero.overline },
    ]);
  }
});

test("project detail pages expose Home, Projects, and the current case study", async ({ page }) => {
  test.setTimeout(60_000);
  for (const project of projects) {
    await expectVisibleTrail(page, `/projects/${project.slug}`, [
      { label: "Home", href: "/" },
      { label: "Projects", href: "/projects" },
      { label: project.shortTitle },
    ]);
  }
});

test("top-level routes remain free of redundant breadcrumb trails", async ({ page }) => {
  for (const path of ["/", "/about", "/services", "/industries", "/projects", "/faq", "/contact"]) {
    await page.goto(path);
    await expect(page.getByRole("navigation", { name: "Breadcrumb" }), path).toHaveCount(0);
  }
});

test("project service labels link to the most relevant service detail pages", async ({ page }) => {
  const project = projects[0];
  await page.goto(`/projects/${project.slug}`);
  const delivered = page.getByTestId("project-services-delivered");

  await expect(delivered.getByRole("link", { name: "Electrical infrastructure" })).toHaveAttribute(
    "href",
    "/services/commercial-industrial-electrical",
  );
  await expect(delivered.getByRole("link", { name: "Switchgear" })).toHaveAttribute(
    "href",
    "/services/commercial-industrial-electrical",
  );
  await expect(delivered.getByRole("link", { name: "Design-build coordination" })).toHaveAttribute(
    "href",
    "/services/engineering-design-build",
  );
});
