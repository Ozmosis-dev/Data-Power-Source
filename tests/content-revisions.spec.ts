import { expect, test } from "playwright/test";

test.describe("approved September 2026 content revisions", () => {
  test("updates the landing service area, founding year, and response time", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(
      "Commercial & Industrial Electrical Contractor in Metro Atlanta & the SE US | Data Power Source",
    );
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Commercial & Industrial Electrical Contractor Serving Metro Atlanta & the SE US",
      }),
    ).toBeVisible();

    const main = page.locator("main");
    await expect(main).toContainText("Since 1992");
    await expect(main).toContainText("4-hour");
    await expect(main).not.toContainText("2001");
    await expect(main).not.toContainText("2-hour");
  });

  test("updates the About founding year and response time", async ({ page }) => {
    await page.goto("/about");

    await expect(page).toHaveTitle(
      "About Data Power Source | Electrical Contractor Since 1992",
    );
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Metro Atlanta Electrical Contractor Since 1992",
      }),
    ).toBeVisible();

    const main = page.locator("main");
    await expect(main).toContainText("Since 1992");
    await expect(main).toContainText("4-hour");
    await expect(main).not.toContainText("2001");
    await expect(main).not.toContainText("2-hour");
  });

  test("anonymizes the requested project case studies", async ({ page }) => {
    await page.goto("/projects/pruitt-assisted-living-facility");
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Local Assisted Living Facility Standby Power",
      }),
    ).toBeVisible();
    await expect(page.locator("main")).not.toContainText("Pruitt");

    await page.goto("/projects/clayton-county-public-schools-data-center-modifications");
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Local School District Data Center",
      }),
    ).toBeVisible();
    await expect(page.locator("main")).not.toContainText("Clayton County");
  });

  test("uses the revised new-hire and emergency-readiness safety language", async ({
    page,
  }) => {
    await page.goto("/about/safety");

    const program = page.getByTestId("safety-program");
    await expect(program).toContainText(
      "New hires receive safety training and complete an OSHA 10 course prior to stepping onto the 1st project.",
    );
    await expect(program).toContainText(
      "All Data Power Source employees maintain current First Aid and CPR certification, achieved through an 8-hour course and renewed every three years in line with the most current industry best practices.",
    );
  });

  test("uses the revised generator, service, and preventive-maintenance FAQs", async ({
    page,
  }) => {
    await page.goto("/faq");

    const generatorQuestion = page.getByRole("button", {
      name: "What generator sizes do you install?",
    });
    await generatorQuestion.click();
    await expect(page.getByText(/20kW all the way to 2\.5MW/)).toBeVisible();

    const serviceQuestion = page.getByRole("button", {
      name: "Can you service UPS & Generator units?",
    });
    await serviceQuestion.click();
    await expect(
      page.getByText(/We do not perform preventive maintenance services on UPS or Generator units/),
    ).toBeVisible();

    const maintenanceQuestion = page.getByRole("button", {
      name: "Preventive Maintenance",
    });
    await maintenanceQuestion.click();
    await expect(
      page.getByText(/We perform infrared thermography to determine potential hotspots/),
    ).toBeVisible();
    await expect(page.locator("main")).not.toContainText(
      "We offer preventive-maintenance agreements",
    );
  });
});
