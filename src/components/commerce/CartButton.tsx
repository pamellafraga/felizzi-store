"use client";

import { useCart } from "@/components/commerce/CartProvider";
import { BagIcon } from "@/components/ui/BagIcon";
import { cn } from "@/lib/cn";

export function CartButton({ inverted = false }: { inverted?: boolean }) {
  const { count, openCart } = useCart();

  return (
    <button type="button" onClick={openCart} className="relative inline-flex size-11 items-center justify-center" aria-label={`Sacola, ${count} ${count === 1 ? "item" : "itens"}`}>
      <BagIcon className="h-4 w-4" />
      {count > 0 ? (
        <span
          className={cn(
            "absolute right-1 top-1 min-w-4 rounded-full px-1 text-[9px] leading-4",
            inverted ? "bg-ivory text-ink" : "bg-ink text-ivory",
          )}
        >
          {count}
        </span>
      ) : null}
    </button>
  );
}
