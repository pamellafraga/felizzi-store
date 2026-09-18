"use client";

import { CartDrawer } from "@/components/commerce/CartDrawer";
import { CartNotice } from "@/components/commerce/CartNotice";
import { CartProvider } from "@/components/commerce/CartProvider";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartDrawer />
      <CartNotice />
    </CartProvider>
  );
}
