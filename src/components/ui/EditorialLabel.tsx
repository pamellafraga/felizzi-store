import { cn } from "@/lib/cn";

export function EditorialLabel({ children, className }: { children: string; className?: string }) {
  return (
    <p className={cn("text-[11px] font-medium uppercase tracking-[0.32em] text-stone", className)}>
      {children}
    </p>
  );
}
