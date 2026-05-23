import { siteConfig } from "@/config/site";

/** Central SEO copy — single source for metadata & structured data */
export const seoConfig = {
  siteName: siteConfig.brand,
  defaultTitle: siteConfig.title,
  titleTemplate: `%s | ${siteConfig.name}`,
  description:
    "Elite online fitness coaching with Arbaz Arif. Custom training, nutrition, and accountability for fat loss and muscle gain — serving clients in Pakistan, UAE, UK, US & Ireland.",
  shortDescription:
    "Pakistan's most trusted online fitness coach. 500+ transformations worldwide.",
  locale: siteConfig.locale,
  ogLocale: siteConfig.locale.replace("_", "-"),
  defaultOgImage: "/arbaz1.png",
  ogImageWidth: 1200,
  ogImageHeight: 630,
  twitterHandle: "@arbazxarif_coaching",
  keywords: [
    "Arbaz Arif",
    "Arbaz Arif fitness coach",
    "online fitness coach Pakistan",
    "online personal trainer",
    "body recomposition coach",
    "fat loss program online",
    "muscle building coach",
    "nutrition coach Pakistan",
    "online coaching UAE",
    "fitness coaching UK",
    "online fitness coach USA",
    "fitness coach Ireland",
    "WhatsApp fitness coach",
    "elite fitness coaching",
  ],
  areasServed: [
    { name: "Pakistan", countryCode: "PK" },
    { name: "United Arab Emirates", countryCode: "AE" },
    { name: "United Kingdom", countryCode: "GB" },
    { name: "United States", countryCode: "US" },
    { name: "Ireland", countryCode: "IE" },
  ],
  /** In-page sections (hash routes) for sitemap & SiteNavigationElement */
  sections: [
    { id: "home", label: "Home", path: "/" },
    { id: "about", label: "About", path: "/#about" },
    { id: "plans", label: "Coaching Plans", path: "/#plans" },
    { id: "results", label: "Client Results", path: "/#results" },
    { id: "process", label: "Coaching Process", path: "/#process" },
    { id: "subscribe", label: "Contact", path: "/#subscribe" },
  ] as const,
  faqs: [
    {
      question: "Who is Arbaz Arif?",
      answer:
        "Arbaz Arif is an elite online fitness coach specializing in body recomposition, fat loss, and muscle building with 10+ years of experience and 500+ client transformations across Pakistan, UAE, UK, US, and Ireland.",
    },
    {
      question: "How does online coaching work?",
      answer:
        "You receive a personalized training split, nutrition targets, and direct WhatsApp support. Weekly check-ins and plan adjustments keep you progressing without guesswork.",
    },
    {
      question: "What coaching plans are available?",
      answer:
        "Starter (12-week), Premium (16-week), and Elite (20-week) programs are available in PKR, plus a Prestige experience for clients who want maximum accountability.",
    },
    {
      question: "Can I join from outside Pakistan?",
      answer:
        "Yes. Coaching is fully online and available worldwide, with active clients in the UAE, UK, US, Ireland, and Pakistan.",
    },
    {
      question: "How do I start?",
      answer:
        "Tap Start Now or message on WhatsApp to discuss your goals. Arbaz will recommend the right plan based on your timeline and experience level.",
    },
  ],
} as const;

export function absoluteUrl(path = ""): string {
  const base = siteConfig.url.replace(/\/$/, "");
  if (!path || path === "/") return base;
  return path.startsWith("http") ? path : `${base}${path.startsWith("#") ? path : `/${path.replace(/^\//, "")}`}`;
}
