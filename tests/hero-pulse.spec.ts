import { expect, test } from "playwright/test";

const heroRoutes = [
  "/",
  "/about",
  "/services",
  "/services/commercial-industrial-electrical",
  "/faq",
  "/contact",
  "/privacy",
  "/industries",
  "/projects",
];

test.describe("shared hero data pulse", () => {
  test("appears once at the bottom edge of every hero", async ({ page }) => {
    test.setTimeout(60_000);
    await page.setViewportSize({ width: 1440, height: 900 });

    for (const route of heroRoutes) {
      await page.goto(route);

      const hero = page.getByTestId("page-hero");
      const rail = hero.getByTestId("hero-pulse-rail");

      await expect(hero).toHaveCount(1);
      await expect(rail).toHaveCount(1);
      await expect(rail.getByTestId("hero-pulse-signal")).toHaveCount(1);
      await expect(rail.getByTestId("hero-pulse-spark")).toHaveCount(1);

      const heroBox = await hero.boundingBox();
      const railBox = await rail.boundingBox();

      expect(heroBox).not.toBeNull();
      expect(railBox).not.toBeNull();
      expect(Math.abs(heroBox!.y + heroBox!.height - (railBox!.y + railBox!.height))).toBeLessThanOrEqual(1);
    }
  });

  test("uses one slow, linear, continuously traveling signal", async ({ page }) => {
    await page.goto("/about");

    const signal = page.getByTestId("hero-pulse-signal");
    await expect(signal).toHaveCSS("animation-name", "hero-pulse-travel");
    await expect(signal).toHaveCSS("animation-duration", "8s");
    await expect(signal).toHaveCSS("animation-timing-function", "linear");
    await expect(signal).toHaveCSS("animation-iteration-count", "infinite");
    await expect(page.getByTestId("hero-pulse-rail")).toHaveCSS("height", "2px");
  });

  test("uses one brand-blue trail and a circular pulse that crosses the hero edge", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/about");

    const heroBox = await page.getByTestId("page-hero").boundingBox();
    const signalBox = await page.getByTestId("hero-pulse-signal").boundingBox();
    const sparkBox = await page.getByTestId("hero-pulse-spark").boundingBox();

    expect(heroBox).not.toBeNull();
    expect(signalBox).not.toBeNull();
    expect(sparkBox).not.toBeNull();
    expect(signalBox!.width).toBeGreaterThanOrEqual(480);
    expect(sparkBox!.width).toBe(16);
    expect(sparkBox!.height).toBe(16);
    expect(sparkBox!.y).toBeLessThan(heroBox!.y + heroBox!.height);
    expect(sparkBox!.y + sparkBox!.height).toBeGreaterThan(
      heroBox!.y + heroBox!.height + 6,
    );
    await expect(page.getByTestId("hero-pulse-spark")).toHaveCSS(
      "background-color",
      "rgb(59, 166, 237)",
    );
    await expect(page.getByTestId("hero-pulse-spark")).toHaveCSS(
      "border-radius",
      "999px",
    );
    await expect(page.getByTestId("hero-pulse-spark")).toHaveCSS(
      "clip-path",
      "none",
    );
    const extraLines = await page.getByTestId("hero-pulse-signal").evaluate((node) => ({
      before: getComputedStyle(node, "::before").content,
      after: getComputedStyle(node, "::after").content,
    }));
    expect(["none", "normal"]).toContain(extraLines.before);
    expect(["none", "normal"]).toContain(extraLines.after);
    await expect(page.getByTestId("hero-pulse-rail")).toHaveCSS("z-index", "40");
  });

  test("keeps the tail long without delaying the spark on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/about");

    const signalBox = await page.getByTestId("hero-pulse-signal").boundingBox();

    expect(signalBox).not.toBeNull();
    expect(signalBox!.width).toBeGreaterThanOrEqual(280);
    expect(signalBox!.width).toBeLessThanOrEqual(390);
  });

  test("stops the moving signal when reduced motion is requested", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/about");

    await expect(page.getByTestId("hero-pulse-signal")).toHaveCSS(
      "animation-name",
      "none",
    );
  });
});
