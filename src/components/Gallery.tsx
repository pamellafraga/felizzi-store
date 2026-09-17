"use client";

import Image from "next/image";
import { useState } from "react";
import { gallery } from "@/data/gallery";
import { cn } from "@/lib/cn";
import { Lightbox } from "./Lightbox";
import { Reveal } from "./Reveal";

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 lg:gap-5">
        {gallery.map((item, itemIndex) => (
          <Reveal key={item.id} delay={itemIndex * 0.08} className="mb-4 break-inside-avoid lg:mb-5">
            <button
              type="button"
              onClick={() => setIndex(itemIndex)}
              className="group relative block w-full overflow-hidden"
              data-cursor="VER MAIS"
              aria-label={`Abrir foto: ${item.label}`}
            >
              <span
                className={cn(
                  "relative block",
                  item.ratio === "tall" && "aspect-[3/4]",
                  item.ratio === "wide" && "aspect-[4/3]",
                  item.ratio === "square" && "aspect-square",
                )}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </span>
              <span className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/70 via-ink/0 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <span className="text-[11px] uppercase tracking-[0.28em] text-snow">
                  {item.label}
                </span>
              </span>
            </button>
          </Reveal>
        ))}
      </div>
      <Lightbox
        index={index}
        onClose={() => setIndex(null)}
        onPrev={() =>
          setIndex((current) =>
            current === null ? current : (current + gallery.length - 1) % gallery.length,
          )
        }
        onNext={() =>
          setIndex((current) =>
            current === null ? current : (current + 1) % gallery.length,
          )
        }
      />
    </>
  );
}
