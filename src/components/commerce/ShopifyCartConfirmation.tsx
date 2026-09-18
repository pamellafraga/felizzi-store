"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SHOPIFY_CART_STORAGE_KEY } from "@/lib/shopify/session";
import type { ShopifyCart } from "@/lib/shopify/types";

function readStoredCart() {
  try {
    const raw = window.sessionStorage.getItem(SHOPIFY_CART_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ShopifyCart;
  } catch {
    return null;
  }
}

export function ShopifyCartConfirmation({
  shopName,
  shopDomain,
  hydrogenUrl,
}: {
  shopName: string;
  shopDomain: string;
  hydrogenUrl: string;
}) {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = readStoredCart();
    if (!stored?.id) {
      setReady(true);
      return;
    }
    setCart(stored);

    void fetch(`/api/shopify/cart?id=${encodeURIComponent(stored.id)}`)
      .then(async (response) => {
        const payload = (await response.json()) as ShopifyCart & { error?: string };
        if (!response.ok) throw new Error(payload.error ?? "Falha ao ler o carrinho Shopify.");
        window.sessionStorage.setItem(SHOPIFY_CART_STORAGE_KEY, JSON.stringify(payload));
        setCart(payload);
      })
      .catch((caught: unknown) => {
        setError(caught instanceof Error ? caught.message : "Carrinho Shopify indisponível.");
      })
      .finally(() => setReady(true));
  }, []);

  if (!ready) {
    return <p className="text-sm text-stone">Consultando a Storefront Shopify…</p>;
  }

  if (!cart) {
    return (
      <div className="max-w-xl">
        <p className="font-display text-3xl font-light">Nenhum carrinho Shopify ainda.</p>
        <p className="mt-4 text-sm leading-relaxed text-stone">
          Adicione uma peça à sacola Felizzi e use Checkout Shopify. A Storefront cria um cartCreate com as variantes
          reais desta demo.
        </p>
        <Link href="/novidades" className="mt-8 inline-flex bg-ink px-8 py-3.5 text-[11px] uppercase tracking-[0.22em] text-ivory">
          Ir às novidades
        </Link>
      </div>
    );
  }

  const total = cart.cost.totalAmount;

  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <div className="lg:col-span-8">
        <p className="text-[11px] uppercase tracking-[0.22em] text-stone">
          Storefront ligada · {shopName} · {shopDomain}
        </p>
        <ul className="mt-8 space-y-8">
          {cart.lines.nodes.map((line) => (
            <li key={line.id} className="grid grid-cols-[96px_1fr] gap-5 border-b border-ink/10 pb-8">
              <div className="relative aspect-[3/4] overflow-hidden bg-sand">
                {line.merchandise.product.featuredImage?.url ? (
                  <Image
                    src={line.merchandise.product.featuredImage.url}
                    alt={line.merchandise.product.featuredImage.altText ?? line.merchandise.product.title}
                    fill
                    className="object-cover"
                    sizes="96px"
                    unoptimized
                  />
                ) : null}
              </div>
              <div>
                <p className="font-display text-2xl font-light text-ink">{line.merchandise.product.title}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-stone">
                  {line.merchandise.title} · qty {line.quantity}
                </p>
                <p className="mt-4 text-sm text-stone">
                  {line.cost.totalAmount.currencyCode} {Number(line.cost.totalAmount.amount).toFixed(2)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <aside className="border border-ink/10 p-6 lg:col-span-4 lg:p-8">
        <p className="text-[11px] uppercase tracking-[0.22em] text-stone">Carrinho Shopify</p>
        <p className="mt-6 font-display text-3xl font-light">
          {total.currencyCode} {Number(total.amount).toFixed(2)}
        </p>
        <p className="mt-2 text-sm text-stone">{cart.totalQuantity} {cart.totalQuantity === 1 ? "peça" : "peças"}</p>
        <p className="mt-6 break-all text-[11px] leading-relaxed text-stone">id {cart.id}</p>
        <p className="mt-6 text-xs leading-relaxed text-stone">
          O checkout hospedado desta loja demo Shopify não carrega o carrinho. A Storefront API criou o cart — as linhas
          acima vêm da Shopify. Para pagar nesta boutique, siga no checkout Felizzi (PIX e retirada).
        </p>
        {error ? (
          <p role="alert" className="mt-4 text-xs text-[#7a3b32]">
            {error}
          </p>
        ) : null}
        <Link href="/checkout" className="mt-8 flex w-full items-center justify-center bg-ink py-4 text-[11px] uppercase tracking-[0.22em] text-ivory">
          Checkout Felizzi
        </Link>
        <a
          href={hydrogenUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex w-full items-center justify-center border border-ink py-4 text-[11px] uppercase tracking-[0.22em] text-ink"
        >
          Abrir vitrine Shopify
        </a>
      </aside>
    </div>
  );
}
