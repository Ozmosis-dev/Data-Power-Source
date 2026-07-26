import { expect, test } from "playwright/test";

const aboutRoutes = [
  { href: "/about", label: "About overview" },
  { href: "/about/safety", label: "Safety" },
  { href: "/about/values", label: "Values & integrity" },
] as const;

test.describe("About navigation", () => {
  test("keeps the banner dividers inside a white page gutter", async ({ page }) => {
    await page.goto("/about");

    const gutter = page.getByTestId("about-family-nav-gutter");
    const grid = page.getByTestId("about-family-nav-grid");

    await expect(gutter).toHaveCSS("background-color", "rgb(255, 255, 255)");
    await expect(grid).toHaveCSS("padding-left", "0px");
    await expect(grid).toHaveCSS("padding-right", "0px");

    const gutterBox = await gutter.boundingBox();
    const gridBox = await grid.boundingBox();
    expect(gutterBox).not.toBeNull();
    expect(gridBox).not.toBeNull();
    expect(gridBox!.x).toBeGreaterThan(gutterBox!.x);
    expect(gridBox!.x + gridBox!.width).toBeLessThan(
      gutterBox!.x + gutterBox!.width,
    );
  });

  test("opens the desktop About menu with all three routes", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/about");

    await page.getByRole("button", { name: "About" }).click();

    for (const route of aboutRoutes) {
      await expect(
        page.getByLabel("Main").getByRole("link", {
          name: route.label,
          exact: true,
        }),
      ).toHaveAttribute("href", route.href);
    }
  });

  test("exposes the same About routes in the mobile menu", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/about");
    await page.getByRole("button", { name: "Open menu" }).click();

    const mobileNav = page.getByRole("dialog", { name: "Site navigation" });
    await mobileNav.getByRole("button", { name: "About" }).click();

    for (const route of aboutRoutes) {
      await expect(
        mobileNav.getByRole("link", {
          name: route.label,
          exact: true,
        }),
      ).toHaveAttribute("href", route.href);
    }
  });
});
