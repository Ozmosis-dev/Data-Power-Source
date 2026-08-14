import { expect, test, type Page } from "playwright/test";

const markets = [
  ["commercial", "Commercial"],
  ["industrial-manufacturing", "Industrial & manufacturing"],
  ["healthcare", "Healthcare"],
  ["data-centers-mission-critical", "Data centers & mission-critical"],
  ["government-municipal", "Government & municipal"],
  ["education", "Education"],
  ["military", "Military"],
  ["telecommunications", "Telecommunications"],
  ["broadcast-media", "Broadcast & media"],
] as const;

async function readSchemas(page: Page) {
  return page
    .locator('script[type="application/ld+json"]')
    .evaluateAll((nodes) => nodes.map((node) => JSON.parse(node.textContent ?? "{}")));
}

test.describe("industries page", () => {
  test("replaces the placeholder with nine image-led market chapters", async ({ page }) => {
    await page.goto("/industries");

    await expect(page).toHaveTitle("Commercial Electrical Systems by Industry | Data Power Source");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://datapowersource.com/industries",
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      "https://datapowersource.com/industries/opengraph-image",
    );
    await expect(
      page.getByRole("heading", { level: 1, name: "Electrical Systems for Demanding Industries Across Georgia" }),
    ).toBeVisible();
    await expect(page.getByText("Coming in the next pass.", { exact: true })).toHaveCount(0);
    await expect(page.getByTestId("industry-chapter")).toHaveCount(markets.length);
    await expect(page.getByTestId("industry-chapter").locator("img")).toHaveCount(markets.length);

    for (const [id, heading] of markets) {
      const chapter = page.locator(`#${id}`);
      await expect(chapter.getByRole("heading", { level: 2, name: heading })).toBeVisible();
      const alt = await chapter.locator("img").getAttribute("alt");
      expect(alt?.trim().length).toBeGreaterThanOrEqual(20);
    }
  });

  test("provides a complete market index with real anchor destinations", async ({ page }) => {
    await page.goto("/industries");

    const index = page.getByTestId("industry-index");
    await expect(index.getByRole("link")).toHaveCount(markets.length);

    for (const [id, heading] of markets) {
      await expect(index.getByRole("link", { name: heading })).toHaveAttribute("href", `#${id}`);
      await expect(page.locator(`#${id}`)).toHaveCount(1);
    }
  });

  test("keeps visible content synchronized with breadcrumb and item-list schema", async ({ page }) => {
    await page.goto("/industries");

    const schemas = await readSchemas(page);
    const breadcrumb = schemas.find((schema) => schema["@type"] === "BreadcrumbList");
    const collection = schemas.find((schema) => schema["@type"] === "CollectionPage");
    const itemList = collection?.mainEntity;

    expect(breadcrumb?.itemListElement).toHaveLength(2);
    expect(collection?.isPartOf).toEqual({
      "@id": "https://datapowersource.com/#website",
    });
    expect(itemList?.["@type"]).toBe("ItemList");
    expect(itemList?.numberOfItems).toBe(markets.length);
    expect(itemList?.itemListElement.map((item: { name: string }) => item.name)).toEqual(
      markets.map(([, heading]) => heading),
    );
  });

  test("offers a direct quote path and stays inside a 390px viewport", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/industries");

    await expect(page.getByTestId("industries-page").getByText("Request a quote", { exact: true }).last()).toBeVisible();

    const dimensions = await page.getByTestId("industries-page").evaluate((node) => ({
      clientWidth: node.clientWidth,
      scrollWidth: node.scrollWidth,
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
  });
});
