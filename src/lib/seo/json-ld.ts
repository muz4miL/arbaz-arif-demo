import { coachingPlans, siteConfig } from "@/config/site";
import { absoluteUrl, seoConfig } from "@/config/seo";

type JsonLd = Record<string, unknown>;

function parsePrice(plan: (typeof coachingPlans)[number]): number | undefined {
  const n = Number(plan.price.replace(/,/g, ""));
  return Number.isFinite(n) ? n : undefined;
}

export function getWebSiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${absoluteUrl("/")}#website`,
    name: seoConfig.defaultTitle,
    url: absoluteUrl("/"),
    description: seoConfig.description,
    inLanguage: seoConfig.locale,
    publisher: { "@id": `${absoluteUrl("/")}#person` },
  };
}

export function getPersonJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${absoluteUrl("/")}#person`,
    name: siteConfig.name,
    url: absoluteUrl("/"),
    image: absoluteUrl(seoConfig.defaultOgImage),
    jobTitle: "Elite Online Fitness Coach",
    description: seoConfig.description,
    email: siteConfig.email,
    sameAs: [
      siteConfig.instagram.url,
      siteConfig.tiktok.url,
      siteConfig.youtube.url,
    ],
    knowsAbout: [
      "Online fitness coaching",
      "Body recomposition",
      "Fat loss",
      "Muscle hypertrophy",
      "Nutrition coaching",
      "Strength training",
    ],
    areaServed: seoConfig.areasServed.map((a) => ({
      "@type": "Country",
      name: a.name,
    })),
  };
}

export function getProfessionalServiceJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${absoluteUrl("/")}#service`,
    name: `${siteConfig.name} — Online Fitness Coaching`,
    url: absoluteUrl("/"),
    description: seoConfig.description,
    image: absoluteUrl(seoConfig.defaultOgImage),
    provider: { "@id": `${absoluteUrl("/")}#person` },
    areaServed: seoConfig.areasServed.map((a) => a.countryCode),
    serviceType: [
      "Online personal training",
      "Nutrition coaching",
      "Body transformation coaching",
    ],
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: siteConfig.instagram.url,
      serviceType: "Online coaching",
    },
  };
}

export function getWebPageJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl("/")}#webpage`,
    url: absoluteUrl("/"),
    name: seoConfig.defaultTitle,
    description: seoConfig.description,
    isPartOf: { "@id": `${absoluteUrl("/")}#website` },
    about: { "@id": `${absoluteUrl("/")}#person` },
    inLanguage: seoConfig.locale,
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: absoluteUrl(seoConfig.defaultOgImage),
    },
  };
}

export function getSiteNavigationJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    name: "Main navigation",
    hasPart: seoConfig.sections.map((section) => ({
      "@type": "SiteNavigationElement",
      name: section.label,
      url: absoluteUrl(section.path),
    })),
  };
}

export function getFaqPageJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: seoConfig.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function getCoachingPlansItemListJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Online coaching plans",
    itemListElement: coachingPlans.map((plan, index) => {
      const price = parsePrice(plan);
      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Offer",
          name: plan.name,
          description: plan.description,
          url: absoluteUrl("/#plans"),
          ...(price !== undefined && {
            price,
            priceCurrency: plan.currency,
          }),
          seller: { "@id": `${absoluteUrl("/")}#person` },
        },
      };
    }),
  };
}

export function getAllJsonLd(): JsonLd[] {
  return [
    getWebSiteJsonLd(),
    getPersonJsonLd(),
    getProfessionalServiceJsonLd(),
    getWebPageJsonLd(),
    getSiteNavigationJsonLd(),
    getFaqPageJsonLd(),
    getCoachingPlansItemListJsonLd(),
  ];
}

/** Stable @id for script keys in layout */
export function getJsonLdScriptId(schema: JsonLd): string {
  const type = schema["@type"];
  const id = schema["@id"];
  if (typeof id === "string") return id;
  if (typeof type === "string") return type;
  return "schema";
}
