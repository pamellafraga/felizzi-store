import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { formatAddress, site } from "@/data/site";
import { getPrimaryContactHref, getPrimaryContactLabel } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "A Loja",
  description: "Visite a Felizzi Store na Rua Felizardo, 462 — Loja B, Petrópolis, Porto Alegre.",
  alternates: { canonical: "/loja" },
};

export default function LojaPage() {
  return (
    <main id="conteudo">
      <PageHero
        kicker="Petrópolis"
        title="A loja"
        subtitle="Rua Felizardo, 462 — Loja B. Um espaço para descobrir estilo com calma."
        image="/images/looks/v2/look-06.png"
        imageAlt="Interior da Felizzi Store"
      />
      <Container className="grid gap-12 py-20 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 className="font-display text-4xl font-light text-ink">Venha nos visitar.</h2>
          <p className="mt-6 whitespace-pre-line text-base leading-relaxed text-graphite">{formatAddress(true)}</p>
          {site.hours.entries.length > 0 ? (
            <ul className="mt-6 space-y-2 text-sm text-stone">
              {site.hours.entries.map((entry) => (
                <li key={entry.days}>
                  {entry.days}: {entry.time}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-6 text-sm text-stone">{site.hours.note}</p>
          )}
          {site.contact.phoneDisplay ? (
            <a href={site.contact.phoneTel} className="mt-4 block text-sm text-ink">
              {site.contact.phoneDisplay}
            </a>
          ) : null}
          <div className="mt-8 flex flex-col gap-3">
            <a
              href={site.social.instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-[12px] uppercase tracking-[0.2em]"
            >
              <InstagramIcon className="h-4 w-4" />
              {site.social.instagram.handle}
            </a>
            <a
              href={getPrimaryContactHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-[12px] uppercase tracking-[0.2em]"
            >
              <WhatsAppIcon className="h-4 w-4" />
              {getPrimaryContactLabel()}
            </a>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href={site.maps.directionsUrl} external>
              {site.copy.directionsCta}
            </Button>
            <Button href="/novidades" variant="outline">
              Comprar online
            </Button>
          </div>
        </div>
        <div className="min-h-[380px] overflow-hidden border border-ink/10 lg:col-span-7">
          <iframe
            title="Mapa da Felizzi Store"
            src={site.maps.embedSrc}
            className="h-full min-h-[380px] w-full grayscale contrast-125"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Container>
      <Container className="grid gap-4 pb-24 md:grid-cols-2">
        <div className="relative aspect-[4/5] overflow-hidden bg-sand">
          <Image src="/images/looks/v2/look-05.png" alt="Provador da Felizzi" fill sizes="50vw" className="object-cover" />
        </div>
        <div className="relative aspect-[4/5] overflow-hidden bg-sand">
          <Image src="/images/looks/v2/look-03.png" alt="Curadoria Felizzi" fill sizes="50vw" className="object-cover" />
        </div>
      </Container>
    </main>
  );
}
