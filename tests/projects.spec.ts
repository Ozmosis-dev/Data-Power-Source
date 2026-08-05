import { expect, test, type Page } from "playwright/test";

const projects = [
  {
    slug: "charlotte-nc-television-transmitter-site",
    heading: "Charlotte, NC Television Transmitter Site",
    photos: 3,
    facts: ["Cable News Affiliate", "Charlotte, NC", "$900,000", "500kW", "350kW"],
  },
  {
    slug: "government-data-center-project",
    heading: "Government Data Center Project",
    photos: 7,
    facts: ["Government Agency", "Marietta, GA", "Approximately 3 months", "250kW", "eight Schneider InRow Cooling units"],
  },
  {
    slug: "us-army-combat-readiness-center-data-center-generator-and-cooling",
    heading: "US Army Combat Readiness Center Data Center Generator & Cooling",
    photos: 6,
    facts: ["US Army Combat Readiness Center", "Fort Rucker, AL", "6 months", "250kW", "FM200"],
  },
  {
    slug: "pruitt-assisted-living-facility",
    heading: "Pruitt Assisted Living Facility Standby Power",
    photos: 3,
    facts: ["Pruitt Assisted Living", "Macon, GA", "4.4 months", "500kW", "2,000A"],
  },
  {
    slug: "2010-earthlink-atlanta-network-service-addition",
    heading: "EarthLink Atlanta Network Service Addition",
    photos: 8,
    facts: ["EarthLink", "Atlanta, GA", "3 months", "Georgia Power", "without disruption"],
  },
  {
    slug: "clayton-county-public-schools-data-center-modifications",
    heading: "Clayton County Public Schools Data Center Modifications",
    photos: 4,
    facts: ["Clayton County Public Schools", "Jonesboro, GA", "$1.1 million", "Approximately 6 months", "400kW"],
  },
  {
    slug: "chatham-county-data-center-electrical-mechanical-installation",
    heading: "Chatham County Data Center Electrical & Mechanical Installation",
    photos: 5,
    facts: ["Chatham County Government", "Savannah, GA", "Approximately 4 months", "100kW", "hurricane"],
  },
  {
    slug: "georgia-institute-of-technology-holland-heating-cooling-plant-480v-upgrade",
    heading: "Georgia Tech Holland Heating & Cooling Plant 480V Upgrade",
    photos: 6,
    facts: ["Georgia Institute of Technology", "Atlanta, GA", "$800,000", "5,000A", "without unscheduled disruption"],
  },
  {
    slug: "georgia-state-university-classroom-south-phase-2-transformer",
    heading: "Georgia State University Classroom South Transformer",
    photos: 6,
    facts: ["Georgia State University", "Atlanta, GA", "$800,000", "transformer vault", "downtown campus"],
  },
] as const;

async function readSchemas(page: Page) {
  return page
    .locator('script[type="application/ld+json"]')
    .evaluateAll((nodes) => nodes.map((node) => JSON.parse(node.textContent ?? "{}")));
}

test.describe("project gallery", () => {
  test("replaces the placeholder with nine linked case studies", async ({ page }) => {
    await page.goto("/projects");

    await expect(page).toHaveTitle(/Commercial Electrical Projects.*Data Power Source/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Power installed. Operations protected." }),
    ).toBeVisible();
    await expect(page.getByText("Coming in the next pass.", { exact: true })).toHaveCount(0);
    await expect(page.getByTestId("project-gallery-card")).toHaveCount(9);

    for (const project of projects) {
      await expect(
        page.locator(`a[href="/projects/${project.slug}"]`).first(),
      ).toBeVisible();
    }

    await expect(page.getByTestId("project-featured")).toBeVisible();
    await expect(page.getByTestId("project-gallery-card").locator("img")).toHaveCount(9);
  });

  test("keeps the portfolio inside a 390px viewport", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/projects");

    const dimensions = await page.getByTestId("projects-page").evaluate((node) => ({
      clientWidth: node.clientWidth,
      scrollWidth: node.scrollWidth,
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
  });

  test("uses a bright brand-blue hover wash and restrained card motion", async ({ page }) => {
    await page.goto("/projects");

    const card = page.getByTestId("project-gallery-card").first();
    const overlay = card.getByTestId("project-card-blue-overlay");
    const image = card.locator("img");
    const content = card.getByTestId("project-card-content");

    await expect(overlay).toHaveCSS("background-color", "rgb(2, 91, 210)");
    await expect(overlay).toHaveCSS("z-index", "2");
    await expect(content).toHaveCSS("z-index", "3");
    await expect(overlay).toHaveCSS("opacity", "0");
    await card.hover();
    await expect(overlay).toHaveCSS("opacity", "0.42");
    await expect.poll(() => card.evaluate((node) => getComputedStyle(node).transform)).not.toBe("none");
    await expect.poll(() => image.evaluate((node) => getComputedStyle(node).transform)).not.toBe("none");
    await expect.poll(() => content.evaluate((node) => getComputedStyle(node).transform)).not.toBe("none");
  });

  test("keeps card movement static when reduced motion is requested", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/projects");

    const card = page.getByTestId("project-gallery-card").first();
    await card.hover();

    await expect(card).toHaveCSS("transform", "none");
    await expect(card.locator("img")).toHaveCSS("transform", "none");
    await expect(card.getByTestId("project-card-blue-overlay")).toHaveCSS("opacity", "0.42");
  });

  test("presents the six represented industries as a simplified inline index", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/projects");

    const rail = page.getByTestId("project-market-rail");
    const items = rail.getByTestId("project-market-item");
    await expect(items).toHaveCount(6);
    await expect(rail.locator("svg")).toHaveCount(0);
    await expect(rail).not.toContainText(/projects?/i);
    await expect(page.getByTestId("project-market-list")).toHaveCSS("display", "flex");

    for (const market of [
      "Education",
      "Government",
      "Healthcare",
      "Data centers",
      "Broadcast",
      "Telecom",
    ] as const) {
      await expect(items.filter({ hasText: market })).toHaveText(market);
    }

    const desktopBoxes = await items.evaluateAll((nodes) =>
      nodes.map((node) => {
        const box = node.getBoundingClientRect();
        return { x: box.x, y: box.y };
      }),
    );
    expect(new Set(desktopBoxes.map((box) => Math.round(box.y))).size).toBe(1);
  });

  test("keeps the inline industry index compact and contained on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/projects");

    const rail = page.getByTestId("project-market-rail");
    const dimensions = await rail.evaluate((node) => {
      const box = node.getBoundingClientRect();
      return { height: box.height, clientWidth: node.clientWidth, scrollWidth: node.scrollWidth };
    });

    expect(dimensions.height).toBeLessThan(130);
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
    await expect(rail.locator("svg")).toHaveCount(0);
  });

  test("uses the four service-page colors as one accessible gallery legend", async ({ page }) => {
    await page.goto("/projects");

    const legend = page.getByTestId("project-service-legend");
    const dots = legend.getByTestId("project-service-dot");
    await expect(dots).toHaveCount(4);

    for (const [discipline, label, color] of [
      ["electrical", "Commercial & Industrial Electrical", "rgb(22, 39, 146)"],
      ["mission-critical", "Mission Critical Power", "rgb(235, 59, 8)"],
      ["connectivity", "Low Voltage & Connectivity", "rgb(12, 158, 31)"],
      ["design-build", "Engineering & Design-Build", "rgb(26, 26, 26)"],
    ] as const) {
      const item = legend.locator(`[data-discipline="${discipline}"]`);
      await expect(item).toContainText(label);
      await expect(item.getByTestId("project-service-dot")).toHaveCSS("background-color", color);
    }
  });

  test("shows only the documented service categories on each project card", async ({ page }) => {
    await page.goto("/projects");

    const expected = [
      ["georgia-institute-of-technology-holland-heating-cooling-plant-480v-upgrade", ["electrical", "design-build"]],
      ["clayton-county-public-schools-data-center-modifications", ["electrical", "mission-critical", "connectivity", "design-build"]],
      ["charlotte-nc-television-transmitter-site", ["electrical", "mission-critical", "connectivity"]],
      ["government-data-center-project", ["electrical", "mission-critical", "design-build"]],
      ["us-army-combat-readiness-center-data-center-generator-and-cooling", ["electrical", "mission-critical", "design-build"]],
      ["chatham-county-data-center-electrical-mechanical-installation", ["electrical", "mission-critical", "design-build"]],
      ["pruitt-assisted-living-facility", ["electrical", "mission-critical", "design-build"]],
      ["2010-earthlink-atlanta-network-service-addition", ["electrical", "mission-critical"]],
      ["georgia-state-university-classroom-south-phase-2-transformer", ["electrical"]],
    ] as const;

    for (const [slug, disciplines] of expected) {
      const card = page.locator(`a[href="/projects/${slug}"]`).first();
      const indicator = card.getByTestId("project-service-indicators");
      await expect(indicator.getByTestId("project-service-dot")).toHaveCount(disciplines.length);
      await expect(indicator).toHaveAttribute("aria-label", /Services:/);
      expect(await indicator.locator("[data-discipline]").evaluateAll((nodes) =>
        nodes.map((node) => node.getAttribute("data-discipline")),
      )).toEqual([...disciplines]);
    }
  });
});

test.describe("project detail pages", () => {
  for (const project of projects) {
    test(`${project.slug} renders verified content and its complete photo set`, async ({ page }) => {
      await page.goto(`/projects/${project.slug}`);

      await expect(page).toHaveTitle(new RegExp(`${project.heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}.*Data Power Source`));
      await expect(page.getByRole("heading", { level: 1, name: project.heading })).toBeVisible();
      await expect(page.getByTestId("project-photo")).toHaveCount(project.photos);
      await expect(page.getByRole("link", { name: "All projects" }).first()).toHaveAttribute("href", "/projects");

      for (const fact of project.facts) {
        await expect(page.getByText(fact, { exact: false }).first()).toBeVisible();
      }

      const schemas = await readSchemas(page);
      expect(schemas.some((schema) => schema["@type"] === "BreadcrumbList")).toBeTruthy();
      expect(schemas.some((schema) => schema["@type"] === "Article")).toBeTruthy();

      const mainText = await page.locator("main").innerText();
      expect(mainText).not.toMatch(/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/);
    });
  }

  test("keeps every case study inside a narrow mobile viewport", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    for (const project of projects) {
      await page.goto(`/projects/${project.slug}`);
      const dimensions = await page.getByTestId("project-detail-page").evaluate((node) => ({
        clientWidth: node.clientWidth,
        scrollWidth: node.scrollWidth,
      }));
      expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
    }
  });
});

test("links the selected homepage work to real project details", async ({ page }) => {
  await page.goto("/");

  for (const slug of [
    "georgia-institute-of-technology-holland-heating-cooling-plant-480v-upgrade",
    "us-army-combat-readiness-center-data-center-generator-and-cooling",
    "clayton-county-public-schools-data-center-modifications",
  ]) {
    await expect(page.locator(`a[href="/projects/${slug}"]`).first()).toBeVisible();
  }
});
