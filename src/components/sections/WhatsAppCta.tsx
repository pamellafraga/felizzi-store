import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { site } from "@/data/site";
import { getPrimaryContactHref } from "@/lib/whatsapp";

export function WhatsAppCta() {
  return (
    <section className="bg-espresso py-16 text-center text-ivory lg:py-32" aria-labelledby="contato-rapido">
      <Container>
        <Reveal>
          <h2 id="contato-rapido" className="font-display text-4xl font-light tracking-tight sm:text-6xl lg:text-7xl">
            {site.copy.whatsappTitle}
          </h2>
          <p className="mx-auto mt-6 max-w-md font-display text-xl italic text-ivory/70">{site.copy.whatsappText}</p>
          <div className="mt-10">
            <Button href={getPrimaryContactHref()} variant="light" external className="min-w-0 w-full max-w-[280px] px-8 py-4 text-[12px] sm:min-w-[240px] sm:w-auto sm:px-10">
              <WhatsAppIcon className="h-4 w-4" />
              {site.copy.whatsappCta}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
