"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { navigation } from "@/data/site";
import { site } from "@/data/site";
import { hasWhatsApp, getPrimaryContactHref } from "@/lib/whatsapp";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id="menu-mobile"
          className="fixed inset-0 z-[60] marble"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex h-full flex-col px-6 pb-10 pt-24">
            <nav aria-label="Menu mobile" className="flex flex-1 flex-col justify-center gap-1">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * index, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="block border-b border-ink/10 py-4 font-display text-4xl font-light tracking-tight text-ink"
                    aria-current={pathname === item.href ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="space-y-4 pt-8">
              <Link
                href="/carrinho"
                onClick={onClose}
                className="block text-[12px] uppercase tracking-[0.22em] text-ink"
              >
                Sacola
              </Link>
              <a
                href={getPrimaryContactHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[12px] uppercase tracking-[0.22em] text-ink"
              >
                WhatsApp
              </a>
              <a
                href={site.social.instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[12px] uppercase tracking-[0.22em] text-stone"
              >
                {site.social.instagram.handle}
              </a>
              {hasWhatsApp() ? <p className="text-sm text-stone">Atendimento pelo WhatsApp.</p> : null}
              <Logo />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
