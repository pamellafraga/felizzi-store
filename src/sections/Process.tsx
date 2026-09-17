import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { processSteps } from "@/data/process";

export function Process() {
  return (
    <section className="bg-ivory py-24 lg:py-28">
      <Container>
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.32em] text-rose">Experiência</p>
          <h2 className="mt-5 max-w-2xl font-display text-[2.3rem] font-medium leading-[1.1] text-ink sm:text-5xl">
            Do primeiro contato ao cuidado contínuo.
          </h2>
        </Reveal>

        <div className="relative mt-16 grid gap-10 md:grid-cols-3">
          <div className="pointer-events-none absolute left-[16%] right-[16%] top-7 hidden h-px bg-champagne md:block" />
          {processSteps.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.12} className="relative">
              <span className="relative z-10 flex size-14 items-center justify-center rounded-full border border-ink/10 bg-ivory font-display text-xl text-ink">
                {step.number}
              </span>
              <h3 className="mt-6 font-display text-3xl text-ink">{step.title}</h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-charcoal/70">
                {step.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
