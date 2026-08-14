import { expect, test, type Page } from "playwright/test";

import { projects } from "../content/projects";

const serviceRoutes = [
  "/services/commercial-industrial-electrical",
  "/services/mission-critical-power",
  "/services/low-voltage-connectivity",
  "/services/engineering-design-build",
] as const;

const interiorRoutes = [
  "/about",
  "/about/safety",
  "/about/values",
  "/services",
  ...serviceRoutes,
  "/industries",
  "/projects",
  ...projects.map((project) => `/projects/${project.slug}`),
  "/faq",
  "/contact",
  "/privacy",
] as const;

async function hasBreadcrumbSchema(page: Page) {
  const schemas = await page
    .locator('script[type="application/ld+json"]')
    .evaluateAll((nodes) => nodes.map((node) => JSON.parse(node.textContent ?? "{}")));

  return schemas.some((schema) => schema["@type"] === "BreadcrumbList");
}

test.describe("interior-page hero consistency", () => {
  test("uses the established title hierarchy and content-driven hero height on every service page", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    for (const route of serviceRoutes) {
      await page.goto(route);

      const hero = page.getByTestId("page-hero");
      const heading = hero.getByRole("heading", { level: 1 });
      const [heroBox, fontSize] = await Promise.all([
        hero.boundingBox(),
        heading.evaluate((node) => Number.parseFloat(getComputedStyle(node).fontSize)),
      ]);

      expect(heroBox?.height, `${route} should not fill the viewport`).toBeLessThan(775);
      expect(heroBox?.height, `${route} should retain a substantial hero`).toBeGreaterThan(560);
      expect(fontSize, `${route} should match the interior-page H1 hierarchy`).toBeGreaterThanOrEqual(68);
      expect(fontSize, `${route} should match the interior-page H1 hierarchy`).toBeLessThanOrEqual(76);
    }
  });

  test("keeps the service title hierarchy controlled on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    for (const route of serviceRoutes) {
      await page.goto(route);
      const fontSize = await page
        .getByTestId("page-hero")
        .getByRole("heading", { level: 1 })
        .evaluate((node) => Number.parseFloat(getComputedStyle(node).fontSize));

      expect(fontSize).toBeGreaterThanOrEqual(42);
      expect(fontSize).toBeLessThanOrEqual(48);
    }
  });

  test("reveals the next section on a common laptop viewport", async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 768 });

    for (const route of serviceRoutes) {
      await page.goto(route);
      const heroBox = await page.getByTestId("page-hero").boundingBox();

      expect(heroBox?.height, `${route} should leave room below the hero`).toBeLessThan(640);
    }
  });

  test("limits visible breadcrumb navigation to genuinely nested routes", async ({ page }) => {
    test.setTimeout(90_000);

    const nestedRoutes = new Set([
      "/about/safety",
      "/about/values",
      ...serviceRoutes,
      ...projects.map((project) => `/projects/${project.slug}`),
    ]);

    for (const route of interiorRoutes) {
      await page.goto(route);
      await expect(page.getByRole("navigation", { name: "Breadcrumb" }), route).toHaveCount(
        nestedRoutes.has(route) ? 1 : 0,
      );
    }
  });

  test("retains BreadcrumbList SEO data across interior routes", async ({ page }) => {
    for (const route of [
      "/about",
      "/about/safety",
      "/services",
      serviceRoutes[0],
      "/industries",
      "/projects",
      `/projects/${projects[0].slug}`,
      "/faq",
      "/contact",
    ]) {
      await page.goto(route);
      expect(await hasBreadcrumbSchema(page), route).toBeTruthy();
    }
  });
});
