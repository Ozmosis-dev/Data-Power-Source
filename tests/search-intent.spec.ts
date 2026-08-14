import { expect, test } from "playwright/test";

const intentPages = [
  {
    path: "/",
    title: "Commercial & Industrial Electrical Contractor in Metro Atlanta | Data Power Source",
    heading: "Metro Atlanta Commercial & Industrial Electrical Contractor",
    lead: /Since 2001.*commercial and industrial facilities.*Metro Atlanta/i,
  },
  {
    path: "/services",
    title: "Commercial Electrical Services in Metro Atlanta | Data Power Source",
    heading: "Commercial Electrical Services for Business Continuity",
    lead: /Since 2001.*design, install, and maintain/i,
  },
  {
    path: "/services/commercial-industrial-electrical",
    title: "Commercial Electrical Installation & Upgrades | Metro Atlanta | Data Power Source",
    heading: "Commercial & Industrial Electrical Installation and Upgrades",
    lead: /power distribution.*equipment connections.*EV charging/i,
  },
  {
    path: "/services/mission-critical-power",
    title: "UPS & Standby Generator Systems | Metro Atlanta | Data Power Source",
    heading: "UPS & Standby Generator Systems for Critical Facilities",
    lead: /outage.*transfer.*load/i,
  },
  {
    path: "/services/low-voltage-connectivity",
    title: "Structured Cabling & Fiber Installation | Metro Atlanta | Data Power Source",
    heading: "Structured Cabling, Fiber, and Testing for Critical Facilities",
    lead: /commercial, industrial, and mission-critical environments/i,
  },
  {
    path: "/services/engineering-design-build",
    title: "Electrical Design-Build Services | Metro Atlanta | Data Power Source",
    heading: "Electrical Design-Build from Concept to Commissioning",
    lead: /first sketch.*final commissioning report/i,
  },
  {
    path: "/industries",
    title: "Commercial Electrical Systems by Industry | Data Power Source",
    heading: "Electrical Systems for Demanding Industries Across Georgia",
    lead: /power distribution.*standby.*low-voltage infrastructure/i,
  },
  {
    path: "/projects",
    title: "Commercial Electrical Projects & Case Studies | Data Power Source",
    heading: "Commercial Electrical Projects & Case Studies",
    lead: /case studies.*switchgear.*UPS.*standby generation/i,
  },
  {
    path: "/about",
    title: "About Data Power Source | Electrical Contractor Since 2001",
    heading: "Metro Atlanta Electrical Contractor Since 2001",
    lead: /owner-led commercial and industrial electrical work/i,
  },
  {
    path: "/about/safety",
    title: "Electrical Safety Program | NFPA 70E & Arc Flash | Data Power Source",
    heading: "Commercial Electrical Safety Built into Every Project",
    lead: /Trained crews.*careful planning.*disciplined execution/i,
  },
  {
    path: "/about/values",
    title: "Our Values | Safety, Integrity & Workmanship | Data Power Source",
    heading: "Values That Guide Every Electrical Project",
    lead: /Safety, integrity, workmanship, and responsiveness/i,
  },
  {
    path: "/faq",
    title: "Commercial Electrical Services FAQs | Data Power Source",
    heading: "Commercial Electrical Services FAQ",
    lead: /UPS.*generator.*electrical project/i,
  },
  {
    path: "/contact",
    title: "Request an Electrical Project Quote | Data Power Source",
    heading: "Request a Commercial Electrical Project Quote",
    lead: /facility, scope, and timing/i,
  },
] as const;

for (const intentPage of intentPages) {
  test(`${intentPage.path} aligns its title, H1, and opening copy`, async ({ page }) => {
    await page.goto(intentPage.path);
    await expect(page).toHaveTitle(intentPage.title);
    await expect(
      page.getByRole("heading", { level: 1, name: intentPage.heading, exact: true }),
    ).toBeVisible();
    await expect(page.locator("main")).toContainText(intentPage.lead);
  });
}

test("public copy uses the evergreen founding year instead of an aging anniversary", async ({
  page,
}) => {
  for (const path of ["/", "/services", "/about"]) {
    await page.goto(path);
    await expect(page.locator("body")).not.toContainText(/(?:for |almost )?25 years/i);
  }
});

test("the footer uses the centralized current copyright year", async ({ page }) => {
  await page.goto("/");
  const copyright = page.getByTestId("footer-copyright");
  await expect(copyright).toHaveAttribute(
    "data-copyright-year",
    String(new Date().getUTCFullYear()),
  );
  await expect(copyright).toContainText(
    `© ${new Date().getUTCFullYear()} Data Power Source. All rights reserved.`,
  );
});
