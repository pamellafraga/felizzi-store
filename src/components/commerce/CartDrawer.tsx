"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCart } from "@/components/commerce/CartProvider";
import { useLockBody } from "@/hooks/useLockBody";
import { commerce } from "@/data/commerce";
import { formatBRL } from "@/lib/money";
import { cn } from "@/lib/cn";
import { ShopifyCheckoutButton } from "@/components/commerce/ShopifyCheckoutButton";

export function CartDrawer() {
  const { lines, count, subtotalCents, isOpen, closeCart, updateQuantity, removeItem } = useCart();
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  useLockBody(isOpen);

  const remaining = Math.max(commerce.freeShippingCents - subtotalCents, 0);

  useEffect(() => {
    if (isOpen) closeRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeCart, isOpen]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[86]"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button type="button" className="absolute inset-0 bg-ink/35" aria-label="Fechar sacola" onClick={closeCart} />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Sacola"
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-ivory shadow-soft pt-[env(safe-area-inset-top)]"
            initial={reduce ? false : { x: 24, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 24, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
              <div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-stone">Sacola</p>
                <p className="font-display text-2xl font-light text-ink">
                  {count === 0 ? "Vazia" : `${count} ${count === 1 ? "peça" : "peças"}`}
                </p>
              </div>
              <button ref={closeRef} type="button" onClick={closeCart} className="inline-flex min-h-11 min-w-11 items-center justify-center text-[11px] uppercase tracking-[0.22em]">
                Fechar
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <p className="font-display text-3xl font-light text-ink">A sacola espera por um look.</p>
                <p className="mt-3 text-sm text-stone">Explore a curadoria e adicione o seu momento.</p>
                <Link
                  href="/novidades"
                  onClick={closeCart}
                  className="mt-8 bg-ink px-7 py-3.5 text-[11px] uppercase tracking-[0.22em] text-ivory"
                >
                  Ver novidades
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
                  {lines.map((line) => (
                    <li key={line.id} className="flex gap-4">
                      <Link href={`/produto/${line.slug}`} onClick={closeCart} className="relative h-28 w-20 shrink-0 overflow-hidden bg-sand">
                        <Image src={line.image} alt={line.name} fill className="object-cover" sizes="80px" />
                      </Link>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <Link href={`/produto/${line.slug}`} onClick={closeCart} className="font-display text-lg leading-tight text-ink">
                              {line.name}
                            </Link>
                            <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-stone">Tamanho {line.size}</p>
                          </div>
                          <p className="text-sm text-ink">{formatBRL(line.priceCents * line.quantity)}</p>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="inline-flex items-center border border-ink/15">
                            <button
                              type="button"
                              className="size-10 text-sm"
                              aria-label="Diminuir quantidade"
                              onClick={() => updateQuantity(line.id, line.quantity - 1)}
                            >
                              −
                            </button>
                            <span className="w-8 text-center text-sm">{line.quantity}</span>
                            <button
                              type="button"
                              className="size-10 text-sm"
                              aria-label="Aumentar quantidade"
                              onClick={() => updateQuantity(line.id, line.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                          <button type="button" onClick={() => removeItem(line.id)} className="inline-flex min-h-11 items-center text-[11px] uppercase tracking-[0.18em] text-stone">
                            Remover
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-ink/10 px-6 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
                  <p className={cn("text-xs text-stone", remaining === 0 && "text-ink")}>
                    {remaining === 0
                      ? "Frete grátis liberado nesta demonstração."
                      : `Faltam ${formatBRL(remaining)} para o frete grátis.`}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-stone">Subtotal</span>
                    <span className="font-display text-2xl font-light">{formatBRL(subtotalCents)}</span>
                  </div>
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="mt-5 flex w-full items-center justify-center bg-ink px-6 py-4 text-[11px] uppercase tracking-[0.22em] text-ivory"
                  >
                    Checkout Felizzi
                  </Link>
                  <div className="mt-3">
                    <ShopifyCheckoutButton onNavigate={closeCart} />
                  </div>
                  <Link
                    href="/carrinho"
                    onClick={closeCart}
                    className="mt-3 flex w-full items-center justify-center text-[11px] uppercase tracking-[0.2em] text-stone"
                  >
                    Ver sacola
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
