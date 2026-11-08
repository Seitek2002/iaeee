import type { Lang } from "@/shared/api";
import { CONF_UI } from "@/shared/config";

/**
 * Фирменный образ сайта конференции — профиль высот её маршрута.
 * Первая часть проходит в Бишкеке (~800 м), вторая — на берегу Иссык-Куля
 * (1 607 м); между ними — дорога через Боомское ущелье. Под профилем —
 * дни конференции, привязанные к тем же точкам маршрута.
 * Профиль схематичный: опорные высоты округлены.
 */

const TOTAL_KM = 250;
// [км от Бишкека, высота, м]
const PROFILE: [number, number][] = [
  [0, 800],
  [25, 780],
  [55, 830],
  [80, 960],
  [105, 1200],
  [122, 1460],
  [135, 1700],
  [148, 1760],
  [162, 1680],
  [178, 1612],
  [190, 1607],
  [250, 1607],
];
const LAKE_FROM = 182;

const W = 1000;
const H = 240;
const x = (km: number) => (km / TOTAL_KM) * W;
const y = (m: number) => H - 24 - ((m - 650) / (1850 - 650)) * (H - 48);

/** Сглаживание Катмулла — Рома → кубические кривые Безье. */
function smooth(points: [number, number][]) {
  const p = points.map(([km, m]) => [x(km), y(m)] as const);
  let d = `M${p[0][0]},${p[0][1]}`;
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] ?? p[i];
    const p1 = p[i];
    const p2 = p[i + 1];
    const p3 = p[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return d;
}

const pct = (km: number) => `${((km / TOTAL_KM) * 100).toFixed(2)}%`;

export function RouteProfile({ lang }: { lang: Lang }) {
  const ui = CONF_UI[lang];
  const line = smooth(PROFILE);
  const area = `${line} L${W},${H} L0,${H} Z`;
  const lakeY = y(1607);

  const days = [
    {
      from: 0,
      to: 30,
      date: lang === "en" ? "June 22–23" : "22–23 июня",
      text: ui.routeBishkek,
    },
    {
      from: 30,
      to: 182,
      date: lang === "en" ? "June 24" : "24 июня",
      text: lang === "en" ? "Tours and transfer" : "Экскурсии и дорога",
    },
    {
      from: 182,
      to: 250,
      date: lang === "en" ? "June 25–26" : "25–26 июня",
      text: ui.routeLake,
    },
  ];

  return (
    <figure aria-label={ui.routeTitle}>
      <div className="relative h-[150px] sm:h-[200px] md:h-[240px]">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <path d={area} fill="var(--color-lake-soft)" />
          <rect
            x={x(LAKE_FROM)}
            y={lakeY}
            width={W - x(LAKE_FROM)}
            height={H - lakeY}
            fill="var(--color-glacier)"
            opacity="0.16"
          />
          <path
            d={line}
            fill="none"
            stroke="var(--color-glacier)"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Точки маршрута — HTML поверх SVG, чтобы подписи не растягивались. */}
        {[
          { km: 0, m: 800, label: ui.routeBishkek, align: "left" },
          {
            km: 148,
            m: 1760,
            label: ui.routeBoom,
            align: "center",
            minor: true,
          },
          { km: 245, m: 1607, label: ui.routeLake, align: "right" },
        ].map((p) => (
          <div
            key={p.label}
            className="absolute"
            style={{ left: pct(p.km), top: `${(y(p.m) / H) * 100}%` }}
          >
            <span
              className={
                p.minor
                  ? "absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-glacier"
                  : "absolute size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-apricot ring-4 ring-lake"
              }
            />
            <span
              className={
                "absolute bottom-3 whitespace-nowrap text-[0.75rem] leading-tight sm:text-small " +
                (p.align === "left"
                  ? "left-0"
                  : p.align === "right"
                    ? "right-0 text-right"
                    : "-translate-x-1/2 text-center")
              }
            >
              <span
                className={p.minor ? "text-glacier" : "font-semibold text-snow"}
              >
                {p.label}
              </span>
              <span className="block text-glacier tabular">
                {p.minor
                  ? ""
                  : `≈ ${p.m.toLocaleString(lang === "en" ? "en-US" : "ru-RU")} ${lang === "en" ? "m" : "м"}`}
              </span>
            </span>
          </div>
        ))}
      </div>

      <ol className="relative hidden border-t border-glacier/30 text-small sm:flex">
        {days.map((d) => (
          <li
            key={d.date}
            className="border-l border-glacier/30 px-2 pt-2 pb-1 first:border-l-0 sm:px-3"
            style={{ width: pct(d.to - d.from) }}
          >
            <span className="block font-semibold whitespace-nowrap text-apricot">
              {d.date}
            </span>
            <span className="block truncate text-glacier">{d.text}</span>
          </li>
        ))}
      </ol>
      {/* На телефоне доли маршрута слишком узкие для подписей — даём списком. */}
      <ul className="grid gap-2 border-t border-glacier/30 pt-3 text-small sm:hidden">
        {days.map((d) => (
          <li key={d.date} className="flex gap-3">
            <span className="w-24 shrink-0 font-semibold text-apricot">
              {d.date}
            </span>
            <span className="text-glacier">{d.text}</span>
          </li>
        ))}
      </ul>
      <figcaption className="mt-3 text-right text-[0.75rem] text-glacier">
        {ui.routeTitle}, {ui.routeDistance}
      </figcaption>
    </figure>
  );
}
