import { ShopifyBar } from "@/components/commerce/ShopifyBar";
import { AFelizzi } from "@/components/sections/AFelizzi";
import { Curadoria } from "@/components/sections/Curadoria";
import { EditorialLooks } from "@/components/sections/EditorialLooks";
import { Hero } from "@/components/sections/Hero";
import { Instagram } from "@/components/sections/Instagram";
import { LojaFisica } from "@/components/sections/LojaFisica";
import { Manifesto } from "@/components/sections/Manifesto";
import { Novidades } from "@/components/sections/Novidades";
import { WhatsAppCta } from "@/components/sections/WhatsAppCta";

export default function Home() {
  return (
    <main id="conteudo">
      <Hero />
      <ShopifyBar />
      <Manifesto />
      <Novidades />
      <EditorialLooks />
      <Curadoria />
      <AFelizzi />
      <LojaFisica />
      <WhatsAppCta />
      <Instagram />
    </main>
  );
}
