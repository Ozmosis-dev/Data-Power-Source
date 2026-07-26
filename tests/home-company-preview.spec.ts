import { expect, test } from "playwright/test";

test.describe("Home company preview pass", () => {
  test("keeps service-card copy readable on every discipline hover surface", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/");

    const hoverSurfaces = [
      ["electrical", "rgb(22, 39, 146)"],
      ["connectivity", "rgb(8, 117, 26)"],
      ["mission-critical", "rgb(185, 51, 14)"],
      ["design-build", "rgb(26, 26, 26)"],
    ] as const;

    for (const [discipline, surface] of hoverSurfaces) {
      const card = page.locator(
        `[data-testid="service-card"][data-discipline="${discipline}"]`,
      );
      await card.hover();
      await expect(card).toHaveCSS("background-color", surface);

      const ratios = await card.evaluate((node) => {
        function parseColor(value: string) {
          const channels = value.match(/[\d.]+/g)?.map(Number) ?? [];
          return {
            red: channels[0] ?? 0,
            green: channels[1] ?? 0,
            blue: channels[2] ?? 0,
            alpha: channels[3] ?? 1,
          };
        }

        function composite(
          foreground: ReturnType<typeof parseColor>,
          background: ReturnType<typeof parseColor>,
        ) {
          return {
            red: foreground.red * foreground.alpha + background.red * (1 - foreground.alpha),
            green:
              foreground.green * foreground.alpha + background.green * (1 - foreground.alpha),
            blue: foreground.blue * foreground.alpha + background.blue * (1 - foreground.alpha),
            alpha: 1,
          };
        }

        function luminance(color: ReturnType<typeof parseColor>) {
          const channels = [color.red, color.green, color.blue].map((channel) => {
            const value = channel / 255;
            return value <= 0.04045
              ? value / 12.92
              : ((value + 0.055) / 1.055) ** 2.4;
          });
          return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
        }

        function contrast(
          foreground: ReturnType<typeof parseColor>,
          background: ReturnType<typeof parseColor>,
        ) {
          const foregroundLuminance = luminance(composite(foreground, background));
          const backgroundLuminance = luminance(background);
          const lighter = Math.max(foregroundLuminance, backgroundLuminance);
          const darker = Math.min(foregroundLuminance, backgroundLuminance);
          return (lighter + 0.05) / (darker + 0.05);
        }

        const background = parseColor(getComputedStyle(node).backgroundColor);
        const heading = node.querySelector("h3");
        const body = node.querySelector("p");

        if (!heading || !body) return { heading: 0, body: 0 };

        return {
          heading: contrast(parseColor(getComputedStyle(heading).color), background),
          body: contrast(parseColor(getComputedStyle(body).color), background),
        };
      });

      expect(ratios.heading).toBeGreaterThanOrEqual(4.5);
      expect(ratios.body).toBeGreaterThanOrEqual(4.5);
    }
  });

  test("uses leadership photography with a compact overlapping IEC credential", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/");

    const preview = page.getByTestId("company-preview");
    const leadershipImage = preview.getByTestId("company-leadership-image");
    const credential = preview.getByTestId("company-iec-badge");

    await expect(leadershipImage).toHaveAttribute(
      "src",
      /dps-leadership-team\.webp/,
    );
    await expect(leadershipImage).toHaveAttribute(
      "alt",
      "Representative leadership team at a commercial electrical facility.",
    );
    await expect(credential).toHaveCSS("position", "absolute");
    await expect(
      credential.getByRole("img", {
        name: "Independent Electrical Contractors, Atlanta and Georgia.",
      }),
    ).toBeVisible();

    const credentialWidth = await credential.evaluate(
      (node) => node.getBoundingClientRect().width,
    );
    expect(credentialWidth).toBeLessThanOrEqual(220);
  });

  test("lets the IEC credential break outside the image frame at the lower left", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/");

    const frame = page.getByTestId("company-image-frame");
    const credential = page.getByTestId("company-iec-badge");
    const frameBox = await frame.boundingBox();
    const credentialBox = await credential.boundingBox();

    expect(frameBox).not.toBeNull();
    expect(credentialBox).not.toBeNull();
    expect(credentialBox!.x).toBeLessThan(frameBox!.x);
    expect(credentialBox!.y + credentialBox!.height).toBeGreaterThan(
      frameBox!.y + frameBox!.height,
    );
  });

  test("replaces the duplicated pillar section with a company preview", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId("company-preview")).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: "Local leadership. Technical depth. Built around your uptime.",
      }),
    ).toBeVisible();
    await expect(
      page.getByTestId("company-preview").getByTestId("company-leadership-image"),
    ).toHaveAttribute(
      "src",
      /dps-leadership-team\.webp/,
    );
    await expect(
      page.getByTestId("company-preview").getByRole("link", { name: "Learn more about us" }),
    ).toHaveAttribute("href", "/about");
    await expect(page.getByTestId("pillar-split")).toHaveCount(0);
  });

  test("separates the service bento and adds a discipline-color hover halo", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/");

    const bento = page.getByTestId("service-bento");
    const gaps = await bento.evaluate((node) => {
      const style = getComputedStyle(node);
      return {
        column: Number.parseFloat(style.columnGap),
        row: Number.parseFloat(style.rowGap),
      };
    });
    expect(gaps.column).toBeGreaterThanOrEqual(20);
    expect(gaps.row).toBeGreaterThanOrEqual(20);

    const electrical = page.locator(
      '[data-testid="service-card"][data-discipline="electrical"]',
    );
    await expect(electrical).toHaveCSS("border-radius", "12px");
    await electrical.hover();
    const hoverShadow = await electrical.evaluate((node) => getComputedStyle(node).boxShadow);
    expect(hoverShadow).toMatch(/rgba?\(22, 39, 146/);
  });

  test("puts the hero proof rail above the photo and removes hover color changes", async ({
    page,
  }) => {
    await page.goto("/");

    const rail = page.getByTestId("technical-status-rail");
    await expect(rail).toHaveCSS("position", "relative");
    await expect(rail).toHaveCSS("z-index", "2");

    const item = page.getByTestId("trust-item").first();
    const before = await item.evaluate((node) => ({
      background: getComputedStyle(node).backgroundColor,
      color: getComputedStyle(node).color,
    }));
    await item.hover();
    await expect(item).toHaveCSS("background-color", before.background);
    await expect(item).toHaveCSS("color", before.color);
  });

  test("adds an About call to action to Why Data Power Source", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByTestId("why-dps-header").getByRole("link", { name: "Learn more about us" }),
    ).toHaveAttribute("href", "/about");
  });

  test("places the rotating type banner directly after the company preview", async ({
    page,
  }) => {
    await page.goto("/");

    const preview = page.getByTestId("company-preview");
    const banner = page.getByTestId("rotating-type-banner");
    await expect(banner).toBeVisible();
    expect(
      await preview.evaluate(
        (node) => node.nextElementSibling?.getAttribute("data-testid"),
      ),
    ).toBe("rotating-type-banner");

    for (const phrase of [
      "Industry knowledge",
      "Track record of successful projects",
      "Dynamically responsive",
      "Industry knowledge & design build expertise",
    ]) {
      await expect(banner.getByTestId("rotating-phrase-list")).toContainText(phrase);
    }
  });

  test("gives the rotating phrase a single-line technical gradient banner", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/");

    const banner = page.getByTestId("rotating-type-banner");
    const output = banner.getByTestId("typewriter-output");

    await expect(banner.getByText("What we bring to the work", { exact: true })).toHaveCount(0);
    await expect(output).toHaveCSS("white-space", "nowrap");

    const fontSize = await output.evaluate((node) =>
      Number.parseFloat(getComputedStyle(node).fontSize),
    );
    expect(fontSize).toBeLessThanOrEqual(52);
    await expect(banner).toHaveCSS("background-image", /linear-gradient/);
    await expect(banner.getByTestId("rotating-banner-grid")).toHaveCSS(
      "background-image",
      /url/,
    );
  });

  test("keeps the longest rotating phrase fully visible on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    const output = page.getByTestId("typewriter-output");
    await output.evaluate((node) => {
      node.textContent = "Industry knowledge & design build expertise";
    });

    const dimensions = await output.evaluate((node) => ({
      clientWidth: node.clientWidth,
      scrollWidth: node.scrollWidth,
    }));

    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
    await expect(output).toHaveCSS("white-space", "nowrap");
  });

  test("uses a stable first phrase when reduced motion is requested", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    const banner = page.getByTestId("rotating-type-banner");
    await expect(banner).toHaveAttribute("data-motion-state", "static");
    await expect(banner.getByTestId("typewriter-output")).toHaveText("Industry knowledge");
  });
});
