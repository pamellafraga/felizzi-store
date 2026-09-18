import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { ShopifyStatus } from "@/components/commerce/ShopifyStatus";
import { commerce } from "@/data/commerce";
import { formatBRL } from "@/lib/money";
import { formatAddress } from "@/data/site";

export const metadata: Metadata = {
  title: "Ajuda",
  description: "Frete, retirada, PIX e trocas da boutique Felizzi.",
  alternates: { canonical: "/ajuda" },
};

export default function AjudaPage() {
  return (
    <main id="conteudo">
      <PageHero kicker="Atendimento" title="Ajuda" subtitle="Compra, entrega, PIX e trocas — em modo demonstração Shopify." />
      <Container className="grid gap-12 pb-24 lg:grid-cols-2">
        <article>
          <h2 className="font-display text-3xl font-light">Entrega e retirada</h2>
          <p className="mt-4 text-sm leading-relaxed text-stone">
            Retirada gratuita na loja: {formatAddress()}. Entrega calculada por CEP (ViaCEP). Rio Grande do Sul:{" "}
            {formatBRL(commerce.rsShippingCents)}. Demais UFs: {formatBRL(commerce.otherShippingCents)}. Frete grátis a
            partir de {formatBRL(commerce.freeShippingCents)}.
          </p>
        </article>
        <article>
          <h2 className="font-display text-3xl font-light">Pagamento</h2>
          <p className="mt-4 text-sm leading-relaxed text-stone">
            PIX, cartão de demonstração ou pagamento na loja (quando a retirada é escolhida). Nenhuma cobrança real é
            feita. Chave PIX ilustrativa: {commerce.pixKey}.
          </p>
        </article>
        <article>
          <h2 className="font-display text-3xl font-light">Tamanhos</h2>
          <p className="mt-4 text-sm leading-relaxed text-stone">
            P, M, G e GG, com guia de medidas na ficha de cada peça. Alguns tamanhos podem aparecer como indisponíveis
            nesta curadoria.
          </p>
        </article>
        <article>
          <h2 className="font-display text-3xl font-light">Trocas</h2>
          <p className="mt-4 text-sm leading-relaxed text-stone">
            Espaço para a política oficial da Felizzi. Nesta demo, a troca pode ser combinada na loja física em
            Petrópolis.
          </p>
        </article>
        <div className="lg:col-span-2">
          <ShopifyStatus />
          <p className="mt-3 text-xs leading-relaxed text-stone">{commerce.demoNote}</p>
        </div>
      </Container>
    </main>
  );
}
