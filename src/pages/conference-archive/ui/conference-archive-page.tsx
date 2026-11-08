import Image from "next/image";

import { type Lang, getConferenceEditions } from "@/shared/api";
import { confHref } from "@/shared/config";
import { cn, pick } from "@/shared/lib";
import { ConfDocList, ConfPageHead, Container, PillLink } from "@/shared/ui";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const T = {
  ru: {
    title: "Архив конференций",
    lead: "Международная научно-практическая конференция по сейсмостойкому строительству проходит с 2016 года — в Бишкеке и на Иссык-Куле.",
    topics: "Темы",
    roundTables: "Круглые столы",
    materials: "Материалы",
    current: "Сайт VI конференции",
  },
  en: {
    title: "Conference archive",
    lead: "The International Scientific and Practical Conference on Earthquake Engineering has been held since 2016 — in Bishkek and on Issyk-Kul.",
    topics: "Topics",
    roundTables: "Round tables",
    materials: "Materials",
    current: "VI conference website",
  },
};

const BANNERS: Record<string, string> = {
  VI: `${BASE_PATH}/images/conference/banner-vi-2026.jpg`,
  V: `${BASE_PATH}/images/conference/banner-v-2024.jpg`,
};

export async function ConferenceArchivePage({ lang }: { lang: Lang }) {
  const t = T[lang];
  const editions = await getConferenceEditions();

  return (
    <>
      <ConfPageHead
        eyebrow={
          <a
            href={confHref(lang)}
            className="underline-offset-4 hover:text-snow hover:underline"
          >
            ICEE
          </a>
        }
        title={t.title}
        lead={t.lead}
      />
      <Container className="py-14 md:py-20">
        <ol className="grid gap-6">
          {editions.map((e) => {
            const banner = BANNERS[e.number];
            const muted = e.year === null;
            return (
              <li
                key={e.number}
                id={`edition-${e.number}`}
                className={cn(
                  "scroll-mt-24 grid gap-6 rounded-3xl border p-6 sm:p-8 lg:grid-cols-12",
                  muted
                    ? "border-dashed border-haze bg-transparent"
                    : "border-haze bg-white",
                )}
              >
                <div className="lg:col-span-3">
                  <p
                    className={cn(
                      "font-conf-display text-[clamp(3.5rem,2.5rem+3vw,5.5rem)] leading-none font-bold",
                      muted
                        ? "text-haze"
                        : e.number === "VI"
                          ? "text-apricot"
                          : "text-lake",
                    )}
                  >
                    {e.number}
                  </p>
                  <p className="mt-4 font-conf-display text-[1.0625rem] font-semibold">
                    {pick(e.dates, lang)}
                  </p>
                  <p className="mt-1 text-small text-ink-muted">
                    {pick(e.venue, lang)}
                  </p>
                </div>
                <div
                  className={cn(
                    "grid gap-6",
                    banner ? "lg:col-span-5" : "lg:col-span-9",
                  )}
                >
                  <p className="leading-relaxed">{pick(e.summary, lang)}</p>
                  {e.topics && (
                    <div>
                      <h3 className="text-small font-semibold">{t.topics}</h3>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {e.topics.map((x, i) => (
                          <li
                            key={i}
                            className="rounded-full bg-snow px-3 py-1.5 text-small"
                          >
                            {pick(x, lang)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {e.roundTables && (
                    <div>
                      <h3 className="text-small font-semibold">
                        {t.roundTables}
                      </h3>
                      <ul className="mt-3 grid gap-1.5 text-small text-ink-muted">
                        {e.roundTables.map((x, i) => (
                          <li key={i}>{pick(x, lang)}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {e.links && (
                    <div>
                      <h3 className="mb-3 text-small font-semibold">
                        {t.materials}
                      </h3>
                      <ConfDocList
                        docs={e.links.map((d) => ({
                          kind: d.kind,
                          title: pick(d.title, lang),
                          url: d.url,
                        }))}
                      />
                    </div>
                  )}
                  {e.number === "VI" && (
                    <PillLink
                      href={confHref(lang)}
                      variant="outline"
                      small
                      className="self-start"
                    >
                      {t.current}
                    </PillLink>
                  )}
                </div>
                {banner && (
                  <div className="relative aspect-[5/3] overflow-hidden rounded-2xl bg-lake lg:col-span-4">
                    <Image
                      src={banner}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 30vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </Container>
    </>
  );
}
