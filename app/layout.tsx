import type { Metadata } from "next";

import { inter, sora } from "@/app/fonts";
import "@/app/globals.css";
import { MobileActionBar } from "@/components/mobile-action-bar";
import { QuoteDialogProvider } from "@/components/quote-dialog";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { localBusinessSchema } from "@/lib/schema";
import { DEFAULT_SOCIAL_IMAGE, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Data Power Source",
    template: "%s",
  },
  description:
    "Metro Atlanta commercial and industrial electrical contractor specializing in full electrical, UPS, standby generators, connectivity, and design-build.",
  openGraph: {
    siteName: "Data Power Source",
    type: "website",
    locale: "en_US",
    images: [DEFAULT_SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    images: [DEFAULT_SOCIAL_IMAGE],
  },
  icons: {
    icon: "/brand/DPS-icon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = localBusinessSchema();

  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-screen overflow-x-clip bg-white font-sans text-navy-800 antialiased">
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-white px-4 py-3 font-semibold text-navy-800 shadow-md transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <QuoteDialogProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
          <MobileActionBar />
        </QuoteDialogProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
