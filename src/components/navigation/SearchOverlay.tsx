"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { searchCatalog } from "@/lib/search";
import { formatBRL } from "@/lib/money";

type SearchOverlayProps = {
  open: boolean;
  onClose: () => void;
};

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const reduce = useReducedMotion();
  const results = useMemo(() => searchCatalog(query), [query]);

  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => inputRef.current?.focus(), 180);
    return () => window.clearTimeout(id);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[90] bg-ivory"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Buscar na Felizzi"
        >
          <div className="mx-auto flex min-h-full max-w-3xl flex-col overflow-y-auto px-5 pb-10 pt-[calc(6.5rem+env(safe-area-inset-top))] sm:px-6">
            <div className="flex items-center justify-between">
              <p className="text-[11px] uppercase tracking-[0.28em] text-stone">Buscar</p>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex min-h-11 items-center text-[11px] uppercase tracking-[0.22em] text-ink"
              >
                Fechar
              </button>
            </div>
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Peças, looks, estilos"
              className="mt-8 w-full border-b border-ink/20 bg-transparent pb-4 font-display text-3xl font-light tracking-tight text-ink outline-none placeholder:text-taupe sm:mt-10 sm:text-5xl"
              aria-label="Termo de busca"
            />
            <ul className="mt-10 space-y-4">
              {results.map((hit) => (
                <li key={hit.href}>
                  <Link href={hit.href} onClick={onClose} className="flex items-center gap-5 py-2">
                    <span className="relative h-16 w-12 overflow-hidden bg-sand">
                      <Image src={hit.image} alt="" fill className="object-cover" sizes="48px" />
                    </span>
                    <span>
                      <span className="block text-[10px] uppercase tracking-[0.22em] text-stone">{hit.kind}</span>
                      <span className="font-display text-2xl font-light text-ink">{hit.title}</span>
                      {hit.priceCents ? (
                        <span className="mt-1 block text-sm text-stone">{formatBRL(hit.priceCents)}</span>
                      ) : null}
                    </span>
                  </Link>
                </li>
              ))}
              {query.length < 2 ? (
                <li className="text-sm text-stone">Digite ao menos duas letras para buscar peças e looks.</li>
              ) : null}
              {query.length >= 2 && results.length === 0 ? (
                <li className="text-sm text-stone">Nenhum resultado para esta busca.</li>
              ) : null}
            </ul>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
