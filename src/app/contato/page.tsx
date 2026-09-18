import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { formatAddress, site } from "@/data/site";
import { getPrimaryContactHref, getPrimaryContactLabel } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com a Felizzi Store em Porto Alegre. WhatsApp, Instagram ou mensagem.",
  alternates: { canonical: "/contato" },
};

export default function ContatoPage() {
  return (
    <main id="conteudo">
      <PageHero
        kicker="Atendimento"
        title="Contato"
        subtitle="A conversa continua sendo o jeito Felizzi de receber."
      />
      <Container className="grid gap-12 pb-24 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="font-display text-3xl font-light italic text-graphite">“Fale com a Felizzi e descubra mais.”</p>
          <p className="mt-8 whitespace-pre-line text-sm leading-relaxed text-stone">{formatAddress(true)}</p>
          <p className="mt-6 text-sm text-stone">{site.social.instagram.handle}</p>
          <div className="mt-10">
            <Button href={getPrimaryContactHref()} external>
              {getPrimaryContactLabel()}
            </Button>
          </div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <ContactForm />
        </div>
      </Container>
    </main>
  );
}
