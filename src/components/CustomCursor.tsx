"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useFinePointer } from "@/hooks/useFinePointer";
import { cn } from "@/lib/cn";

export function CustomCursor() {
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [label, setLabel] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!fine || reduce) return;

    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
      setVisible(true);
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        "a, button, [data-cursor]",
      );
      if (target) {
        setExpanded(true);
        setLabel(target.dataset.cursor ?? "");
      } else {
        setExpanded(false);
        setLabel("");
      }
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [fine, reduce]);

  if (!fine || reduce) return null;

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed left-0 top-0 z-[80] hidden lg:block",
        visible ? "opacity-100" : "opacity-0",
      )}
      style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
    >
      <div
        className={cn(
          "flex items-center justify-center rounded-full border border-ink bg-snow/90 text-[9px] font-medium uppercase tracking-[0.22em] text-ink shadow-sm transition-all duration-300",
          expanded
            ? label
              ? "-ml-10 -mt-10 h-20 w-20"
              : "-ml-5 -mt-5 h-10 w-10"
            : "-ml-1.5 -mt-1.5 h-3 w-3 border-rose bg-rose",
        )}
      >
        {expanded && label ? label : null}
      </div>
    </div>
  );
}
