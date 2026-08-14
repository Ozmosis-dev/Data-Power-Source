import { expect, test } from "playwright/test";

const productionOrigin = "https://datapowersource.com";

function sitemapLocations(xml: string) {
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
}

test.describe("technical SEO foundation", () => {
  test("publishes a clean, deterministic XML sitemap", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);

    const xml = await response.text();
    const locations = sitemapLocations(xml);

    expect(locations.length).toBeGreaterThan(0);
    expect(new Set(locations).size).toBe(locations.length);
    expect(xml).not.toContain("<priority>");
    expect(xml).not.toContain("<changefreq>");
    expect(xml).not.toContain("<lastmod>");

    for (const location of locations) {
      expect(location).toMatch(/^https:\/\/datapowersource\.com(?:\/[^?#]*)?$/);
      expect(location === productionOrigin || !location.endsWith("/")).toBe(true);
    }
  });

  test("exposes crawler rules and the canonical sitemap location", async ({ request }) => {
    const response = await request.get("/robots.txt");
    expect(response.status()).toBe(200);

    const robots = await response.text();
    expect(robots).toMatch(/User-agent:\s*\*/i);
    expect(robots).toMatch(/Allow:\s*\//i);
    expect(robots).toContain(`Sitemap: ${productionOrigin}/sitemap.xml`);
  });

  test("gives every indexable page complete and unique metadata", async ({ page, request }) => {
    test.setTimeout(120_000);
    const sitemapResponse = await request.get("/sitemap.xml");
    const locations = sitemapLocations(await sitemapResponse.text());
    const titles = new Map<string, string>();
    const descriptions = new Map<string, string>();

    for (const location of locations) {
      const route = new URL(location).pathname;
      const response = await page.goto(route);
      expect(response?.status(), `${route} should return 200`).toBe(200);

      const title = (await page.title()).trim();
      const description =
        (await page.locator('meta[name="description"]').getAttribute("content"))?.trim() ?? "";
      const canonicalTag = page.locator('link[rel="canonical"]');
      const openGraphUrlTag = page.locator('meta[property="og:url"]');
      const canonical = (await canonicalTag.count())
        ? await canonicalTag.first().getAttribute("href")
        : null;
      const openGraphUrl = (await openGraphUrlTag.count())
        ? await openGraphUrlTag.first().getAttribute("content")
        : null;

      expect(title, `${route} needs a title`).not.toBe("");
      expect(description, `${route} needs a meta description`).not.toBe("");
      await expect(canonicalTag, `${route} needs one canonical`).toHaveCount(1);
      await expect(page.locator('meta[name="description"]'), `${route} needs one description`).toHaveCount(
        1,
      );
      expect(canonical, `${route} needs a canonical`).toBe(location);
      expect(openGraphUrl, `${route} needs an og:url`).toBe(location);
      await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute(
        "content",
        "Data Power Source",
      );
      await expect(page.locator('meta[property="og:type"]')).toHaveAttribute("content", /website|article/);
      await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", title);
      await expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
        "content",
        description,
      );
      await expect(page.locator('meta[property="og:image"]').first()).toHaveAttribute(
        "content",
        /^https:\/\/datapowersource\.com\//,
      );
      await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
        "content",
        "summary_large_image",
      );
      await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute("content", title);
      await expect(page.locator('meta[name="twitter:description"]')).toHaveAttribute(
        "content",
        description,
      );
      await expect(page.locator('meta[name="twitter:image"]').first()).toHaveAttribute(
        "content",
        /^https:\/\/datapowersource\.com\//,
      );
      await expect(page.locator('meta[name="keywords"]')).toHaveCount(0);
      await expect(page.locator("h1"), `${route} needs exactly one H1`).toHaveCount(1);
      await expect(page.locator("main#main-content"), `${route} needs a semantic main landmark`).toHaveCount(
        1,
      );

      expect(titles.has(title), `duplicate title on ${route} and ${titles.get(title)}`).toBe(false);
      expect(
        descriptions.has(description),
        `duplicate description on ${route} and ${descriptions.get(description)}`,
      ).toBe(false);
      titles.set(title, route);
      descriptions.set(description, route);

      const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
      for (const schema of schemas) {
        expect(() => JSON.parse(schema), `${route} contains invalid JSON-LD`).not.toThrow();
      }
    }
  });
});
