import { getAllJsonLd, getJsonLdScriptId } from "@/lib/seo";

export function SeoJsonLd() {
  const schemas = getAllJsonLd();

  return (
    <>
      {schemas.map((schema) => (
        <script
          key={getJsonLdScriptId(schema)}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
