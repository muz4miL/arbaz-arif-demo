import { expect, test } from "@playwright/test";

async function gotoHome(page: import("@playwright/test").Page) {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.waitForSelector("h1", { timeout: 20_000 });
}

test.describe("Homepage smoke", () => {
  test("loads hero and primary CTAs on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await gotoHome(page);

    await expect(page.getByRole("heading", { level: 1 })).toContainText(/Results/i);
    await expect(page.getByRole("link", { name: /Start Now/i }).first()).toBeVisible();
    await expect(page.locator("#plans")).toBeAttached();
  });

  test("mobile hero shows copy without duplicate hero CTAs", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const heroCtas = page.locator(".hero-copy__ctas");
    await expect(heroCtas).toBeHidden();
    await expect(page.locator(".hero-mobile-media")).toBeVisible();
  });

  test("nav links scroll to sections", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await gotoHome(page);

    await page.getByRole("link", { name: "Plans", exact: true }).click();
    await expect(page).toHaveURL(/#plans/);
    await expect(page.locator("#plans")).toBeInViewport();
  });
});
