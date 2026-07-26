import { expect, test } from "playwright/test";

test.describe("Home visual polish", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/");
  });

  test("uses the switchgear image as the full hero background", async ({ page }) => {
    const hero = page.locator("main > section").first();
    const visual = page.getByTestId("hero-field-visual");

    await expect(visual).toBeVisible();
    await expect(visual).toHaveCSS("position", "absolute");
    await expect(
      visual.getByRole("img", {
        name: "DPS electricians inspecting commercial switchgear in an industrial plant room.",
      }),
    ).toBeVisible();

    const [heroBox, visualBox] = await Promise.all([hero.boundingBox(), visual.boundingBox()]);
    expect(heroBox).not.toBeNull();
    expect(visualBox).not.toBeNull();
    expect(Math.abs(visualBox!.x - heroBox!.x)).toBeLessThanOrEqual(1);
    expect(Math.abs(visualBox!.width - heroBox!.width)).toBeLessThanOrEqual(2);
  });

  test("places the contained discipline band directly after the hero", async ({ page }) => {
    const main = page.locator("main");
    const band = main.getByTestId("discipline-band");
    const strip = main.getByTestId("discipline-strip");

    await expect(band).toBeVisible();
    await expect(strip).toBeVisible();
    await expect(page.getByRole("contentinfo").getByTestId("discipline-strip")).toHaveCount(0);

    const isNextSibling = await page.locator("main > section").first().evaluate((hero) => {
      return hero.nextElementSibling?.getAttribute("data-testid") === "discipline-band";
    });
    expect(isNextSibling).toBe(true);

    const bounds = await strip.boundingBox();
    expect(bounds).not.toBeNull();
    expect(bounds!.x).toBeGreaterThanOrEqual(60);
    expect(bounds!.width).toBeLessThanOrEqual(1320);
  });

  test("uses four callouts per service in a spaced aligned bento", async ({ page }) => {
    const bento = page.getByTestId("service-bento");
    const cards = bento.getByTestId("service-card");

    await expect(cards).toHaveCount(4);
    await expect(bento).toHaveCSS("gap", "20px");

    for (let index = 0; index < 4; index += 1) {
      await expect(cards.nth(index).locator("li")).toHaveCount(4);
    }

    const boxes = await Promise.all(
      Array.from({ length: 4 }, (_, index) => cards.nth(index).boundingBox()),
    );
    boxes.forEach((box) => expect(box).not.toBeNull());
    expect(Math.abs(boxes[0]!.height - boxes[1]!.height)).toBeLessThanOrEqual(1);
    expect(Math.abs(boxes[2]!.height - boxes[3]!.height)).toBeLessThanOrEqual(1);
  });

  test("gives every industry an icon and a large quiet numeral", async ({ page }) => {
    const industries = page.getByTestId("industry-card");
    await expect(industries).toHaveCount(6);
    await expect(page.getByTestId("industry-icon")).toHaveCount(6);
    await expect(page.getByTestId("industry-number")).toHaveCount(6);

    const numeral = page.getByTestId("industry-number").first();
    const size = Number.parseFloat(await numeral.evaluate((node) => getComputedStyle(node).fontSize));
    expect(size).toBeGreaterThanOrEqual(64);
  });

  test("uses a faded owner-team image and approved-style grayscale organization marks", async ({
    page,
  }) => {
    await expect(
      page.getByRole("img", {
        name: "Representative field-planning image for owner-led expertise.",
      }),
    ).toBeVisible();

    const logos = page.getByTestId("organization-logo");
    await expect(logos).toHaveCount(6);
    for (let index = 0; index < 6; index += 1) {
      expect(await logos.nth(index).evaluate((node) => getComputedStyle(node).filter)).toContain(
        "grayscale(1)",
      );
    }
  });

  test("fills the testimonial card without presenting an unverified endorsement", async ({
    page,
  }) => {
    const card = page.getByTestId("social-proof-card");
    await expect(card).toContainText("Verified client quote pending approval");
    await expect(card).toContainText("Client name and facility pending approval");
  });
});
