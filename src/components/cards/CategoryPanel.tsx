import Image from "next/image";
import Link from "next/link";
import type { Collection } from "@/types/catalog";

export function CategoryPanel({ collection }: { collection: Collection }) {
  return (
    <Link href={`/categoria/${collection.slug}`} className="group relative block min-h-[58vh] overflow-hidden bg-sand">
      <Image
        src={collection.image}
        alt={collection.name}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 bg-ink/20 transition-colors duration-700 group-hover:bg-ink/45" />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
        <h3 className="font-display text-5xl font-light tracking-tight text-ivory sm:text-6xl">{collection.name}</h3>
        <span className="mt-6 translate-y-2 text-[11px] uppercase tracking-[0.28em] text-ivory opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 max-md:translate-y-0 max-md:opacity-100">
          Explorar
        </span>
      </div>
    </Link>
  );
}
