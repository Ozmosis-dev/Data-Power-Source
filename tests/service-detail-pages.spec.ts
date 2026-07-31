import { expect, test, type Page } from "playwright/test";

const services = [
  {
    slug: "commercial-industrial-electrical",
    title:
      "Commercial & Industrial Electrical Contractor | Metro Atlanta | Data Power Source",
    heading: "Commercial and industrial electrical, done right the first time.",
    accent: "#162792",
    mark: "service-electrical.svg",
    image: "project-switchboard-modernization",
    proof: "Workmanship is never an accident",
  },
  {
    slug: "mission-critical-power",
    title: "UPS & Standby Generator Installation | Mission Critical Power | Atlanta",
    heading: "When the grid drops, your operation shouldn't.",
    accent: "#B9330E",
    mark: "service-mission-critical.svg",
    image: "project-standby-power",
    proof: "The bridge between utility loss and sustained backup.",
  },
  {
    slug: "low-voltage-connectivity",
    title: "Structured Cabling & Fiber Optic Installation | Low Voltage | Atlanta",
    heading: "Structured cabling, installed clean and documented.",
    accent: "#08751A",
    mark: "service-connectivity.svg",
    image: "service-connectivity-cabling",
    proof: "50+ telemetry sites for the City of Atlanta.",
  },
  {
    slug: "engineering-design-build",
    title: "Electrical Design-Build & Engineering | Concept to Install | Atlanta",
    heading: "From a thought to an engineered solution.",
    accent: "#1A1A1A",
    mark: "service-design-build.svg",
    image: "faq-field-planning",
    proof: "No engineer-stamped drawings? No problem.",
  },
] as const;

function relativeLuminance(rgb: string) {
  const [red, green, blue] = rgb.match(/\d+/g)?.slice(0, 3).map(Number) ?? [];
  const channels = [red, green, blue].map((channel) => {
    const value = channel / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });

  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function hexToRgb(hex: string) {
  const channels = hex
    .replace("#", "")
    .match(/.{2}/g)
    ?.map((channel) => Number.parseInt(channel, 16));

  return `rgb(${channels?.join(", ")})`;
}

function contrastRatio(foreground: string, background: string) {
  const foregroundLuminance = relativeLuminance(foreground);
  const backgroundLuminance = relativeLuminance(background);
  const lighter = Math.max(foregroundLuminance, backgroundLuminance);
  const darker = Math.min(foregroundLuminance, backgroundLuminance);

  return (lighter + 0.05) / (darker + 0.05);
}

async function readSchemas(page: Page) {
  return page
    .locator('script[type="application/ld+json"]')
    .evaluateAll((nodes) => nodes.map((node) => JSON.parse(node.textContent ?? "{}")));
}

test.describe("service detail pages", () => {
  for (const service of services) {
    test(`${service.slug} replaces the stub with its complete branded page`, async ({
      page,
    }) => {
      await page.goto(`/services/${service.slug}`);

      await expect(page).toHaveTitle(service.title);
      await expect(
        page.getByRole("heading", { level: 1, name: service.heading }),
      ).toBeVisible();
      await expect(page.getByText("Coming in the next pass.", { exact: true })).toHaveCount(0);

      const servicePage = page.getByTestId("service-detail-page");
      await expect(servicePage).toHaveCSS("--service-accent", service.accent);
      const hero = page.getByTestId("page-hero");
      await expect(hero).toHaveCSS("background-color", hexToRgb(service.accent));

      const [heroBackground, headingColor, leadColor] = await Promise.all([
        hero.evaluate((node) => getComputedStyle(node).backgroundColor),
        page
          .getByRole("heading", { level: 1, name: service.heading })
          .evaluate((node) => getComputedStyle(node).color),
        page
          .getByTestId("service-hero-lead")
          .evaluate((node) => getComputedStyle(node).color),
      ]);
      expect(contrastRatio(headingColor, heroBackground)).toBeGreaterThanOrEqual(4.5);
      expect(contrastRatio(leadColor, heroBackground)).toBeGreaterThanOrEqual(4.5);
      await expect(
        page.getByTestId("service-hero-mark").locator("img"),
      ).toHaveAttribute("src", new RegExp(service.mark));
      await expect(
        page.getByTestId("service-hero-image").locator("img"),
      ).toHaveAttribute("src", new RegExp(service.image));
      await expect(page.getByText(service.proof, { exact: false }).first()).toBeVisible();
      await expect(page.getByTestId("service-capabilities")).toBeVisible();
      await expect(
        page.getByRole("link", { name: "Request a quote", exact: true }).first(),
      ).toBeVisible();

      const mainText = await page.locator("main").innerText();
      expect(mainText).not.toContain("—");
      expect(mainText).not.toContain("–");

      const schemas = await readSchemas(page);
      expect(schemas.some((schema) => schema["@type"] === "BreadcrumbList")).toBeTruthy();
      expect(schemas.some((schema) => schema["@type"] === "Service")).toBeTruthy();
    });
  }

  test("keeps every service composition inside a narrow mobile viewport", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    for (const service of services) {
      await page.goto(`/services/${service.slug}`);
      const dimensions = await page.getByTestId("service-detail-page").evaluate((node) => ({
        clientWidth: node.clientWidth,
        scrollWidth: node.scrollWidth,
      }));
      expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
      await expect(page.getByTestId("service-related-links")).toBeVisible();
    }
  });

  test("keeps the engineering capability section fully grayscale", async ({ page }) => {
    await page.goto("/services/engineering-design-build");

    const colorValues = await page.getByTestId("service-capabilities").evaluate((section) => {
      const textNodes = [...section.querySelectorAll("h2, h3, p")];
      const cards = [...section.querySelectorAll("h3")].map((heading) =>
        heading.closest(".group"),
      );
      const iconWells = [...section.querySelectorAll("svg")].map((icon) => icon.parentElement);

      return [
        ...textNodes.map((node) => getComputedStyle(node).color),
        ...[section, ...cards, ...iconWells].flatMap((node) => {
          if (!node) return [];
          return [getComputedStyle(node).backgroundColor];
        }),
        ...[section, ...cards].flatMap((node) => {
          if (!node) return [];
          return [getComputedStyle(node).borderTopColor];
        }),
      ];
    });

    for (const color of colorValues) {
      const channels = color.match(/\d+/g)?.slice(0, 3).map(Number);
      if (!channels) continue;
      expect(new Set(channels).size, color).toBe(1);
    }
  });
});
