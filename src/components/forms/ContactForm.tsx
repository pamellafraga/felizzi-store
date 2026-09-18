"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/data/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

type Status = "idle" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("nome") ?? "").trim();
    const phone = String(data.get("telefone") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const body = String(data.get("mensagem") ?? "").trim();

    if (!name || !phone || !email || !body || !email.includes("@")) {
      setStatus("error");
      setMessage("Revise os campos e tente novamente.");
      return;
    }

    const composed = `Olá, Felizzi! Meu nome é ${name}. Telefone: ${phone}. E-mail: ${email}. Mensagem: ${body}`;
    const whatsapp = getWhatsAppUrl(composed);

    setStatus("success");
    setMessage("Mensagem pronta. Você será direcionada ao canal da Felizzi.");
    form.reset();

    if (whatsapp) {
      window.open(whatsapp, "_blank", "noopener,noreferrer");
      return;
    }

    window.open(site.social.instagram.href, "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <Field label="Nome" name="nome" autoComplete="name" />
      <Field label="Telefone" name="telefone" autoComplete="tel" />
      <Field label="E-mail" name="email" type="email" autoComplete="email" />
      <label className="block">
        <span className="text-[11px] uppercase tracking-[0.22em] text-stone">Mensagem</span>
        <textarea
          name="mensagem"
          rows={5}
          required
          className="mt-2 w-full border-b border-ink/20 bg-transparent py-3 text-ink outline-none transition-colors focus:border-ink"
        />
      </label>
      <button
        type="submit"
        className="bg-ink px-8 py-4 text-[11px] font-medium uppercase tracking-[0.22em] text-ivory transition-colors hover:bg-graphite"
      >
        Enviar mensagem
      </button>
      <p
        role="status"
        className={cn(
          "min-h-[1.5rem] text-sm",
          status === "success" && "text-graphite",
          status === "error" && "text-[#7a3b32]",
        )}
      >
        {status === "idle" ? "" : message}
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.22em] text-stone">{label}</span>
      <input
        name={name}
        type={type}
        required
        autoComplete={autoComplete}
        className="mt-2 w-full border-b border-ink/20 bg-transparent py-3 text-ink outline-none transition-colors focus:border-ink"
      />
    </label>
  );
}
