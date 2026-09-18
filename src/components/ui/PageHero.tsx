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
    <section
      className={cn(
        "relative overflow-hidden",
        image ? "min-h-[48vh] bg-espresso text-ivory sm:min-h-[58vh]" : "bg-sand pt-24 pb-12 lg:pt-40 lg:pb-16",
      )}
    >
      {image ? (
        <>
          <Image src={image} alt={imageAlt ?? title} fill preload sizes="100vw" className="object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/35 to-ink/40" />
          <div className="relative flex min-h-[48vh] items-end px-5 pb-10 sm:min-h-[58vh] sm:px-10 sm:pb-14 lg:px-16">
            <div className="max-w-[min(100%,36rem)]">
              {kicker ? <p className="text-[11px] uppercase tracking-[0.28em] text-ivory/70">{kicker}</p> : null}
              <h1 className="mt-3 font-display text-4xl font-light tracking-tight sm:text-7xl">{title}</h1>
              {subtitle ? <p className="mt-3 max-w-lg text-sm leading-relaxed text-ivory/80 sm:mt-4">{subtitle}</p> : null}
            </div>
          </div>
        </>
      ) : (
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          {kicker ? <p className="text-[11px] uppercase tracking-[0.28em] text-stone">{kicker}</p> : null}
          <h1 className="mt-3 font-display text-4xl font-light tracking-tight text-ink sm:text-7xl">{title}</h1>
          {subtitle ? <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-stone sm:mt-5 sm:text-base">{subtitle}</p> : null}
        </div>
      )}
    </section>
  );
}
