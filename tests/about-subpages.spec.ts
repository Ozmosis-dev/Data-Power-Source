import { expect, test } from "playwright/test";

const aboutRoutes = [
  { href: "/about", label: "Overview" },
  { href: "/about/safety", label: "Safety" },
  { href: "/about/values", label: "Values & integrity" },
] as const;

test.describe("About page family", () => {
  for (const route of aboutRoutes) {
    test(`${route.href} exposes the full About navigation and current page`, async ({
      page,
    }) => {
      await page.goto(route.href);

      const navigation = page.getByTestId("about-family-nav");
      await expect(navigation).toBeVisible();

      for (const item of aboutRoutes) {
        await expect(
          navigation.getByRole("link", { name: item.label, exact: true }),
        ).toHaveAttribute("href", item.href);
      }

      await expect(
        navigation.getByRole("link", { name: route.label, exact: true }),
      ).toHaveAttribute("aria-current", "page");
    });
  }

  test("builds the Safety page from the canonical safety copy", async ({ page }) => {
    await page.goto("/about/safety");

    await expect(page).toHaveTitle(
      "Electrical Safety Program | NFPA 70E & Arc Flash | Data Power Source",
    );
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Safety first, always.",
      }),
    ).toBeVisible();
    await expect(page.getByLabel("Breadcrumb")).toContainText("About");
    await expect(page.getByLabel("Breadcrumb")).toContainText("Safety");

    const program = page.getByTestId("safety-program");
    await expect(
      program.getByRole("heading", {
        level: 2,
        name: "Safety is how we operate.",
      }),
    ).toBeVisible();
    await expect(program).toContainText("Personal Protective Equipment");
    await expect(program).toContainText("First Aid and CPR");
    await expect(program).toContainText(
      "live data center, an occupied healthcare facility, or an active industrial plant",
    );

    const authority = page.getByTestId("safety-authority");
    await expect(
      authority.getByRole("heading", {
        level: 2,
        name: "A safety record you can put a number on.",
      }),
    ).toBeVisible();
    await expect(authority.getByTestId("safety-badge")).toHaveCount(10);
    await expect(authority.getByTestId("safety-emr")).toContainText(".82-.86");
    await expect(authority).toContainText(
      "Lower is better than the 1.0 industry baseline.",
    );

    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "An early adopter of NFPA 70E arc-flash safety.",
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "A drug- and alcohol-free workplace.",
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", {
        name: "Read our values",
        exact: true,
      }),
    ).toHaveAttribute("href", "/about/values");
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "Safety-first from the first site visit.",
      }),
    ).toBeVisible();

    const mainText = await page.locator("main").innerText();
    expect(mainText).not.toContain("—");
    expect(mainText).not.toContain("–");
  });

  test("builds the Values and Integrity page from the canonical values copy", async ({
    page,
  }) => {
    await page.goto("/about/values");

    await expect(page).toHaveTitle(
      "Our Values | Safety, Integrity & Workmanship | Data Power Source",
    );
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Powering what can't afford to fail.",
      }),
    ).toBeVisible();
    await expect(page.getByLabel("Breadcrumb")).toContainText("About");
    await expect(page.getByLabel("Breadcrumb")).toContainText("Values & integrity");

    const standards = page.getByTestId("values-standards");
    for (const value of ["Safety", "Integrity", "Workmanship", "Responsiveness"]) {
      await expect(
        standards.getByRole("heading", { name: value, exact: true }),
      ).toBeVisible();
    }

    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "Integrity you can build on.",
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "Straight answers when plans change.",
      }),
    ).toBeVisible();
    await expect(page.getByTestId("integrity-practices")).toContainText(
      "Honest scope",
    );
    await expect(page.getByTestId("integrity-practices")).toContainText(
      "Realistic schedules",
    );
    await expect(page.getByTestId("integrity-practices")).toContainText(
      "Answers and options",
    );

    await expect(
      page.getByRole("link", {
        name: "Review our safety program",
        exact: true,
      }),
    ).toHaveAttribute("href", "/about/safety");
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "Bring us the work that matters.",
      }),
    ).toBeVisible();

    const mainText = await page.locator("main").innerText();
    expect(mainText).not.toContain("—");
    expect(mainText).not.toContain("–");
  });

  test("emits breadcrumb and WebPage schema on both subpages", async ({ page }) => {
    for (const route of ["/about/safety", "/about/values"]) {
      await page.goto(route);
      const schemas = await page
        .locator('script[type="application/ld+json"]')
        .evaluateAll((nodes) =>
          nodes.map((node) => JSON.parse(node.textContent ?? "{}")),
        );

      expect(
        schemas.some((schema) => schema["@type"] === "BreadcrumbList"),
      ).toBeTruthy();
      expect(schemas.some((schema) => schema["@type"] === "WebPage")).toBeTruthy();
    }
  });

  test("keeps both subpages within the mobile viewport", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    for (const route of ["/about/safety", "/about/values"]) {
      await page.goto(route);
      const dimensions = await page.locator("main").evaluate((node) => ({
        clientWidth: node.clientWidth,
        scrollWidth: node.scrollWidth,
      }));
      expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
      await expect(page.getByTestId("about-family-nav")).toBeVisible();
    }
  });
});
