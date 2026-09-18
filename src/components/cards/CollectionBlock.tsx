import Image from "next/image";
import Link from "next/link";
import type { Collection } from "@/types/catalog";
import { cn } from "@/lib/cn";

type CollectionBlockProps = {
  collection: Collection;
  featured?: boolean;
};

export function CollectionBlock({ collection, featured = false }: CollectionBlockProps) {
  return (
    <article className={cn("group relative overflow-hidden bg-sand", featured ? "min-h-[58vh] md:min-h-[70vh]" : "min-h-[46vh] md:min-h-[52vh]")}>
      <Image
        src={collection.image}
        alt={collection.name}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
        <p className="text-[11px] uppercase tracking-[0.28em] text-ivory/70">Coleção</p>
        <h2 className="mt-3 font-display text-4xl font-light text-ivory sm:text-6xl">{collection.name}</h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-ivory/80">{collection.description}</p>
        <Link
          href={`/categoria/${collection.slug}`}
          className="mt-6 inline-flex text-[11px] uppercase tracking-[0.24em] text-ivory nav-underline"
        >
          {collection.cta}
        </Link>
      </div>
    </article>
  );
}
