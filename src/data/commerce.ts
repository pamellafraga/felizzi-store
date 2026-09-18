export const commerce = {
  currency: "BRL",
  freeShippingCents: 49900,
  pickupCents: 0,
  rsShippingCents: 2900,
  otherShippingCents: 4900,
  sizes: ["P", "M", "G", "GG"] as const,
  demoNote: "Checkout em demonstração Shopify. Nenhuma cobrança real é feita.",
  pixKey: "felizzi-demo@xpress.local",
  sizeGuide: [
    { size: "P", bust: "86–90", waist: "68–72", hip: "94–98" },
    { size: "M", bust: "90–94", waist: "72–76", hip: "98–102" },
    { size: "G", bust: "94–100", waist: "76–82", hip: "102–108" },
    { size: "GG", bust: "100–108", waist: "82–90", hip: "108–116" },
  ],
};

export function shippingCents(state: string, fulfillment: "pickup" | "delivery") {
  if (fulfillment === "pickup") return commerce.pickupCents;
  return state.toUpperCase() === "RS" ? commerce.rsShippingCents : commerce.otherShippingCents;
}
