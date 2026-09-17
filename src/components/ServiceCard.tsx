"use client";

import Image from "next/image";
import { HeartPulse, PawPrint, Stethoscope } from "lucide-react";
import { cn } from "@/lib/cn";

type ServiceCardProps = {
  number: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  featured?: boolean;
  className?: string;
};

const icons = [Stethoscope, HeartPulse, PawPrint];

export function ServiceCard({
  number,
  title,
  description,
  image,
  alt,
  featured = false,
  className,
}: ServiceCardProps) {
  const Icon = icons[Number(number) % icons.length];

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden border border-ink/8 transition-transform duration-700 hover:-translate-y-1.5",
        featured ? "min-h-[460px] bg-ink text-snow lg:min-h-[520px]" : "bg-snow text-ink",
        className,
      )}
      data-cursor="CONHECER"
    >
      {featured ? (
        <div className="absolute inset-0">
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/15" />
        </div>
      ) : (
        <div className="relative h-44 overflow-hidden">
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      )}

      <div
        className={cn(
          "relative z-10 flex flex-1 flex-col justify-between p-7 sm:p-9",
          featured && "min-h-[460px] lg:min-h-[520px]",
        )}
      >
        <div className="flex items-start justify-between">
          <span className={cn("font-display text-4xl", featured ? "text-blush" : "text-rose/80")}>
            {number}
          </span>
          <Icon
            className={cn(
              "size-5 transition-transform duration-500 group-hover:-translate-y-1",
              featured ? "text-snow/70" : "text-ink/40",
            )}
          />
        </div>

        <div className={featured ? "mt-24" : "mt-8"}>
          <h3 className="font-display text-3xl">{title}</h3>
          <p
            className={cn(
              "mt-3 max-w-sm text-sm leading-relaxed",
              featured ? "text-snow/80" : "text-charcoal/70",
            )}
          >
            {description}
          </p>
          <span className="mt-6 block h-px w-8 bg-rose transition-all duration-700 group-hover:w-16" />
        </div>
      </div>
    </article>
  );
}
