const WHATSAPP_NUMBER = "5551991150994";

const DEFAULT_MESSAGE =
  "Olá, Dra. Maristela! Gostaria de agendar uma consulta para meu pet.";

export function getWhatsAppUrl(message: string = DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
