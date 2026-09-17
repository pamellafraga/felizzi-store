import Image from "next/image";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { images } from "@/data/images";
import { pillars } from "@/data/pillars";

export function WhyChoose() {
  return (
    <section id="sobre" className="scroll-mt-24 bg-ivory py-24 lg:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.32em] text-rose">Por que escolher</p>
            <h2 className="mt-5 max-w-xl font-display text-[2.4rem] font-medium leading-[1.08] text-ink sm:text-5xl lg:text-[3.5rem]">
              Seu pet merece cuidado.
              <br />
              E ele começa nos detalhes.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:pb-2">
            <p className="max-w-md text-lg leading-relaxed text-charcoal/70">
              Um consultório boutique no Jardim Botânico, pensado para unir sofisticação, acolhimento e medicina veterinária.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-stretch">
          <div className="divide-y divide-ink/10">
            {pillars.map((pillar, index) => (
              <Reveal key={pillar.number} delay={index * 0.08}>
                <article className="group grid grid-cols-[auto_1fr] gap-6 py-8">
                  <span className="font-display text-4xl text-rose/70 transition-colors duration-500 group-hover:text-rose">
                    {pillar.number}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl text-ink sm:text-3xl">{pillar.title}</h3>
                    <p className="mt-3 max-w-lg text-sm leading-relaxed text-charcoal/70 sm:text-base">
                      {pillar.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.12} className="relative min-h-[420px] overflow-hidden">
            <Image
              src={images.clinic}
              alt="Recepção moderna e sofisticada do consultório veterinário"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
              data-cursor="VER MAIS"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
