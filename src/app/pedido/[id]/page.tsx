import { OrderConfirmation } from "@/components/commerce/OrderConfirmation";
import { Container } from "@/components/ui/Container";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  return { title: `Pedido ${id}` };
}

export default async function PedidoPage({ params }: Props) {
  const { id } = await params;
  return (
    <main id="conteudo" className="pt-28">
      <Container className="pb-24">
        <OrderConfirmation id={id} />
      </Container>
    </main>
  );
}
