"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { CartLine, Product, ProductSize } from "@/types/catalog";
import { getVariant } from "@/data/products";

const STORAGE_KEY = "felizzi.cart.v3";

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotalCents: number;
  isOpen: boolean;
  notice: string | null;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, size: ProductSize, quantity?: number) => { ok: boolean; message: string };
  updateQuantity: (lineId: string, quantity: number) => void;
  removeItem: (lineId: string) => void;
  clear: () => void;
  clearNotice: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function readStored(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => {
      setLines(readStored());
      setReady(true);
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, ready]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const clearNotice = useCallback(() => setNotice(null), []);

  const addItem = useCallback((product: Product, size: ProductSize, quantity = 1) => {
    const variant = getVariant(product, size);
    if (!variant) return { ok: false, message: "Selecione um tamanho." };
    if (!variant.available) return { ok: false, message: "Este tamanho está indisponível." };

    setLines((current) => {
      const existing = current.find((line) => line.variantId === variant.id);
      if (existing) {
        return current.map((line) =>
          line.id === existing.id ? { ...line, quantity: Math.min(line.quantity + quantity, 8) } : line,
        );
      }
      const next: CartLine = {
        id: `${variant.id}-${Date.now()}`,
        productId: product.id,
        variantId: variant.id,
        slug: product.slug,
        name: product.name,
        image: product.image,
        size,
        quantity,
        priceCents: product.priceCents,
        sku: variant.sku,
      };
      return [...current, next];
    });
    setNotice(`${product.name} · ${size} na sacola`);
    setIsOpen(true);
    return { ok: true, message: "Adicionado à sacola." };
  }, []);

  const updateQuantity = useCallback((lineId: string, quantity: number) => {
    setLines((current) => {
      if (quantity < 1) return current.filter((line) => line.id !== lineId);
      return current.map((line) =>
        line.id === lineId ? { ...line, quantity: Math.min(quantity, 8) } : line,
      );
    });
  }, []);

  const removeItem = useCallback((lineId: string) => {
    setLines((current) => current.filter((line) => line.id !== lineId));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      count: lines.reduce((sum, line) => sum + line.quantity, 0),
      subtotalCents: lines.reduce((sum, line) => sum + line.priceCents * line.quantity, 0),
      isOpen,
      notice,
      openCart,
      closeCart,
      addItem,
      updateQuantity,
      removeItem,
      clear,
      clearNotice,
    }),
    [addItem, clear, clearNotice, closeCart, isOpen, lines, notice, openCart, removeItem, updateQuantity],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
