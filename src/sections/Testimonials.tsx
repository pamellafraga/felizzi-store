"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { TestimonialCard } from "@/components/TestimonialCard";
import { images } from "@/data/images";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  const scroller = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: number) => {
    scroller.current?.scrollBy({ left: direction * 380, behavior: "smooth" });
  };

  return (
    <section id="depoimentos" className="relative isolate scroll-mt-24 overflow-hidden bg-ink py-24 text-snow lg:py-32">
      <Image
        src={images.dog}
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-[0.16]"
      />
      <div className="absolute inset-0 bg-ink/70" />

      <Container className="relative">
        <div className="flex items-end justify-between gap-6">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.32em] text-blush">Depoimentos</p>
            <h2 className="mt-5 font-display text-[2.4rem] font-medium leading-[1.08] sm:text-5xl lg:text-[3.4rem]">
              O que dizem
              <br />
              nossos clientes.
            </h2>
            <p className="mt-4 max-w-md text-xs tracking-wide text-champagne/55">
              Relatos demonstrativos — textos finais serão confirmados com a cliente.
            </p>
          </Reveal>
          <div className="hidden gap-3 md:flex">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              className="flex size-12 items-center justify-center rounded-full border border-white/20 text-snow"
              aria-label="Depoimento anterior"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              className="flex size-12 items-center justify-center rounded-full border border-white/20 text-snow"
              aria-label="Próximo depoimento"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        <div
          ref={scroller}
          className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4"
        >
          {testimonials.map((item) => (
            <TestimonialCard
              key={item.id}
              quote={item.quote}
              attribution={item.attribution}
              image={item.image}
              alt={item.alt}
              className="w-[min(100%,380px)] shrink-0"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
