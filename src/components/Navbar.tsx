"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CalendarDays, Menu, X } from "lucide-react";
import { useState } from "react";
import { clinic } from "@/data/clinic";
import { navigation } from "@/data/navigation";
import { useLockBody } from "@/hooks/useLockBody";
import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/lib/cn";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { Logo } from "./Logo";

export function Navbar() {
  const scrolled = useScrolled(40);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  useLockBody(open);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled || open
          ? "border-b border-white/10 bg-ink/78 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:h-[88px] lg:px-12">
        <a href="#inicio" className="relative z-10" aria-label={`${clinic.name} — início`}>
          <Logo tone="light" />
        </a>

        <nav className="hidden items-center gap-8 xl:flex" aria-label="Principal">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} className="nav-link text-[12px] font-medium uppercase tracking-[0.2em] text-snow/80">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-snow px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-ink transition-colors duration-500 hover:bg-rose hover:text-snow md:inline-flex"
          >
            <CalendarDays className="size-3.5" aria-hidden />
            Agendar consulta
          </a>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-white/15 text-snow xl:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="menu-mobile"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-x-0 top-full border-t border-white/10 bg-ink/95 backdrop-blur-xl xl:hidden"
          >
            <nav className="flex flex-col gap-1 px-6 py-8" aria-label="Mobile">
              {navigation.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={reduce ? false : { opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index, duration: 0.4 }}
                  className="border-b border-white/8 py-4 font-display text-3xl text-snow"
                >
                  {item.label}
                </motion.a>
              ))}
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-snow px-6 py-4 text-[12px] font-medium uppercase tracking-[0.2em] text-ink"
              >
                <CalendarDays className="size-4" aria-hidden />
                Agendar consulta
              </a>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
