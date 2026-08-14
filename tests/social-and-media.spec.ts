import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";

import { expect, test } from "playwright/test";

const familyImages = [
  {
    route: "/",
    imagePath: "/opengraph-image",
    alt: "Data Power Source — Metro Atlanta Commercial & Industrial Electrical Contractor",
  },
  {
    route: "/services",
    imagePath: "/services/opengraph-image",
    alt: "Data Power Source commercial electrical services",
  },
  {
    route: "/industries",
    imagePath: "/industries/opengraph-image",
    alt: "Data Power Source electrical systems by industry",
  },
  {
    route: "/projects",
    imagePath: "/projects/opengraph-image",
    alt: "Data Power Source commercial electrical project case studies",
  },
  {
    route: "/about",
    imagePath: "/about/opengraph-image",
    alt: "About Data Power Source — serving Metro Atlanta since 2001",
  },
  {
    route: "/contact",
    imagePath: "/contact/opengraph-image",
    alt: "Request a commercial electrical project quote from Data Power Source",
  },
] as const;

test("main page families publish distinct 1200 by 630 social images", async ({ page, request }) => {
  for (const family of familyImages) {
    await page.goto(family.route);
    const image = page.locator('meta[property="og:image"]').first();
    const imageUrl = await image.getAttribute("content");

    expect(new URL(imageUrl ?? "").pathname).toBe(family.imagePath);
    await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute("content", "1200");
    await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute("content", "630");
    await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute("content", family.alt);
    await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute("content", imageUrl ?? "");

    const response = await request.get(family.imagePath);
    expect(response.status(), family.imagePath).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/png");
  }
});

test("publishes manifest, favicon, and Apple touch icon metadata", async ({ page, request }) => {
  await page.goto("/");

  const manifestHref = await page.locator('link[rel="manifest"]').getAttribute("href");
  expect(manifestHref).toBe("/manifest.webmanifest");
  const manifestResponse = await request.get(manifestHref!);
  expect(manifestResponse.status()).toBe(200);
  const manifest = await manifestResponse.json();
  expect(manifest).toMatchObject({
    name: "Data Power Source",
    short_name: "DPS",
    start_url: "/",
    display: "browser",
  });

  await expect(page.locator('link[rel="icon"]')).toHaveAttribute("href", /DPS-icon\.svg/);
  const appleHref = await page.locator('link[rel="apple-touch-icon"]').getAttribute("href");
  expect(appleHref).toMatch(/^\/apple-icon/);
  const appleResponse = await request.get(appleHref!);
  expect(appleResponse.status()).toBe(200);
  expect(appleResponse.headers()["content-type"]).toContain("image/png");
});

test("preserves the approved Robert L. Kent production asset and optimizes its delivery", async ({
  page,
}) => {
  const portraitPath = path.join(
    process.cwd(),
    "public/images/about/robert-kent-enhanced.png",
  );
  const hash = createHash("sha256").update(await readFile(portraitPath)).digest("hex");
  expect(hash).toBe("65c971f9a9a66cfa62cd5142ce5850a133a88ff5497eff75038b96970c9b0cf2");

  await page.goto("/");
  const portrait = page.getByTestId("company-leadership-image");
  await expect(portrait).toHaveAttribute("loading", "lazy");
  await expect(portrait).toHaveAttribute("sizes", "(min-width: 1024px) 42vw, 100vw");
  await expect(portrait).toHaveAttribute("src", /_next\/image/);
});

test("preloads the header and hero only, leaving footer branding lazy", async ({ page }) => {
  await page.goto("/");
  const imagePreloads = page.locator('link[rel="preload"][as="image"]');
  await expect(imagePreloads).toHaveCount(2);
  await expect(
    page.locator('link[rel="preload"][as="image"][href="/brand/DPS-text-logo.svg"]'),
  ).toHaveCount(1);
  await expect(
    page.locator('link[rel="preload"][as="image"][imagesrcset*="home-hero-switchgear"]'),
  ).toHaveCount(1);
  await expect(page.getByTestId("header-logo").locator("img")).not.toHaveAttribute(
    "loading",
    "lazy",
  );
  await expect(page.getByTestId("hero-field-visual").locator("img")).not.toHaveAttribute(
    "loading",
    "lazy",
  );
  await expect(page.getByTestId("footer-logo").locator("img")).toHaveAttribute("loading", "lazy");
});
