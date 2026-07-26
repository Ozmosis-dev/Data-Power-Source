import { expect, test, type Page } from "playwright/test";

async function fillRequiredContactFields(page: Page) {
  await page.getByLabel("First name").fill("Alex");
  await page.getByLabel("Last name").fill("Morgan");
  await page.getByLabel("Company or facility").fill("Northside Operations");
  await page.getByLabel("Work email").fill("alex@example.com");
  await page.getByLabel("Phone").fill("(404) 555-0184");
  const missionCriticalChoice = page.getByRole("radio", {
    name: "Mission critical: UPS and generators",
  });
  await page.getByText("Mission critical: UPS and generators", { exact: true }).click();
  await expect(missionCriticalChoice).toBeChecked();
  await page.getByLabel("Facility location").fill("Atlanta, GA");
  await page.getByLabel("Project timing").selectOption("near-term");
  await page
    .getByLabel("Project details")
    .fill("We need to assess standby power for a live commercial facility.");
}

test.describe("contact page", () => {
  test("matches the compact quote form control system", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/contact");

    const contactForm = page.getByTestId("contact-form");
    const compactFields = [
      ["First name", "First name"],
      ["Last name", "Last name"],
      ["Company or facility", "Company or facility"],
      ["Work email", "Work email"],
      ["Phone", "Phone"],
      ["Facility location", "Facility location"],
      ["Project details", "Project details"],
    ] as const;

    for (const [accessibleName, placeholder] of compactFields) {
      const field = contactForm.getByLabel(accessibleName);
      await expect(field).toHaveAttribute("placeholder", placeholder);

      const id = await field.getAttribute("id");
      expect(id).toBeTruthy();
      await expect(contactForm.locator(`label[for="${id}"]`)).toHaveClass(/sr-only/);
    }

    await expect(
      contactForm.getByText("What can we help with?", { exact: true }),
    ).toBeVisible();
    await expect(
      contactForm.getByRole("radio", {
        name: "Mission critical: UPS and generators",
      }),
    ).toHaveAttribute("required", "");
    await expect(contactForm.getByLabel("Project timing").locator("option").first()).toHaveText(
      "Project timing",
    );

    await expect(contactForm.getByLabel("First name")).toHaveCSS("height", "44px");
    await expect(contactForm.getByLabel("Project details")).toHaveCSS("min-height", "112px");
  });

  test("replaces the stub with a verified project-intake page and schema", async ({ page }) => {
    await page.goto("/contact");

    await expect(page).toHaveTitle(
      "Contact Data Power Source | Metro Atlanta Electrical Contractor",
    );
    await expect(page.getByRole("heading", { level: 1, name: "Request a quote." })).toBeVisible();
    await expect(page.getByTestId("hero-field-visual")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Send us your project details." })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Get in touch." })).toBeVisible();
    await expect(page.getByText("Coming in the next pass.")).toHaveCount(0);

    const details = page.getByTestId("contact-details");
    await expect(
      details.getByRole("link", { name: "(770) 498-9622", exact: true }),
    ).toHaveAttribute(
      "href",
      "tel:+17704989622",
    );
    await expect(details.getByText("Fax (770) 498-9654")).toBeVisible();
    await expect(details.getByText("11187 Bob Williams Parkway")).toBeVisible();
    await expect(details.getByText("Covington, GA 30014")).toBeVisible();
    await expect(details.getByRole("link", { name: "Open in Google Maps" })).toHaveAttribute(
      "href",
      /google\.com\/maps/,
    );

    for (const label of [
      "First name",
      "Last name",
      "Work email",
      "Phone",
      "Project details",
    ]) {
      await expect(page.getByLabel(label)).toHaveAttribute("required", "");
    }
    await expect(
      page.getByRole("radio", { name: "Mission critical: UPS and generators" }),
    ).toHaveAttribute("required", "");

    const schemas = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((nodes) => nodes.map((node) => JSON.parse(node.textContent ?? "{}")));
    expect(schemas.some((schema) => schema["@type"] === "BreadcrumbList")).toBeTruthy();
    expect(schemas.some((schema) => schema["@type"] === "ContactPage")).toBeTruthy();
  });

  test("shows a clear success state after a project request is accepted", async ({ page }) => {
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true }),
      });
    });
    await page.goto("/contact");
    await fillRequiredContactFields(page);
    await page.getByRole("button", { name: "Send request" }).click();

    await expect(page.getByRole("status")).toContainText(
      "Thanks. We have your request and will be in touch shortly.",
    );
  });

  test("provides a direct-call fallback when online delivery fails", async ({ page }) => {
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 503,
        contentType: "application/json",
        body: JSON.stringify({ error: "Delivery unavailable" }),
      });
    });
    await page.goto("/contact");
    await fillRequiredContactFields(page);
    await page.getByRole("button", { name: "Send request" }).click();

    const alert = page.getByRole("alert").filter({ hasText: "We could not send your request." });
    await expect(alert).toContainText("We could not send your request.");
    await expect(
      alert.getByRole("link", { name: "(770) 498-9622", exact: true }),
    ).toHaveAttribute(
      "href",
      "tel:+17704989622",
    );
  });
});
