import Link from "next/link";

import type { Lang } from "@/shared/api";
import {
  CONF_NAV,
  CONF_UI,
  ROUTES,
  SITE,
  confHref,
  confSwitchHref,
} from "@/shared/config";
import { ConferenceMark } from "@/shared/ui";

const ORG = {
  ru: [
    "Министерство строительства, архитектуры и ЖКХ Кыргызской Республики",
    "Международная ассоциация экспертов по сейсмостойкому строительству",
  ],
  en: [
    "Ministry of Construction, Architecture and Housing of the Kyrgyz Republic",
    "International Association of Experts on Earthquake Engineering",
  ],
};

export function ConferenceFooter({ lang }: { lang: Lang }) {
  const ui = CONF_UI[lang];
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark bg-lake-deep text-snow">
      <div className="mx-auto w-full max-w-site px-5 pt-16 pb-10 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <ConferenceMark />
              <span className="font-conf-display text-[1rem] font-semibold">
                ICEE 2026
              </span>
            </div>
            <p className="mt-6 max-w-md text-glacier">{ui.organizers}</p>
            <ul className="mt-2 max-w-md space-y-1">
              {ORG[lang].map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </div>
          <nav aria-label={ui.program} className="lg:col-span-3 lg:col-start-7">
            <ul className="space-y-2.5">
              <li>
                <Link href={confHref(lang)} className="hover:text-apricot">
                  ICEE 2026
                </Link>
              </li>
              {CONF_NAV.map((item) => (
                <li key={item.path}>
                  <Link
                    href={confHref(lang, item.path)}
                    className="hover:text-apricot"
                  >
                    {item.label[lang]}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={ROUTES.home} className="hover:text-apricot">
                  {ui.backToIaeee}
                </Link>
              </li>
            </ul>
          </nav>
          <div className="lg:col-span-3">
            <p className="text-glacier">{ui.contacts}</p>
            <address className="mt-3 space-y-2 not-italic">
              <p>
                <a href={`mailto:${SITE.email}`} className="hover:text-apricot">
                  {SITE.email}
                </a>
              </p>
              <p>
                <a href={SITE.phoneHref} className="tabular hover:text-apricot">
                  {SITE.phone}
                </a>{" "}
                <span className="text-glacier">(WhatsApp)</span>
              </p>
              <p className="text-glacier">
                {lang === "en"
                  ? "4/1 Dzhal-29, Bishkek 720038, Kyrgyz Republic"
                  : SITE.addressFull}
              </p>
            </address>
            <p className="mt-6 text-small">
              <Link
                href={confSwitchHref(
                  confHref(lang),
                  lang === "ru" ? "en" : "ru",
                )}
                hrefLang={lang === "ru" ? "en" : "ru"}
                className="text-glacier underline underline-offset-4 hover:text-snow"
              >
                {lang === "ru" ? "English version" : "Русская версия"}
              </Link>
            </p>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-2 border-t border-glacier/15 pt-6 text-small text-glacier sm:flex-row sm:justify-between">
          <p>
            © 2016–{year} {lang === "en" ? "IAEEE" : "МАЭСС"}
          </p>
          <p>
            {ui.footerNote}. {ui.demo}
          </p>
        </div>
      </div>
    </footer>
  );
}
