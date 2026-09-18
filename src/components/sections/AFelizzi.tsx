import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";

export function AFelizzi() {
  return (
    <section className="bg-champagne py-24 lg:py-32" aria-labelledby="afelizzi-title">
      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="relative col-span-12 aspect-[4/5] overflow-hidden bg-sand lg:col-span-6">
          <Image
            src="/images/looks/v2/look-04.png"
            alt="Look Felizzi em camurça caramelo"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </Reveal>
        <div className="col-span-12 lg:col-span-6">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.28em] text-stone">A marca</p>
            <h2 id="afelizzi-title" className="mt-4 font-display text-5xl font-light tracking-tight text-ink lg:text-7xl">
              A Felizzi
            </h2>
            <blockquote className="mt-8 max-w-md font-display text-2xl font-light italic leading-snug text-graphite">
              “{site.copy.aboutQuote}”
            </blockquote>
            <p className="mt-8 max-w-md text-sm leading-relaxed text-stone">
              Presença física em Petrópolis, Porto Alegre. Uma boutique para descobrir estilo com tempo — história,
              equipe e valores entram aqui quando o texto da marca estiver pronto.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-12 space-y-8 border-t border-ink/10 pt-10">
            {site.milestones.map((item) => (
              <div key={item.id} className="grid grid-cols-[88px_1fr] gap-4">
      <p className="font-display text-3xl font-light text-ink">{site.foundedYear ?? "FZ"}</p>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.24em] text-stone">{item.kicker}</p>
                  <h3 className="mt-1 font-display text-2xl font-light text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone">{item.text}</p>
                </div>
              </div>
            ))}
          </Reveal>
          <Reveal delay={0.16} className="mt-10">
            <Button href="/sobre" variant="outline">
              Conhecer a Felizzi
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
