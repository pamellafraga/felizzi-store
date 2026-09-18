import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ScrollProgress } from "@/components/layout/Chrome";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { Providers } from "@/components/commerce/Providers";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/data/site";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: site.seo.title,
    template: site.seo.titleTemplate,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [...site.seo.keywords],
  authors: [{ name: site.name }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: site.seo.title,
    description: site.description,
    locale: site.locale,
    type: "website",
    siteName: site.name,
    images: [
      {
        url: "/images/looks/v2/look-02.png",
        width: 252,
        height: 328,
        alt: "Felizzi Store",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.title,
    description: site.description,
    images: ["/images/looks/v2/look-02.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#eadfd4",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${outfit.variable} ${cormorant.variable} h-full antialiased`}>
      <body className="min-h-full bg-ivory font-sans text-ink">
        <a className="skip-link" href="#conteudo">
          Pular para o conteúdo
        </a>
        <JsonLd />
        <ScrollProgress />
        <Providers>
          <Header />
          {children}
          <Footer />
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}
