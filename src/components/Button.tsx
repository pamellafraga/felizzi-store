"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CalendarDays, type LucideIcon } from "lucide-react";
import type { MouseEvent, ReactNode } from "react";
import { useRef } from "react";
import { cn } from "@/lib/cn";
import { useFinePointer } from "@/hooks/useFinePointer";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "frost";
  icon?: LucideIcon;
  className?: string;
  external?: boolean;
  magnetic?: boolean;
};

export function Button({
  href,
  children,
  variant = "primary",
  icon: Icon = CalendarDays,
  className,
  external,
  magnetic = true,
}: ButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const isExternal = external || href.startsWith("http");

  const onMove = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!magnetic || !fine || reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * 0.18}px, ${y * 0.22}px)`;
  };

  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0, 0)";
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={cn(
        "group inline-flex items-center justify-center gap-3 rounded-full px-7 py-3.5 text-[13px] font-medium uppercase tracking-[0.18em] transition-[background-color,color,border-color,transform] duration-500 ease-out will-change-transform",
        variant === "primary" &&
          "bg-ink text-snow hover:bg-rose",
        variant === "frost" &&
          "bg-snow text-ink hover:bg-rose hover:text-snow",
        variant === "secondary" &&
          "border border-snow/35 bg-transparent text-snow hover:border-snow hover:bg-snow/10",
        variant === "ghost" &&
          "border border-ink/15 bg-transparent text-ink hover:border-rose hover:text-rose",
        className,
      )}
    >
      {children}
      <Icon
        className="size-[15px] transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        aria-hidden
      />
    </motion.a>
  );
}
