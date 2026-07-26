import { expect, test } from "playwright/test";

test.describe("About Data Power Source", () => {
  test("centers the craftsmanship commitments against the complete copy column", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/about");

    const copyBox = await page.getByTestId("about-intro-copy").boundingBox();
    const commitmentsBox = await page
      .getByTestId("about-intro-commitments")
      .boundingBox();

    expect(copyBox).not.toBeNull();
    expect(commitmentsBox).not.toBeNull();
    const copyMidpoint = copyBox!.y + copyBox!.height / 2;
    const commitmentsMidpoint = commitmentsBox!.y + commitmentsBox!.height / 2;
    expect(Math.abs(copyMidpoint - commitmentsMidpoint)).toBeLessThanOrEqual(24);
  });

  test("replaces the stub with the canonical About page and metadata", async ({ page }) => {
    await page.goto("/about");

    await expect(page).toHaveTitle(
      "About Data Power Source | Metro Atlanta Electrical Contractor, 25 Years",
    );
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "25 years of getting the power right.",
      }),
    ).toBeVisible();
    await expect(page.getByText("Coming in the next pass.", { exact: true })).toHaveCount(0);
    await expect(page.getByTestId("hero-field-visual").locator("img")).toHaveAttribute(
      "src",
      /dps-leadership-team/,
    );

    const mainText = await page.locator("main").innerText();
    expect(mainText).not.toContain("—");
    expect(mainText).not.toContain("–");
  });

  test("grounds the founder story in Robert Kent's documented history", async ({ page }) => {
    await page.goto("/about");

    const founder = page.getByTestId("about-founder");
    await expect(
      founder.getByRole("heading", {
        level: 2,
        name: "Founded on 50 years in the field.",
      }),
    ).toBeVisible();
    await expect(founder).toContainText("electrician's helper");
    await expect(founder).toContainText("15");
    await expect(founder).toContainText("Marine Corps");
    await expect(founder).toContainText("Vietnam War");

    const portrait = founder.getByRole("img", {
      name: "Portrait of founder Robert L. Kent.",
    });
    await expect(portrait).toBeVisible();
    await expect(portrait).toHaveAttribute("src", /robert-kent-enhanced/);
    await expect(founder).toContainText(
      "We place the highest level of emphasis on craftsmanship and workmanship in all things.",
    );

    const portraitBox = await founder.getByTestId("founder-portrait").boundingBox();
    const badgeBox = await founder.getByTestId("founder-authority-badge").boundingBox();
    expect(portraitBox).not.toBeNull();
    expect(badgeBox).not.toBeNull();
    expect(badgeBox!.x).toBeLessThan(portraitBox!.x + 80);
    expect(badgeBox!.y).toBeLessThan(portraitBox!.y + portraitBox!.height);
    expect(badgeBox!.y + badgeBox!.height).toBeGreaterThan(
      portraitBox!.y + portraitBox!.height,
    );
  });

  test("routes detailed safety and values content into focused subpages", async ({
    page,
  }) => {
    await page.goto("/about");

    const pathways = page.getByTestId("about-pathways");
    await expect(
      pathways.getByRole("heading", {
        level: 2,
        name: "How we work.",
      }),
    ).toBeVisible();
    await expect(
      pathways.getByRole("link", {
        name: "Read about our safety program",
        exact: true,
      }),
    ).toHaveAttribute("href", "/about/safety");
    await expect(
      pathways.getByRole("link", {
        name: "Explore our values",
        exact: true,
      }),
    ).toHaveAttribute("href", "/about/values");
    await expect(pathways).toContainText("Safety, documented.");
    await expect(pathways).toContainText("Integrity in every job.");
    await expect(page.getByTestId("about-safety")).toHaveCount(0);
    await expect(page.getByTestId("about-values")).toHaveCount(0);
    await expect(page.getByTestId("safety-badge")).toHaveCount(0);

    const navigation = page.getByTestId("about-family-nav");
    await expect(navigation).toBeVisible();
    await expect(
      navigation.getByRole("link", { name: "Overview", exact: true }),
    ).toHaveAttribute("aria-current", "page");
  });

  test("keeps proof and qualification on the overview page", async ({
    page,
  }) => {
    await page.goto("/about");

    const stats = page.getByTestId("about-stats");
    await stats.scrollIntoViewIfNeeded();
    for (const proof of ["25 years", "50+ years", ".82-.86 EMR", "2-hour"]) {
      await expect(stats.getByText(proof, { exact: true })).toBeVisible();
    }
    await expect(stats).toContainText("Emergency response across Metro Atlanta");

    const qualification = page.getByTestId("about-qualification");
    await expect(qualification).toContainText(
      "Additional license, insurance, and manufacturer credential details are pending client confirmation.",
    );
    await expect(
      qualification.getByRole("heading", {
        level: 2,
        name: "Recognized. Documented. Ready for review.",
      }),
    ).toHaveCSS("color", "rgb(255, 255, 255)");
    await expect(qualification.getByTestId("qualification-check")).toHaveCSS(
      "color",
      "rgb(59, 166, 237)",
    );
    await expect(
      page.getByRole("link", { name: "Request a quote", exact: true }).last(),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "(770) 498-9622", exact: true }).last(),
    ).toHaveAttribute("href", "tel:+17704989622");

    const schemas = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((nodes) => nodes.map((node) => JSON.parse(node.textContent ?? "{}")));
    expect(schemas.some((schema) => schema["@type"] === "BreadcrumbList")).toBeTruthy();
    expect(schemas.some((schema) => schema["@type"] === "AboutPage")).toBeTruthy();
  });

  test("reuses the same proof band component as the homepage", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("proof-band")).toHaveCount(1);

    await page.goto("/about");
    const aboutProof = page.getByTestId("proof-band");
    await expect(aboutProof).toHaveCount(1);
    await expect(aboutProof).toHaveAttribute("data-variant", "shared-proof-band");
    await expect(aboutProof.getByTestId("proof-metrics")).toHaveCount(1);
  });

  test("keeps the About proof band metrics-only and removes the closing CTA", async ({
    page,
  }) => {
    await page.goto("/about");

    const aboutProof = page.getByTestId("proof-band");
    await expect(aboutProof.getByTestId("about-stats")).toBeVisible();
    await expect(
      aboutProof.getByText("Proof, not promises", { exact: true }),
    ).toHaveCount(0);
    await expect(
      aboutProof.getByRole("heading", {
        level: 2,
        name: "A track record you can verify.",
      }),
    ).toHaveCount(0);
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "Let's talk about your facility.",
      }),
    ).toHaveCount(0);

    await page.goto("/");
    await expect(
      page.getByTestId("proof-band").getByRole("heading", {
        level: 2,
        name: "A track record you can verify.",
      }),
    ).toBeVisible();
  });

  test("keeps the safety wall and founder story within the mobile viewport", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/about");

    const dimensions = await page.locator("main").evaluate((node) => ({
      clientWidth: node.clientWidth,
      scrollWidth: node.scrollWidth,
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
    await expect(page.getByTestId("about-founder")).toBeVisible();
    await expect(page.getByTestId("about-pathways")).toBeVisible();
  });
});
