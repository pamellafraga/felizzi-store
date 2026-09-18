import type { Metadata } from "next";
import { CollectionBlock } from "@/components/cards/CollectionBlock";
import { PageHero } from "@/components/ui/PageHero";
import { collections } from "@/data/collections";

export const metadata: Metadata = {
  title: "Coleções",
  description: "Casual, elegante e especial: a curadoria da Felizzi Store em Porto Alegre.",
  alternates: { canonical: "/colecoes" },
};

export default function ColecoesPage() {
  const [first, ...rest] = collections;

  return (
    <main id="conteudo">
      <PageHero
        kicker="Curadoria"
        title="Coleções"
        subtitle="Três leituras de estilo, pensadas para diferentes momentos da vida."
        image="/images/looks/v2/look-01.png"
        imageAlt="Coleções Felizzi"
      />
      <div className="grid lg:grid-cols-2">
        <CollectionBlock collection={first} featured />
        <div className="grid">
          {rest.map((collection) => (
            <CollectionBlock key={collection.slug} collection={collection} />
          ))}
        </div>
      </div>
    </main>
  );
}
