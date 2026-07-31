import { expect, test } from "playwright/test";

const addedQuestions = [
  "What does an automatic transfer switch do in a standby generator system?",
  "How often should commercial UPS batteries be inspected or tested?",
  "Can you upgrade commercial switchgear or electrical service while a facility is occupied?",
  "Do you install commercial EV charging stations in Metro Atlanta?",
  "Do you install low-voltage cabling and fiber?",
  "What does NFPA 70E arc-flash training cover?",
  "What is an EMR, and why does it matter when choosing an electrical contractor?",
  "What happens during a commercial electrical site assessment?",
] as const;

test.describe("FAQ SEO redesign", () => {
  test("uses the field-planning image as the hero background without the Page System module", async ({
    page,
  }) => {
    await page.goto("/faq");

    const heroVisual = page.getByTestId("hero-field-visual");
    await expect(heroVisual).toBeVisible();
    await expect(heroVisual.locator("img")).toHaveAttribute(
      "src",
      /faq-field-planning\.webp/,
    );
    await expect(page.getByText("Page system", { exact: true })).toHaveCount(0);
    await expect(page.getByTestId("faq-field-image")).toHaveCount(0);
  });

  test("replaces technical system numbering with useful category icons and question counts", async ({
    page,
  }) => {
    await page.goto("/faq");

    await expect(page.getByTestId("faq-group-icon")).toHaveCount(5);
    await expect(page.getByText(/System \//)).toHaveCount(0);

    for (const category of [
      "Power continuity",
      "Electrical systems",
      "Safety standards",
      "Project delivery",
      "Service coverage",
    ]) {
      await expect(page.getByText(category, { exact: true })).toBeVisible();
    }
  });

  test("adds documented commercial electrical and critical-power search questions", async ({
    page,
  }) => {
    await page.goto("/faq");

    for (const question of addedQuestions) {
      await expect(page.getByRole("button", { name: question, exact: true })).toBeVisible();
    }
  });

  test("keeps every rendered FAQ synchronized with FAQPage structured data", async ({ page }) => {
    await page.goto("/faq");

    const renderedQuestions = await page
      .locator("[data-faq-question]")
      .evaluateAll((nodes) => nodes.map((node) => node.textContent?.trim()));
    const schemas = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((nodes) => nodes.map((node) => JSON.parse(node.textContent ?? "{}")));
    const faqSchema = schemas.find((schema) => schema["@type"] === "FAQPage");
    const schemaQuestions = faqSchema.mainEntity.map(
      (entity: { name: string }) => entity.name,
    );

    expect(renderedQuestions).toHaveLength(23);
    expect(schemaQuestions).toEqual(renderedQuestions);
    expect(schemaQuestions).toEqual(expect.arrayContaining([...addedQuestions]));
  });
});
