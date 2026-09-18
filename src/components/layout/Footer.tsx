import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { ShopifyStatus } from "@/components/commerce/ShopifyStatus";
import { footerNavigation, formatAddress, site } from "@/data/site";
import { getPrimaryContactHref, getPrimaryContactLabel } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="bg-espresso text-ivory">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr_0.8fr]">
          <div>
            <Logo tone="light" showWordmark markClassName="h-11 sm:h-12" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ivory/65">{site.tagline}</p>
            <p className="mt-6 whitespace-pre-line text-sm leading-relaxed text-ivory/55">{formatAddress(true)}</p>
          </div>
          <nav aria-label="Rodapé" className="grid grid-cols-2 gap-x-8 gap-y-3 self-start">
            {footerNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[11px] uppercase tracking-[0.22em] text-ivory/70 transition-colors hover:text-ivory"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-4">
            <a
              href={site.social.instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-ivory/75 hover:text-ivory"
            >
              <InstagramIcon className="h-4 w-4" />
              {site.social.instagram.handle}
            </a>
            <a
              href={getPrimaryContactHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-ivory/75 hover:text-ivory"
            >
              <WhatsAppIcon className="h-4 w-4" />
              {getPrimaryContactLabel()}
            </a>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-3 border-t border-ivory/10 pt-8 text-[11px] uppercase tracking-[0.18em] text-ivory/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {site.legalName}</p>
          <ShopifyStatus tone="light" />
          <p className="normal-case tracking-[0.08em]">{site.copy.xpress}</p>
        </div>
      </Container>
    </footer>
  );
}
