"use client";

import { WhatsAppIcon } from "@/components/ui/Icons";
import { site } from "@/data/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export function WhatsAppButton() {
  const href = getWhatsAppUrl() ?? site.social.instagram.href;
  const viaWhatsApp = Boolean(getWhatsAppUrl());

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={viaWhatsApp ? "Falar no WhatsApp" : "Falar com a Felizzi"}
      className="group fixed bottom-24 right-4 z-[72] flex size-14 items-center justify-center rounded-full bg-[#1f7a4d] text-ivory shadow-[0_18px_40px_-18px_rgb(31_122_77_/_0.9)] transition-transform duration-500 hover:scale-105 md:bottom-8 md:right-6"
    >
      <WhatsAppIcon className="h-[1.35rem] w-[1.35rem]" />
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap bg-espresso px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-ivory opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:block">
        WhatsApp
      </span>
    </a>
  );
}
