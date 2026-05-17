import type { Metadata, Viewport } from "next";
import {
  Bebas_Neue,
  Inter,
  JetBrains_Mono,
  Space_Grotesk,
} from "next/font/google";
import { siteConfig } from "@/config/site";
import {
  getOrganizationJsonLd,
  getServiceJsonLd,
  getWebSiteJsonLd,
} from "@/lib/seo";
import { STRIP_EXTENSION_ATTRS_SCRIPT } from "@/lib/strip-extension-attrs";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = siteConfig.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Arbaz Arif",
    "online fitness coach Pakistan",
    "personal trainer",
    "body recomposition",
    "fat loss coach",
    "muscle building program",
    "nutrition coach",
    "online coaching UAE",
    "fitness coaching UK",
  ],
  authors: [{ name: siteConfig.name, url: siteUrl }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale.replace("_", "-"),
    url: siteUrl,
    siteName: siteConfig.title,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: "/arbaz1.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Elite fitness coaching`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/arbaz1.png"],
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
  category: "fitness",
};

export const viewport: Viewport = {
  themeColor: "#030303",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = [
    getWebSiteJsonLd(),
    getOrganizationJsonLd(),
    getServiceJsonLd(),
  ];

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${bebas.variable} ${spaceGrotesk.variable} ${jetbrains.variable}`}
    >
      <body suppressHydrationWarning>
        <script
          id="strip-extension-attrs"
          dangerouslySetInnerHTML={{ __html: STRIP_EXTENSION_ATTRS_SCRIPT }}
        />
        {jsonLd.map((schema) => (
          <script
            key={schema["@type"] as string}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
        {children}
      </body>
    </html>
  );
}
