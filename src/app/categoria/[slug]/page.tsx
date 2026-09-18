import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/cards/ProductCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { collections, getCollection } from "@/data/collections";
import { products } from "@/data/products";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return { title: "Coleção" };
  return {
    title: collection.name,
    description: collection.description,
    alternates: { canonical: `/categoria/${collection.slug}` },
  };
}

export default async function CategoriaPage({ params }: Props) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();
  const items = products.filter((item) => item.mood === collection.mood);

  return (
    <main id="conteudo">
      <PageHero
        kicker="Coleção"
        title={collection.name}
        subtitle={collection.description}
        image={collection.image}
        imageAlt={collection.name}
      />
      <Container className="py-20">
        {items.length === 0 ? (
          <p className="font-display text-2xl font-light text-stone">Em breve nesta coleção.</p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
            {items.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        )}
        <div className="mt-16">
          <Button href="/colecoes" variant="outline">
            Todas as coleções
          </Button>
        </div>
      </Container>
    </main>
  );
}
