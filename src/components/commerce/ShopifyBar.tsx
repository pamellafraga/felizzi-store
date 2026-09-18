import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getShopifyShop } from "@/lib/shopify/storefront";

export async function ShopifyBar() {
  const shop = await getShopifyShop().catch(() => null);

  return (
    <section className="border-y border-ink/10 bg-sand" aria-label="Shopify Storefront">
      <Container className="flex flex-col items-start justify-between gap-2 py-3 sm:flex-row sm:items-center sm:py-4 sm:text-left">
        <p className="max-w-full text-[11px] uppercase leading-relaxed tracking-[0.14em] text-stone sm:tracking-[0.22em]">
          {shop ? (
            <>
              Shopify · {shop.name}
              <span className="hidden sm:inline"> · {shop.domain}</span>
            </>
          ) : (
            "Shopify Storefront indisponível"
          )}
        </p>
        <Link
          href="/novidades"
          className="inline-flex min-h-11 items-center text-[11px] uppercase tracking-[0.22em] text-ink"
        >
          Comprar agora
        </Link>
      </Container>
    </section>
  );
}
