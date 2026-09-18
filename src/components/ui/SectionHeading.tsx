import { cn } from "@/lib/cn";
import { EditorialLabel } from "@/components/ui/EditorialLabel";

type SectionHeadingProps = {
  id?: string;
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
};

export function SectionHeading({
  id,
  kicker,
  title,
  subtitle,
  align = "left",
  tone = "dark",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      {kicker ? (
        <EditorialLabel className={cn("mb-5", tone === "light" && "text-ivory/55")}>{kicker}</EditorialLabel>
      ) : null}
      <h2
        id={id}
        className={cn(
          "font-display text-[2rem] font-light tracking-tight sm:text-5xl lg:text-6xl",
          tone === "light" ? "text-ivory" : "text-ink",
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "mt-5 max-w-xl text-[15px] leading-relaxed",
            align === "center" && "mx-auto",
            tone === "light" ? "text-ivory/70" : "text-stone",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
