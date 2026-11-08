"use client";

import { useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { Lang } from "@/shared/api";
import {
  CONFERENCE_DATES,
  CONF_NAV,
  CONF_UI,
  ROUTES,
  confHref,
  confSwitchHref,
} from "@/shared/config";
import { cn, eventStatus, useScrollLock } from "@/shared/lib";
import { CloseIcon, ConferenceMark, MenuIcon } from "@/shared/ui";

function LangSwitch({ lang, pathname }: { lang: Lang; pathname: string }) {
  return (
    <div
      role="group"
      aria-label={CONF_UI[lang].langLabel}
      className="flex rounded-full border border-glacier/30 p-0.5 text-[0.8125rem] font-medium"
    >
      {(["ru", "en"] as const).map((l) => (
        <Link
          key={l}
          href={confSwitchHref(pathname, l)}
          hrefLang={l}
          aria-current={l === lang ? "true" : undefined}
          className={cn(
            "rounded-full px-2.5 py-1 uppercase transition-colors",
            l === lang ? "bg-snow text-lake" : "text-glacier hover:text-snow",
          )}
        >
          {l}
        </Link>
      ))}
    </div>
  );
}

export function ConferenceHeader({ lang }: { lang: Lang }) {
  const pathname = usePathname() ?? "/conference";
  const ui = CONF_UI[lang];
  const [open, setOpen] = useState(false);
  useScrollLock(open);

  const close = () => setOpen(false);

  const status = eventStatus(CONFERENCE_DATES.start, CONFERENCE_DATES.end);
  const cta =
    status === "finished"
      ? { href: confHref(lang, "/program"), label: ui.program }
      : {
          href: confHref(lang, "/participation", "registration"),
          label: ui.register,
        };

  const isActive = (path: string) =>
    pathname.replace(/\/$/, "") ===
    confHref(lang, path as "").replace(/\/$/, "");

  return (
    <>
      <header className="on-dark sticky top-0 z-40 border-b border-glacier/15 bg-lake/95 text-snow backdrop-blur-md">
        <div className="mx-auto flex h-[72px] w-full max-w-site items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
          <Link
            href={confHref(lang)}
            className="flex items-center gap-3"
            aria-label={`ICEE 2026 — ${ui.brandSub}`}
          >
            <ConferenceMark />
            <span className="leading-tight">
              <span className="block font-conf-display text-[0.9375rem] font-semibold tracking-[0.02em]">
                ICEE 2026
              </span>
              <span className="hidden text-[0.75rem] text-glacier sm:block">
                {ui.brandSub}
              </span>
            </span>
          </Link>

          <nav aria-label={ui.program} className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {CONF_NAV.map((item) => {
                const active = isActive(item.path);
                return (
                  <li key={item.path}>
                    <Link
                      href={confHref(lang, item.path)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "rounded-full px-3.5 py-2 text-[0.9375rem] transition-colors",
                        active
                          ? "bg-snow/10 text-snow"
                          : "text-glacier hover:text-snow",
                      )}
                    >
                      {item.label[lang]}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <LangSwitch lang={lang} pathname={pathname} />
            </div>
            <Link
              href={cta.href}
              className="hidden h-10 items-center rounded-full bg-apricot px-5 text-[0.875rem] font-semibold text-lake transition-colors hover:bg-[#f7b57d] sm:inline-flex"
            >
              {cta.label}
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="conf-menu"
              aria-label={open ? ui.menuClose : ui.menuOpen}
              className="-mr-2 grid size-11 place-items-center lg:hidden"
            >
              {open ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </header>
      {/* Меню — вне <header>: backdrop-blur шапки делает её контейнером
        для fixed-потомков, и меню схлопнулось бы до высоты шапки. */}
      <div
        id="conf-menu"
        hidden={!open}
        className="on-dark fixed inset-x-0 top-[72px] bottom-0 z-40 overflow-y-auto bg-lake text-snow lg:hidden"
      >
        <div className="flex min-h-full flex-col px-5 pt-4 pb-10 sm:px-8">
          <ul>
            <li className="border-b border-glacier/15">
              <Link
                href={confHref(lang)}
                onClick={close}
                className="block py-4 font-conf-display text-[1.25rem]"
              >
                ICEE 2026
              </Link>
            </li>
            {CONF_NAV.map((item) => (
              <li key={item.path} className="border-b border-glacier/15">
                <Link
                  href={confHref(lang, item.path)}
                  onClick={close}
                  className="block py-4 font-conf-display text-[1.25rem]"
                >
                  {item.label[lang]}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex items-center justify-between">
            <LangSwitch lang={lang} pathname={pathname} />
            <Link
              href={ROUTES.home}
              onClick={close}
              className="text-small text-glacier underline-offset-4 hover:underline"
            >
              {ui.backToIaeee}
            </Link>
          </div>
          <Link
            href={cta.href}
            onClick={close}
            className="mt-auto inline-flex h-12 items-center justify-center rounded-full bg-apricot font-semibold text-lake"
          >
            {cta.label}
          </Link>
        </div>
      </div>
    </>
  );
}
