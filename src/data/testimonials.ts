import { images } from "./images";

/**
 * Textos demonstrativos — substituir pelos depoimentos confirmados pela cliente.
 * Não utilizar nomes completos até autorização.
 */
export const testimonials = [
  {
    id: "demo-01",
    quote:
      "A Dra. Maristela nos recebeu com muito carinho e atenção. Meu pet foi tratado com todo cuidado.",
    attribution: "Tutora de gato",
    image: images.testimonial,
    alt: "Gato creme sentado em poltrona de veludo carvão",
  },
  {
    id: "demo-02",
    quote: "Ambiente acolhedor e atendimento muito atencioso.",
    attribution: "Tutor de cão",
    image: images.dog,
    alt: "Retrato editorial de um golden retriever",
  },
  {
    id: "demo-03",
    quote: "Sempre fomos recebidos com carinho e respeito.",
    attribution: "Família",
    image: images.cat,
    alt: "Retrato editorial de um gato de pelagem creme",
  },
] as const;
