import { ProductCard } from "@/components/cards/ProductCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { products } from "@/data/products";

export function Novidades() {
  const items = products.slice(0, 4);

  return (
    <section className="bg-ivory py-16 lg:py-32" aria-labelledby="novidades-title">
      <Container>
        <Reveal>
          <SectionHeading
            id="novidades-title"
            kicker="Curadoria"
            title="Novidades"
            subtitle="Uma curadoria para acompanhar o seu momento."
          />
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 md:mt-14 md:gap-x-4 md:gap-y-12 lg:grid-cols-4 lg:gap-x-6">
          {items.map((product, index) => (
            <Reveal key={product.slug} delay={index * 0.06} className={index === 3 ? "md:hidden lg:block" : undefined}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-14">
          <Button href="/novidades" variant="outline">
            Ver todas as novidades
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
