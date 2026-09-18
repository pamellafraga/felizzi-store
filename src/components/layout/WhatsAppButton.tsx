"use client";

import { usePathname } from "next/navigation";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { site } from "@/data/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

export function WhatsAppButton() {
  const href = getWhatsAppUrl() ?? site.social.instagram.href;
  const viaWhatsApp = Boolean(getWhatsAppUrl());
  const pathname = usePathname();
  const hideOnMobileCommerce =
    pathname.startsWith("/carrinho") || pathname.startsWith("/checkout") || pathname.startsWith("/pedido");

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={viaWhatsApp ? "Falar no WhatsApp" : "Falar com a Felizzi"}
      className={cn(
        "group fixed right-4 z-[55] size-12 items-center justify-center rounded-full bg-[#1f7a4d] text-ivory shadow-[0_18px_40px_-18px_rgb(31_122_77_/_0.9)] transition-transform duration-500 hover:scale-105 md:right-6 md:z-[72] md:size-14 [bottom:var(--fab-bottom)]",
        hideOnMobileCommerce ? "hidden md:flex" : "flex",
      )}
    >
      <WhatsAppIcon className="h-[1.35rem] w-[1.35rem]" />
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap bg-espresso px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-ivory opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:block">
        WhatsApp
      </span>
    </a>
  );
}
