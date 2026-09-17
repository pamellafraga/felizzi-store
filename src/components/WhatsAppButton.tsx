"use client";

import { MessageCircle } from "lucide-react";
import { clinic } from "@/data/clinic";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export function WhatsAppButton() {
  return (
    <a
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Falar pelo WhatsApp ${clinic.phones.whatsapp}`}
      className="fixed bottom-6 right-5 z-40 flex size-14 items-center justify-center rounded-full bg-ink text-snow shadow-[0_18px_40px_-18px_rgba(17,17,17,0.7)] transition-transform duration-500 hover:scale-105 hover:bg-rose"
    >
      <MessageCircle className="size-6" aria-hidden />
    </a>
  );
}
