import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { formatAddress, site } from "@/data/site";

export function LojaFisica() {
  return (
    <section className="bg-ivory py-24 lg:py-32" aria-labelledby="loja-title">
      <Container className="grid gap-10 lg:grid-cols-12 lg:items-center">
        <Reveal className="lg:col-span-5">
          <p className="text-[11px] uppercase tracking-[0.28em] text-stone">Loja física</p>
          <h2 id="loja-title" className="mt-4 font-display text-5xl font-light tracking-tight text-ink lg:text-6xl">
            {site.copy.storeTitle}
          </h2>
          <p className="mt-8 whitespace-pre-line text-base leading-relaxed text-graphite">{formatAddress(true)}</p>
          {site.hours.entries.length > 0 ? (
            <ul className="mt-6 space-y-1 text-sm text-stone">
              {site.hours.entries.map((entry) => (
                <li key={entry.days}>
                  {entry.days}: {entry.time}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-6 text-sm text-stone">{site.hours.note}</p>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/loja" variant="solid">
              {site.copy.storeCta}
            </Button>
            <Button href={site.maps.directionsUrl} variant="outline" external>
              {site.copy.directionsCta}
            </Button>
          </div>
        </Reveal>
        <Reveal delay={0.08} className="relative aspect-[4/5] overflow-hidden bg-sand lg:col-span-4">
          <Image
            src="/images/looks/v2/look-06.png"
            alt="Ambiente da Felizzi Store"
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover"
          />
        </Reveal>
        <Reveal delay={0.12} className="min-h-[320px] overflow-hidden border border-ink/10 bg-champagne lg:col-span-3">
          <iframe
            title="Mapa da Felizzi Store"
            src={site.maps.embedSrc}
            className="h-full min-h-[320px] w-full grayscale contrast-125"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Reveal>
      </Container>
    </section>
  );
}
