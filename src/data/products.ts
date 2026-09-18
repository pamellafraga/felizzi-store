import type { Product, ProductSize, ProductVariant } from "@/types/catalog";

const sizes: ProductSize[] = ["P", "M", "G", "GG"];

function variants(
  ids: Record<ProductSize, string>,
  productKey: string,
  unavailable: ProductSize[] = [],
): ProductVariant[] {
  return sizes.map((size) => ({
    id: ids[size],
    size,
    available: !unavailable.includes(size),
    sku: `FZ-${productKey.toUpperCase()}-${size}`,
  }));
}

export const products: Product[] = [
  {
    id: "gid://shopify/Product/2184",
    slug: "conjunto-colete-e-calca",
    name: "Conjunto colete e calça",
    category: "roupas",
    mood: "casual",
    shortDescription: "Linhas limpas para o dia a dia.",
    description:
      "Um conjunto de colete e calça em tom areia, pensado para transitar entre o casual e o cuidado. Peça da curadoria Felizzi.",
    image: "/images/looks/v2/look-01.png",
    hoverImage: "/images/instagram/v2/post-01.png",
    priceCents: 39800,
    variants: variants(
      {
        P: "gid://shopify/ProductVariant/11252",
        M: "gid://shopify/ProductVariant/11253",
        G: "gid://shopify/ProductVariant/11254",
        GG: "gid://shopify/ProductVariant/11255",
      },
      "1001",
    ),
    isNew: true,
    relatedLookSlugs: ["dia-em-areia"],
    fabric: "Viscose com toque fluido",
    origin: "Curadoria Felizzi",
  },
  {
    id: "gid://shopify/Product/2185",
    slug: "vestido-midi",
    name: "Vestido midi",
    category: "roupas",
    mood: "elegante",
    shortDescription: "Queda fluida para ocasiões especiais.",
    description:
      "Vestido midi de decote em V e fenda discreta. Uma leitura contemporânea do elegante, com presença e leveza.",
    image: "/images/looks/v2/look-02.png",
    hoverImage: "/images/instagram/v2/post-02.png",
    priceCents: 45800,
    variants: variants(
      {
        P: "gid://shopify/ProductVariant/11260",
        M: "gid://shopify/ProductVariant/11261",
        G: "gid://shopify/ProductVariant/11262",
        GG: "gid://shopify/ProductVariant/11263",
      },
      "1002",
      ["GG"],
    ),
    isNew: true,
    relatedLookSlugs: ["rosa-ao-entardecer"],
    fabric: "Crepe com queda midi",
    origin: "Curadoria Felizzi",
  },
  {
    id: "gid://shopify/Product/2186",
    slug: "conjunto-malha",
    name: "Conjunto em malha",
    category: "roupas",
    mood: "casual",
    shortDescription: "Conforto com silhueta alongada.",
    description:
      "Conjunto em malha de tom terroso, com calça ampla e blusa de manga. Para dias em que o conforto também é estilo.",
    image: "/images/looks/v2/look-03.png",
    hoverImage: "/images/instagram/v2/post-03.png",
    priceCents: 32800,
    variants: variants(
      {
        P: "gid://shopify/ProductVariant/11274",
        M: "gid://shopify/ProductVariant/11277",
        G: "gid://shopify/ProductVariant/11280",
        GG: "gid://shopify/ProductVariant/11283",
      },
      "1003",
      ["GG"],
    ),
    isNew: true,
    relatedLookSlugs: ["tom-terroso"],
    fabric: "Malha macia",
    origin: "Curadoria Felizzi",
  },
  {
    id: "gid://shopify/Product/2187",
    slug: "conjunto-camurca",
    name: "Conjunto em camurça",
    category: "roupas",
    mood: "especial",
    shortDescription: "Textura e presença para o seu momento.",
    description:
      "Jaqueta e calça em camurça caramelo. Uma composição com caráter, pensada para quem gosta de um look com intenção.",
    image: "/images/looks/v2/look-04.png",
    hoverImage: "/images/instagram/v2/post-04.png",
    priceCents: 59800,
    variants: variants(
      {
        P: "gid://shopify/ProductVariant/11284",
        M: "gid://shopify/ProductVariant/11285",
        G: "gid://shopify/ProductVariant/11286",
        GG: "gid://shopify/ProductVariant/11287",
      },
      "1004",
      ["M"],
    ),
    relatedLookSlugs: ["cidade-em-caramelo"],
    fabric: "Camurça macia",
    origin: "Curadoria Felizzi",
  },
  {
    id: "gid://shopify/Product/2188",
    slug: "conjunto-moletom",
    name: "Conjunto moletom",
    category: "roupas",
    mood: "casual",
    shortDescription: "Maciez para o ritmo da semana.",
    description:
      "Moletom e calça com caimento amplo. Uma peça para o cotidiano, com o acabamento da curadoria Felizzi.",
    image: "/images/looks/v2/look-05.png",
    hoverImage: "/images/instagram/v2/post-05.png",
    priceCents: 29800,
    variants: variants(
      {
        P: "gid://shopify/ProductVariant/11300",
        M: "gid://shopify/ProductVariant/11301",
        G: "gid://shopify/ProductVariant/11302",
        GG: "gid://shopify/ProductVariant/11303",
      },
      "1005",
    ),
    relatedLookSlugs: ["estar-em-casa"],
    fabric: "Moletom peluciado",
    origin: "Curadoria Felizzi",
  },
  {
    id: "gid://shopify/Product/2189",
    slug: "conjunto-faixa",
    name: "Conjunto com faixa",
    category: "roupas",
    mood: "casual",
    shortDescription: "Contraste vertical, movimento no corpo.",
    description:
      "Conjunto em tom vinho com faixa lateral. Uma silhueta alongada, fácil de vestir e com personalidade.",
    image: "/images/looks/v2/look-06.png",
    hoverImage: "/images/instagram/v2/post-06.png",
    priceCents: 31800,
    variants: variants(
      {
        P: "gid://shopify/ProductVariant/11308",
        M: "gid://shopify/ProductVariant/11309",
        G: "gid://shopify/ProductVariant/11310",
        GG: "gid://shopify/ProductVariant/11311",
      },
      "1006",
      ["P"],
    ),
    relatedLookSlugs: ["vinho-em-movimento"],
    fabric: "Malha com faixa em contraste",
    origin: "Curadoria Felizzi",
  },
];

export const productFilters: { id: import("@/types/catalog").ProductFilter; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "novidades", label: "Novidades" },
  { id: "roupas", label: "Roupas" },
  { id: "acessorios", label: "Acessórios" },
  { id: "looks", label: "Looks" },
];

export function getProduct(slug: string) {
  return products.find((item) => item.slug === slug);
}

export function getProductById(id: string) {
  return products.find((item) => item.id === id);
}

export function getProductsByFilter(filter: import("@/types/catalog").ProductFilter) {
  if (filter === "todos") return products;
  if (filter === "novidades") return products.filter((item) => item.isNew);
  if (filter === "looks") return products.filter((item) => (item.relatedLookSlugs?.length ?? 0) > 0);
  return products.filter((item) => item.category === filter);
}

export function getRelatedProducts(slug: string, limit = 3) {
  const current = getProduct(slug);
  if (!current) return products.slice(0, limit);
  return products.filter((item) => item.slug !== slug && item.mood === current.mood).slice(0, limit);
}

export function getVariant(product: Product, size: ProductSize) {
  return product.variants.find((item) => item.size === size);
}
