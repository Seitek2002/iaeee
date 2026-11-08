"use client";

import { useMemo } from "react";

import {
  ProgramControls,
  countByCountry,
  filterSessions,
  useProgramFilterStore,
} from "@/features/program-filter";

import type {
  ConferenceSession,
  Lang,
  ProgramDay,
  ProgramItem,
} from "@/shared/api";
import { cn, pick } from "@/shared/lib";

import { TalkRow } from "./talk-row";

const T = {
  ru: {
    moderators: "Модераторы",
    plenary: "Пленарная сессия",
    technical: "Секционное заседание",
    workshop: "Семинар",
    found: "Найдено докладов",
    nothing: "Докладов не нашлось",
    nothingHint:
      "Попробуйте фамилию докладчика, город или ключевое слово — например, «сейсмоизоляция».",
    reset: "Сбросить фильтры",
  },
  en: {
    moderators: "Moderators",
    plenary: "Plenary session",
    technical: "Technical session",
    workshop: "Workshop",
    found: "Papers found",
    nothing: "No papers found",
    nothingHint:
      "Try a speaker’s surname, a city or a keyword such as “isolation”.",
    reset: "Reset filters",
  },
};

const KIND_DOT: Record<ProgramItem["kind"], string> = {
  session: "bg-apricot",
  ceremony: "bg-lake",
  roundtable: "bg-lake",
  meeting: "bg-lake-soft",
  tour: "bg-apricot",
  break: "bg-haze",
  social: "bg-haze",
  logistics: "bg-haze",
};

function sessionLabel(s: ConferenceSession, lang: Lang) {
  const t = T[lang];
  if (s.kind === "plenary") return `${t.plenary} ${s.number}`;
  return s.kind === "technical" ? t.technical : t.workshop;
}

function SessionBlock({
  session,
  talks,
  lang,
  dayLabel,
}: {
  dayLabel?: string;
  lang: Lang;
  session: ConferenceSession;
  talks: ConferenceSession["talks"];
}) {
  const t = T[lang];
  return (
    <div className="rounded-3xl border border-haze bg-white p-5 sm:p-7">
      <p className="text-small font-semibold">
        <span className="text-ember">{sessionLabel(session, lang)}</span>
        <span className="ml-3 font-normal text-ink-muted tabular">
          {dayLabel ? `${dayLabel}, ` : ""}
          {session.time}
        </span>
      </p>
      <h3 className="mt-2 font-conf-display text-c-h3 text-balance">
        {pick(session.title, lang)}
      </h3>
      <p className="mt-3 text-small text-ink-muted">
        {t.moderators}:{" "}
        <span className="text-ink">{pick(session.moderators, lang)}</span>
      </p>
      {talks.length > 0 && (
        <ul className="mt-5">
          {talks.map((talk) => (
            <TalkRow
              key={`${session.id}-${talk.time}`}
              talk={talk}
              lang={lang}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

function dayName(date: string, lang: Lang) {
  return new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "ru-RU", {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`));
}

export function ProgramView({
  days,
  sessions,
  lang,
}: {
  days: ProgramDay[];
  lang: Lang;
  sessions: ConferenceSession[];
}) {
  const t = T[lang];
  const day = useProgramFilterStore((s) => s.day) ?? days[0].date;
  const query = useProgramFilterStore((s) => s.query);
  const country = useProgramFilterStore((s) => s.country);
  const reset = useProgramFilterStore((s) => s.reset);

  const countries = useMemo(() => countByCountry(sessions), [sessions]);
  const searching = query.trim() !== "" || country !== "all";
  const results = useMemo(
    () => (searching ? filterSessions(sessions, query, country) : []),
    [searching, sessions, query, country],
  );
  const byId = useMemo(
    () => new Map(sessions.map((s) => [s.id, s])),
    [sessions],
  );
  const dayOf = (id: string) =>
    days.find((d) => d.items.some((i) => i.sessionId === id))?.date;
  const current = days.find((d) => d.date === day) ?? days[0];
  const found = results.reduce((n, r) => n + r.talks.length, 0);

  return (
    <div>
      <div className="sticky top-[72px] z-20 -mx-5 bg-snow/95 px-5 py-4 backdrop-blur-md sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
        <ProgramControls days={days} countries={countries} lang={lang} />
      </div>

      {searching ? (
        <div className="mt-6">
          <p aria-live="polite" className="text-small text-ink-muted">
            {t.found}:{" "}
            <span className="font-semibold text-ink tabular">{found}</span>
          </p>
          {results.length === 0 ? (
            <div className="mt-6 rounded-3xl border border-haze bg-white p-8">
              <p className="font-conf-display text-c-h3">{t.nothing}</p>
              <p className="mt-2 text-ink-muted">{t.nothingHint}</p>
              <button
                type="button"
                onClick={reset}
                className="mt-6 h-10 rounded-full border border-lake px-5 text-small font-medium hover:bg-lake hover:text-snow"
              >
                {t.reset}
              </button>
            </div>
          ) : (
            <div className="mt-6 grid gap-5">
              {results.map(({ session, talks }) => {
                const d = dayOf(session.id);
                return (
                  <SessionBlock
                    key={session.id}
                    session={session}
                    talks={talks}
                    lang={lang}
                    dayLabel={d ? dayName(d, lang) : undefined}
                  />
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <section
          key={current.date}
          aria-label={dayName(current.date, lang)}
          className="mt-6 animate-fade"
        >
          <p className="text-small text-ink-muted">
            {pick(current.place, lang)}
          </p>
          <ol className="mt-4 grid gap-3">
            {current.items.map((item, i) => {
              const session = item.sessionId
                ? byId.get(item.sessionId)
                : undefined;
              return (
                <li
                  key={i}
                  className="grid gap-2 sm:grid-cols-[5rem_1fr] sm:gap-4"
                >
                  <span className="pt-3 font-conf-display text-[0.9375rem] font-semibold tabular sm:pt-5">
                    {item.time}
                  </span>
                  {session ? (
                    <SessionBlock
                      session={session}
                      talks={session.talks}
                      lang={lang}
                    />
                  ) : (
                    <div
                      className={cn(
                        "flex items-start gap-3 rounded-2xl px-5 py-4",
                        ["break", "social", "logistics"].includes(item.kind)
                          ? "bg-transparent"
                          : "border border-haze bg-white",
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "mt-2 size-2 shrink-0 rounded-full",
                          KIND_DOT[item.kind],
                        )}
                      />
                      <div>
                        <p
                          className={cn(
                            "leading-snug",
                            ["break", "social", "logistics"].includes(item.kind)
                              ? "text-ink-muted"
                              : "font-medium",
                          )}
                        >
                          {pick(item.title, lang)}
                        </p>
                        {item.note && (
                          <p className="mt-1.5 text-small leading-relaxed text-ink-muted">
                            {pick(item.note, lang)}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </section>
      )}
    </div>
  );
}
