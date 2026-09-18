import { site } from "@/data/site";
import { getSiteUrl } from "@/lib/site";
import { hasWhatsApp } from "@/lib/whatsapp";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    name: site.name,
    description: site.description,
    url: getSiteUrl(),
    image: `${getSiteUrl()}/images/looks/v2/look-02.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.street}, ${site.address.complement}`,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      addressCountry: site.address.countryCode,
    },
    areaServed: {
      "@type": "City",
      name: site.address.city,
    },
    sameAs: [site.social.instagram.href],
    ...(hasWhatsApp()
      ? { telephone: `+${site.contact.whatsappE164}` }
      : site.contact.phoneTel
        ? { telephone: site.contact.phoneTel }
        : {}),
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
