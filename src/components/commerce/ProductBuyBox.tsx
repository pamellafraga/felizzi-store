"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/components/commerce/CartProvider";
import type { Product, ProductSize } from "@/types/catalog";
import { commerce } from "@/data/commerce";
import { formatBRL, formatCep, parseDigits } from "@/lib/money";
import { lookupCep } from "@/lib/cep";
import { shippingCents } from "@/data/commerce";
import { cn } from "@/lib/cn";

export function ProductBuyBox({ product }: { product: Product }) {
  const { addItem } = useCart();
  const firstAvailable = product.variants.find((item) => item.available);
  const [size, setSize] = useState<ProductSize | null>(firstAvailable?.size ?? null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [cep, setCep] = useState("");
  const [freight, setFreight] = useState<string | null>(null);
  const [cepLoading, setCepLoading] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const selected = product.variants.find((item) => item.size === size);

  function onAdd() {
    if (!size) {
      setError("Escolha um tamanho para continuar.");
      return;
    }
    const result = addItem(product, size, quantity);
    setError(result.ok ? "" : result.message);
  }

  async function onCep() {
    if (parseDigits(cep).length !== 8) {
      setFreight("Digite um CEP com oito dígitos.");
      return;
    }
    setCepLoading(true);
    const address = await lookupCep(cep);
    setCepLoading(false);
    if (!address) {
      setFreight("CEP não encontrado. Confira os oito dígitos.");
      return;
    }
    const value = shippingCents(address.state, "delivery");
    setFreight(
      `${address.city}/${address.state} · ${value === 0 ? "Frete grátis" : formatBRL(value)} nesta demonstração.`,
    );
  }

  useEffect(() => {
    const sticky = document.getElementById("buy-sticky");
    if (!sticky) return;
    const onScroll = () => {
      sticky.dataset.show = window.scrollY > 520 ? "true" : "false";
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div>
      <p className="font-display text-3xl font-light text-ink">{formatBRL(product.priceCents)}</p>
      <p className="mt-2 text-xs text-stone">Preço Felizzi · variante Shopify Storefront</p>

      <fieldset className="mt-8">
        <legend className="text-[11px] uppercase tracking-[0.22em] text-stone">Tamanho</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {product.variants.map((variant) => (
            <button
              key={variant.id}
              type="button"
              disabled={!variant.available}
              onClick={() => {
                setSize(variant.size);
                setError("");
              }}
              className={cn(
                "min-w-12 border px-3 py-2 text-[12px] uppercase tracking-[0.16em] transition-colors",
                size === variant.size ? "border-ink bg-ink text-ivory" : "border-ink/20 text-ink",
                !variant.available && "cursor-not-allowed opacity-35 line-through",
              )}
            >
              {variant.size}
            </button>
          ))}
        </div>
        <button type="button" onClick={() => setGuideOpen((value) => !value)} className="mt-3 text-[11px] uppercase tracking-[0.18em] text-stone">
          {guideOpen ? "Fechar guia" : "Guia de medidas"}
        </button>
        {guideOpen ? (
          <table className="mt-4 w-full text-left text-xs text-stone">
            <thead>
              <tr className="uppercase tracking-[0.14em]">
                <th className="py-2 font-medium">Tam.</th>
                <th className="font-medium">Busto</th>
                <th className="font-medium">Cintura</th>
                <th className="font-medium">Quadril</th>
              </tr>
            </thead>
            <tbody>
              {commerce.sizeGuide.map((row) => (
                <tr key={row.size} className="border-t border-ink/10">
                  <td className="py-2 text-ink">{row.size}</td>
                  <td>{row.bust}</td>
                  <td>{row.waist}</td>
                  <td>{row.hip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </fieldset>

      <div className="mt-6 flex items-center gap-4">
        <div className="inline-flex items-center border border-ink/15">
          <button type="button" className="size-10" aria-label="Diminuir" onClick={() => setQuantity((value) => Math.max(1, value - 1))}>
            −
          </button>
          <span className="w-8 text-center">{quantity}</span>
          <button type="button" className="size-10" aria-label="Aumentar" onClick={() => setQuantity((value) => Math.min(8, value + 1))}>
            +
          </button>
        </div>
        {selected ? (
          <p className="text-xs text-stone">{selected.available ? `SKU ${selected.sku}` : "Indisponível"}</p>
        ) : null}
      </div>

      <button
        type="button"
        onClick={onAdd}
        className="mt-8 w-full bg-ink px-6 py-4 text-[11px] uppercase tracking-[0.22em] text-ivory transition-colors hover:bg-graphite"
      >
        Adicionar à sacola
      </button>
      {error ? (
        <p role="alert" className="mt-3 text-sm text-[#7a3b32]">
          {error}
        </p>
      ) : null}

      <div className="mt-10 border-t border-ink/10 pt-8">
        <p className="text-[11px] uppercase tracking-[0.22em] text-stone">Calcular entrega</p>
        <div className="mt-3 flex gap-2">
          <input
            value={cep}
            onChange={(event) => setCep(formatCep(event.target.value))}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                void onCep();
              }
            }}
            inputMode="numeric"
            placeholder="00000-000"
            aria-label="CEP"
            className="w-full border-b border-ink/20 bg-transparent py-2 outline-none"
          />
          <button type="button" onClick={() => void onCep()} className="shrink-0 text-[11px] uppercase tracking-[0.18em]">
            {cepLoading ? "…" : "OK"}
          </button>
        </div>
        {freight ? <p className="mt-3 text-sm text-stone">{freight}</p> : <p className="mt-3 text-sm text-stone">Retire na loja em Petrópolis ou receba em casa.</p>}
      </div>

      <div
        id="buy-sticky"
        data-show="false"
        className="fixed inset-x-0 bottom-0 z-[70] border-t border-ink/10 bg-ivory/95 p-3 backdrop-blur transition-transform duration-300 md:hidden data-[show=false]:translate-y-full"
      >
        <button type="button" onClick={onAdd} className="w-full bg-ink py-3.5 text-[11px] uppercase tracking-[0.2em] text-ivory">
          Adicionar · {formatBRL(product.priceCents)}
        </button>
      </div>
    </div>
  );
}
