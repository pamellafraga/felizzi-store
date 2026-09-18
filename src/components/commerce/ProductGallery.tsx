"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0);
  const current = images[index] ?? images[0];

  return (
    <div>
      <div className="relative aspect-[3/4] overflow-hidden bg-sand">
        {current ? (
          <Image src={current} alt={alt} fill sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover" />
        ) : null}
      </div>
      {images.length > 1 ? (
        <div className="mt-3 grid grid-cols-4 gap-2">
          {images.map((src, itemIndex) => (
            <button
              key={src}
              type="button"
              onClick={() => setIndex(itemIndex)}
              className={cn("relative aspect-[3/4] overflow-hidden bg-sand", itemIndex === index && "ring-1 ring-ink")}
              aria-label={`Ver imagem ${itemIndex + 1}`}
            >
              <Image src={src} alt="" fill className="object-cover" sizes="120px" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
