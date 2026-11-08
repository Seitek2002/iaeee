"use client";

import type { ReactNode } from "react";

import { usePathname } from "next/navigation";

import { ConferenceFooter } from "@/widgets/conference-footer";
import { ConferenceHeader } from "@/widgets/conference-header";

import { langFromPath } from "@/shared/config";

/**
 * Каркас сайта конференции: своя шапка, подвал и типографика.
 * Язык берётся из адреса (/conference — русский, /conference/en —
 * английский), поэтому один layout обслуживает обе версии.
 */
export function ConferenceShell({ children }: { children: ReactNode }) {
  const lang = langFromPath(usePathname() ?? "/conference");

  return (
    <div
      lang={lang}
      className="flex flex-1 flex-col bg-snow font-conf-text text-ink"
    >
      <a
        href="#main"
        className="sr-only z-[70] rounded-full bg-apricot px-4 py-3 text-lake focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {lang === "en" ? "Skip to content" : "Перейти к содержанию"}
      </a>
      <ConferenceHeader lang={lang} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <ConferenceFooter lang={lang} />
    </div>
  );
}
