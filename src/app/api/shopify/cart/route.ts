import { createShopifyCart, getShopifyCart } from "@/lib/shopify/storefront";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    lines?: { merchandiseId: string; quantity: number }[];
  };

  const lines = (body.lines ?? []).filter((line) => line.merchandiseId && line.quantity > 0);
  if (lines.length === 0) {
    return Response.json({ error: "Sacola vazia." }, { status: 400 });
  }

  try {
    const cart = await createShopifyCart(lines);
    return Response.json(cart);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha ao criar o carrinho Shopify.";
    return Response.json({ error: message }, { status: 502 });
  }
}

export async function GET(request: Request) {
  const id = new URL(request.url).searchParams.get("id");
  if (!id) {
    return Response.json({ error: "Informe o id do carrinho Shopify." }, { status: 400 });
  }

  try {
    const cart = await getShopifyCart(id);
    return Response.json(cart);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha ao ler o carrinho Shopify.";
    return Response.json({ error: message }, { status: 502 });
  }
}
