import type { Metadata } from "next";
import { CartView } from "@/components/commerce/CartView";
import { ShopifyStatus } from "@/components/commerce/ShopifyStatus";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Sacola",
  description: "Sua sacola Felizzi. Checkout em demonstração Shopify.",
  alternates: { canonical: "/carrinho" },
};

export default function CarrinhoPage() {
  return (
    <main id="conteudo">
      <PageHero kicker="Shopify demo" title="Sacola" subtitle="Revise as peças antes de finalizar." />
      <Container className="pb-28 lg:pb-24">
        <div className="mb-10">
          <ShopifyStatus />
        </div>
        <CartView />
      </Container>
    </main>
  );
}
