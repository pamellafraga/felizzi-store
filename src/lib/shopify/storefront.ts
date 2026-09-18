import { shopifyFetch } from "@/lib/shopify/client";
import { CART_CREATE, CART_LINES_ADD, CART_QUERY, PRODUCTS_QUERY, SHOP_QUERY } from "@/lib/shopify/queries";
import { getShopifyConfig } from "@/lib/shopify/config";
import type { ShopifyCart } from "@/lib/shopify/types";

type ShopData = {
  shop: { name: string; primaryDomain: { url: string } | null };
};

type CartPayload = {
  cartCreate?: {
    cart: ShopifyCart | null;
    userErrors: { message: string }[];
  };
  cartLinesAdd?: {
    cart: ShopifyCart | null;
    userErrors: { message: string }[];
  };
};

export function getShopifyHydrogenUrl() {
  const { domain } = getShopifyConfig();
  if (domain.endsWith(".mock.shop") && domain !== "mock.shop") {
    return `https://${domain.replace(".mock.shop", "")}.hydrogen.mock.shop`;
  }
  return `https://${domain}`;
}

export async function getShopifyShop() {
  const data = await shopifyFetch<ShopData>(SHOP_QUERY);
  return {
    name: data.shop.name,
    domain: getShopifyConfig().domain,
    url: data.shop.primaryDomain?.url ?? `https://${getShopifyConfig().domain}`,
    hydrogenUrl: getShopifyHydrogenUrl(),
    mode: getShopifyConfig().mode,
  };
}

export async function getShopifyProductCount() {
  const data = await shopifyFetch<{ products: { nodes: { id: string }[] } }>(PRODUCTS_QUERY, { first: 8 });
  return data.products.nodes.length;
}

export async function createShopifyCart(lines: { merchandiseId: string; quantity: number }[]) {
  const data = await shopifyFetch<CartPayload>(CART_CREATE, {
    input: {
      lines: lines.map((line) => ({ merchandiseId: line.merchandiseId, quantity: line.quantity })),
    },
  });
  const result = data.cartCreate;
  if (!result?.cart) {
    throw new Error(result?.userErrors[0]?.message ?? "Não foi possível criar o carrinho Shopify.");
  }
  return result.cart;
}

export async function getShopifyCart(id: string) {
  const data = await shopifyFetch<{ cart: ShopifyCart | null }>(CART_QUERY, { id });
  if (!data.cart) {
    throw new Error("Carrinho Shopify não encontrado.");
  }
  return data.cart;
}

export async function addShopifyCartLine(cartId: string, variantId: string, quantity: number) {
  const data = await shopifyFetch<CartPayload>(CART_LINES_ADD, {
    cartId,
    lines: [{ merchandiseId: variantId, quantity }],
  });
  const result = data.cartLinesAdd;
  if (!result?.cart) {
    throw new Error(result?.userErrors[0]?.message ?? "Não foi possível atualizar o carrinho Shopify.");
  }
  return result.cart;
}
