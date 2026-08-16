import { expect, test } from "playwright/test";

const permanentRedirects = [
  ["/about-us", "/about"],
  ["/about/contact-information", "/contact"],
  ["/contact-us", "/contact"],
  ["/contact-us/contact-us-handler", "/contact"],
  ["/services/electrical-services", "/services/commercial-industrial-electrical"],
  ["/services/connectivity-services", "/services/low-voltage-connectivity"],
  ["/services/mission-critical-services", "/services/mission-critical-power"],
  ["/services/engineering-and-design", "/services/engineering-design-build"],
  ["/category/projects", "/projects"],
  ["/projects-old", "/projects"],
  ["/privacy-policy", "/privacy"],
  ["/author/admin", "/projects"],
  ["/author/dpsadmin", "/projects"],
] as const;

const retainedLegacyRoutes = [
  "/site-map",
  "/terms-of-use",
  "/projects/charlotte-nc-television-transmitter-site",
  "/projects/government-data-center-project",
  "/projects/us-army-combat-readiness-center-data-center-generator-and-cooling",
  "/projects/pruitt-assisted-living-facility",
  "/projects/2010-earthlink-atlanta-network-service-addition",
  "/projects/clayton-county-public-schools-data-center-modifications",
  "/projects/chatham-county-data-center-electrical-mechanical-installation",
  "/projects/georgia-institute-of-technology-holland-heating-cooling-plant-480v-upgrade",
  "/projects/georgia-state-university-classroom-south-phase-2-transformer",
] as const;

test.describe("legacy WordPress URL migration", () => {
  for (const [source, destination] of permanentRedirects) {
    test(`${source} permanently redirects to ${destination}`, async ({ request }) => {
      const direct = await request.get(source, { maxRedirects: 0 });
      expect(direct.status()).toBe(308);
      expect(new URL(direct.headers().location, "https://datapowersource.com").pathname).toBe(
        destination,
      );

      const trailingSlash = await request.get(`${source}/`, { maxRedirects: 0 });
      expect(trailingSlash.status()).toBe(308);
      expect(
        new URL(trailingSlash.headers().location, "https://datapowersource.com").pathname,
      ).toBe(destination);
    });
  }

  for (const route of retainedLegacyRoutes) {
    test(`${route} remains available`, async ({ request }) => {
      const response = await request.get(route);
      expect(response.status()).toBe(200);

      const trailingSlash = await request.get(`${route}/`, { maxRedirects: 0 });
      expect(trailingSlash.status()).toBe(308);
      expect(
        new URL(trailingSlash.headers().location, "https://datapowersource.com").pathname,
      ).toBe(route);
    });
  }
});
