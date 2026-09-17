"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { gallery } from "@/data/gallery";
import { useLockBody } from "@/hooks/useLockBody";

type LightboxProps = {
  index: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export function Lightbox({ index, onClose, onPrev, onNext }: LightboxProps) {
  const reduce = useReducedMotion();
  const item = index === null ? null : gallery[index];
  useLockBody(index !== null);

  useEffect(() => {
    if (index === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrev();
      if (event.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, onClose, onNext, onPrev]);

  return (
    <AnimatePresence>
      {item ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={item.label}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/92 p-4 backdrop-blur-sm"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 rounded-full border border-white/20 p-3 text-snow"
            aria-label="Fechar galeria"
          >
            <X className="size-5" />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onPrev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 p-3 text-snow"
            aria-label="Imagem anterior"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 p-3 text-snow md:right-16"
            aria-label="Próxima imagem"
          >
            <ChevronRight className="size-5" />
          </button>
          <motion.div
            className="relative h-[72vh] w-full max-w-5xl"
            initial={reduce ? false : { scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="90vw"
              className="object-contain"
            />
            <p className="absolute inset-x-0 -bottom-10 text-center text-[11px] uppercase tracking-[0.28em] text-champagne">
              {item.label}
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
