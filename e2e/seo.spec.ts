import { expect, test } from "@playwright/test";
import { siteConfig } from "../src/config/site";
import { seoConfig } from "../src/config/seo";
import {
  expectedSectionIds,
  findSchemaByType,
  getJsonLdBlocks,
  getMetaContent,
} from "./helpers/seo";

async function gotoHome(page: import("@playwright/test").Page) {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.waitForSelector("h1", { timeout: 20_000 });
}

test.describe("SEO — metadata & discovery", () => {
  test("homepage has production title and description", async ({ page }) => {
    await gotoHome(page);

    await expect(page).toHaveTitle(seoConfig.defaultTitle);
    const description = await getMetaContent(page, 'meta[name="description"]');
    expect(description).toContain("Arbaz Arif");
    expect(description).toMatch(/Pakistan|UAE|UK|US|Ireland/i);
  });

  test("canonical and Open Graph tags point to the site URL", async ({ page }) => {
    await gotoHome(page);

    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonical?.replace(/\/$/, "")).toBe(siteConfig.url.replace(/\/$/, ""));

    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute("content", "website");
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      "content",
      seoConfig.defaultTitle,
    );
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute("content");
    expect(ogImage).toMatch(/arbaz1\.png/);
  });

  test("Twitter card metadata is configured", async ({ page }) => {
    await gotoHome(page);

    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      "content",
      "summary_large_image",
    );
    const twitterTitle = await getMetaContent(page, 'meta[name="twitter:title"]');
    expect(twitterTitle).toBeTruthy();
  });

  test("robots.txt allows indexing and references sitemap", async ({ request }) => {
    const res = await request.get("/robots.txt");
    expect(res.ok()).toBeTruthy();
    const body = await res.text();
    expect(body).toMatch(/Allow: \//i);
    expect(body).toContain("sitemap.xml");
  });

  test("sitemap.xml lists homepage and in-page sections", async ({ request }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.ok()).toBeTruthy();
    const body = await res.text();
    expect(body).toContain(siteConfig.url);
    expect(body).toContain("#about");
    expect(body).toContain("#plans");
    expect(body).toContain("#subscribe");
  });

  test("web manifest is valid", async ({ request }) => {
    const res = await request.get("/manifest.webmanifest");
    expect(res.ok()).toBeTruthy();
    const json = (await res.json()) as { name?: string; start_url?: string };
    expect(json.name).toContain("Arbaz");
    expect(json.start_url).toBe("/");
  });
});

test.describe("SEO — structured data", () => {
  test("JSON-LD includes Person, WebSite, FAQPage, and ItemList", async ({ page }) => {
    await gotoHome(page);
    const schemas = await getJsonLdBlocks(page);

    expect(findSchemaByType(schemas, "WebSite")).toBeDefined();
    expect(findSchemaByType(schemas, "Person")).toBeDefined();
    expect(findSchemaByType(schemas, "ProfessionalService")).toBeDefined();
    expect(findSchemaByType(schemas, "FAQPage")).toBeDefined();
    expect(findSchemaByType(schemas, "ItemList")).toBeDefined();

    const person = findSchemaByType(schemas, "Person")!;
    const sameAs = person.sameAs as string[];
    expect(sameAs.some((u) => u.includes("instagram"))).toBe(true);
  });
});

test.describe("SEO — semantics & accessibility", () => {
  test("single h1 and landmark regions exist", async ({ page }) => {
    await gotoHome(page);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("main#main-content")).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Main navigation" })).toBeVisible();
  });

  test("primary sections are reachable via hash IDs", async ({ page }) => {
    await gotoHome(page);

    for (const id of expectedSectionIds) {
      const section = page.locator(`#${id}`);
      await expect(section).toHaveCount(1);
    }
  });

  test("skip link targets main content", async ({ page }) => {
    await gotoHome(page);
    const skip = page.getByRole("link", { name: "Skip to main content" });
    await expect(skip).toHaveAttribute("href", "#main-content");
  });
});
