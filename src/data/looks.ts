import type { Look } from "@/types/catalog";

export const looks: Look[] = [
  {
    slug: "dia-em-areia",
    title: "Dia em areia",
    kicker: "Casual",
    description:
      "Colete e calça no mesmo tom, para um dia que pede presença sem esforço. Uma composição limpa, com espaço para os seus acessórios.",
    image: "/images/looks/v2/look-01.png",
    gallery: ["/images/looks/v2/look-01.png", "/images/instagram/v2/post-01.png"],
    mood: "casual",
    pieces: [{ name: "Conjunto colete e calça", productSlug: "conjunto-colete-e-calca" }],
  },
  {
    slug: "rosa-ao-entardecer",
    title: "Rosa ao entardecer",
    kicker: "Elegante",
    description:
      "Um vestido midi que respira. A fenda discreta e o decote em V criam uma silhueta contemporânea, pronta para um momento especial.",
    image: "/images/looks/v2/look-02.png",
    gallery: ["/images/looks/v2/look-02.png", "/images/instagram/v2/post-02.png"],
    mood: "elegante",
    pieces: [{ name: "Vestido midi", productSlug: "vestido-midi" }],
  },
  {
    slug: "tom-terroso",
    title: "Tom terroso",
    kicker: "Casual",
    description:
      "Malha no corpo, calça ampla e um tom que conversa com a paleta da Felizzi. Conforto com uma leitura sofisticada.",
    image: "/images/looks/v2/look-03.png",
    gallery: ["/images/looks/v2/look-03.png", "/images/instagram/v2/post-03.png"],
    mood: "casual",
    pieces: [{ name: "Conjunto em malha", productSlug: "conjunto-malha" }],
  },
  {
    slug: "cidade-em-caramelo",
    title: "Cidade em caramelo",
    kicker: "Especial",
    description:
      "Textura, camadas e um tom caramelo que aquece o look. Para quem gosta de sair com intenção — e com conforto.",
    image: "/images/looks/v2/look-04.png",
    gallery: ["/images/looks/v2/look-04.png", "/images/instagram/v2/post-04.png"],
    mood: "especial",
    pieces: [{ name: "Conjunto em camurça", productSlug: "conjunto-camurca" }],
  },
  {
    slug: "estar-em-casa",
    title: "Estar em casa",
    kicker: "Casual",
    description:
      "Moletom com caimento e uma paleta suave. O tipo de look que começa na casa e segue para o dia, sem perder o cuidado.",
    image: "/images/looks/v2/look-05.png",
    gallery: ["/images/looks/v2/look-05.png", "/images/instagram/v2/post-05.png"],
    mood: "casual",
    pieces: [{ name: "Conjunto moletom", productSlug: "conjunto-moletom" }],
  },
  {
    slug: "vinho-em-movimento",
    title: "Vinho em movimento",
    kicker: "Casual",
    description:
      "A faixa lateral alonga a silhueta. Um conjunto fácil, com personalidade suficiente para ser o centro do look.",
    image: "/images/looks/v2/look-06.png",
    gallery: ["/images/looks/v2/look-06.png", "/images/instagram/v2/post-06.png"],
    mood: "casual",
    pieces: [{ name: "Conjunto com faixa", productSlug: "conjunto-faixa" }],
  },
];

export function getLook(slug: string) {
  return looks.find((item) => item.slug === slug);
}

export function getRelatedLooks(slug: string, limit = 3) {
  const current = getLook(slug);
  if (!current) return looks.slice(0, limit);
  const sameMood = looks.filter((item) => item.slug !== slug && item.mood === current.mood);
  const others = looks.filter((item) => item.slug !== slug && item.mood !== current.mood);
  return [...sameMood, ...others].slice(0, limit);
}
