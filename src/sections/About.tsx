import Image from "next/image";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { clinic } from "@/data/clinic";
import { images } from "@/data/images";

const highlights = [
  clinic.registry,
  "Atendimento personalizado",
  "Clínica geral",
  "Cuidado humanizado",
];

export function About() {
  return (
    <section id="dra-maristela" className="scroll-mt-24 bg-snow py-24 lg:py-32">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <Reveal className="relative lg:pb-8">
            <div className="absolute -left-4 top-8 hidden h-[72%] w-full border border-champagne lg:block" />
            <div className="relative aspect-[3/4] overflow-hidden" data-cursor="CONHECER">
              <Image
                src={images.doctor}
                alt="Médica veterinária atendendo um gato com carinho em consultório sofisticado"
                fill
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-cover"
              />
            </div>
            <blockquote className="relative mt-4 max-w-[280px] bg-ink p-6 text-snow sm:absolute sm:-bottom-8 sm:right-0 sm:mt-0 lg:-right-6">
              <p className="font-script text-2xl leading-tight text-blush">
                Cada animal é único
                <br />
                e merece um cuidado especial.
              </p>
            </blockquote>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="text-[11px] uppercase tracking-[0.32em] text-rose">
              Sobre a Dra. Maristela
            </p>
            <h2 className="mt-5 font-display text-[2.4rem] font-medium leading-[1.08] text-ink sm:text-5xl lg:text-[3.4rem]">
              Mais que uma veterinária,
              <br />
              uma apaixonada por animais.
            </h2>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-charcoal/70">
              Cada atendimento é pensado para unir cuidado, atenção e respeito ao animal e à sua família.
            </p>
            <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4">
              {highlights.map((item) => (
                <li key={item} className="border-t border-ink/10 pt-4 text-sm tracking-wide text-ink">
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Button href="#contato" variant="primary" magnetic>
                Conheça a Dra. Maristela
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
