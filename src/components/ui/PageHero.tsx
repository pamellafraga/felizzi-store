import Image from "next/image";
import { cn } from "@/lib/cn";

type PageHeroProps = {
  kicker?: string;
  title: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
};

export function PageHero({ kicker, title, subtitle, image, imageAlt }: PageHeroProps) {
  return (
    <section className={cn("relative overflow-hidden", image ? "min-h-[58vh] bg-espresso text-ivory" : "bg-sand pt-32 pb-16 lg:pt-40")}>
      {image ? (
        <>
          <Image src={image} alt={imageAlt ?? title} fill preload sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-ink/45" />
          <div className="relative flex min-h-[58vh] items-end px-5 pb-14 sm:px-10 lg:px-16">
            <div>
              {kicker ? <p className="text-[11px] uppercase tracking-[0.28em] text-ivory/70">{kicker}</p> : null}
              <h1 className="mt-3 font-display text-5xl font-light tracking-tight sm:text-7xl">{title}</h1>
              {subtitle ? <p className="mt-4 max-w-lg text-sm leading-relaxed text-ivory/80">{subtitle}</p> : null}
            </div>
          </div>
        </>
      ) : (
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          {kicker ? <p className="text-[11px] uppercase tracking-[0.28em] text-stone">{kicker}</p> : null}
          <h1 className="mt-3 font-display text-5xl font-light tracking-tight text-ink sm:text-7xl">{title}</h1>
          {subtitle ? <p className="mt-5 max-w-xl text-base leading-relaxed text-stone">{subtitle}</p> : null}
        </div>
      )}
    </section>
  );
}
