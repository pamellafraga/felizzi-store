import { site } from "@/data/site";

export function getWhatsAppUrl(message: string = site.contact.whatsappMessage) {
  const number = (process.env.NEXT_PUBLIC_WHATSAPP_E164 ?? site.contact.whatsappE164).trim();
  if (!number) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function getPrimaryContactHref(message?: string) {
  return getWhatsAppUrl(message) ?? site.social.instagram.href;
}

export function getPrimaryContactLabel() {
  return site.copy.whatsappCta;
}

export function hasWhatsApp() {
  return Boolean((process.env.NEXT_PUBLIC_WHATSAPP_E164 ?? site.contact.whatsappE164).trim());
}
