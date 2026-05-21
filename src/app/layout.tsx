import type { Viewport } from "next";
import Script from "next/script";
import {
  Bebas_Neue,
  Inter,
  JetBrains_Mono,
  Space_Grotesk,
} from "next/font/google";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { buildRootMetadata } from "@/lib/seo";
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

export const metadata = buildRootMetadata();

export const viewport: Viewport = {
  themeColor: "#080808",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${bebas.variable} ${spaceGrotesk.variable} ${jetbrains.variable}`}
    >
      <body suppressHydrationWarning>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Script
          id="strip-extension-attrs"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: STRIP_EXTENSION_ATTRS_SCRIPT }}
        />
        <SeoJsonLd />
        {children}
      </body>
    </html>
  );
}
