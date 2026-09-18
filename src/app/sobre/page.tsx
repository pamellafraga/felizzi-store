import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "A Felizzi",
  description: "A Felizzi Store em Petrópolis, Porto Alegre: uma boutique construída para fazer parte da vida de suas clientes.",
  alternates: { canonical: "/sobre" },
};

export default function SobrePage() {
  return (
    <main id="conteudo">
      <PageHero
        kicker="A marca"
        title="A Felizzi"
        subtitle={site.copy.aboutQuote}
        image="/images/looks/v2/look-01.png"
        imageAlt="Look Felizzi em tom areia"
      />
      <Container className="grid gap-16 py-20 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="text-[11px] uppercase tracking-[0.28em] text-stone">História</p>
          <h2 className="mt-4 font-display text-4xl font-light text-ink lg:text-5xl">Uma presença feita no tempo</h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-stone">
            Este espaço está pronto para receber o texto institucional da Felizzi: origem, trajetória, equipe e valores.
            Não inventamos uma biografia. A marca tem loja física e uma história longa — as palavras oficiais entram aqui.
          </p>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden bg-sand lg:col-span-5 lg:col-start-8">
          <Image src="/images/looks/v2/look-05.png" alt="Bastidores da Felizzi" fill sizes="40vw" className="object-cover" />
        </div>
      </Container>
      <section className="bg-espresso py-20 text-ivory">
        <Container className="grid gap-12 md:grid-cols-3">
          {site.milestones.map((item) => (
            <article key={item.id}>
              <p className="font-display text-4xl font-light">{site.foundedYear ?? "FZ"}</p>
              <h3 className="mt-4 font-display text-2xl font-light">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ivory/65">{item.text}</p>
            </article>
          ))}
        </Container>
      </section>
      <Container className="grid gap-8 py-20 md:grid-cols-2">
        <article className="border border-ink/10 p-8">
          <p className="text-[11px] uppercase tracking-[0.22em] text-stone">Equipe</p>
          <h2 className="mt-3 font-display text-3xl font-light text-ink">As pessoas da loja</h2>
          <p className="mt-4 text-sm leading-relaxed text-stone">
            Espaço reservado para retratos e nomes da equipe, quando a cliente disponibilizar o material.
          </p>
        </article>
        <article className="border border-ink/10 p-8">
          <p className="text-[11px] uppercase tracking-[0.22em] text-stone">Valores</p>
          <h2 className="mt-3 font-display text-3xl font-light text-ink">O que permanece</h2>
          <p className="mt-4 text-sm leading-relaxed text-stone">
            Estrutura pronta para proximidade, curadoria e atendimento. O texto definitivo é da Felizzi.
          </p>
        </article>
      </Container>
      <Container className="pb-24">
        <Button href="/loja">Visitar a loja</Button>
      </Container>
    </main>
  );
}
