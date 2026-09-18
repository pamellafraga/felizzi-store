import Link from "next/link";

export default function NotFound() {
  return (
    <main id="conteudo" className="flex min-h-[80vh] flex-col items-center justify-center bg-sand px-6 text-center">
      <p className="text-[11px] uppercase tracking-[0.28em] text-stone">404</p>
      <h1 className="mt-4 font-display text-5xl font-light text-ink">Página não encontrada</h1>
      <p className="mt-4 max-w-md text-sm text-stone">Este caminho não faz parte da curadoria Felizzi.</p>
      <Link href="/" className="mt-10 text-[11px] uppercase tracking-[0.22em] text-ink nav-underline">
        Voltar ao início
      </Link>
    </main>
  );
}
