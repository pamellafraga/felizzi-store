import { PawMark } from "@/components/PawMark";
import { clinic } from "@/data/clinic";
import { cn } from "@/lib/cn";

type LogoProps = {
  tone?: "light" | "dark";
  compact?: boolean;
  className?: string;
};

export function Logo({ tone = "light", compact = false, className }: LogoProps) {
  const light = tone === "light";

  return (
    <span className={cn("flex items-center gap-3", className)}>
      <span
        className={cn(
          "relative flex size-11 shrink-0 items-center justify-center rounded-full",
          light ? "bg-snow" : "bg-ink",
        )}
      >
        <PawMark className={cn("size-5", light ? "text-rose" : "text-blush")} />
      </span>
      <span className="flex min-w-0 flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.05rem] font-medium tracking-tight",
            light ? "text-snow" : "text-ink",
          )}
        >
          {clinic.shortName}
        </span>
        {!compact ? (
          <span
            className={cn(
              "mt-1 text-[9px] font-medium uppercase tracking-[0.28em]",
              light ? "text-champagne/80" : "text-charcoal/55",
            )}
          >
            {clinic.practice}
          </span>
        ) : null}
      </span>
    </span>
  );
}
