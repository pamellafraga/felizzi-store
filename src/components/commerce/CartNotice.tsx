"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/components/commerce/CartProvider";

export function CartNotice() {
  const { notice, isOpen, clearNotice } = useCart();

  useEffect(() => {
    if (!notice) return;
    const id = window.setTimeout(clearNotice, 2600);
    return () => window.clearTimeout(id);
  }, [clearNotice, notice]);

  return (
    <AnimatePresence>
      {notice && !isOpen ? (
        <motion.p
          role="status"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          className="pointer-events-none fixed bottom-24 left-1/2 z-[95] -translate-x-1/2 bg-espresso px-5 py-3 text-[11px] uppercase tracking-[0.18em] text-ivory md:bottom-6"
        >
          {notice}
        </motion.p>
      ) : null}
    </AnimatePresence>
  );
}
