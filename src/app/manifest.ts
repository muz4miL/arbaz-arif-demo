import type { MetadataRoute } from "next";
import { seoConfig } from "@/config/seo";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: seoConfig.defaultTitle,
    short_name: seoConfig.siteName,
    description: seoConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#080808",
    theme_color: "#080808",
    lang: "en",
    orientation: "portrait-primary",
    categories: ["fitness", "health", "lifestyle"],
    icons: [
      {
        src: seoConfig.defaultOgImage,
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
