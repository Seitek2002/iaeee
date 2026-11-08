import { ROUTES, SITE } from "@/shared/config";
import { ButtonLink, Container, Seismogram, TRACE_DEFAULTS } from "@/shared/ui";

import { TitleBlock, type TitleBlockData } from "./title-block";

const pct = (v: number) => `${(v * 100).toFixed(1)}%`;
const AXIS = [0, 10, 20, 30, 40, 50, 60];

/**
 * Первый экран. Главный образ — запись землетрясения во всю ширину:
 * отмечены вступления продольной (P) и поперечной (S) волн и сильная фаза
 * колебаний — ровно то, на что рассчитывают здания специалисты Ассоциации.
 */
export function Hero({ stamp }: { stamp: TitleBlockData }) {
  const { p, s, strongEnd } = TRACE_DEFAULTS;

  return (
    <section aria-labelledby="hero-title" className="overflow-hidden">
      <Container className="pt-10 md:pt-14 lg:pt-16">
        <h1 id="hero-title" className="max-w-[17ch] text-display">
          {SITE.fullName}
        </h1>
        <div className="mt-6 grid max-w-3xl gap-1 text-steel sm:grid-cols-2 sm:gap-8 md:mt-8">
          <p lang="ky">{SITE.fullNameKy}</p>
          <p lang="en">{SITE.fullNameEn}</p>
        </div>
      </Container>

      <figure
        className="mt-14 md:mt-16"
        aria-label="Сейсмограмма: вступление волн P и S и сильная фаза колебаний"
      >
        <div className="relative h-[140px] sm:h-[180px] md:h-[220px]">
          <div
            aria-hidden="true"
            className="absolute inset-y-0 bg-amber/20"
            style={{ left: pct(s), width: pct(strongEnd - s) }}
          >
            <span className="absolute right-0 bottom-full mb-2 hidden border-r-2 border-amber pr-2 text-caption whitespace-nowrap sm:block">
              сильная фаза
            </span>
          </div>
          {[
            { at: p, label: "P" },
            { at: s, label: "S" },
          ].map((m) => (
            <div
              key={m.label}
              aria-hidden="true"
              className="absolute inset-y-0 w-px bg-petrol/35"
              style={{ left: pct(m.at) }}
            >
              <span className="absolute bottom-full mb-2 -translate-x-1/2 text-small font-semibold">
                {m.label}
              </span>
            </div>
          ))}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-1/2 h-px bg-petrol/10"
          />
          <Seismogram
            animate
            seed={1949}
            points={1100}
            strokeWidth={1.2}
            className="absolute inset-0 h-full w-full text-petrol"
          />
        </div>
        <div
          aria-hidden="true"
          className="relative h-8 border-t border-petrol/25 text-caption text-steel tabular"
        >
          {AXIS.map((t, i) => (
            <span
              key={t}
              className="absolute top-0"
              style={{ left: `${(t / 60) * 100}%` }}
            >
              <span className="absolute top-0 left-0 h-1.5 w-px bg-petrol/40" />
              <span
                className={
                  "absolute top-2 whitespace-nowrap " +
                  (i === 0
                    ? "left-2"
                    : i === AXIS.length - 1
                      ? "right-2"
                      : "-translate-x-1/2")
                }
              >
                {t === 60 ? "60 с" : t}
              </span>
            </span>
          ))}
        </div>
        <figcaption className="sr-only">
          Условная запись землетрясения: продольная волна P, поперечная волна S,
          сильная фаза колебаний и затухание.
        </figcaption>
      </figure>

      <Container className="grid gap-12 pt-14 pb-20 md:pt-20 md:pb-28 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-lead">
            Бишкек и большая часть Кыргызстана находятся в зоне 9-балльной
            сейсмичности. С {SITE.founded} года МАЭСС объединяет институты,
            университеты и проектные организации, чтобы здания в регионе
            выдерживали сильные землетрясения.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={ROUTES.about}>Об ассоциации</ButtonLink>
            <ButtonLink href={ROUTES.services} variant="outline">
              Инженерные услуги
            </ButtonLink>
          </div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <TitleBlock data={stamp} />
        </div>
      </Container>
    </section>
  );
}
