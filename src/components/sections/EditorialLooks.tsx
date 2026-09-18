import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { looks } from "@/data/looks";

export function EditorialLooks() {
  const one = looks[0];
  const two = looks[1];
  const three = looks[2];
  const four = looks[3];

  if (!one || !two || !three || !four) return null;

  return (
    <section className="overflow-hidden bg-champagne py-24 lg:py-32" aria-labelledby="inspiracao-title">
      <Container>
        <Reveal>
          <SectionHeading
            id="inspiracao-title"
            title="Inspiração"
            subtitle="Looks, combinações e ideias para diferentes momentos."
          />
        </Reveal>
        <div className="mt-16 grid grid-cols-12 gap-4 lg:gap-6">
          <Reveal className="col-span-12 md:col-span-7">
            <LookLink look={one} className="aspect-[4/5] md:aspect-[5/6]" />
          </Reveal>
          <div className="col-span-12 flex flex-col gap-6 md:col-span-5">
            <Reveal delay={0.08}>
              <LookLink look={two} className="aspect-[5/4]" />
            </Reveal>
            <Reveal delay={0.12} className="px-2 py-6 md:px-4">
              <p className="text-[11px] uppercase tracking-[0.28em] text-stone">Editorial</p>
              <p className="mt-4 font-display text-3xl font-light leading-tight text-ink lg:text-4xl">
                Uma página de revista, feita para ser vista com calma.
              </p>
              <Link href="/looks" className="nav-underline mt-6 inline-flex text-[11px] uppercase tracking-[0.24em] text-ink">
                Ver looks
              </Link>
            </Reveal>
          </div>
          <Reveal delay={0.04} className="col-span-6 md:col-span-4">
            <LookLink look={three} className="aspect-[3/4]" />
          </Reveal>
          <Reveal delay={0.1} className="col-span-6 md:col-span-8">
            <LookLink look={four} className="aspect-[4/3] md:aspect-[16/9]" />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function LookLink({
  look,
  className,
}: {
  look: (typeof looks)[number];
  className: string;
}) {
  return (
    <Link href={`/looks/${look.slug}`} className={`group relative block overflow-hidden bg-sand ${className}`}>
      <Image
        src={look.image}
        alt={look.title}
        fill
        sizes="(max-width: 768px) 100vw, 60vw"
        className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent opacity-80" />
      <div className="absolute bottom-5 left-5 right-5">
        <p className="text-[10px] uppercase tracking-[0.24em] text-ivory/70">{look.kicker}</p>
        <h3 className="mt-1 font-display text-2xl font-light text-ivory">{look.title}</h3>
      </div>
    </Link>
  );
}
