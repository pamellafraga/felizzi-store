import type { Metadata } from "next";
import { CatalogFilters } from "@/components/catalog/CatalogFilters";
import { ShopifyBar } from "@/components/commerce/ShopifyBar";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Novidades",
  description: "A curadoria recente da Felizzi Store. Peças para acompanhar o seu momento.",
  alternates: { canonical: "/novidades" },
};

export default function NovidadesPage() {
  return (
    <main id="conteudo">
      <PageHero
        kicker="Catálogo"
        title="Novidades"
        subtitle="Uma seleção para vestir o seu momento — com checkout em demonstração Shopify."
      />
      <ShopifyBar />
      <Container className="pb-24 lg:pb-32">
        <CatalogFilters />
      </Container>
    </main>
  );
}
