import { expect, test } from "playwright/test";

test.describe("requested UI refinements", () => {
  test("keeps four approved callouts in every service module", async ({ page }) => {
    await page.goto("/");

    for (const callout of [
      "Service upgrades & switchgear",
      "Troubleshooting & maintenance",
      "UPS & generator installation",
      "Cooling & critical distribution",
      "Structured cabling",
      "Project design & engineering",
    ]) {
      await expect(page.getByText(callout, { exact: true }).first()).toBeVisible();
    }
  });

  test("condenses the proof section and labels social proof clearly", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByText("Proof, not promises", { exact: true })).toBeVisible();
    await expect(page.getByTestId("proof-metrics")).toHaveCSS("border-radius", "0px");
    await expect(page.getByText("Social proof", { exact: true })).toBeVisible();
    await expect(page.getByText("Testimonial", { exact: true })).toBeVisible();
  });

  test("uses a matched CTA pair and a branded four-discipline strip", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByText("Start with a site assessment", { exact: true })).toBeVisible();
    const actions = page.getByTestId("cta-actions").locator("a");
    await expect(actions).toHaveCount(2);
    await expect(actions.nth(0)).toHaveCSS("width", await actions.nth(1).evaluate((node) => getComputedStyle(node).width));

    const strip = page.getByTestId("discipline-strip");
    for (const src of [
      "/brand/service-electrical.svg",
      "/brand/service-connectivity.svg",
      "/brand/service-mission-critical.svg",
      "/brand/service-design-build.svg",
    ]) {
      await expect(strip.locator(`img[src="${src}"]`)).toBeVisible();
    }
  });

  test("makes trust points more legible and intentionally static", async ({ page }) => {
    await page.goto("/");

    const trustItem = page.getByTestId("trust-item").first();
    await expect(trustItem).toHaveCSS("font-size", "14px");
    const backgroundBefore = await trustItem.evaluate(
      (node) => getComputedStyle(node).backgroundColor,
    );
    await trustItem.hover();
    await expect(trustItem).toHaveCSS("color", "rgb(255, 255, 255)");
    await expect(trustItem).toHaveCSS("background-color", backgroundBefore);
  });

  test("inverts each service card into its discipline color on hover", async ({ page }) => {
    await page.goto("/");

    const states = [
      ["electrical", "rgb(22, 39, 146)"],
      ["connectivity", "rgb(8, 117, 26)"],
      ["mission-critical", "rgb(185, 51, 14)"],
      ["design-build", "rgb(26, 26, 26)"],
    ] as const;

    for (const [discipline, color] of states) {
      const card = page.locator(
        `[data-testid="service-card"][data-discipline="${discipline}"]`,
      );
      await expect(card).toHaveCSS("background-color", "rgb(255, 255, 255)");
      await card.hover();
      await expect(card).toHaveCSS("background-color", color);
      await expect(card.getByRole("heading")).toHaveCSS("color", "rgb(255, 255, 255)");
    }
  });

  test("fills every home discipline tile with its service color on hover", async ({
    page,
  }) => {
    await page.goto("/");

    const states = [
      ["electrical", "rgb(22, 39, 146)"],
      ["connectivity", "rgb(8, 117, 26)"],
      ["mission-critical", "rgb(185, 51, 14)"],
      ["design-build", "rgb(26, 26, 26)"],
    ] as const;

    for (const [discipline, color] of states) {
      const tile = page.locator(
        `[data-testid="discipline-link"][data-discipline="${discipline}"]`,
      );
      await expect(tile).toHaveCSS("background-color", "rgb(255, 255, 255)");
      await tile.hover();
      await expect(tile).toHaveCSS("background-color", color);
      await expect(tile.locator("[data-testid='discipline-title']")).toHaveCSS(
        "color",
        "rgb(255, 255, 255)",
      );
    }
  });

  test("calms the footer rail and strengthens header and footer hierarchy", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId("discipline-strip").locator("a").first()).toHaveCSS(
      "background-color",
      "rgb(255, 255, 255)",
    );
    await expect(page.getByRole("button", { name: "Services" }).first()).toHaveCSS(
      "font-size",
      "14px",
    );

    const logoHeight = await page
      .getByTestId("footer-logo")
      .locator("img")
      .evaluate((node) => node.getBoundingClientRect().height);
    expect(logoHeight).toBeGreaterThanOrEqual(36);
    expect(logoHeight).toBeLessThanOrEqual(44);
    await expect(page.getByTestId("footer-tagline")).toHaveCSS("font-size", "16px");
  });

  test("tightens the footer brand column and keeps the desktop proof line unbroken", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/");

    await expect(page.getByTestId("footer-address")).toHaveCSS(
      "align-items",
      "center",
    );
    await expect(page.getByTestId("footer-region")).toHaveCSS(
      "color",
      "rgb(154, 189, 237)",
    );

    const proofLine = page.getByTestId("footer-proof-line");
    await expect(proofLine).toHaveCSS("font-size", "11.52px");
    await expect(proofLine).toHaveCSS("color", "rgb(130, 144, 162)");
    await expect(proofLine).toHaveCSS("white-space", "nowrap");
    const proofDimensions = await proofLine.evaluate((node) => ({
      clientWidth: node.clientWidth,
      scrollWidth: node.scrollWidth,
    }));
    expect(proofDimensions.scrollWidth).toBeLessThanOrEqual(
      proofDimensions.clientWidth,
    );
  });

  test("locks every primary action and electrical hover to the DPS cobalt", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/");

    const headerQuote = page
      .getByRole("banner")
      .getByRole("link", { name: "Request a quote", exact: true });
    const companyAbout = page
      .getByTestId("company-preview")
      .getByRole("link", { name: "Learn more about us", exact: true });
    const bandQuote = page
      .getByTestId("cta-actions")
      .getByRole("link", { name: "Request a quote", exact: true });
    const footerQuote = page
      .getByRole("contentinfo")
      .getByRole("link", { name: "Request a quote", exact: true });
    const canonical = await headerQuote.evaluate((node) => getComputedStyle(node).backgroundColor);

    expect(canonical).toBe("rgb(22, 39, 146)");
    for (const action of [companyAbout, bandQuote, footerQuote]) {
      await expect(action).toHaveCSS("background-color", canonical);
    }

    const electrical = page.locator(
      '[data-testid="service-card"][data-discipline="electrical"]',
    );
    await electrical.hover();
    await expect(electrical).toHaveCSS("background-color", canonical);
  });

  test("adds the IEC credential quietly to the footer proof row", async ({ page }) => {
    await page.goto("/");

    const badge = page.getByTestId("footer-iec-badge");
    await expect(
      badge.getByRole("img", {
        name: "Independent Electrical Contractors, Atlanta and Georgia.",
      }),
    ).toBeVisible();
    const width = await badge.evaluate((node) => node.getBoundingClientRect().width);
    expect(width).toBeLessThanOrEqual(120);
  });

  test("contains the footer discipline rail within the site grid", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/");

    const bounds = await page.getByTestId("discipline-strip").boundingBox();
    expect(bounds).not.toBeNull();
    expect(bounds!.x).toBeGreaterThanOrEqual(60);
    expect(bounds!.width).toBeLessThanOrEqual(1320);
    await expect(page.getByTestId("discipline-strip")).toHaveCSS("border-radius", "12px");
  });

  test("uses the deep navy testimonial surface", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId("social-proof-card")).toHaveCSS(
      "background-color",
      "rgb(5, 33, 70)",
    );
  });
});
