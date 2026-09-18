import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";

export function Manifesto() {
  const [first, ...rest] = site.copy.manifesto.lines;

  return (
    <section className="bg-espresso text-ivory" aria-labelledby="manifesto-title">
      <Container className="grid gap-12 py-24 lg:grid-cols-[1.4fr_0.8fr] lg:items-end lg:py-32">
        <Reveal>
          <h2 id="manifesto-title" className="font-display text-5xl font-light leading-[0.95] tracking-tight sm:text-6xl lg:text-8xl">
            <span className="block">{first}</span>
            {rest.map((line) => (
              <span key={line} className="block text-ivory/80">
                {line}
              </span>
            ))}
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="max-w-sm text-sm leading-relaxed text-ivory/65 lg:mb-3">{site.copy.manifesto.body}</p>
        </Reveal>
      </Container>
    </section>
  );
}
