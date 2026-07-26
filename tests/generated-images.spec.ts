import { expect, test } from "playwright/test";

test("places the generated field imagery across the Home story", async ({ page }) => {
  await page.goto("/");

  for (const alt of [
    "DPS electricians inspecting commercial switchgear in an industrial plant room.",
    "Representative view of a large institutional switchboard modernization.",
    "Representative view of a commercial standby generator and cooling installation.",
    "Representative view of UPS and critical distribution equipment in a data center.",
    "Representative leadership team at a commercial electrical facility.",
    "Representative field-planning image for owner-led expertise.",
  ]) {
    await expect(page.getByRole("img", { name: alt })).toBeVisible();
  }

  await expect(page.locator('img[src*="generated"]')).toHaveCount(6);
});

test("uses the dedicated field-planning image as the FAQ hero background", async ({ page }) => {
  await page.goto("/faq");

  await expect(
    page.getByRole("img", {
      name: "An electrician and facility engineer reviewing an electrical one-line diagram.",
    }),
  ).toBeVisible();
  await expect(page.getByTestId("hero-field-visual")).toBeVisible();
  await expect(page.locator('img[src*="generated"]')).toHaveCount(1);
});

test("keeps the generated field imagery scoped to Home and FAQ", async ({ page }) => {
  await page.goto("/services");

  await expect(page.locator('img[src*="generated"]')).toHaveCount(0);
});
