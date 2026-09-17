import { images } from "./images";

export const gallery = [
  {
    id: "recepcao",
    src: images.clinic,
    alt: "Recepção do consultório veterinário, com madeira, plantas e iluminação quente",
    label: "Recepção",
    ratio: "wide",
  },
  {
    id: "consultorio",
    src: images.consultorio,
    alt: "Consultório veterinário sofisticado, com madeira e luz natural",
    label: "Consultório",
    ratio: "square",
  },
  {
    id: "detalhes",
    src: images.galleryDetails,
    alt: "Detalhes do ambiente: linho, eucalipto e madeira clara",
    label: "Detalhes",
    ratio: "square",
  },
  {
    id: "equipamentos",
    src: images.galleryEquipment,
    alt: "Instrumentos clínicos dispostos com delicadeza sobre bandeja de madeira",
    label: "Cuidado",
    ratio: "tall",
  },
  {
    id: "ambiente",
    src: images.galleryWaiting,
    alt: "Golden retriever aguardando em sala de espera com plantas e poltrona de linho",
    label: "Ambiente",
    ratio: "wide",
  },
  {
    id: "pets",
    src: images.galleryPet,
    alt: "Filhote dourado descansando sobre tecidos champagne",
    label: "Pets",
    ratio: "tall",
  },
] as const;
