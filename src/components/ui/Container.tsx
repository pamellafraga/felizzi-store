import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "nav" | "header" | "footer";
  id?: string;
};

export function Container({ children, className, as: Tag = "div", id }: ContainerProps) {
  return (
    <Tag id={id} className={cn("mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16", className)}>
      {children}
    </Tag>
  );
}
