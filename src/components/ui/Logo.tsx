import { site } from "@/data/site";
import { cn } from "@/lib/cn";

type LogoProps = {
  className?: string;
  markClassName?: string;
  showWordmark?: boolean;
  tone?: "light" | "dark";
};

export function Logo({ className, markClassName, showWordmark = false, tone = "dark" }: LogoProps) {
  const color = tone === "light" ? "text-ivory" : "text-ink";

  return (
    <span
      className={cn(
        "inline-flex items-center",
        showWordmark ? "flex-col items-start gap-2.5" : "gap-3",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "logo-mark inline-block h-7 shrink-0 bg-current sm:h-8",
          color,
          tone === "light" && "drop-shadow-[0_1px_14px_rgb(27_23_20_/_0.35)]",
          markClassName,
        )}
      />
      {showWordmark ? (
        <span className={cn("font-display text-[11px] font-light uppercase tracking-[0.48em]", color)}>
          {site.shortName}
        </span>
      ) : null}
    </span>
  );
}
