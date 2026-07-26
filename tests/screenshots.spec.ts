import { expect, test } from "playwright/test";

const pages = [
  { name: "home", route: "/" },
  { name: "services", route: "/services" },
  { name: "faq", route: "/faq" },
] as const;

async function prepareFullPage(page: import("playwright/test").Page) {
  await page.waitForLoadState("networkidle");
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
  });
  const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const viewportHeight = page.viewportSize()?.height ?? 800;
  for (let position = 0; position < pageHeight; position += viewportHeight) {
    await page.evaluate((top) => window.scrollTo(0, top), position);
    await page.waitForTimeout(35);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(220);
}

for (const item of pages) {
  test(`${item.name} desktop screenshot`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1050 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(item.route);
    await prepareFullPage(page);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBeTruthy();
    await page.screenshot({
      path: `artifacts/screenshots/${item.name}-desktop.png`,
      fullPage: true,
    });
  });

  test(`${item.name} mobile screenshot`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(item.route);
    await prepareFullPage(page);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBeTruthy();
    await page.screenshot({
      path: `artifacts/screenshots/${item.name}-mobile.png`,
      fullPage: true,
    });
  });
}
