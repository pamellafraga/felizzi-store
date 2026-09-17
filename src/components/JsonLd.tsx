import { clinic } from "@/data/clinic";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "VeterinaryCare",
    name: `${clinic.name} — ${clinic.practice}`,
    description:
      "Consultório veterinário da Dra. Maristela Arimilato no Jardim Botânico, em Porto Alegre. Clínica geral, homeopatia, vacinas, profilaxia dentária e medicamentos.",
    telephone: clinic.phones.landlineTel,
    email: clinic.email,
    image: "/images/hero-pets.png",
    address: {
      "@type": "PostalAddress",
      streetAddress: clinic.address.street,
      addressLocality: clinic.address.city,
      addressRegion: clinic.address.state,
      addressCountry: "BR",
    },
    areaServed: {
      "@type": "City",
      name: "Porto Alegre",
    },
    sameAs: [clinic.instagram.url],
    identifier: clinic.registry,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
