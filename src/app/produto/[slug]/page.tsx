import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductBuyBox } from "@/components/commerce/ProductBuyBox";
import { ProductGallery } from "@/components/commerce/ProductGallery";
import { ProductCard } from "@/components/cards/ProductCard";
import { Container } from "@/components/ui/Container";
import { getProduct, getRelatedProducts, products } from "@/data/products";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Peça" };
  return {
    title: product.name,
    description: product.shortDescription,
    alternates: { canonical: `/produto/${product.slug}` },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const related = getRelatedProducts(product.slug);
  const gallery = [product.image, product.hoverImage].filter((item): item is string => Boolean(item));

  return (
    <main id="conteudo" className="pt-20 lg:pt-28">
      <Container className="grid gap-8 pb-32 lg:grid-cols-12 lg:gap-10 lg:pb-20">
        <div className="lg:col-span-7">
          <ProductGallery images={gallery} alt={product.name} />
        </div>
        <div className="max-md:pr-16 lg:col-span-5 lg:pt-4 lg:pr-0">
          <p className="text-[11px] uppercase tracking-[0.28em] text-stone">
            {product.isNew ? "Novidade · " : ""}
            {product.category === "roupas" ? "Roupas" : product.category === "acessorios" ? "Acessórios" : "Looks"}
          </p>
          <h1 className="mt-3 font-display text-4xl font-light tracking-tight text-ink sm:text-5xl">{product.name}</h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-stone">{product.description}</p>
          {product.fabric ? <p className="mt-4 text-sm text-stone">{product.fabric}</p> : null}
          <div className="mt-8">
            <ProductBuyBox product={product} />
          </div>
        </div>
      </Container>
      {related.length > 0 ? (
        <Container className="pb-32 lg:pb-24">
          <p className="text-[11px] uppercase tracking-[0.22em] text-stone">Também pode gostar</p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-5 md:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        </Container>
      ) : null}
    </main>
  );
}
