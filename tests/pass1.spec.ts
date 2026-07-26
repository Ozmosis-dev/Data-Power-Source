import { expect, test } from "playwright/test";

const phoneLink = 'a[href="tel:+17704989622"]';

test.describe("global shell", () => {
  test("renders quote, phone, navigation, NAP, and LocalBusiness schema", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("banner")).toBeVisible();
    await expect(page.getByRole("link", { name: "Request a quote" }).first()).toHaveAttribute(
      "href",
      "/contact",
    );
    await expect(page.locator(phoneLink).first()).toBeVisible();
    await expect(page.getByText("11187 Bob Williams Parkway")).toBeVisible();
    await expect(page.getByText("Covington, GA 30014")).toBeVisible();

    const schemas = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((nodes) => nodes.map((node) => JSON.parse(node.textContent ?? "{}")));
    expect(schemas.some((schema) => schema["@type"] === "Electrician")).toBeTruthy();
  });

  test("opens the Services mega-menu and follows its overview link", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Services" }).click();

    await expect(
      page.getByRole("link", { name: /Commercial & Industrial Electrical Full-service installations/ }),
    ).toBeVisible();
    await expect(
      page.getByLabel("Main").getByRole("link", { name: "View all services" }),
    ).toHaveAttribute("href", "/services");
  });

  test("opens a keyboard-accessible mobile navigation sheet", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();

    await expect(page.getByRole("dialog", { name: "Site navigation" })).toBeVisible();
    await page.getByRole("button", { name: "Services" }).last().click();
    await expect(page.getByRole("link", { name: "Mission Critical Power" })).toBeVisible();
    await expect(page.getByLabel("Mobile actions").locator(phoneLink)).toBeVisible();
  });
});

test.describe("home", () => {
  test("uses canonical metadata and the full section order", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(
      "Commercial & Industrial Electrical Contractor in Metro Atlanta | Data Power Source",
    );
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Power you can build on — installed right, kept running.",
      }),
    ).toBeVisible();

    const sectionHeadings = await page.locator("main h2").allTextContents();
    expect(sectionHeadings).toEqual([
      "Local leadership. Technical depth. Built around your uptime.",
      "Design, install, and maintain — under one roof.",
      "A track record you can verify.",
      "Power delivered where downtime isn't an option.",
      "Built for facilities that have to stay on.",
      "Engineered, established, reliable.",
      "Trusted by facilities across Georgia and the Southeast.",
      "Power you can build on.",
    ]);
  });

  test("shows the four approved proof metrics", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("heading", { name: "A track record you can verify." }).scrollIntoViewIfNeeded();
    for (const value of ["25", ".82–.86", "50+", "2-hour"]) {
      await expect(page.getByTestId("stat-value").filter({ hasText: value })).toBeVisible();
    }
  });
});

test.describe("services overview", () => {
  test("renders canonical copy, process, and BreadcrumbList schema", async ({ page }) => {
    await page.goto("/services");
    await expect(page).toHaveTitle(
      "Commercial & Industrial Electrical Services in Metro Atlanta | Data Power Source",
    );
    await expect(
      page.getByRole("heading", { level: 1, name: "Electrical solutions for business continuity." }),
    ).toBeVisible();

    for (const step of ["Assess.", "Design & engineer.", "Install.", "Maintain."]) {
      await expect(page.getByRole("heading", { name: step })).toBeVisible();
    }

    const schemas = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((nodes) => nodes.map((node) => JSON.parse(node.textContent ?? "{}")));
    expect(schemas.some((schema) => schema["@type"] === "BreadcrumbList")).toBeTruthy();
  });
});

test.describe("FAQ", () => {
  test("groups every source answer into the five requested sections", async ({ page }) => {
    await page.goto("/faq");
    await expect(page).toHaveTitle("UPS, Generator & Electrical Contractor FAQs | Data Power Source");
    await expect(
      page.getByRole("heading", { level: 1, name: "Questions about power, answered plainly." }),
    ).toBeVisible();

    for (const group of [
      "Mission-critical power",
      "General electrical",
      "Safety & credentials",
      "Process & scheduling",
      "Service area",
    ]) {
      await expect(page.getByRole("heading", { name: group, exact: true })).toBeVisible();
    }
  });

  test("expands and collapses answers and emits FAQPage schema", async ({ page }) => {
    await page.goto("/faq");
    const question = page.getByRole("button", {
      name: "What's the difference between a UPS and a standby generator?",
    });

    await question.click();
    await expect(page.getByText("They solve different halves of the same problem")).toBeVisible();
    await question.click();
    await expect(question).toHaveAttribute("aria-expanded", "false");

    const schemas = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((nodes) => nodes.map((node) => JSON.parse(node.textContent ?? "{}")));
    const faqSchema = schemas.find((schema) => schema["@type"] === "FAQPage");
    expect(faqSchema.mainEntity).toHaveLength(23);
  });
});

test("linked unbuilt routes render deliberate coming-soon stubs", async ({ page }) => {
  for (const route of ["/industries", "/projects"]) {
    await page.goto(route);
    await expect(page.getByRole("heading", { name: "Coming in the next pass." })).toBeVisible();
  }
});
