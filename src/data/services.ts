import { images } from "./images";

export const services = [
  {
    id: "clinica-geral",
    number: "01",
    title: "Clínica Geral",
    description:
      "Avaliação cuidadosa da saúde do seu pet, com atenção a cada sinal e à rotina da família.",
    image: images.services,
    alt: "Mãos de uma veterinária examinando com delicadeza a pata de um gato",
    featured: true,
  },
  {
    id: "homeopatia",
    number: "02",
    title: "Homeopatia",
    description:
      "Uma abordagem complementar, pensada com calma e respeito à individualidade de cada animal.",
    image: images.serviceHomeopathy,
    alt: "Frascos de vidro e ervas em uma bandeja de madeira no consultório",
    featured: false,
  },
  {
    id: "vacinas",
    number: "03",
    title: "Vacinas",
    description:
      "Proteção preventiva para cães e gatos, conduzida com tranquilidade e cuidado no atendimento.",
    image: images.serviceVaccines,
    alt: "Gato de pelagem creme em close, com expressão calma",
    featured: false,
  },
  {
    id: "profilaxia-dentaria",
    number: "04",
    title: "Profilaxia Dentária",
    description:
      "Cuidado com a saúde bucal, essencial para o bem-estar e o conforto no dia a dia do pet.",
    image: images.serviceDental,
    alt: "Retrato editorial do focinho de um golden retriever em luz suave",
    featured: false,
  },
  {
    id: "medicamentos",
    number: "05",
    title: "Medicamentos",
    description:
      "Orientação próxima para o tratamento, com atenção ao que cada animal realmente precisa.",
    image: images.serviceMedicines,
    alt: "Frascos âmbar sobre bandeja de latão em ambiente clínico sofisticado",
    featured: false,
  },
  {
    id: "cuidado-personalizado",
    number: "06",
    title: "Cuidado personalizado",
    description:
      "Cada consulta é única. O atendimento acompanha o ritmo, o temperamento e a história do seu pet.",
    image: images.galleryPet,
    alt: "Filhote dourado dormindo sobre linho champagne",
    featured: true,
  },
] as const;
