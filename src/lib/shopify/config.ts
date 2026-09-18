export type ShopifyMode = "live" | "demo";

export type ShopifyConfig = {
  mode: ShopifyMode;
  domain: string;
  endpoint: string;
  token?: string;
  apiVersion: string;
};

const API_VERSION = process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION?.trim() || "2025-01";

export function getShopifyConfig(): ShopifyConfig {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN?.trim() || "apparel-plus.mock.shop";
  const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN?.trim();
  const isMock = domain === "mock.shop" || domain.endsWith(".mock.shop");
  const isLive = Boolean(!isMock && token);

  return {
    mode: isLive ? "live" : "demo",
    domain,
    endpoint: isMock
      ? `https://${domain}/api`
      : `https://${domain}/api/${API_VERSION}/graphql.json`,
    token: token || (isMock ? "public" : undefined),
    apiVersion: API_VERSION,
  };
}

export function isShopifyDemo() {
  return getShopifyConfig().mode === "demo";
}
