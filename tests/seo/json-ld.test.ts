import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getAllJsonLd, getJsonLdScriptId } from "../../src/lib/seo/json-ld";

describe("JSON-LD generators", () => {
  it("returns all required schema types", () => {
    const schemas = getAllJsonLd();
    const types = schemas.map((s) => s["@type"]);
    assert.ok(types.includes("WebSite"));
    assert.ok(types.includes("Person"));
    assert.ok(types.includes("FAQPage"));
    assert.ok(types.includes("ItemList"));
    assert.equal(schemas.length, 7);
  });

  it("assigns unique script ids", () => {
    const ids = getAllJsonLd().map(getJsonLdScriptId);
    assert.equal(new Set(ids).size, ids.length);
  });

  it("FAQPage includes five questions", () => {
    const faq = getAllJsonLd().find((s) => s["@type"] === "FAQPage") as {
      mainEntity: unknown[];
    };
    assert.equal(faq.mainEntity.length, 5);
  });
});
