import type { Metadata } from "next";
import { CheckoutExperience } from "@/components/commerce/CheckoutExperience";
import { ShopifyStatus } from "@/components/commerce/ShopifyStatus";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Finalize sua compra Felizzi. Checkout em demonstração Shopify.",
  alternates: { canonical: "/checkout" },
};

export default function CheckoutPage() {
  return (
    <main id="conteudo">
      <PageHero
        kicker="Checkout"
        title="Finalizar"
        subtitle="Checkout Felizzi (PIX e retirada) ou checkout Shopify Storefront."
      />
      <Container className="pb-28 lg:pb-24">
        <div className="mb-10">
          <ShopifyStatus />
        </div>
        <CheckoutExperience />
      </Container>
    </main>
  );
}
