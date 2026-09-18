import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[520px] overflow-hidden bg-espresso" aria-label="Capa">
      <Image
        src="/images/looks/v2/look-02.png"
        alt="Look Felizzi: vestido midi em tom rosa"
        fill
        preload
        fetchPriority="high"
        sizes="100vw"
        className="ken-burns object-cover object-[center_20%]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/20 to-ink/40" />
      <div className="absolute inset-x-0 bottom-0 px-5 pb-[max(4.5rem,calc(env(safe-area-inset-bottom)+3.5rem))] sm:px-10 lg:px-16 lg:pb-20">
        <p className="enter-fade text-[11px] uppercase tracking-[0.32em] text-ivory/70">{site.copy.heroEyebrow}</p>
        <h1 className="enter-fade mt-3 font-display text-5xl font-light uppercase tracking-[0.1em] text-ivory sm:mt-4 sm:text-7xl sm:tracking-[0.12em] lg:text-8xl">
          {site.copy.heroTitle}
        </h1>
        <p className="enter-fade-delay mt-3 max-w-md font-display text-lg italic text-ivory/85 sm:text-2xl">
          {site.copy.heroLine}
        </p>
        <div className="enter-fade-delay mt-6 flex flex-col items-start gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
          <Button href="/sobre" variant="light">
            {site.copy.heroPrimaryCta}
          </Button>
          <Button href="/novidades" variant="ghost">
            Comprar novidades
          </Button>
        </div>
      </div>
    </section>
  );
}
