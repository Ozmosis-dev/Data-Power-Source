import { expect, test } from "playwright/test";

test.describe("Pass 2 brand system", () => {
  test("uses the exported DPS logo system in the shell", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("banner").locator('img[src="/brand/DPS-text-logo.svg"]')).toBeVisible();
    await expect(page.getByRole("contentinfo").locator('img[src="/brand/DPS-text-logo.svg"]')).toBeVisible();
    await expect(page.getByTestId("footer-logo")).toHaveAttribute("data-logo-tone", "white");
    await expect(page.locator('link[rel~="icon"]')).toHaveAttribute("href", /DPS-icon\.svg/);
  });

  test("renders every exported service mark on Home", async ({ page }) => {
    await page.goto("/");

    for (const asset of [
      "service-electrical.svg",
      "service-mission-critical.svg",
      "service-connectivity.svg",
      "service-design-build.svg",
    ]) {
      await expect(page.locator(`img[src="/brand/${asset}"]`).first()).toBeVisible();
    }
  });

  test("uses the technical operations rail without the retired hero system matrix", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId("technical-status-rail")).toBeVisible();
    await expect(page.getByTestId("power-system-matrix")).toHaveCount(0);
  });

  test("marks the current primary navigation destination", async ({ page }) => {
    await page.goto("/faq");

    await expect(page.getByRole("banner").getByRole("link", { name: "FAQ" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });
});
