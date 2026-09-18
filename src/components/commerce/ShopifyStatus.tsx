import { getShopifyShop } from "@/lib/shopify/storefront";
import { cn } from "@/lib/cn";

export async function ShopifyStatus({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const shop = await getShopifyShop().catch(() => null);
  const className = cn(
    "text-[11px] uppercase tracking-[0.18em]",
    tone === "light" ? "text-ivory/40" : "text-stone",
  );

  if (!shop) {
    return <p className={className}>Shopify Storefront indisponível</p>;
  }

  return (
    <p className={className}>
      Storefront Shopify ligada · {shop.name} · {shop.domain} · {shop.mode === "demo" ? "demo" : "live"}
    </p>
  );
}
