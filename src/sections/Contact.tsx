import { Mail, MapPin, Phone } from "lucide-react";
import { InstagramIcon } from "@/components/InstagramIcon";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { clinic } from "@/data/clinic";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const contacts = [
  {
    label: "Telefone",
    value: clinic.phones.landline,
    href: `tel:${clinic.phones.landlineTel}`,
    icon: Phone,
  },
  {
    label: "WhatsApp",
    value: clinic.phones.whatsapp,
    href: getWhatsAppUrl(),
    icon: Phone,
  },
  {
    label: "E-mail",
    value: clinic.email,
    href: `mailto:${clinic.email}`,
    icon: Mail,
  },
  {
    label: "Endereço",
    value: clinic.address.full,
    href: clinic.mapsUrl,
    icon: MapPin,
  },
  {
    label: "Instagram",
    value: clinic.instagram.handle,
    href: clinic.instagram.url,
    icon: InstagramIcon,
  },
];

export function Contact() {
  return (
    <section id="contato" className="scroll-mt-24 bg-snow py-24 lg:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.32em] text-rose">Contato</p>
            <h2 className="mt-5 font-display text-[2.6rem] font-medium leading-[1.05] text-ink sm:text-5xl lg:text-[3.6rem]">
              Vamos cuidar de quem você ama?
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-charcoal/70">
              Fale conosco para agendar uma consulta no Jardim Botânico, em Porto Alegre.
            </p>
            <div className="mt-10">
              <Button href={getWhatsAppUrl()}>Falar pelo WhatsApp</Button>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="divide-y divide-ink/10 border-y border-ink/10">
              {contacts.map((item) => (
                <li key={item.label} className="flex items-start gap-4 py-5">
                  <item.icon className="mt-1 size-4 text-rose" aria-hidden />
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.24em] text-charcoal/50">
                      {item.label}
                    </p>
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="mt-1 block text-lg text-ink transition-colors hover:text-rose"
                    >
                      {item.value}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="mt-16 overflow-hidden border border-ink/8">
          <iframe
            title="Mapa do consultório no Jardim Botânico, Porto Alegre"
            src={clinic.mapsEmbed}
            className="h-[360px] w-full grayscale contrast-[0.95]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Reveal>
      </Container>
    </section>
  );
}
