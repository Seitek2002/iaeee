import Link from "next/link";

import { KeyDates } from "@/widgets/key-dates";

import { countByCountry } from "@/features/program-filter";

import {
  type Lang,
  getConference,
  getConferenceEditions,
  getConferenceProgram,
} from "@/shared/api";
import { CONF_UI, COUNTRY_NAME, ROUTES, confHref } from "@/shared/config";
import { pick, plural, telHref, whatsappHref } from "@/shared/lib";
import {
  ArrowUpRightIcon,
  ConfCard,
  ConfDocList,
  ConfHeading,
  Container,
  PillLink,
} from "@/shared/ui";

import { ConferenceHero } from "./conference-hero";

const EN_PLURAL = (n: number, one: string, many: string) =>
  n === 1 ? one : many;

export async function ConferenceHomePage({ lang }: { lang: Lang }) {
  const ui = CONF_UI[lang];
  const [conf, program, editions] = await Promise.all([
    getConference(),
    getConferenceProgram(),
    getConferenceEditions(),
  ]);

  const plenary = program.sessions.filter((s) => s.kind === "plenary");
  const talksCount = program.sessions.reduce((n, s) => n + s.talks.length, 0);
  const countries = countByCountry(program.sessions);
  const dayOf = (sessionId: string) =>
    program.days.find((d) => d.items.some((i) => i.sessionId === sessionId))
      ?.date;

  const geoSentence =
    lang === "en"
      ? `${talksCount} papers from ${countries.length} countries in ${plenary.length} plenary sessions and a technical session`
      : `${talksCount} ${plural(talksCount, ["доклад", "доклада", "докладов"])} из ${countries.length} ${plural(countries.length, ["страны", "стран", "стран"])} — ${plenary.length} пленарных сессий и секционное заседание`;

  return (
    <>
      <ConferenceHero conf={conf} lang={lang} />

      {/* Докладчики по странам */}
      <section aria-labelledby="geo" className="py-16 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-12">
          <h2 id="geo" className="sr-only">
            {ui.speakersGeo}
          </h2>
          <p className="font-conf-display text-c-h2 text-balance lg:col-span-7">
            {geoSentence}
          </p>
          <ul className="flex flex-wrap content-start gap-2 lg:col-span-5">
            {countries.map(([code, n]) => (
              <li
                key={code}
                className="inline-flex items-center gap-2 rounded-full border border-haze bg-white px-4 py-2 text-small"
              >
                {COUNTRY_NAME[code][lang]}
                <span className="font-semibold tabular text-ink-muted">
                  {n}
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* О конференции */}
      <section aria-labelledby="about" className="pb-16 md:pb-24">
        <Container className="grid gap-6 lg:grid-cols-12">
          <ConfCard className="lg:col-span-7">
            <h2 id="about" className="font-conf-display text-c-h3">
              {ui.goals}
            </h2>
            <ol className="mt-6 grid gap-5">
              {conf.goals.map((g, i) => (
                <li key={i} className="flex gap-4">
                  <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-apricot-soft text-small font-semibold text-lake">
                    {i + 1}
                  </span>
                  <p className="leading-relaxed">{pick(g, lang)}</p>
                </li>
              ))}
            </ol>
            <p className="mt-8 border-t border-haze pt-6 leading-relaxed text-ink-muted">
              {pick(conf.welcome, lang)}
            </p>
          </ConfCard>
          <div className="grid gap-6 lg:col-span-5">
            <ConfCard>
              <h3 className="font-conf-display text-c-h3">{ui.organizers}</h3>
              <ul className="mt-5 grid gap-3">
                {conf.organizers.map((o, i) => (
                  <li key={i} className="leading-snug">
                    {pick(o, lang)}
                  </li>
                ))}
              </ul>
            </ConfCard>
            <ConfCard>
              <h3 className="font-conf-display text-c-h3">{ui.format}</h3>
              <ul className="mt-5 grid gap-2.5">
                {conf.format.map((f, i) => (
                  <li key={i} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 size-1.5 shrink-0 rounded-full bg-apricot"
                    />
                    {pick(f, lang)}
                  </li>
                ))}
              </ul>
            </ConfCard>
          </div>
        </Container>
      </section>

      {/* Две части конференции */}
      <section
        aria-labelledby="venues"
        className="on-dark bg-lake py-16 text-snow md:py-24"
      >
        <Container>
          <ConfHeading id="venues" title={ui.venues} tone="dark" />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {conf.venues.map((v, i) => (
              <article
                key={v.id}
                className="flex flex-col rounded-3xl bg-snow/6 p-6 sm:p-8"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-conf-display text-[3rem] leading-none font-bold text-apricot">
                    {i + 1}
                  </span>
                  <span className="font-conf-display text-[1.0625rem] font-semibold">
                    {pick(v.dates, lang)}
                  </span>
                </div>
                <h3 className="mt-6 font-conf-display text-c-h3">
                  {pick(v.name, lang)}
                </h3>
                <p className="mt-1 text-glacier">{pick(v.address, lang)}</p>
                <ul className="mt-6 grid gap-2">
                  {v.program.map((p, j) => (
                    <li key={j} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-2.5 size-1.5 shrink-0 rounded-full bg-apricot"
                      />
                      {pick(p, lang)}
                    </li>
                  ))}
                </ul>
                <a
                  href={v.map}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-1.5 self-start pt-8 text-small text-glacier underline-offset-4 hover:text-snow hover:underline"
                >
                  {ui.onMap}
                  <ArrowUpRightIcon size={15} />
                </a>
              </article>
            ))}
          </div>

          <h3 className="mt-14 font-conf-display text-c-h3">{ui.tours}</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {conf.tours.map((t, i) => (
              <div key={i} className="rounded-2xl border border-glacier/20 p-5">
                <p className="text-small text-apricot">{pick(t.time, lang)}</p>
                <p className="mt-2 font-semibold">{pick(t.title, lang)}</p>
                <p className="mt-1.5 text-small leading-relaxed text-glacier">
                  {pick(t.text, lang)}
                </p>
                <p className="mt-3 text-small text-glacier">
                  {pick(t.place, lang)}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Пленарные сессии */}
      <section aria-labelledby="sessions" className="py-16 md:py-24">
        <Container>
          <ConfHeading
            id="sessions"
            title={ui.sessionsTitle}
            action={
              <PillLink
                href={confHref(lang, "/program")}
                variant="outline"
                small
              >
                {ui.fullProgram}
              </PillLink>
            }
          />
          <ol className="mt-10 grid gap-3">
            {plenary.map((s) => {
              const date = dayOf(s.id);
              return (
                <li key={s.id}>
                  <Link
                    href={confHref(lang, "/program")}
                    className="group grid grid-cols-[3rem_1fr] items-center gap-4 rounded-2xl border border-haze bg-white px-5 py-4 transition-colors hover:border-lake/40 sm:grid-cols-[3.5rem_1fr_auto]"
                  >
                    <span className="font-conf-display text-[1.5rem] font-bold text-apricot tabular">
                      {s.number}
                    </span>
                    <span className="leading-snug font-medium group-hover:underline group-hover:underline-offset-4">
                      {pick(s.title, lang)}
                    </span>
                    <span className="col-start-2 text-small text-ink-muted tabular sm:col-start-3 sm:text-right">
                      {date &&
                        new Intl.DateTimeFormat(
                          lang === "en" ? "en-GB" : "ru-RU",
                          {
                            day: "numeric",
                            month: "long",
                            timeZone: "UTC",
                          },
                        ).format(new Date(`${date}T12:00:00Z`))}
                      , {s.time}
                      <span className="ml-3">
                        {s.talks.length}{" "}
                        {lang === "en"
                          ? EN_PLURAL(s.talks.length, "paper", "papers")
                          : plural(s.talks.length, [
                              "доклад",
                              "доклада",
                              "докладов",
                            ])}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </Container>
      </section>

      {/* Темы и круглые столы */}
      <section aria-labelledby="topics" className="pb-16 md:pb-24">
        <Container className="grid gap-6 lg:grid-cols-12">
          <ConfCard className="lg:col-span-7">
            <h2 id="topics" className="font-conf-display text-c-h3">
              {ui.topics}
            </h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {conf.topics.map((t, i) => (
                <li
                  key={i}
                  className="rounded-full bg-snow px-4 py-2 text-small leading-snug"
                >
                  {pick(t, lang)}
                </li>
              ))}
            </ul>
          </ConfCard>
          <ConfCard className="lg:col-span-5">
            <h3 className="font-conf-display text-c-h3">{ui.roundTables}</h3>
            <ul className="mt-6 grid gap-4">
              {conf.roundTables.map((r, i) => (
                <li
                  key={i}
                  className="border-t border-haze pt-4 leading-snug first:border-t-0 first:pt-0"
                >
                  {pick(r, lang)}
                </li>
              ))}
            </ul>
          </ConfCard>
        </Container>
      </section>

      {/* Ключевые даты */}
      <section aria-labelledby="dates" className="pb-16 md:pb-24">
        <Container>
          <ConfHeading id="dates" title={ui.keyDates} className="mb-10" />
          <div className="rounded-3xl border border-haze bg-haze">
            <KeyDates items={conf.keyDates} lang={lang} />
          </div>
        </Container>
      </section>

      {/* Публикация и материалы */}
      <section
        aria-labelledby="materials"
        className="on-dark bg-lake py-16 text-snow md:py-24"
      >
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 id="materials" className="font-conf-display text-c-h2">
              {ui.publication}
            </h2>
            <p className="mt-5 max-w-lg text-lead text-glacier">
              {pick(conf.publication, lang)}
            </p>
            <PillLink href={ROUTES.issue("2026-1")} className="mt-8">
              {ui.openIssue}
            </PillLink>
            <p className="mt-10 max-w-lg text-small text-glacier">
              {pick(conf.online, lang)}
            </p>
          </div>
          <div className="lg:col-span-6">
            <h3 className="font-conf-display text-c-h3">{ui.materials}</h3>
            <ConfDocList
              tone="dark"
              className="mt-5"
              docs={conf.documents
                .filter((d) => d.kind === "pdf")
                .filter((d) =>
                  lang === "en"
                    ? !/№ 1$/.test(d.title.ru)
                    : !/английский/.test(d.title.ru),
                )
                .map((d) => ({
                  kind: d.kind,
                  title: pick(d.title, lang),
                  url: d.url,
                }))}
            />
          </div>
        </Container>
      </section>

      {/* Оргкомитет и архив */}
      <section aria-labelledby="committee" className="py-16 md:py-24">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ConfHeading id="committee" title={ui.contacts} />
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {conf.committee.map((p) => (
                <li
                  key={p.phone}
                  className="rounded-2xl border border-haze bg-white p-5"
                >
                  <p className="text-small text-ink-muted">
                    {pick(p.role, lang)}
                  </p>
                  <p className="mt-1.5 font-semibold">{pick(p.name, lang)}</p>
                  <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-small">
                    <a
                      href={telHref(p.phone)}
                      className="tabular underline-offset-4 hover:underline"
                    >
                      {p.phone}
                    </a>
                    <a
                      href={whatsappHref(p.phone)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink-muted underline-offset-4 hover:text-ink hover:underline"
                    >
                      WhatsApp
                    </a>
                  </p>
                  {p.email && (
                    <a
                      href={`mailto:${p.email}`}
                      className="mt-1 block text-small underline-offset-4 hover:underline"
                    >
                      {p.email}
                    </a>
                  )}
                </li>
              ))}
              <li className="rounded-2xl bg-lake p-5 text-snow">
                <p className="text-small text-glacier">E-mail</p>
                <a
                  href="mailto:seismokg@mail.ru"
                  className="mt-1.5 block font-semibold underline-offset-4 hover:underline"
                >
                  seismokg@mail.ru
                </a>
                <p className="mt-3 text-small text-glacier">
                  {lang === "en"
                    ? "Papers, presentations and general questions"
                    : "Статьи, презентации и общие вопросы"}
                </p>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-5">
            <ConfHeading
              title={ui.archive}
              action={
                <PillLink
                  href={confHref(lang, "/archive")}
                  variant="outline"
                  small
                >
                  {lang === "en" ? "Archive" : "Архив"}
                </PillLink>
              }
            />
            <ol className="mt-8 grid grid-cols-3 gap-3">
              {editions.map((e) => (
                <li key={e.number}>
                  <Link
                    href={confHref(lang, "/archive", `edition-${e.number}`)}
                    className="flex aspect-square flex-col justify-between rounded-2xl border border-haze bg-white p-4 transition-colors hover:border-lake/40"
                  >
                    <span className="font-conf-display text-[1.75rem] leading-none font-bold text-lake">
                      {e.number}
                    </span>
                    <span className="text-small text-ink-muted tabular">
                      {e.year ?? "—"}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>
    </>
  );
}
