"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/cards/ProductCard";
import { getProductsByFilter, productFilters, products } from "@/data/products";
import type { Product, ProductFilter } from "@/types/catalog";
import { cn } from "@/lib/cn";

type SortId = "recent" | "price-asc" | "price-desc";

const sorts: { id: SortId; label: string }[] = [
  { id: "recent", label: "Mais recentes" },
  { id: "price-asc", label: "Menor preço" },
  { id: "price-desc", label: "Maior preço" },
];

function sortProducts(items: Product[], sort: SortId) {
  const copy = [...items];
  if (sort === "price-asc") return copy.sort((a, b) => a.priceCents - b.priceCents);
  if (sort === "price-desc") return copy.sort((a, b) => b.priceCents - a.priceCents);
  return copy;
}

export function CatalogFilters() {
  const [filter, setFilter] = useState<ProductFilter>("todos");
  const [sort, setSort] = useState<SortId>("recent");
  const items = useMemo(() => sortProducts(getProductsByFilter(filter), sort), [filter, sort]);

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-ink/10 pb-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-wrap gap-x-6 gap-y-3" role="tablist" aria-label="Filtros">
          {productFilters.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={filter === item.id}
              onClick={() => setFilter(item.id)}
              className={cn(
                "text-[11px] uppercase tracking-[0.22em] transition-colors",
                filter === item.id ? "text-ink" : "text-stone hover:text-ink",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <label className="text-[11px] uppercase tracking-[0.18em] text-stone">
          Ordenar
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortId)}
            className="ml-3 border-b border-ink/20 bg-transparent py-1 text-[11px] uppercase tracking-[0.16em] text-ink outline-none"
          >
            {sorts.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p className="mt-6 text-xs text-stone">
        {items.length} {items.length === 1 ? "peça" : "peças"} · {products.length} na curadoria
      </p>
      {items.length === 0 ? (
        <p className="py-24 text-center font-display text-2xl font-light text-stone">Em breve nesta curadoria.</p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-x-5 gap-y-14 min-[400px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {items.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
