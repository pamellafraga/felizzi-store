"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/components/commerce/CartProvider";
import { SHOPIFY_CART_STORAGE_KEY } from "@/lib/shopify/session";
import { cn } from "@/lib/cn";
import type { ShopifyCart } from "@/lib/shopify/types";

export function ShopifyCheckoutButton({
  className,
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  const { lines } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function openShopify() {
    if (lines.length === 0) return;
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/shopify/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lines: lines.map((line) => ({
            merchandiseId: line.variantId,
            quantity: line.quantity,
          })),
        }),
      });
      const payload = (await response.json()) as ShopifyCart & { error?: string };
      if (!response.ok || !payload.id) {
        throw new Error(payload.error ?? "Shopify não devolveu o carrinho.");
      }
      window.sessionStorage.setItem(SHOPIFY_CART_STORAGE_KEY, JSON.stringify(payload));
      onNavigate?.();
      router.push("/checkout/shopify");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Não foi possível abrir o Shopify.");
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => void openShopify()}
        disabled={loading || lines.length === 0}
        className={cn(
          "flex w-full items-center justify-center border border-ink px-6 py-4 text-[11px] uppercase tracking-[0.22em] text-ink transition-colors hover:bg-ink hover:text-ivory disabled:opacity-40",
          className,
        )}
      >
        {loading ? "Criando carrinho Shopify…" : "Checkout Shopify"}
      </button>
      {error ? (
        <p role="alert" className="mt-3 text-xs leading-relaxed text-[#7a3b32]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
