import type { Page } from "@playwright/test";
import { seoConfig } from "../../src/config/seo";

export async function getMetaContent(page: Page, selector: string): Promise<string | null> {
  return page.locator(selector).getAttribute("content");
}

export async function getJsonLdBlocks(page: Page): Promise<Record<string, unknown>[]> {
  const scripts = await page.locator('script[type="application/ld+json"]').allTextContents();
  return scripts.map((raw) => JSON.parse(raw) as Record<string, unknown>);
}

export function findSchemaByType(
  schemas: Record<string, unknown>[],
  type: string,
): Record<string, unknown> | undefined {
  return schemas.find((s) => s["@type"] === type);
}

export const expectedSectionIds = seoConfig.sections
  .map((s) => s.id)
  .filter((id) => id !== "home");
