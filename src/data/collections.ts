import type { Collection } from "@/types/catalog";

export const collections: Collection[] = [
  {
    slug: "casual",
    name: "Casual",
    description: "Peças para o ritmo da semana. Conforto, caimento e uma curadoria que acompanha o dia.",
    image: "/images/looks/v2/look-03.png",
    mood: "casual",
    cta: "Ver coleção",
  },
  {
    slug: "elegante",
    name: "Elegante",
    description: "Silhuetas com presença. Para encontros, celebrações e os momentos em que o vestir pede mais intenção.",
    image: "/images/looks/v2/look-02.png",
    mood: "elegante",
    cta: "Ver coleção",
  },
  {
    slug: "especial",
    name: "Especial",
    description: "Texturas, camadas e looks com caráter. Uma seleção para quando o momento pede algo a mais.",
    image: "/images/looks/v2/look-04.png",
    mood: "especial",
    cta: "Ver coleção",
  },
];

export function getCollection(slug: string) {
  return collections.find((item) => item.slug === slug);
}
