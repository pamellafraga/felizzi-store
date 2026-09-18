"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { PlacedOrder } from "@/types/catalog";
import { formatBRL } from "@/lib/money";
import { commerce } from "@/data/commerce";

export function OrderConfirmation({ id }: { id: string }) {
  const [order, setOrder] = useState<PlacedOrder | null | undefined>(undefined);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const raw = sessionStorage.getItem("felizzi.order");
      if (!raw) {
        setOrder(null);
        return;
      }
      try {
        const parsed = JSON.parse(raw) as PlacedOrder;
        setOrder(parsed.id === id ? parsed : null);
      } catch {
        setOrder(null);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, [id]);

  if (order === undefined) {
    return (
      <div className="py-20 text-center">
        <p className="font-display text-3xl font-light">Carregando pedido…</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="py-20 text-center">
        <p className="font-display text-3xl font-light">Pedido não encontrado nesta sessão.</p>
        <Link href="/novidades" className="mt-8 inline-flex text-[11px] uppercase tracking-[0.22em]">
          Ir às novidades
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl py-6">
      <p className="text-[11px] uppercase tracking-[0.28em] text-stone">Pedido confirmado · demo</p>
      <h1 className="mt-4 font-display text-5xl font-light text-ink">{order.id}</h1>
      <p className="mt-4 text-sm leading-relaxed text-stone">{commerce.demoNote}</p>
      <p className="mt-6 text-sm text-graphite">
        {order.name} · {order.email}
      </p>
      <p className="mt-2 text-sm text-stone">{order.addressLabel}</p>
      <ul className="mt-10 space-y-3 border-t border-ink/10 pt-6">
        {order.lines.map((line) => (
          <li key={line.id} className="flex justify-between text-sm">
            <span>
              {line.name} · {line.size} × {line.quantity}
            </span>
            <span>{formatBRL(line.priceCents * line.quantity)}</span>
          </li>
        ))}
      </ul>
      <p className="mt-6 flex justify-between font-display text-3xl font-light">
        <span>Total</span>
        <span>{formatBRL(order.totalCents)}</span>
      </p>
      {order.pixCode ? (
        <div className="mt-10 border border-ink/10 p-6">
          <p className="text-[11px] uppercase tracking-[0.2em] text-stone">PIX demonstração</p>
          <p className="mt-3 break-all font-mono text-sm">{order.pixCode}</p>
          <button
            type="button"
            className="mt-4 text-[11px] uppercase tracking-[0.18em] text-ink"
            onClick={() => void navigator.clipboard.writeText(order.pixCode ?? "")}
          >
            Copiar código
          </button>
          <p className="mt-3 text-xs text-stone">Código ilustrativo. Nenhuma transação é processada. Chave: {commerce.pixKey}</p>
        </div>
      ) : null}
      <Link href="/novidades" className="mt-10 inline-flex bg-ink px-8 py-3.5 text-[11px] uppercase tracking-[0.22em] text-ivory">
        Continuar na boutique
      </Link>
    </div>
  );
}
