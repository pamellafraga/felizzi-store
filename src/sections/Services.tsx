import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionTitle } from "@/components/SectionTitle";
import { ServiceCard } from "@/components/ServiceCard";
import { services } from "@/data/services";
import { cn } from "@/lib/cn";

const spans = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-8",
  "lg:col-span-5",
  "lg:col-span-7",
];

export function Services() {
  return (
    <section id="servicos" className="scroll-mt-24 bg-ivory py-24 lg:py-32">
      <Container>
        <Reveal>
          <SectionTitle
            eyebrow="Serviços"
            title={
              <>
                Atendimento completo
                <br />
                para todas as fases da vida.
              </>
            }
            description="Do filhote ao animal idoso, oferecemos cuidados preventivos e tratamentos para cães e gatos."
          />
        </Reveal>

        <div className="mt-16 grid gap-4 lg:grid-cols-12 lg:gap-5">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={index * 0.06} className={cn(spans[index], "min-w-0")}>
              <ServiceCard
                number={service.number}
                title={service.title}
                description={service.description}
                image={service.image}
                alt={service.alt}
                featured={service.featured}
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
