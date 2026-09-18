import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getLook, getRelatedLooks, looks } from "@/data/looks";
import { getProduct } from "@/data/products";
import { formatBRL } from "@/lib/money";
import { getPrimaryContactHref, getPrimaryContactLabel } from "@/lib/whatsapp";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return looks.map((look) => ({ slug: look.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const look = getLook(slug);
  if (!look) return { title: "Look" };
  return {
    title: look.title,
    description: look.description,
    alternates: { canonical: `/looks/${look.slug}` },
  };
}

export default async function LookPage({ params }: Props) {
  const { slug } = await params;
  const look = getLook(slug);
  if (!look) notFound();
  const related = getRelatedLooks(look.slug);

  return (
    <main id="conteudo" className="pt-20 lg:pt-28">
      <Container className="grid gap-10 pb-24 lg:grid-cols-12 lg:gap-16">
        <div className="relative aspect-[4/5] overflow-hidden bg-sand lg:col-span-7">
          <Image src={look.image} alt={look.title} fill preload sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover" />
        </div>
        <div className="lg:col-span-5 lg:pt-8">
          <p className="text-[11px] uppercase tracking-[0.28em] text-stone">{look.kicker}</p>
          <h1 className="mt-4 font-display text-4xl font-light tracking-tight text-ink lg:text-6xl">{look.title}</h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-stone">{look.description}</p>
          <div className="mt-10">
            <p className="text-[11px] uppercase tracking-[0.22em] text-stone">Peças relacionadas</p>
            <ul className="mt-4 space-y-3">
              {look.pieces.map((piece) => {
                const product = piece.productSlug ? getProduct(piece.productSlug) : undefined;
                return (
                  <li key={piece.name}>
                    {product ? (
                      <Link href={`/produto/${product.slug}`} className="flex items-baseline justify-between gap-4">
                        <span className="nav-underline font-display text-2xl font-light text-ink">{piece.name}</span>
                        <span className="text-sm text-stone">{formatBRL(product.priceCents)}</span>
                      </Link>
                    ) : (
                      <span className="font-display text-2xl font-light text-ink">{piece.name}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            {look.pieces[0]?.productSlug ? (
              <Button href={`/produto/${look.pieces[0].productSlug}`}>Comprar esta peça</Button>
            ) : null}
            <Button href={getPrimaryContactHref(`Olá, Felizzi! Gostaria de saber mais sobre o look ${look.title}.`)} variant="outline" external>
              {getPrimaryContactLabel()}
            </Button>
          </div>
        </div>
      </Container>
      {look.gallery.length > 1 ? (
        <Container className="grid grid-cols-2 gap-4 pb-20">
          {look.gallery.map((src) => (
            <div key={src} className="relative aspect-[4/5] overflow-hidden bg-sand">
              <Image src={src} alt={look.title} fill sizes="50vw" className="object-cover" />
            </div>
          ))}
        </Container>
      ) : null}
      <Container className="pb-24">
        <p className="text-[11px] uppercase tracking-[0.22em] text-stone">Continue olhando</p>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
          {related.map((item) => (
            <Link key={item.slug} href={`/looks/${item.slug}`} className="group">
              <div className="relative aspect-[3/4] overflow-hidden bg-sand">
                <Image src={item.image} alt={item.title} fill sizes="33vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
              </div>
              <h2 className="mt-3 font-display text-xl font-light text-ink">{item.title}</h2>
            </Link>
          ))}
        </div>
      </Container>
    </main>
  );
}
