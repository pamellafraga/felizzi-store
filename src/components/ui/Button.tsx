import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "ghost" | "light";
  className?: string;
  external?: boolean;
};

export function Button({ href, children, variant = "solid", className, external }: ButtonProps) {
  const isExternal = external || href.startsWith("http");
  const classes = cn(
    "inline-flex items-center justify-center gap-3 px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] transition-colors duration-500",
    variant === "solid" && "bg-ink text-ivory hover:bg-graphite",
    variant === "light" && "bg-ivory text-ink hover:bg-champagne",
    variant === "outline" && "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-ivory",
    variant === "ghost" && "border border-ivory/30 text-ivory hover:border-ivory hover:bg-ivory/10",
    className,
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
