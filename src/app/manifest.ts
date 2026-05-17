import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.title,
    short_name: siteConfig.brand,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#030303",
    theme_color: "#030303",
    lang: "en",
  };
}
