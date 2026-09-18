import type { Metadata } from "next";
import { ShopifyCartConfirmation } from "@/components/commerce/ShopifyCartConfirmation";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { getShopifyShop } from "@/lib/shopify/storefront";

export const metadata: Metadata = {
  title: "Carrinho Shopify",
  description: "Carrinho criado na Storefront API da Shopify, em modo demonstração.",
  alternates: { canonical: "/checkout/shopify" },
};

export default async function ShopifyCheckoutPage() {
  const shop = await getShopifyShop().catch(() => null);

  return (
    <main id="conteudo">
      <PageHero
        kicker="Shopify Storefront"
        title="Carrinho criado"
        subtitle="A sacola Felizzi virou um cartCreate na Shopify. Nenhuma cobrança real."
      />
      <Container className="pb-24">
        <ShopifyCartConfirmation
          shopName={shop?.name ?? "Shopify"}
          shopDomain={shop?.domain ?? "apparel-plus.mock.shop"}
          hydrogenUrl={shop?.hydrogenUrl ?? "https://apparel-plus.hydrogen.mock.shop"}
        />
      </Container>
    </main>
  );
}
