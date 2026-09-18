import { looks } from "@/data/looks";
import { products } from "@/data/products";

export type SearchHit = {
  href: string;
  title: string;
  kind: "Peça" | "Look";
  image: string;
  priceCents?: number;
};

export function searchCatalog(query: string): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];

  const productHits = products
    .filter((item) =>
      [item.name, item.shortDescription, item.category, item.mood].join(" ").toLowerCase().includes(q),
    )
    .map((item) => ({
      href: `/produto/${item.slug}`,
      title: item.name,
      kind: "Peça" as const,
      image: item.image,
      priceCents: item.priceCents,
    }));

  const lookHits = looks
    .filter((item) => [item.title, item.description, item.kicker, item.mood].join(" ").toLowerCase().includes(q))
    .map((item) => ({
      href: `/looks/${item.slug}`,
      title: item.title,
      kind: "Look" as const,
      image: item.image,
    }));

  return [...productHits, ...lookHits].slice(0, 8);
}
