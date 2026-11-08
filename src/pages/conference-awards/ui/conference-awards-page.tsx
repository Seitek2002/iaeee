import { type Lang, getAwards } from "@/shared/api";
import { ROUTES, confHref } from "@/shared/config";
import { pick } from "@/shared/lib";
import {
  ConfCard,
  ConfDocList,
  ConfHeading,
  ConfPageHead,
  Container,
  PillLink,
} from "@/shared/ui";

const T = {
  ru: {
    title: "Награды МАЭСС",
    lead: "Медали и знаки ассоциации вручаются на конференции за вклад в сейсмостойкое строительство, исследования и развитие науки и техники.",
    basis:
      "Положение утверждено решением Президиума МАЭСС, протокол № 3/23 от 5 апреля 2023 года.",
    procedure: "Порядок представления",
    example: "Так это выглядит",
    exampleText:
      "В ноябре 2024 года директору ЦНИИСК им. В. А. Кучеренко и президенту РАСС И. И. Ведякову вручена медаль «Заслуженный деятель в области сейсмостойкого строительства» I степени — за крупные инновационные проекты, улучшившие сейсмостойкость сооружений.",
    exampleLink: "Новость о вручении",
    support: "Поддержать ассоциацию",
    purposes: "Взнос можно направить",
    gold: "золото",
    silver: "серебро",
  },
  en: {
    title: "IAEEE Awards",
    lead: "The association’s medals and badges are presented at the conference for contributions to earthquake engineering, research and the development of science and technology.",
    basis:
      "The regulation was approved by the IAEEE Presidium, minutes No. 3/23 of April 5, 2023.",
    procedure: "Nomination procedure",
    example: "In practice",
    exampleText:
      "In November 2024, Ivan Vedyakov, Director of TsNIISK n.a. V. A. Kucherenko and President of RAEE, received the 1st-degree medal “Distinguished Person in the Field of Earthquake-Resistant Construction” for major innovative projects that improved seismic resistance.",
    exampleLink: "News about the award",
    support: "Support the association",
    purposes: "Contributions can support",
    gold: "gold",
    silver: "silver",
  },
};

/** Схема медали: кольцо, в центре — здание и волна колебаний, как в положении. */
function MedalGlyph({
  size,
  metal,
}: {
  metal: "gold" | "silver";
  size: number;
}) {
  const fill = metal === "gold" ? "#d9a944" : "#b9c3cf";
  const ring = metal === "gold" ? "#a87a1c" : "#7d8896";
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="30" fill={fill} />
      <circle
        cx="32"
        cy="32"
        r="25"
        fill="none"
        stroke={ring}
        strokeWidth="1.2"
      />
      <path
        d="M24 42V24l8-5 8 5v18"
        fill="none"
        stroke={ring}
        strokeWidth="1.6"
      />
      <path d="M28 30h2m4 0h2m-8 6h2m4 0h2" stroke={ring} strokeWidth="1.6" />
      <path
        d="M14 46h6l2-3 2 5 2-6 2 7 2-5 2 4 2-3 2 2 2-1h10"
        fill="none"
        stroke={ring}
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const DIAMETER: Record<string, number> = {
  contribution: 40,
  research: 45,
  construction: 45,
  science: 70,
};

export async function ConferenceAwardsPage({ lang }: { lang: Lang }) {
  const t = T[lang];
  const { awards, rules, donation } = await getAwards();

  return (
    <>
      <ConfPageHead
        eyebrow={
          <a
            href={confHref(lang)}
            className="underline-offset-4 hover:text-snow hover:underline"
          >
            ICEE 2026
          </a>
        }
        title={t.title}
        lead={t.lead}
      />

      <Container className="grid gap-16 py-14 md:gap-24 md:py-20">
        <section aria-label={t.title}>
          <ul className="grid gap-6 md:grid-cols-2">
            {awards.map((a) => {
              const px = Math.round(DIAMETER[a.id] * 1.45);
              return (
                <li key={a.id}>
                  <ConfCard className="flex h-full flex-col">
                    <div className="flex h-[110px] items-end gap-3">
                      {a.degrees ? (
                        <>
                          <MedalGlyph size={px} metal="gold" />
                          <MedalGlyph size={px} metal="silver" />
                        </>
                      ) : (
                        <MedalGlyph size={px} metal="silver" />
                      )}
                    </div>
                    <h2 className="mt-6 font-conf-display text-c-h3 text-balance">
                      {pick(a.name, lang)}
                    </h2>
                    <p className="mt-2 text-small text-ink-muted">
                      {pick(a.spec, lang)}
                    </p>
                    <p className="mt-4 leading-relaxed">
                      {pick(a.description, lang)}
                    </p>
                    {a.degrees && (
                      <ul className="mt-4 grid gap-2 border-t border-haze pt-4 text-small leading-relaxed">
                        {a.degrees.map((d, i) => (
                          <li key={i}>{pick(d, lang)}</li>
                        ))}
                      </ul>
                    )}
                  </ConfCard>
                </li>
              );
            })}
          </ul>
        </section>

        <section
          aria-labelledby="procedure"
          className="grid gap-6 lg:grid-cols-12"
        >
          <ConfCard className="lg:col-span-7">
            <h2 id="procedure" className="font-conf-display text-c-h2">
              {t.procedure}
            </h2>
            <ol className="mt-6 grid gap-4">
              {rules.map((r, i) => (
                <li key={i} className="flex gap-4 leading-relaxed">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-apricot-soft text-small font-semibold text-lake">
                    {i + 1}
                  </span>
                  {pick(r, lang)}
                </li>
              ))}
            </ol>
            <p className="mt-6 border-t border-haze pt-5 text-small text-ink-muted">
              {t.basis}
            </p>
            <ConfDocList
              className="mt-5"
              docs={[
                {
                  kind: donation.regulation.kind,
                  title: pick(donation.regulation.title, lang),
                  url: donation.regulation.url,
                },
              ]}
            />
          </ConfCard>
          <div className="on-dark flex flex-col rounded-3xl bg-lake p-6 text-snow sm:p-8 lg:col-span-5">
            <h2 className="font-conf-display text-c-h3">{t.example}</h2>
            <p className="mt-4 leading-relaxed text-glacier">{t.exampleText}</p>
            <PillLink
              href={ROUTES.newsItem("guest-lecture-dynamics-2024")}
              variant="ghost-dark"
              small
              className="mt-auto self-start"
            >
              {t.exampleLink}
            </PillLink>
          </div>
        </section>

        <section aria-labelledby="support">
          <ConfHeading
            id="support"
            title={t.support}
            lead={pick(donation.text, lang)}
            className="mb-8"
          />
          <div className="grid gap-6 lg:grid-cols-12">
            <ConfCard className="lg:col-span-7">
              <h3 className="font-conf-display text-c-h3">{t.purposes}</h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {donation.purposes.map((p, i) => (
                  <li
                    key={i}
                    className="rounded-full bg-snow px-4 py-2 text-small"
                  >
                    {pick(p, lang)}
                  </li>
                ))}
              </ul>
            </ConfCard>
            <div className="lg:col-span-5">
              <ConfDocList
                docs={donation.documents
                  .filter((d) =>
                    lang === "en"
                      ? /English|английский/.test(d.title.ru)
                      : !/английский/.test(d.title.ru),
                  )
                  .map((d) => ({
                    kind: d.kind,
                    title: pick(d.title, lang),
                    url: d.url,
                  }))}
              />
              <p className="mt-4 text-small text-ink-muted">
                {lang === "en"
                  ? "Questions: Chief Accountant Azharkan Duishokoeva, +996 707 75 25 57, seismokg@mail.ru"
                  : "Вопросы — главный бухгалтер Ажаркан Дуйшокоева, +996 707 75 25 57, seismokg@mail.ru"}
              </p>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
}
