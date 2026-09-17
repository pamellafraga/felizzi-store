import type { Metadata, Viewport } from "next";
import { Caveat, Cormorant_Garamond, Manrope } from "next/font/google";
import { CustomCursor } from "@/components/CustomCursor";
import { JsonLd } from "@/components/JsonLd";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { clinic } from "@/data/clinic";
import { images } from "@/data/images";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-caveat",
  display: "swap",
});

const title = "Dra. Maristela Arimilato | Consultório Veterinário em Porto Alegre";
const description =
  "Consultório veterinário da Dra. Maristela Arimilato no Jardim Botânico, em Porto Alegre. Clínica geral, homeopatia, vacinas, profilaxia dentária e medicamentos.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title,
  description,
  applicationName: clinic.practice,
  authors: [{ name: clinic.name }],
  keywords: [
    "veterinária Porto Alegre",
    "consultório veterinário Jardim Botânico",
    "Dra. Maristela Arimilato",
    "clínica geral veterinária",
    "homeopatia veterinária",
  ],
  openGraph: {
    title,
    description,
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: images.hero,
        width: 1376,
        height: 768,
        alt: "Cão e gato juntos no consultório da Dra. Maristela Arimilato",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [images.hero],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#111111",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${manrope.variable} ${cormorant.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-snow font-sans text-ink">
        <a className="skip-link" href="#conteudo">
          Pular para o conteúdo
        </a>
        <JsonLd />
        {children}
        <WhatsAppButton />
        <CustomCursor />
      </body>
    </html>
  );
}
