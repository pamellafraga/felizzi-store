import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  id?: string;
};

export function Container({
  children,
  className,
  as: Tag = "div",
  id,
}: ContainerProps) {
  return (
    <Tag
      id={id}
      className={cn("mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12", className)}
    >
      {children}
    </Tag>
  );
}
