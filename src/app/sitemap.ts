import type { MetadataRoute } from "next";
import { absoluteUrl, seoConfig } from "@/config/seo";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const sectionEntries: MetadataRoute.Sitemap = seoConfig.sections.map((section) => ({
    url: absoluteUrl(section.path),
    lastModified,
    changeFrequency: section.id === "home" ? "weekly" : "monthly",
    priority: section.id === "home" ? 1 : 0.8,
  }));

  return [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...sectionEntries.filter((entry) => entry.url !== siteConfig.url),
  ];
}
