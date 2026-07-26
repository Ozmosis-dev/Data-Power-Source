import { expect, test, type Page } from "playwright/test";

async function openQuoteDialog(page: Page) {
  const trigger = page.getByRole("link", { name: "Request a quote", exact: true }).first();
  const startingUrl = page.url();
  await trigger.click();
  await expect(page).toHaveURL(startingUrl);
  const dialog = page.getByRole("dialog", { name: "Request a quote" });
  await expect(dialog).toBeVisible();
  return {
    trigger,
    dialog,
  };
}

async function fillQuoteForm(page: Page) {
  const dialog = page.getByRole("dialog", { name: "Request a quote" });
  await dialog.getByLabel("Full name").fill("Alex Morgan");
  await dialog.getByLabel("Company or facility").fill("Northside Operations");
  await dialog.getByLabel("Work email").fill("alex@example.com");
  await dialog.getByLabel("Phone").fill("(404) 555-0184");
  const missionCritical = dialog.getByRole("radio", {
    name: "Mission critical: UPS and generators",
  });
  await dialog.getByText("Mission critical: UPS and generators", { exact: true }).click();
  await expect(missionCritical).toBeChecked();
  await dialog.getByLabel("Project timing").selectOption("near-term");
  await dialog.getByLabel("Facility location").fill("Atlanta, GA");
  await dialog
    .getByLabel("Project details")
    .fill("Assess standby power for a live commercial facility.");
}

test.describe("global request-a-quote dialog", () => {
  test("opens a branded project-intake dialog without leaving the page", async ({ page }) => {
    await page.goto("/");
    const { dialog } = await openQuoteDialog(page);

    await expect(dialog).toBeVisible();
    await expect(dialog.getByTestId("quote-brand-mark")).toBeVisible();
    await expect(dialog.getByTestId("quote-field-image")).toBeVisible();
    await expect(
      dialog.getByRole("heading", { name: "Tell us what needs power." }),
    ).toBeVisible();
    await expect(
      dialog.getByRole("link", { name: "Call (770) 498-9622" }).first(),
    ).toHaveAttribute("href", "tel:+17704989622");

    for (const label of [
      "Full name",
      "Work email",
      "Phone",
      "Project details",
    ]) {
      await expect(dialog.getByLabel(label)).toHaveAttribute("required", "");
    }
    await expect(
      dialog.getByRole("radio", { name: "Commercial and industrial electrical" }),
    ).toHaveAttribute("required", "");
  });

  test("uses compact placeholders while keeping accessible field names", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/");
    const { dialog } = await openQuoteDialog(page);

    const placeholderFields = [
      ["Full name", "Full name"],
      ["Company or facility", "Company or facility"],
      ["Work email", "Work email"],
      ["Phone", "Phone"],
      ["Facility location", "Facility location"],
      ["Project details", "Project details"],
    ] as const;

    for (const [accessibleName, placeholder] of placeholderFields) {
      const field = dialog.getByLabel(accessibleName);
      await expect(field).toHaveAttribute("placeholder", placeholder);
      const fieldId = await field.getAttribute("id");
      await expect(dialog.locator(`label[for="${fieldId}"]`)).toHaveClass(/sr-only/);
    }

    await expect(dialog.getByLabel("Project timing")).toHaveValue("");
    await expect(dialog.getByLabel("Project timing").locator("option").first()).toHaveText(
      "Project timing",
    );
    await expect(dialog.getByText("What can we help with?", { exact: true })).toBeVisible();

    const logoBox = await dialog.getByTestId("quote-brand-mark").boundingBox();
    expect(logoBox?.width).toBeGreaterThanOrEqual(330);

    const dialogBox = await page.getByTestId("quote-dialog-content").boundingBox();
    expect(dialogBox?.height).toBeLessThanOrEqual(870);
  });

  test("returns focus to the activating quote link after Escape", async ({ page }) => {
    await page.goto("/");
    const { trigger, dialog } = await openQuoteDialog(page);

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("marks every Home quote link as a shared dialog trigger", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/");

    const triggers = page.getByRole("link", { name: "Request a quote", exact: true });
    expect(await triggers.count()).toBeGreaterThanOrEqual(4);
    for (let index = 0; index < (await triggers.count()); index += 1) {
      await expect(triggers.nth(index)).toHaveAttribute("data-quote-trigger", "true");
    }
  });

  test("uses a full-height, scrollable quote sheet on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    await page
      .getByRole("navigation", { name: "Mobile actions" })
      .getByRole("link", { name: "Request a quote", exact: true })
      .click();

    const content = page.getByTestId("quote-dialog-content");
    const box = await content.boundingBox();
    expect(box?.width).toBeGreaterThanOrEqual(389);
    expect(box?.height).toBeGreaterThanOrEqual(843);
    await expect(content).toHaveCSS("border-radius", "0px");
    await expect(page.getByRole("button", { name: "Close quote form" })).toBeVisible();
  });

  test("hands off from the mobile navigation sheet to the quote dialog", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    await page.getByRole("button", { name: "Open menu" }).click();
    const mobileNavigation = page.getByRole("dialog", { name: "Site navigation" });
    await mobileNavigation
      .getByRole("link", { name: "Request a quote", exact: true })
      .click();

    await expect(mobileNavigation).toBeHidden();
    await expect(page.getByRole("dialog", { name: "Request a quote" })).toBeVisible();
  });

  test("shows confirmation after a quote request is accepted", async ({ page }) => {
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true }),
      });
    });
    await page.goto("/");
    await openQuoteDialog(page);
    await fillQuoteForm(page);
    await page
      .getByRole("dialog", { name: "Request a quote" })
      .getByRole("button", { name: "Send request" })
      .click();

    const status = page.getByRole("status");
    await expect(status.getByRole("heading", { name: "Your request was sent." })).toBeVisible();
    await expect(status).toContainText(
      "A member of our team will follow up with a clear next step.",
    );
  });

  test("keeps a direct-call fallback when quote delivery fails", async ({ page }) => {
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 503,
        contentType: "application/json",
        body: JSON.stringify({ error: "Delivery unavailable" }),
      });
    });
    await page.goto("/");
    await openQuoteDialog(page);
    await fillQuoteForm(page);
    await page
      .getByRole("dialog", { name: "Request a quote" })
      .getByRole("button", { name: "Send request" })
      .click();

    const alert = page.getByRole("alert").filter({ hasText: "We could not send your request." });
    await expect(alert).toContainText("(770) 498-9622");
    await expect(
      alert.getByRole("link", { name: "(770) 498-9622", exact: true }),
    ).toHaveAttribute("href", "tel:+17704989622");
  });
});
