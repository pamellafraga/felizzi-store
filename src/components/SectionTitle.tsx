import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionTitleProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
};

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "mb-5 text-[11px] font-medium uppercase tracking-[0.32em]",
            tone === "dark" ? "text-blush/80" : "text-rose",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "font-display text-[2.35rem] font-medium leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.65rem]",
          tone === "dark" ? "text-snow" : "text-ink",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-6 max-w-xl text-base leading-relaxed sm:text-lg",
            align === "center" && "mx-auto",
            tone === "dark" ? "text-champagne/80" : "text-charcoal/70",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
