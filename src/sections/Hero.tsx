"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { clinic } from "@/data/clinic";
import { images } from "@/data/images";
import { Button } from "@/components/Button";
import { PawMark } from "@/components/PawMark";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section
      ref={ref}
      id="inicio"
      className="relative isolate flex min-h-[100svh] overflow-hidden bg-ink text-snow"
    >
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { y }}
        initial={reduce ? false : { scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={images.hero}
          alt="Cão golden retriever e gato de pelagem creme juntos em um interior sofisticado"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_30%]"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-ink/78 via-ink/38 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-ink/20" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center px-5 pb-16 pt-28 sm:px-8 lg:px-12 lg:pb-24 lg:pt-32">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="mb-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.34em] text-champagne"
        >
          <PawMark className="size-3.5 text-rose" />
          Saúde • Bem-estar • Muito amor
        </motion.p>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="max-w-[11ch] font-display text-[2.85rem] font-medium leading-[0.94] tracking-tight sm:text-6xl lg:text-[5.8rem]"
        >
          Cuidando de quem
          <br />
          sempre está ao
          <br />
          <span className="font-script text-[1.05em] font-normal text-blush">
            seu lado
          </span>
          <span className="text-snow">.</span>
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.9 }}
          className="mt-8 max-w-md text-base leading-relaxed text-snow/78 sm:text-lg"
        >
          Atendimento veterinário com carinho, experiência e dedicação para cuidar de quem faz parte da sua família.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.8 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <Button href={getWhatsAppUrl()} variant="frost">
            Agendar consulta
          </Button>
          <a
            href="#estrutura"
            className="inline-flex items-center gap-3 text-[12px] uppercase tracking-[0.2em] text-snow/85 transition-colors hover:text-snow"
          >
            <span className="flex size-10 items-center justify-center rounded-full border border-white/25">
              <Play className="size-3.5 fill-current" aria-hidden />
            </span>
            Conheça nosso espaço
          </a>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="mt-14 flex items-end justify-between gap-6 border-t border-white/10 pt-6 text-[11px] uppercase tracking-[0.22em] text-champagne/80"
        >
          <p>{clinic.registry}</p>
          <p className="hidden sm:block">{clinic.address.neighborhood} • {clinic.address.city}</p>
          <p className="hidden md:block">{clinic.concept}</p>
        </motion.div>
      </div>
    </section>
  );
}
