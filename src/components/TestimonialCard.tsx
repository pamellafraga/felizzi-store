import Image from "next/image";
import { Star } from "lucide-react";
import { cn } from "@/lib/cn";

type TestimonialCardProps = {
  quote: string;
  attribution: string;
  image: string;
  alt: string;
  className?: string;
};

export function TestimonialCard({
  quote,
  attribution,
  image,
  alt,
  className,
}: TestimonialCardProps) {
  return (
    <figure
      className={cn(
        "flex h-full min-w-[min(100%,340px)] snap-start flex-col justify-between border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm",
        className,
      )}
    >
      <div>
        <div className="mb-6 flex gap-1" aria-hidden>
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} className="size-3.5 fill-blush text-blush" />
          ))}
        </div>
        <blockquote className="font-display text-[1.65rem] leading-snug text-snow">
          “{quote}”
        </blockquote>
      </div>
      <figcaption className="mt-10 flex items-center gap-4">
        <span className="relative size-12 overflow-hidden rounded-full">
          <Image src={image} alt={alt} fill sizes="48px" className="object-cover" />
        </span>
        <span className="text-[11px] uppercase tracking-[0.22em] text-champagne/80">
          {attribution}
        </span>
      </figcaption>
    </figure>
  );
}
