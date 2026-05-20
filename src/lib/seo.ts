import { siteConfig } from "@/config/site";

export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: "Elite Fitness Coach",
    description: siteConfig.description,
    url: siteConfig.url,
    sameAs: [
      siteConfig.instagram.url,
      siteConfig.tiktok.url,
      siteConfig.youtube.url,
    ],
    knowsAbout: [
      "Online fitness coaching",
      "Body recomposition",
      "Nutrition coaching",
      "Strength training",
    ],
    areaServed: ["Pakistan", "United Arab Emirates", "United Kingdom"],
  };
}

export function getWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.title,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: siteConfig.locale,
  };
}

export function getServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${siteConfig.name} — Online Fitness Coaching`,
    description: siteConfig.description,
    url: siteConfig.url,
    provider: {
      "@type": "Person",
      name: siteConfig.name,
    },
    areaServed: ["PK", "AE", "GB"],
    serviceType: "Online personal training and nutrition coaching",
  };
}
