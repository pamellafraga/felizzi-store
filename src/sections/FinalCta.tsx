import Image from "next/image";
import { Button } from "@/components/Button";
import { clinic } from "@/data/clinic";
import { images } from "@/data/images";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export function FinalCta() {
  return (
    <section className="relative isolate min-h-[72vh] overflow-hidden bg-ink text-snow">
      <Image
        src={images.cta}
        alt="Cão e gato descansando juntos em um ambiente aconchegante"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/45 to-ink/20" />
      <div className="relative mx-auto flex min-h-[72vh] max-w-[1440px] items-end px-5 py-20 sm:px-8 lg:px-12">
        <div className="max-w-xl">
          <p className="text-[11px] uppercase tracking-[0.32em] text-blush">Agendamento</p>
          <h2 className="mt-5 font-display text-5xl leading-[0.95] sm:text-7xl">
            Seu pet merece
            <br />
            o melhor.
          </h2>
          <p className="mt-6 max-w-md text-lg text-snow/80">
            Agende uma consulta e venha conhecer nosso espaço.
          </p>
          <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">
            <Button href={getWhatsAppUrl()} variant="frost">
              Agendar consulta
            </Button>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm tracking-wide text-champagne"
            >
              WhatsApp {clinic.phones.whatsapp}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
