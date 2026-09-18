"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/commerce/CartProvider";
import { commerce, shippingCents } from "@/data/commerce";
import { formatAddress, site } from "@/data/site";
import { lookupCep } from "@/lib/cep";
import { formatBRL, formatCardExpiry, formatCardNumber, formatCep, formatCpf, formatPhone, isValidEmail, parseDigits } from "@/lib/money";
import { isShopifyDemo } from "@/lib/shopify/config";
import type { CheckoutDraft, Fulfillment, PaymentMethod, PlacedOrder } from "@/types/catalog";
import { cn } from "@/lib/cn";
import { ShopifyCheckoutButton } from "@/components/commerce/ShopifyCheckoutButton";

const initial: CheckoutDraft = {
  email: "",
  name: "",
  phone: "",
  cpf: "",
  fulfillment: "pickup",
  cep: "",
  street: "",
  number: "",
  complement: "",
  neighborhood: "",
  city: "",
  state: "",
  payment: "pix",
  cardName: "",
  cardNumber: "",
  cardExpiry: "",
  cardCvv: "",
  notes: "",
};

function createDemoOrderId() {
  const stamp = Math.floor(Math.random() * 1_000_000_000).toString(36).toUpperCase();
  return `FZ${stamp}`;
}

function createPixCode() {
  const stamp = Math.floor(Math.random() * 1_000_000_000).toString();
  return `00020126FELIZZI${stamp}DEMO`;
}

export function CheckoutExperience() {
  const router = useRouter();
  const { lines, subtotalCents, clear } = useCart();
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<CheckoutDraft>(initial);
  const [error, setError] = useState("");
  const [loadingCep, setLoadingCep] = useState(false);
  const [placing, setPlacing] = useState(false);
  const shipping = shippingCents(draft.state, draft.fulfillment);
  const qualifiesFree = subtotalCents >= commerce.freeShippingCents && draft.fulfillment === "delivery";
  const shippingTotal = qualifiesFree ? 0 : shipping;
  const total = subtotalCents + shippingTotal;

  function update<K extends keyof CheckoutDraft>(key: K, value: CheckoutDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
    setError("");
  }

  async function onCepBlur(value = draft.cep) {
    if (parseDigits(value).length !== 8) return;
    setLoadingCep(true);
    const address = await lookupCep(value);
    setLoadingCep(false);
    if (!address) {
      setError("CEP não encontrado.");
      return;
    }
    setDraft((current) => ({
      ...current,
      street: current.street || address.street,
      neighborhood: current.neighborhood || address.neighborhood,
      city: address.city,
      state: address.state,
    }));
  }

  function validateStep() {
    if (step === 1) {
      if (!draft.name.trim() || !isValidEmail(draft.email) || parseDigits(draft.phone).length < 10) {
        return "Preencha nome, e-mail e telefone válidos.";
      }
    }
    if (step === 2 && draft.fulfillment === "delivery") {
      if (parseDigits(draft.cep).length !== 8 || !draft.street || !draft.number || !draft.city || !draft.state) {
        return "Complete o endereço de entrega.";
      }
    }
    if (step === 3) {
      if (draft.fulfillment === "pickup" && draft.payment === "store") return "";
      if (draft.payment === "card") {
        if (parseDigits(draft.cardNumber).length < 13 || parseDigits(draft.cardExpiry).length < 4 || draft.cardCvv.length < 3 || !draft.cardName) {
          return "Revise os dados do cartão de demonstração.";
        }
      }
    }
    return "";
  }

  function next() {
    const message = validateStep();
    if (message) {
      setError(message);
      return;
    }
    setStep((value) => Math.min(value + 1, 4));
  }

  function placeOrder(event: FormEvent) {
    event.preventDefault();
    const message = validateStep();
    if (message) {
      setError(message);
      return;
    }
    if (lines.length === 0) {
      setError("Sua sacola está vazia.");
      return;
    }

    const placedAt = new Date().toISOString();
    const order: PlacedOrder = {
      id: createDemoOrderId(),
      createdAt: placedAt,
      email: draft.email,
      name: draft.name,
      fulfillment: draft.fulfillment,
      payment: draft.payment,
      lines,
      subtotalCents,
      shippingCents: shippingTotal,
      totalCents: total,
      addressLabel:
        draft.fulfillment === "pickup"
          ? formatAddress()
          : `${draft.street}, ${draft.number} — ${draft.neighborhood}, ${draft.city}/${draft.state}`,
      pixCode: draft.payment === "pix" ? createPixCode() : undefined,
    };
    sessionStorage.setItem("felizzi.order", JSON.stringify(order));
    setPlacing(true);
    router.push(`/pedido/${order.id}`);
    window.setTimeout(clear, 50);
  }

  if (placing) {
    return (
      <div className="py-16 text-center">
        <p className="font-display text-3xl font-light">Confirmando o pedido…</p>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="font-display text-3xl font-light">A sacola está vazia.</p>
        <Link href="/novidades" className="mt-6 inline-flex text-[11px] uppercase tracking-[0.22em]">
          Voltar às novidades
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={placeOrder} className="grid gap-12 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <ol className="mb-8 grid grid-cols-2 gap-x-4 gap-y-3 text-[11px] uppercase tracking-[0.16em] text-stone sm:mb-10 sm:flex sm:flex-wrap sm:gap-6 sm:tracking-[0.2em]">
          {["Dados", "Entrega", "Pagamento", "Revisão"].map((label, index) => (
            <li key={label}>
              <button
                type="button"
                disabled={index + 1 > step}
                onClick={() => setStep(index + 1)}
                className={cn("disabled:cursor-default", step === index + 1 ? "text-ink" : index + 1 < step && "hover:text-ink")}
              >
                0{index + 1} {label}
              </button>
            </li>
          ))}
        </ol>

        {step === 1 ? (
          <div className="space-y-5">
            <Field label="Nome" value={draft.name} onChange={(value) => update("name", value)} autoComplete="name" />
            <Field label="E-mail" value={draft.email} onChange={(value) => update("email", value)} autoComplete="email" />
            <Field label="Telefone" value={draft.phone} onChange={(value) => update("phone", formatPhone(value))} autoComplete="tel" />
            <Field label="CPF (opcional)" value={draft.cpf} onChange={(value) => update("cpf", formatCpf(value))} />
          </div>
        ) : null}

        {step === 2 ? (
          <div className="space-y-6">
            <div className="grid gap-3 sm:grid-cols-2">
              <Choice
                active={draft.fulfillment === "pickup"}
                title="Retirar na loja"
                text={`${site.address.street} · Grátis`}
                onClick={() => update("fulfillment", "pickup" as Fulfillment)}
              />
              <Choice
                active={draft.fulfillment === "delivery"}
                title="Receber em casa"
                text="Calcule pelo CEP"
                onClick={() => {
                  update("fulfillment", "delivery");
                  if (draft.payment === "store") update("payment", "pix");
                }}
              />
            </div>
            {draft.fulfillment === "delivery" ? (
              <div className="space-y-5">
                <Field
                  label="CEP"
                  value={draft.cep}
                  onChange={(value) => {
                    const next = formatCep(value);
                    update("cep", next);
                    if (parseDigits(next).length === 8) void onCepBlur(next);
                  }}
                  onBlur={() => void onCepBlur()}
                />
                {loadingCep ? <p className="text-xs text-stone">Buscando endereço…</p> : null}
                <Field label="Rua" value={draft.street} onChange={(value) => update("street", value)} />
                <div className="grid grid-cols-2 gap-5">
                  <Field label="Número" value={draft.number} onChange={(value) => update("number", value)} />
                  <Field label="Complemento" value={draft.complement} onChange={(value) => update("complement", value)} />
                </div>
                <Field label="Bairro" value={draft.neighborhood} onChange={(value) => update("neighborhood", value)} />
                <div className="grid grid-cols-2 gap-5">
                  <Field label="Cidade" value={draft.city} onChange={(value) => update("city", value)} />
                  <Field label="UF" value={draft.state} onChange={(value) => update("state", value.toUpperCase().slice(0, 2))} />
                </div>
              </div>
            ) : (
              <p className="text-sm leading-relaxed text-stone">Retire na Felizzi, {formatAddress()}.</p>
            )}
          </div>
        ) : null}

        {step === 3 ? (
          <div className="space-y-4">
            <Choice active={draft.payment === "pix"} title="PIX" text="Código gerado na confirmação" onClick={() => update("payment", "pix" as PaymentMethod)} />
            <Choice active={draft.payment === "card"} title="Cartão" text="Simulação, sem cobrança" onClick={() => update("payment", "card")} />
            {draft.fulfillment === "pickup" ? (
              <Choice active={draft.payment === "store"} title="Pagar na loja" text="No momento da retirada" onClick={() => update("payment", "store")} />
            ) : null}
            {draft.payment === "card" ? (
              <div className="mt-6 space-y-5">
                <Field label="Nome no cartão" value={draft.cardName} onChange={(value) => update("cardName", value)} />
                <Field label="Número" value={draft.cardNumber} onChange={(value) => update("cardNumber", formatCardNumber(value))} />
                <div className="grid grid-cols-2 gap-5">
                  <Field label="Validade" value={draft.cardExpiry} onChange={(value) => update("cardExpiry", formatCardExpiry(value))} />
                  <Field label="CVV" value={draft.cardCvv} onChange={(value) => update("cardCvv", parseDigits(value).slice(0, 4))} />
                </div>
              </div>
            ) : null}
            <Field label="Observações" value={draft.notes} onChange={(value) => update("notes", value)} />
          </div>
        ) : null}

        {step === 4 ? (
          <div className="space-y-4 text-sm leading-relaxed text-stone">
            <p>
              <span className="text-ink">{draft.name}</span> · {draft.email} · {draft.phone}
            </p>
            <p>{draft.fulfillment === "pickup" ? "Retirada na loja" : `Entrega: ${draft.street}, ${draft.number}`}</p>
            <p>
              Pagamento: {draft.payment === "pix" ? "PIX" : draft.payment === "card" ? "Cartão" : "Na loja"}
            </p>
            <p className="text-xs">{commerce.demoNote}</p>
          </div>
        ) : null}

        {error ? (
          <p role="alert" className="mt-6 text-sm text-[#7a3b32]">
            {error}
          </p>
        ) : null}

        <div className="mt-10 flex gap-4">
          {step > 1 ? (
            <button type="button" onClick={() => setStep((value) => value - 1)} className="inline-flex min-h-11 items-center px-2 text-[11px] uppercase tracking-[0.2em] text-stone">
              Voltar
            </button>
          ) : null}
          {step < 4 ? (
            <button type="button" onClick={next} className="min-h-11 flex-1 bg-ink px-8 py-3.5 text-[11px] uppercase tracking-[0.22em] text-ivory sm:flex-none">
              Continuar
            </button>
          ) : (
            <button type="submit" className="min-h-11 flex-1 bg-ink px-8 py-3.5 text-[11px] uppercase tracking-[0.22em] text-ivory sm:flex-none">
              Confirmar pedido demo
            </button>
          )}
        </div>
      </div>

      <aside className="border border-ink/10 p-6 lg:col-span-5 lg:p-8">
        <p className="text-[11px] uppercase tracking-[0.22em] text-stone">Resumo</p>
        <ul className="mt-6 space-y-4">
          {lines.map((line) => (
            <li key={line.id} className="flex justify-between gap-4 text-sm">
              <span>
                {line.name} · {line.size} × {line.quantity}
              </span>
              <span>{formatBRL(line.priceCents * line.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 space-y-2 border-t border-ink/10 pt-4 text-sm">
          <p className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatBRL(subtotalCents)}</span>
          </p>
          <p className="flex justify-between">
            <span>Entrega</span>
            <span>{shippingTotal === 0 ? "Grátis" : formatBRL(shippingTotal)}</span>
          </p>
          <p className="flex justify-between font-display text-2xl font-light">
            <span>Total</span>
            <span>{formatBRL(total)}</span>
          </p>
        </div>
        <p className="mt-6 text-xs leading-relaxed text-stone">
          PIX e retirada neste site · ou pague no checkout Shopify Storefront.
        </p>
        <div className="mt-5">
          <ShopifyCheckoutButton />
        </div>
        <p className="mt-4 text-xs leading-relaxed text-stone">
          Shopify {isShopifyDemo() ? "demo · apparel-plus.mock.shop" : "live"} · Frete grátis a partir de {formatBRL(commerce.freeShippingCents)}.
        </p>
      </aside>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  onBlur,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.2em] text-stone">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        autoComplete={autoComplete}
        className="mt-2 w-full border-b border-ink/20 bg-transparent py-3 outline-none focus:border-ink"
      />
    </label>
  );
}

function Choice({
  active,
  title,
  text,
  onClick,
}: {
  active: boolean;
  title: string;
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
        className={cn("min-h-[4.5rem] border p-4 text-left transition-colors", active ? "border-ink bg-champagne/50" : "border-ink/15")}
    >
      <span className="block text-[11px] uppercase tracking-[0.18em] text-ink">{title}</span>
      <span className="mt-1 block text-sm text-stone">{text}</span>
    </button>
  );
}
