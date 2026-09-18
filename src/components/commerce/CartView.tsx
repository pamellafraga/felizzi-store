"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/commerce/CartProvider";
import { ShopifyCheckoutButton } from "@/components/commerce/ShopifyCheckoutButton";
import { formatBRL } from "@/lib/money";
import { commerce } from "@/data/commerce";

export function CartView() {
  const { lines, subtotalCents, updateQuantity, removeItem } = useCart();
  const remaining = Math.max(commerce.freeShippingCents - subtotalCents, 0);

  if (lines.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="font-display text-4xl font-light">Sua sacola está vazia.</p>
        <Link href="/novidades" className="mt-8 inline-flex bg-ink px-8 py-3.5 text-[11px] uppercase tracking-[0.22em] text-ivory">
          Continuar comprando
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <ul className="space-y-8 lg:col-span-8">
        {lines.map((line) => (
          <li key={line.id} className="grid grid-cols-[96px_1fr] gap-5 border-b border-ink/10 pb-8">
            <Link href={`/produto/${line.slug}`} className="relative aspect-[3/4] overflow-hidden bg-sand">
              <Image src={line.image} alt={line.name} fill className="object-cover" sizes="96px" />
            </Link>
            <div className="flex flex-col justify-between sm:flex-row sm:items-start">
              <div>
                <Link href={`/produto/${line.slug}`} className="font-display text-2xl font-light text-ink">
                  {line.name}
                </Link>
                <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-stone">Tamanho {line.size}</p>
                <div className="mt-4 inline-flex items-center border border-ink/15">
                  <button type="button" className="size-10" onClick={() => updateQuantity(line.id, line.quantity - 1)} aria-label="Diminuir">
                    −
                  </button>
                  <span className="w-8 text-center">{line.quantity}</span>
                  <button type="button" className="size-10" onClick={() => updateQuantity(line.id, line.quantity + 1)} aria-label="Aumentar">
                    +
                  </button>
                </div>
              </div>
              <div className="mt-4 text-right sm:mt-0">
                <p>{formatBRL(line.priceCents * line.quantity)}</p>
                <button type="button" onClick={() => removeItem(line.id)} className="mt-3 text-[11px] uppercase tracking-[0.18em] text-stone">
                  Remover
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <aside className="border border-ink/10 p-6 lg:col-span-4 lg:p-8">
        <p className="text-[11px] uppercase tracking-[0.22em] text-stone">Resumo</p>
        <p className="mt-6 text-sm text-stone">
          {remaining === 0 ? "Frete grátis liberado." : `Faltam ${formatBRL(remaining)} para o frete grátis.`}
        </p>
        <p className="mt-8 flex justify-between font-display text-3xl font-light">
          <span>Subtotal</span>
          <span>{formatBRL(subtotalCents)}</span>
        </p>
        <Link href="/checkout" className="mt-8 flex min-h-12 w-full items-center justify-center bg-ink py-4 text-[11px] uppercase tracking-[0.22em] text-ivory">
          Checkout Felizzi
        </Link>
        <div className="mt-3">
          <ShopifyCheckoutButton />
        </div>
        <Link href="/novidades" className="mt-4 flex w-full justify-center text-[11px] uppercase tracking-[0.2em] text-stone">
          Continuar comprando
        </Link>
      </aside>
    </div>
  );
}
