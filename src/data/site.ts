import type { Address, Milestone, NavItem, OpeningHoursEntry, SocialLink } from "@/types/site";

export const site = {
  name: "Felizzi Store",
  shortName: "Felizzi",
  legalName: "Felizzi Store",
  tagline: "Moda para o seu momento.",
  description:
    "Boutique de moda em Petrópolis, Porto Alegre. Curadoria contemporânea, atendimento próximo e uma experiência pensada para acompanhar o seu estilo.",
  locale: "pt_BR",
  foundedYear: null as number | null,
  address: {
    street: "Rua Felizardo, 462",
    complement: "Loja B",
    neighborhood: "Petrópolis",
    city: "Porto Alegre",
    state: "RS",
    country: "Brasil",
    countryCode: "BR",
  } satisfies Address,
  maps: {
    query: "Rua Felizardo, 462, Loja B, Petrópolis, Porto Alegre, RS",
    embedSrc:
      "https://maps.google.com/maps?q=Rua%20Felizardo%20462%20Loja%20B%20Petr%C3%B3polis%20Porto%20Alegre%20RS&z=16&output=embed",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Rua+Felizardo+462+Loja+B+Petr%C3%B3polis+Porto+Alegre+RS",
  },
  contact: {
    phoneDisplay: "",
    phoneTel: "",
    email: "",
    whatsappE164: "",
    whatsappDisplay: "",
    whatsappMessage: "Olá, Felizzi! Gostaria de conhecer melhor as peças e a loja.",
  },
  hours: {
    note: "Horário de funcionamento disponível na loja e pelos canais da Felizzi.",
    entries: [] as OpeningHoursEntry[],
  },
  social: {
    instagram: {
      label: "Instagram",
      href: "https://www.instagram.com/felizzistore/",
      handle: "@felizzistore",
    } satisfies SocialLink,
  },
  seo: {
    title: "Felizzi Store | Boutique de moda em Porto Alegre",
    titleTemplate: "%s | Felizzi",
    keywords: [
      "Felizzi Store",
      "Felizzi",
      "boutique Porto Alegre",
      "moda feminina Petrópolis",
      "loja de roupas Porto Alegre",
      "moda contemporânea",
      "Rua Felizardo",
    ],
  },
  copy: {
    heroEyebrow: "Boutique · Porto Alegre",
    heroTitle: "Felizzi",
    heroLine: "Moda para o seu momento.",
    heroPrimaryCta: "Conheça a Felizzi",
    heroSecondaryCta: "Ver novidades",
    manifesto: {
      lines: ["Estilo", "não é apenas", "o que você veste.", "É como você", "se sente."],
      body: "A Felizzi existe para acompanhar a vida real com peças pensadas para o cotidiano, para o especial e para tudo o que acontece entre os dois.",
    },
    aboutQuote: "Uma marca construída para fazer parte da vida de suas clientes.",
    whatsappTitle: "Encontrou o seu estilo?",
    whatsappText: "Fale com a Felizzi e descubra mais.",
    whatsappCta: "Falar pelo WhatsApp",
    instagramTitle: "Siga a Felizzi",
    instagramCta: "Ver no Instagram",
    storeTitle: "Venha nos visitar.",
    storeCta: "Ver localização",
    directionsCta: "Como chegar",
    xpress: "Digital Experience by Xpress Solutions",
  },
  milestones: [
    {
      id: "presenca",
      kicker: "Presença",
      title: "Uma boutique no cotidiano de Porto Alegre",
      text: "A Felizzi recebe suas clientes na Rua Felizardo, em Petrópolis — um espaço pensado para descobrir estilo com calma e proximidade.",
    },
    {
      id: "trajetoria",
      kicker: "Trajetória",
      title: "Uma história feita no tempo",
      text: "Espaço reservado para a história da marca. A Felizzi tem presença física e uma trajetória longa no mercado — o texto institucional definitivo entra aqui.",
    },
    {
      id: "hoje",
      kicker: "Hoje",
      title: "Curadoria em movimento",
      text: "Looks, combinações e uma seleção que acompanha o momento de cada cliente. Conteúdo editável para valores, equipe e bastidores da loja.",
    },
  ] satisfies Milestone[],
} as const;

export const navigation: NavItem[] = [
  { href: "/novidades", label: "Novidades" },
  { href: "/colecoes", label: "Coleções" },
  { href: "/looks", label: "Looks" },
  { href: "/sobre", label: "A Felizzi" },
  { href: "/loja", label: "A Loja" },
  { href: "/contato", label: "Contato" },
];

export const footerNavigation: NavItem[] = [
  { href: "/novidades", label: "Novidades" },
  { href: "/colecoes", label: "Coleções" },
  { href: "/looks", label: "Looks" },
  { href: "/carrinho", label: "Sacola" },
  { href: "/sobre", label: "A Felizzi" },
  { href: "/loja", label: "Loja" },
  { href: "/ajuda", label: "Ajuda" },
  { href: "/contato", label: "Contato" },
];

export function formatAddress(multiline = false) {
  const { street, complement, neighborhood, city, state } = site.address;
  const line1 = `${street} — ${complement}`;
  const line2 = `${neighborhood}, ${city} — ${state}`;
  return multiline ? `${line1}\n${line2}` : `${line1}, ${line2}`;
}
