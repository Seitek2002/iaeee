import { KeyDates } from "@/widgets/key-dates";

import { RegistrationForm } from "@/features/conference-registration";

import { type HotelRate, type Lang, getConference } from "@/shared/api";
import { CONF_UI, confHref } from "@/shared/config";
import {
  eventStatus,
  formatMoney,
  pick,
  telHref,
  whatsappHref,
} from "@/shared/lib";
import {
  ConfCard,
  ConfDocList,
  ConfHeading,
  ConfPageHead,
  Container,
} from "@/shared/ui";

const T = {
  ru: {
    title: "Участие",
    lead: "Как зарегистрироваться, сколько стоит участие и публикация, как оформить статью и где остановиться.",
    closed: "Регистрация на VI конференцию завершилась 12 июня 2026 года.",
    closedHint:
      "Условия ниже сохранены для справки, форма регистрации работает в демо-режиме.",
    steps: "Как участвовать",
    fees: "Взносы",
    fee: "Взнос",
    kgs: "Сом",
    usd: "USD",
    payment: "Оплата",
    bank: "Банковские реквизиты",
    requirements: "Требования к статьям",
    review: "Рецензирование",
    templates: "Образцы и документы",
    stay: "Проживание и трансфер",
    bishkek: "Бишкек",
    lake: "Иссык-Куль, отель «Евразия»",
    body: "Корпус",
    cottage: "Коттедж",
    category: "Номер",
    full: "С питанием",
    room: "Без питания",
    hotelPhones: "Бронирование в отеле",
    help: "Помощь с размещением",
    registration: "Регистрация участника",
    registrationLead:
      "Заявка уходит в оргкомитет; статью и презентацию отправьте на seismokg@mail.ru.",
  },
  en: {
    title: "Participation",
    lead: "How to register, participation and publication fees, paper requirements and where to stay.",
    closed: "Registration for the VI conference closed on June 12, 2026.",
    closedHint:
      "The terms below are kept for reference; the registration form works in demo mode.",
    steps: "How to participate",
    fees: "Fees",
    fee: "Fee",
    kgs: "KGS",
    usd: "USD",
    payment: "Payment",
    bank: "Bank details",
    requirements: "Paper requirements",
    review: "Peer review",
    templates: "Templates and documents",
    stay: "Accommodation and transfer",
    bishkek: "Bishkek",
    lake: "Issyk-Kul, Evrasia Hotel",
    body: "Main building",
    cottage: "Cottage",
    category: "Room",
    full: "Full board",
    room: "Room only",
    hotelPhones: "Hotel bookings",
    help: "Help with accommodation",
    registration: "Participant registration",
    registrationLead:
      "The form goes to the organising committee; send your paper and presentation to seismokg@mail.ru.",
  },
};

function RatesTable({
  title,
  rows,
  lang,
}: {
  lang: Lang;
  rows: HotelRate[];
  title: string;
}) {
  const t = T[lang];
  return (
    <table className="w-full text-left text-small">
      <caption className="pb-3 text-left font-conf-display text-[1rem] font-semibold">
        {title}
      </caption>
      <thead className="text-ink-muted">
        <tr className="border-b border-haze">
          <th scope="col" className="py-2 pr-3 font-normal">
            {t.category}
          </th>
          <th scope="col" className="py-2 pr-3 text-right font-normal">
            {t.full}
          </th>
          <th scope="col" className="py-2 text-right font-normal">
            {t.room}
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr
            key={r.category.ru}
            className="border-b border-haze last:border-b-0"
          >
            <th scope="row" className="py-2.5 pr-3 font-normal">
              {pick(r.category, lang)}
            </th>
            <td className="py-2.5 pr-3 text-right tabular">
              {r.fullBoard ? formatMoney(r.fullBoard, lang) : "—"}
            </td>
            <td className="py-2.5 text-right tabular">
              {formatMoney(r.roomOnly, lang)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export async function ConferenceParticipationPage({ lang }: { lang: Lang }) {
  const t = T[lang];
  const ui = CONF_UI[lang];
  const conf = await getConference();
  const finished = eventStatus(conf.start, conf.end) === "finished";

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
        {finished && (
          <div
            role="status"
            className="flex flex-col gap-1 rounded-3xl border border-apricot bg-apricot-soft/60 p-6 sm:flex-row sm:items-center sm:gap-4"
          >
            <span
              aria-hidden="true"
              className="hidden size-2.5 shrink-0 rounded-full bg-apricot sm:block"
            />
            <p>
              <span className="font-semibold">{t.closed}</span>{" "}
              <span className="text-ink-muted">{t.closedHint}</span>
            </p>
          </div>
        )}

        <section aria-labelledby="steps">
          <ConfHeading id="steps" title={t.steps} className="mb-8" />
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {conf.steps.map((s, i) => (
              <li
                key={i}
                className="rounded-3xl border border-haze bg-white p-6"
              >
                <span className="font-conf-display text-[2rem] leading-none font-bold text-ember">
                  {i + 1}
                </span>
                <p className="mt-5 font-semibold">{pick(s.title, lang)}</p>
                <p className="mt-2 leading-relaxed text-ink-muted">
                  {pick(s.text, lang)}
                </p>
              </li>
            ))}
          </ol>
          <div className="mt-8 rounded-3xl border border-haze bg-haze">
            <KeyDates items={conf.keyDates} lang={lang} />
          </div>
        </section>

        <section aria-labelledby="fees" className="grid gap-6 lg:grid-cols-12">
          <ConfCard className="lg:col-span-7">
            <h2 id="fees" className="font-conf-display text-c-h2">
              {t.fees}
            </h2>
            <table className="mt-6 w-full text-left">
              <thead className="text-small text-ink-muted">
                <tr className="border-b border-haze">
                  <th scope="col" className="py-2 pr-4 font-normal">
                    {t.fee}
                  </th>
                  <th scope="col" className="py-2 pr-4 text-right font-normal">
                    {t.kgs}
                  </th>
                  <th scope="col" className="py-2 text-right font-normal">
                    {t.usd}
                  </th>
                </tr>
              </thead>
              <tbody>
                {conf.fees.map((f) => (
                  <tr
                    key={f.item.ru}
                    className="border-b border-haze align-baseline last:border-b-0"
                  >
                    <th
                      scope="row"
                      className="py-3.5 pr-4 leading-snug font-normal"
                    >
                      {pick(f.item, lang)}
                    </th>
                    <td className="py-3.5 pr-4 text-right font-semibold whitespace-nowrap tabular">
                      {formatMoney(f.kgs, lang)}
                    </td>
                    <td className="py-3.5 text-right whitespace-nowrap text-ink-muted tabular">
                      {f.usd}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ul className="mt-6 grid gap-2.5 border-t border-haze pt-6 text-small leading-relaxed text-ink-muted">
              {conf.feeRules.map((r, i) => (
                <li key={i} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-apricot"
                  />
                  {pick(r, lang)}
                </li>
              ))}
            </ul>
          </ConfCard>
          <div className="grid content-start gap-6 lg:col-span-5">
            <ConfCard>
              <h3 className="font-conf-display text-c-h3">{t.payment}</h3>
              <p className="mt-4 leading-relaxed">
                {pick(conf.payment.legal, lang)}
              </p>
              <p className="mt-3 leading-relaxed">
                {pick(conf.payment.individuals, lang)}
              </p>
            </ConfCard>
            <div className="on-dark rounded-3xl bg-lake p-6 text-snow sm:p-8">
              <h3 className="font-conf-display text-c-h3">{t.bank}</h3>
              <dl className="mt-5 grid gap-3 text-small">
                {conf.payment.bank.map((b) => (
                  <div
                    key={b.value}
                    className="grid grid-cols-[7rem_1fr] gap-3"
                  >
                    <dt className="text-glacier">{pick(b.label, lang)}</dt>
                    <dd className="tabular">{b.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="requirements"
          className="grid gap-6 lg:grid-cols-12"
        >
          <ConfCard className="lg:col-span-7">
            <h2 id="requirements" className="font-conf-display text-c-h2">
              {t.requirements}
            </h2>
            <ul className="mt-6 grid gap-3">
              {conf.requirements.map((r, i) => (
                <li key={i} className="flex gap-3 leading-relaxed">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 size-1.5 shrink-0 rounded-full bg-apricot"
                  />
                  {pick(r, lang)}
                </li>
              ))}
            </ul>
          </ConfCard>
          <div className="grid content-start gap-6 lg:col-span-5">
            <ConfCard>
              <h3 className="font-conf-display text-c-h3">{t.review}</h3>
              <ol className="mt-5 grid gap-3">
                {conf.review.map((r, i) => (
                  <li key={i} className="flex gap-3 text-small leading-relaxed">
                    <span className="font-semibold text-ember tabular">
                      {i + 1}
                    </span>
                    {pick(r, lang)}
                  </li>
                ))}
              </ol>
            </ConfCard>
            <div>
              <h3 className="mb-4 font-conf-display text-c-h3">
                {t.templates}
              </h3>
              <ConfDocList
                docs={conf.documents
                  .filter((d) => /Образец/.test(d.title.ru))
                  .map((d) => ({
                    kind: d.kind,
                    title: pick(d.title, lang),
                    url: d.url,
                  }))}
              />
            </div>
          </div>
        </section>

        <section aria-labelledby="stay">
          <ConfHeading id="stay" title={t.stay} className="mb-8" />
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="grid content-start gap-6 lg:col-span-5">
              <ConfCard>
                <ul className="grid gap-4">
                  {conf.hotels.notes.map((n, i) => (
                    <li key={i} className="flex gap-3 leading-relaxed">
                      <span
                        aria-hidden="true"
                        className="mt-2.5 size-1.5 shrink-0 rounded-full bg-apricot"
                      />
                      {pick(n, lang)}
                    </li>
                  ))}
                </ul>
              </ConfCard>
              <ConfCard>
                <h3 className="font-conf-display text-c-h3">{t.help}</h3>
                <ul className="mt-4 grid gap-3">
                  {conf.hotels.contacts.map((c) => (
                    <li
                      key={c.phone}
                      className="flex flex-wrap items-baseline justify-between gap-x-4"
                    >
                      <span>{pick(c.name, lang)}</span>
                      <span className="flex gap-3 text-small">
                        <a
                          href={telHref(c.phone)}
                          className="tabular underline-offset-4 hover:underline"
                        >
                          {c.phone}
                        </a>
                        <a
                          href={whatsappHref(c.phone)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-ink-muted underline-offset-4 hover:text-ink hover:underline"
                        >
                          WhatsApp
                        </a>
                      </span>
                    </li>
                  ))}
                </ul>
              </ConfCard>
            </div>
            <ConfCard className="lg:col-span-7">
              <h3 className="font-conf-display text-c-h3">{t.lake}</h3>
              <p className="mt-2 text-small text-ink-muted">
                {pick(conf.hotels.lakeRatesNote, lang)}
              </p>
              <div className="mt-6 grid gap-8 md:grid-cols-2">
                <RatesTable
                  title={t.body}
                  rows={conf.hotels.lakeRates.body}
                  lang={lang}
                />
                <RatesTable
                  title={t.cottage}
                  rows={conf.hotels.lakeRates.cottage}
                  lang={lang}
                />
              </div>
              <p className="mt-6 border-t border-haze pt-5 text-small">
                <span className="text-ink-muted">{t.hotelPhones}: </span>
                {conf.hotels.lakePhones.map((p, i) => (
                  <span key={p}>
                    {i > 0 && ", "}
                    <a
                      href={telHref(p)}
                      className="tabular underline-offset-4 hover:underline"
                    >
                      {p}
                    </a>
                  </span>
                ))}
              </p>
            </ConfCard>
          </div>
        </section>

        <section
          id="registration"
          aria-labelledby="registration-title"
          className="scroll-mt-24 grid gap-8 lg:grid-cols-12"
        >
          <div className="lg:col-span-4">
            <h2 id="registration-title" className="font-conf-display text-c-h2">
              {t.registration}
            </h2>
            <p className="mt-4 text-ink-muted">{t.registrationLead}</p>
            {!finished && (
              <a
                href={conf.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block text-small underline underline-offset-4"
              >
                {ui.register}: forms.intuit.kg
              </a>
            )}
          </div>
          <div className="lg:col-span-8">
            <RegistrationForm lang={lang} />
          </div>
        </section>
      </Container>
    </>
  );
}
