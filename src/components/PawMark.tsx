import { cn } from "@/lib/cn";

type PawMarkProps = {
  className?: string;
};

export function PawMark({ className }: PawMarkProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden
      className={cn("size-4", className)}
    >
      <ellipse cx="8.5" cy="10" rx="3.1" ry="4" />
      <ellipse cx="15" cy="6.5" rx="3.2" ry="4.1" />
      <ellipse cx="22.2" cy="9.2" rx="3.1" ry="4" />
      <ellipse cx="25.4" cy="16" rx="2.7" ry="3.4" />
      <path d="M10.2 18.4c2.4-2.8 9.4-3.2 12.2.3 2.3 2.8.6 6.8-2.6 8.1-2.1.9-4.6.6-6.4-.8-2.4-1.8-4.4-4.6-3.2-7.6Z" />
    </svg>
  );
}
