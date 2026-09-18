import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getShopifyShop } from "@/lib/shopify/storefront";

export async function ShopifyBar() {
  const shop = await getShopifyShop().catch(() => null);

  return (
    <section className="border-y border-ink/10 bg-sand" aria-label="Shopify Storefront">
      <Container className="flex flex-col items-center justify-between gap-3 py-4 text-center sm:flex-row sm:text-left">
        <p className="text-[11px] uppercase tracking-[0.22em] text-stone">
          {shop
            ? `Shopify Storefront ligada · ${shop.name} · ${shop.domain}`
            : "Shopify Storefront indisponível"}
        </p>
        <Link href="/novidades" className="text-[11px] uppercase tracking-[0.22em] text-ink">
          Comprar agora
        </Link>
      </Container>
    </section>
  );
}
