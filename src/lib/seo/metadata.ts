import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { absoluteUrl, seoConfig } from "@/config/seo";

const siteUrl = siteConfig.url;

export function buildRootMetadata(): Metadata {
  const ogImage = absoluteUrl(seoConfig.defaultOgImage);

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: seoConfig.defaultTitle,
      template: seoConfig.titleTemplate,
    },
    description: seoConfig.description,
    applicationName: seoConfig.siteName,
    keywords: [...seoConfig.keywords],
    authors: [{ name: siteConfig.name, url: siteUrl }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    category: "fitness",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    icons: {
      icon: [{ url: seoConfig.defaultOgImage, type: "image/png" }],
      apple: [{ url: seoConfig.defaultOgImage, type: "image/png" }],
    },
    openGraph: {
      type: "website",
      locale: seoConfig.ogLocale,
      url: siteUrl,
      siteName: seoConfig.defaultTitle,
      title: seoConfig.defaultTitle,
      description: seoConfig.description,
      images: [
        {
          url: ogImage,
          width: seoConfig.ogImageWidth,
          height: seoConfig.ogImageHeight,
          alt: `${siteConfig.name} — elite online fitness coaching`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seoConfig.defaultTitle,
      description: seoConfig.description,
      images: [ogImage],
      creator: seoConfig.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: siteUrl,
    },
    other: {
      "geo.region": "PK",
      "geo.placename": "Pakistan",
    },
  };
}

/** Home page — reinforces primary keywords & canonical */
export function buildHomeMetadata(): Metadata {
  const canonical = absoluteUrl("/");

  return {
    title: seoConfig.defaultTitle,
    description: seoConfig.description,
    alternates: { canonical },
    openGraph: {
      title: seoConfig.defaultTitle,
      description: seoConfig.description,
      url: canonical,
    },
    twitter: {
      title: seoConfig.defaultTitle,
      description: seoConfig.description,
    },
  };
}
