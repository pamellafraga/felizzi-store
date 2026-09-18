export type ProductCategory = "roupas" | "acessorios" | "looks";

export type ProductFilter = "todos" | "novidades" | ProductCategory;

export type StyleMood = "casual" | "elegante" | "especial";

export type ProductSize = "P" | "M" | "G" | "GG";

export type ProductVariant = {
  id: string;
  size: ProductSize;
  available: boolean;
  sku: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  mood: StyleMood;
  shortDescription: string;
  description: string;
  image: string;
  hoverImage?: string;
  priceCents: number;
  variants: ProductVariant[];
  isNew?: boolean;
  relatedLookSlugs?: string[];
  fabric?: string;
  origin?: string;
};

export type Collection = {
  slug: string;
  name: string;
  description: string;
  image: string;
  mood: StyleMood;
  cta: string;
};

export type LookPiece = {
  name: string;
  productSlug?: string;
};

export type Look = {
  slug: string;
  title: string;
  kicker: string;
  description: string;
  image: string;
  gallery: string[];
  mood: StyleMood;
  pieces: LookPiece[];
};

export type CartLine = {
  id: string;
  productId: string;
  variantId: string;
  slug: string;
  name: string;
  image: string;
  size: ProductSize;
  quantity: number;
  priceCents: number;
  sku: string;
};

export type Fulfillment = "pickup" | "delivery";

export type PaymentMethod = "pix" | "card" | "store";

export type CheckoutDraft = {
  email: string;
  name: string;
  phone: string;
  cpf: string;
  fulfillment: Fulfillment;
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  payment: PaymentMethod;
  cardName: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
  notes: string;
};

export type PlacedOrder = {
  id: string;
  createdAt: string;
  email: string;
  name: string;
  fulfillment: Fulfillment;
  payment: PaymentMethod;
  lines: CartLine[];
  subtotalCents: number;
  shippingCents: number;
  totalCents: number;
  addressLabel: string;
  pixCode?: string;
};
