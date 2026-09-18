import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { looks } from "@/data/looks";

export const metadata: Metadata = {
  title: "Looks",
  description: "Editorial Felizzi: looks, combinações e ideias para diferentes momentos.",
  alternates: { canonical: "/looks" },
};

export default function LooksPage() {
  return (
    <main id="conteudo">
      <PageHero
        kicker="Editorial"
        title="Looks"
        subtitle="Combinações da curadoria, para inspirar o seu próximo momento."
        image="/images/looks/v2/look-04.png"
        imageAlt="Look Felizzi em camurça"
      />
      <Container className="grid grid-cols-12 gap-4 py-16 lg:gap-6 lg:py-24">
        {looks.map((look, index) => (
          <Link
            key={look.slug}
            href={`/looks/${look.slug}`}
            className={
              index % 5 === 0
                ? "group relative col-span-12 aspect-[16/9] overflow-hidden bg-sand md:col-span-8"
                : "group relative col-span-6 aspect-[3/4] overflow-hidden bg-sand md:col-span-4"
            }
          >
            <Image
              src={look.image}
              alt={look.title}
              fill
              sizes="(max-width: 768px) 100vw, 66vw"
              className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/55 to-transparent" />
            <div className="absolute bottom-5 left-5">
              <p className="text-[10px] uppercase tracking-[0.24em] text-ivory/70">{look.kicker}</p>
              <h2 className="font-display text-3xl font-light text-ivory">{look.title}</h2>
            </div>
          </Link>
        ))}
      </Container>
    </main>
  );
}
