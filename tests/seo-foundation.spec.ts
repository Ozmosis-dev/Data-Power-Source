import { expect, test } from "playwright/test";

const productionOrigin = "https://datapowersource.com";

function sitemapLocations(xml: string) {
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
}

async function schemaNodes(page: import("playwright/test").Page) {
  const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
  return schemas.flatMap((schema) => {
    const parsed = JSON.parse(schema);
    return parsed["@graph"] ? [parsed, ...parsed["@graph"]] : [parsed];
  });
}

function assertSchemaValuesAreComplete(value: unknown, path = "schema") {
  if (typeof value === "string") {
    expect(value.trim(), `${path} must not be empty`).not.toBe("");
    expect(value, `${path} exposes unfinished data`).not.toMatch(/pending|placeholder|to be confirmed|tbd/i);
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => assertSchemaValuesAreComplete(item, `${path}[${index}]`));
    return;
  }

  if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, item]) =>
      assertSchemaValuesAreComplete(item, `${path}.${key}`),
    );
  }
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
    expect(robots).toContain(`Host: ${productionOrigin}`);
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

  test("links structured data to one organization and website identity", async ({ page }) => {
    const organizationId = `${productionOrigin}/#organization`;
    const websiteId = `${productionOrigin}/#website`;

    await page.goto("/");
    const homeNodes = await schemaNodes(page);
    const organizations = homeNodes.filter(
      (node) => node["@type"] === "Electrician" && node["@id"] === organizationId,
    );
    const websites = homeNodes.filter(
      (node) => node["@type"] === "WebSite" && node["@id"] === websiteId,
    );
    expect(organizations).toHaveLength(1);
    expect(websites).toHaveLength(1);
    expect(websites[0].publisher).toEqual({ "@id": organizationId });

    await page.goto("/services/mission-critical-power");
    const service = (await schemaNodes(page)).find((node) => node["@type"] === "Service");
    expect(service?.provider).toEqual({ "@id": organizationId });

    await page.goto("/projects/government-data-center-project");
    const article = (await schemaNodes(page)).find((node) => node["@type"] === "Article");
    expect(article?.author).toEqual({ "@id": organizationId });
    expect(article?.publisher).toEqual({ "@id": organizationId });

    await page.goto("/contact");
    const contactPage = (await schemaNodes(page)).find(
      (node) => node["@type"] === "ContactPage",
    );
    expect(contactPage?.mainEntity).toEqual({ "@id": organizationId });

    for (const route of ["/services", "/industries", "/projects"] as const) {
      await page.goto(route);
      const nodes = await schemaNodes(page);
      const collection = nodes.find((node) => node["@type"] === "CollectionPage");
      expect(collection, `${route} needs CollectionPage schema`).toBeTruthy();
      expect(collection?.isPartOf).toEqual({ "@id": websiteId });
      expect(collection?.mainEntity?.["@type"]).toBe("ItemList");
      expect(collection?.mainEntity?.itemListElement.length).toBeGreaterThan(0);
      collection?.mainEntity?.itemListElement.forEach(
        (item: { position: number }, index: number) => expect(item.position).toBe(index + 1),
      );
    }

    for (const route of ["/", "/services/mission-critical-power", "/projects", "/contact"] as const) {
      await page.goto(route);
      (await schemaNodes(page)).forEach((schema, index) =>
        assertSchemaValuesAreComplete(schema, `${route} schema ${index}`),
      );
    }
  });
});
