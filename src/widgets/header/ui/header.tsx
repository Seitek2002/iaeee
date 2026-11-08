"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SearchTrigger } from "@/features/global-search";

import { MAIN_NAV, ROUTES } from "@/shared/config";
import { cn } from "@/shared/lib";
import { ButtonLink, CloseIcon, Container, Logo, MenuIcon } from "@/shared/ui";

import { useMenuStore } from "../model/store";
import { MobileMenu } from "./mobile-menu";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname() ?? "/";
  const open = useMenuStore((s) => s.open);
  const toggle = useMenuStore((s) => s.toggle);
  const close = useMenuStore((s) => s.close);
  const [scrolled, setScrolled] = useState(false);

  // Меню закрывается при переходе на другую страницу.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    if (open) close();
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[70] bg-petrol px-4 py-3 text-film focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Перейти к содержанию
      </a>
      <header
        className={cn(
          "sticky top-0 z-40 border-b transition-colors duration-200",
          scrolled || open
            ? "border-rule bg-film/92 backdrop-blur-md"
            : "border-transparent bg-film",
        )}
      >
        <Container className="flex h-[72px] items-center justify-between gap-6">
          <Link
            href={ROUTES.home}
            aria-label="МАЭСС — на главную"
            className="shrink-0"
          >
            <Logo />
          </Link>

          <nav aria-label="Основная навигация" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {MAIN_NAV.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative inline-flex h-10 items-center px-3 text-[0.9375rem] transition-colors",
                        active
                          ? "text-petrol"
                          : "text-petrol/70 hover:text-petrol",
                      )}
                    >
                      {item.label}
                      {active && (
                        <span className="absolute inset-x-3 -bottom-[15px] h-[2px] bg-amber" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <SearchTrigger />
            <ButtonLink
              href={ROUTES.membership}
              size="sm"
              className="hidden sm:inline-flex"
            >
              Вступить в ассоциацию
            </ButtonLink>
            <button
              type="button"
              onClick={toggle}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Закрыть меню" : "Открыть меню"}
              className="-mr-2 grid size-11 place-items-center xl:hidden"
            >
              {open ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </Container>
      </header>
      <MobileMenu open={open} pathname={pathname} />
    </>
  );
}
