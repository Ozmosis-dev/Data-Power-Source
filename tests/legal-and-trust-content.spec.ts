import { expect, test } from "playwright/test";

function sitemapLocations(xml: string) {
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
}

const prohibitedPublicCopy = [
  "pending client confirmation",
  "pending client approval",
  "privacy policy pending",
  "license numbers pending",
  "verified client quote pending",
  "client name and facility pending approval",
] as const;

test.describe("legal and trust-content launch gates", () => {
  test("keeps placeholder and approval-request copy off every indexable page", async ({ request }) => {
    test.setTimeout(120_000);
    const sitemap = await request.get("/sitemap.xml");
    const locations = sitemapLocations(await sitemap.text());

    for (const location of locations) {
      const route = new URL(location).pathname;
      const response = await request.get(route);
      expect(response.status(), `${route} should load`).toBe(200);
      const html = (await response.text()).toLowerCase();

      for (const phrase of prohibitedPublicCopy) {
        expect(html, `${route} exposes "${phrase}"`).not.toContain(phrase);
      }
    }
  });

  for (const route of ["/privacy", "/terms-of-use"] as const) {
    test(`${route} is review-gated and excluded from search`, async ({ page, request }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        "content",
        /noindex.*follow|follow.*noindex/i,
      );
      await expect(page.locator("main#main-content h1")).toHaveCount(1);
      await expect(page.getByTestId("legal-review-gate")).toBeVisible();
      await expect(page.getByRole("link", { name: /contact data power source/i })).toBeVisible();

      const sitemap = await request.get("/sitemap.xml");
      expect(sitemapLocations(await sitemap.text())).not.toContain(
        `https://datapowersource.com${route}`,
      );
    });
  }

  test("does not advertise review-gated legal drafts or representative imagery", async ({ page }) => {
    await page.goto("/");
    const footer = page.getByRole("contentinfo");
    await expect(footer.locator('a[href="/privacy"]')).toHaveCount(0);
    await expect(footer.locator('a[href="/terms-of-use"]')).toHaveCount(0);
    await expect(page.locator('img[alt*="Representative" i]')).toHaveCount(0);
  });
});
