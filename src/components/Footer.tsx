import { InstagramIcon } from "@/components/InstagramIcon";
import { clinic } from "@/data/clinic";
import { navigation } from "@/data/navigation";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-ink text-snow">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-12 lg:py-24">
        <div>
          <Logo tone="light" />
          <p className="mt-8 max-w-sm font-display text-2xl leading-snug text-snow/90 italic">
            {clinic.tagline}
          </p>
          <p className="mt-5 text-sm tracking-wide text-champagne/70">
            {clinic.concept}
          </p>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-blush">Menu</p>
          <ul className="mt-6 space-y-3">
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-sm text-snow/75 transition-colors hover:text-snow">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-blush">Contato</p>
          <ul className="mt-6 space-y-3 text-sm text-snow/75">
            <li>
              <a href={`tel:${clinic.phones.landlineTel}`} className="hover:text-snow">
                {clinic.phones.landline}
              </a>
            </li>
            <li>
              <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-snow">
                WhatsApp {clinic.phones.whatsapp}
              </a>
            </li>
            <li>
              <a href={`mailto:${clinic.email}`} className="hover:text-snow">
                {clinic.email}
              </a>
            </li>
            <li className="max-w-[220px] leading-relaxed">{clinic.address.full}</li>
            <li>
              <a
                href={clinic.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-snow"
              >
                <InstagramIcon className="size-4" />
                {clinic.instagram.handle}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-5 py-6 text-xs tracking-wide text-champagne/55 sm:flex-row sm:justify-between sm:px-8 lg:px-12">
          <p>© 2026 {clinic.name}</p>
          <p>Todos os direitos reservados.</p>
          <p>{clinic.registry}</p>
        </div>
      </div>
    </footer>
  );
}
