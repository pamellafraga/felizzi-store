import Image from "next/image";
import Link from "next/link";
import { formatBRL } from "@/lib/money";
import type { Product } from "@/types/catalog";
import { cn } from "@/lib/cn";

const categoryLabel: Record<Product["category"], string> = {
  roupas: "Roupas",
  acessorios: "Acessórios",
  looks: "Looks",
};

type ProductCardProps = {
  product: Product;
  className?: string;
};

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <article className={cn("group", className)}>
      <Link href={`/produto/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-sand">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045]"
          />
          {product.hoverImage ? (
            <Image
              src={product.hoverImage}
              alt=""
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            />
          ) : null}
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-ink/55 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100 max-md:opacity-100">
            <span className="text-[10px] uppercase tracking-[0.22em] text-ivory">Comprar</span>
          </div>
        </div>
        <div className="mt-4 flex items-start justify-between gap-3">
          <div>
            {product.isNew ? (
              <p className="mb-1 text-[10px] uppercase tracking-[0.26em] text-stone">Novidade</p>
            ) : null}
            <h3 className="font-display text-xl font-light tracking-tight text-ink">{product.name}</h3>
            <p className="mt-1 text-[12px] uppercase tracking-[0.18em] text-stone">{categoryLabel[product.category]}</p>
            <p className="mt-2 text-sm text-ink">{formatBRL(product.priceCents)}</p>
          </div>
        </div>
        <p className="mt-2 max-w-[28ch] text-sm leading-relaxed text-stone">{product.shortDescription}</p>
      </Link>
    </article>
  );
}
