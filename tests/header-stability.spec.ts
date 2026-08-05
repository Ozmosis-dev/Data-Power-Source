import { expect, test, type Locator } from "playwright/test";

async function sampleBoxAxis(
  locator: Locator,
  axis: "height" | "y",
) {
  const samples: number[] = [];

  for (let index = 0; index < 12; index += 1) {
    const box = await locator.boundingBox();
    expect(box).not.toBeNull();
    samples.push(box![axis]);
    await new Promise((resolve) => setTimeout(resolve, 60));
  }

  return samples;
}

test.describe("desktop header stability", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
  });

  test("keeps its document height fixed near the former scroll threshold", async ({ page }) => {
    const header = page.getByRole("banner");
    await page.mouse.wheel(0, 30);

    const heights = await sampleBoxAxis(header, "height");
    expect(Math.max(...heights) - Math.min(...heights)).toBeLessThan(1);
  });

  test("keeps the Services dropdown anchored while the page is scrolled", async ({ page }) => {
    await page.mouse.wheel(0, 30);
    await page.getByRole("button", { name: "Services" }).click();

    const menuLabel = page.getByText("Systems / four disciplines", { exact: true });
    await expect(menuLabel).toBeVisible();
    const menu = menuLabel.locator("..").locator("..");
    const positions = await sampleBoxAxis(menu, "y");

    expect(Math.max(...positions) - Math.min(...positions)).toBeLessThan(1);
  });
});
