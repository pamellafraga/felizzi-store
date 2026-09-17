import { Container } from "@/components/Container";
import { Gallery } from "@/components/Gallery";
import { Reveal } from "@/components/Reveal";
import { SectionTitle } from "@/components/SectionTitle";

export function Structure() {
  return (
    <section id="estrutura" className="scroll-mt-24 bg-snow py-24 lg:py-32">
      <Container>
        <Reveal>
          <SectionTitle
            eyebrow="Estrutura"
            title={
              <>
                Um espaço pensado
                <br />
                para receber vocês.
              </>
            }
          />
        </Reveal>
        <div className="mt-16">
          <Gallery />
        </div>
      </Container>
    </section>
  );
}
