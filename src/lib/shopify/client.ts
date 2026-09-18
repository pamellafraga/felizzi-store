import { getShopifyConfig } from "@/lib/shopify/config";

type ShopifyResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

export async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>) {
  const config = getShopifyConfig();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (config.token) {
    headers["X-Shopify-Storefront-Access-Token"] = config.token;
  }

  const response = await fetch(config.endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
    signal: AbortSignal.timeout(20000),
  });

  if (!response.ok) {
    throw new Error(`Shopify Storefront ${response.status}`);
  }

  const json = (await response.json()) as ShopifyResponse<T>;
  if (json.errors?.length) {
    throw new Error(json.errors.map((item) => item.message).join("; "));
  }
  if (!json.data) {
    throw new Error("Shopify Storefront sem dados.");
  }
  return json.data;
}
