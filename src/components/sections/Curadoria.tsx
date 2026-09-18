import { CategoryPanel } from "@/components/cards/CategoryPanel";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { collections } from "@/data/collections";

export function Curadoria() {
  return (
    <section className="bg-ivory py-16 lg:py-32" aria-labelledby="curadoria-title">
      <Container>
        <Reveal>
          <h2
            id="curadoria-title"
            className="max-w-3xl font-display text-4xl font-light tracking-tight text-ink sm:text-5xl lg:text-7xl"
          >
            Uma curadoria feita para você.
          </h2>
        </Reveal>
      </Container>
      <div className="mt-10 grid md:mt-14 md:grid-cols-3">
        {collections.map((collection) => (
          <CategoryPanel key={collection.slug} collection={collection} />
        ))}
      </div>
    </section>
  );
}
