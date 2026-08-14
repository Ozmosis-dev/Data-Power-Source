import { expect, test } from "playwright/test";

test("uses documented project and founder imagery across the Home story", async ({ page }) => {
  await page.goto("/");

  for (const alt of [
    "DPS electricians inspecting commercial switchgear in an industrial plant room.",
    "New 5,000A switchboard installed at Georgia Tech's Holland Heating and Cooling Plant.",
    "Standby generator inside the new US Army Combat Readiness Center equipment courtyard.",
    "New data center cabinets and critical power equipment at Clayton County Public Schools.",
    "Portrait of Data Power Source founder Robert L. Kent.",
  ]) {
    await expect(page.getByRole("img", { name: alt })).toBeVisible();
  }

  await expect(page.locator('img[src*="generated"]')).toHaveCount(1);
  await expect(page.locator('img[src*="projects"]')).toHaveCount(3);
  await expect(page.locator('img[alt*="Representative" i]')).toHaveCount(0);
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
