import { expect, test, type Page } from "playwright/test";

const services = [
  {
    slug: "commercial-industrial-electrical",
    title:
      "Commercial & Industrial Electrical Contractor | Metro Atlanta | Data Power Source",
    heading: "Electrical installation services, built for business.",
    accent: "#162792",
    mark: "service-electrical.svg",
    image: "project-switchboard-modernization",
    proof: "From service entrance to final connection.",
    sourceCopy: [
      "Panelboards, switchboards, and power distribution",
      "DC fast charging (DCFC) installation",
      "EV make-ready infrastructure",
    ],
  },
  {
    slug: "mission-critical-power",
    title: "UPS & Standby Generator Installation | Mission Critical Power | Atlanta",
    heading: "When downtime isn't an option, power can't be an afterthought.",
    accent: "#B9330E",
    mark: "service-mission-critical.svg",
    image: "project-standby-power",
    proof: "We build for that instant.",
    sourceCopy: [
      "lost production, spoiled product, dropped transactions",
      "Schneider Electric, Eaton, Vertiv, Cummins, Kohler, and Caterpillar",
      "commission under real load",
    ],
  },
  {
    slug: "low-voltage-connectivity",
    title: "Structured Cabling & Fiber Optic Installation | Low Voltage | Atlanta",
    heading: "Structured cabling, fiber, and testing for critical facilities.",
    accent: "#08751A",
    mark: "service-connectivity.svg",
    image: "service-connectivity-cabling",
    proof: "Certified, documented, ready for turnover.",
    sourceCopy: [
      "Cat5e, Cat6, Cat6A, and Cat8",
      "Fluke DSX-class testers",
      "OTDR trace and analysis",
      "Distributed antenna systems (DAS)",
    ],
  },
  {
    slug: "engineering-design-build",
    title: "Electrical Design-Build & Engineering | Concept to Install | Atlanta",
    heading: "One team. One contract. One point of accountability.",
    accent: "#1A1A1A",
    mark: "service-design-build.svg",
    image: "faq-field-planning",
    proof: "Built around your business.",
    sourceCopy: [
      "Single-source responsibility",
      "Long-lead equipment gets ordered early",
      "Discovery",
      "Commission",
    ],
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
      for (const sourceCopy of service.sourceCopy) {
        await expect(page.getByText(sourceCopy, { exact: false }).first()).toBeVisible();
      }
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

  test("places mission-critical risk before delivery and preserves the intended color rhythm", async ({
    page,
  }) => {
    await page.goto("/services/mission-critical-power");

    const stake = page.getByTestId("service-proof");
    const delivery = page.getByTestId("service-capabilities");
    const focus = page.getByTestId("service-focus");

    await expect(stake.getByText("What's at stake", { exact: true })).toBeVisible();
    await expect(delivery.getByRole("heading", { level: 2, name: "What we deliver." })).toBeVisible();
    const [stakeBox, deliveryBox] = await Promise.all([stake.boundingBox(), delivery.boundingBox()]);
    expect(stakeBox?.y).toBeLessThan(deliveryBox?.y ?? 0);
    await expect(stake).toHaveCSS("background-color", "rgb(185, 51, 14)");
    await expect(delivery).toHaveCSS("background-color", "rgb(255, 255, 255)");
    await expect(focus).toHaveCSS("background-color", "rgb(255, 243, 238)");
  });

  test("uses a conversational closing action on mission-critical without changing the hero action", async ({
    page,
  }) => {
    await page.goto("/services/mission-critical-power");

    await expect(
      page.getByTestId("page-hero").getByRole("link", { name: "Request a quote", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByTestId("service-cta").getByRole("link", { name: "Let's Talk", exact: true }),
    ).toBeVisible();
  });

  test("uses a compact services-led heading and ledger on low voltage", async ({ page }) => {
    await page.goto("/services/low-voltage-connectivity");

    const capabilities = page.getByTestId("service-capabilities");
    await expect(
      capabilities.getByRole("heading", {
        level: 2,
        name: "Structured Cabling, Fiber Optic & Low-Voltage Services",
      }),
    ).toBeVisible();
    await expect(capabilities).toHaveAttribute("data-presentation", "ledger");
    await expect(capabilities.locator("article")).toHaveCount(4);
    await expect(capabilities.locator("li")).toHaveCount(25);
  });

  test("uses an installation and EV service composition on electrical", async ({ page }) => {
    await page.goto("/services/commercial-industrial-electrical");

    const capabilities = page.getByTestId("service-capabilities");
    await expect(
      capabilities.getByRole("heading", {
        level: 2,
        name: "Commercial Electrical Installation & EV Charging Services",
      }),
    ).toBeVisible();
    await expect(capabilities).toHaveAttribute("data-presentation", "split");
    await expect(capabilities.getByRole("heading", { level: 4 })).toHaveCount(6);
    await expect(capabilities.locator("li")).toHaveCount(13);
  });

  test("restores every design-build benefit from the approved client content", async ({ page }) => {
    await page.goto("/services/engineering-design-build");

    const capabilities = page.getByTestId("service-capabilities");
    await expect(capabilities).toHaveAttribute("data-presentation", "benefit-rail");
    for (const approvedDetail of [
      "schedules slip, costs creep, and reliability suffers",
      "not routed through a chain of subcontractors",
      "permitting moves in parallel with detailing",
      "realistic numbers early and fewer change orders late",
      "before they become problems on site",
    ]) {
      await expect(capabilities.getByText(approvedDetail, { exact: false })).toBeVisible();
    }
  });

  test("shows all approved design-build system descriptors in grayscale", async ({ page }) => {
    await page.goto("/services/engineering-design-build");

    const systems = page.getByTestId("service-systems-directory");
    for (const descriptor of [
      "sized, configured, and integrated for the loads that can't go dark",
      "generators and automatic transfer switches",
      "from the service entrance to the branch circuit, coordinated and code-compliant",
      "clean, redundant power and cooling infrastructure",
      "capacity for growth, planned around your operations and your uptime",
    ]) {
      await expect(systems.getByText(descriptor, { exact: false })).toBeVisible();
    }

    const colorValues = await systems.evaluate((section) => {
      const textNodes = [...section.querySelectorAll("h2, h3, p")];
      const cards = [...section.querySelectorAll(".system-directory-card")];
      return [
        ...textNodes.map((node) => getComputedStyle(node).color),
        ...[section, ...cards].map((node) => getComputedStyle(node).backgroundColor),
        ...cards.map((node) => getComputedStyle(node).borderTopColor),
      ];
    });
    for (const color of colorValues) {
      const channels = color.match(/\d+/g)?.slice(0, 3).map(Number);
      if (!channels) continue;
      expect(new Set(channels).size, color).toBe(1);
    }
  });

  test("keeps the design-build business context in a stacked reading flow", async ({ page }) => {
    await page.goto("/services/engineering-design-build");

    const context = page.getByTestId("design-business-context");
    await expect(context).toHaveAttribute("data-layout", "stacked");

    const positions = await context.evaluate((node) => {
      const heading = node.querySelector("h2")?.getBoundingClientRect();
      const body = node.querySelector("p")?.getBoundingClientRect();
      return { headingBottom: heading?.bottom ?? 0, bodyTop: body?.top ?? 0 };
    });
    expect(positions.bodyTop).toBeGreaterThan(positions.headingBottom);
  });
});
