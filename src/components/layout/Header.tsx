"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { SearchOverlay } from "@/components/navigation/SearchOverlay";
import { Logo } from "@/components/ui/Logo";
import { CartButton } from "@/components/commerce/CartButton";
import { InstagramIcon, SearchIcon } from "@/components/ui/Icons";
import { navigation, site } from "@/data/site";
import { useLockBody } from "@/hooks/useLockBody";
import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/lib/cn";

export function Header() {
  const scrolled = useScrolled(24);
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const usesDarkHero =
    pathname === "/" ||
    pathname === "/colecoes" ||
    pathname === "/looks" ||
    pathname === "/sobre" ||
    pathname === "/loja" ||
    pathname.startsWith("/categoria/");
  const overHero = usesDarkHero && !scrolled && !menuOpen;

  useLockBody(menuOpen || searchOpen);

  const leftNav = navigation.slice(0, 3);
  const rightNav = navigation.slice(3);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[80] pt-[env(safe-area-inset-top)] transition-[background-color,height,box-shadow,border-color,color] duration-500",
          overHero
            ? "border-b border-transparent bg-ink/30 text-ivory backdrop-blur-md lg:bg-transparent lg:backdrop-blur-none"
            : "border-b border-ink/8 bg-ivory/95 text-ink shadow-[0_10px_40px_-28px_rgb(27_23_20_/_0.35)] backdrop-blur-md",
        )}
      >
        <div
          className={cn(
            "mx-auto grid max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-4 transition-[height] duration-500 sm:px-8 lg:px-12",
            scrolled ? "h-14 lg:h-[72px]" : "h-16 lg:h-[104px]",
          )}
        >
          <div className="flex items-center gap-2">
            <button
              type="button"
              className={cn(
                "inline-flex size-11 items-center justify-center lg:hidden",
                overHero && "drop-shadow-[0_1px_8px_rgb(27_23_20_/_0.45)]",
              )}
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              onClick={() => setMenuOpen((value) => !value)}
            >
              <span className="sr-only">Menu</span>
              <span className="flex w-5 flex-col gap-1.5">
                <span className={cn("h-px w-full bg-current transition-transform duration-500", menuOpen && "translate-y-[5px] rotate-45")} />
                <span className={cn("h-px w-full bg-current transition-opacity duration-300", menuOpen && "opacity-0")} />
                <span className={cn("h-px w-full bg-current transition-transform duration-500", menuOpen && "-translate-y-[5px] -rotate-45")} />
              </span>
            </button>
            <nav className="hidden items-center gap-7 lg:flex" aria-label="Principal">
              {leftNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  data-active={pathname === item.href}
                  className={cn(
                    "nav-underline text-[11px] uppercase tracking-[0.22em]",
                    overHero ? "text-ivory" : "text-ink",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <Link href="/" className="justify-self-center" aria-label={`${site.shortName} — início`}>
            <Logo
              tone={overHero ? "light" : "dark"}
              markClassName={cn(
                "h-7 sm:h-9 lg:h-11 transition-[height,color,filter] duration-500",
                scrolled && "lg:h-8",
              )}
            />
          </Link>

          <div className={cn("flex items-center justify-end gap-1 sm:gap-5", overHero && "drop-shadow-[0_1px_8px_rgb(27_23_20_/_0.45)]")}>
            <nav className="hidden items-center gap-7 xl:flex" aria-label="Secundária">
              {rightNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  data-active={pathname === item.href}
                  className={cn(
                    "nav-underline text-[11px] uppercase tracking-[0.22em]",
                    overHero ? "text-ivory" : "text-ink",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="inline-flex size-11 items-center justify-center"
              aria-label="Buscar"
            >
              <SearchIcon className="size-4.5 h-4 w-4" />
            </button>
            <a
              href={site.social.instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden size-10 items-center justify-center sm:inline-flex"
              aria-label="Instagram da Felizzi"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <CartButton inverted={overHero} />
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
