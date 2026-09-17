"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type ImageRevealProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  cursorLabel?: string;
};

export function ImageReveal({
  src,
  alt,
  className,
  imageClassName,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  cursorLabel,
}: ImageRevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={cn("relative overflow-hidden bg-champagne/30", className)}
      initial={reduce ? false : { opacity: 0, scale: 1.04 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      data-cursor={cursorLabel}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn(
          "object-cover transition-transform duration-[1400ms] ease-out will-change-transform group-hover:scale-[1.06]",
          imageClassName,
        )}
      />
    </motion.div>
  );
}
