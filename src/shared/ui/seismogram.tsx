import { cn } from "@/shared/lib";

/**
 * Сейсмограмма — фирменный элемент сайта.
 *
 * Трасса синтетическая, но устроена как настоящая запись землетрясения:
 * фоновый микросейсмический шум → вступление продольной волны P (частая,
 * небольшая амплитуда) → вступление поперечной волны S (резкий рост,
 * максимальная амплитуда, «сильная фаза») → затухающая кода.
 *
 * Генератор детерминированный (seed), поэтому сервер и браузер рисуют
 * одинаковую линию и гидратация не расходится.
 */

export interface TraceOptions {
  /** Доля длины, где вступает P-волна */
  p?: number;
  points?: number;
  /** Доля длины, где вступает S-волна */
  s?: number;
  seed?: number;
}

export const TRACE_DEFAULTS = { p: 0.17, s: 0.355, strongEnd: 0.6 } as const;

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Строка → число для seed (например, slug новости). */
export function seedFrom(text: string) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function buildTrace({
  points = 900,
  seed = 11,
  p = TRACE_DEFAULTS.p,
  s = TRACE_DEFAULTS.s,
}: TraceOptions = {}) {
  const rand = mulberry32(seed);
  const values: number[] = [];
  let phase = rand() * Math.PI * 2;

  for (let i = 0; i < points; i++) {
    const t = i / (points - 1);

    let env = 0.04;
    let step = 0.85;
    if (t > p) {
      env += 0.26 * Math.exp(-(t - p) * 8);
      step = 1.05;
    }
    if (t > s) {
      const rise = Math.min(1, (t - s) / 0.012);
      env += 0.96 * rise * Math.exp(-Math.max(0, t - s - 0.035) * 4.6);
      step = 0.62 + 0.25 * Math.exp(-(t - s) * 6);
    }

    phase += step + (rand() - 0.5) * 0.9;
    const v = env * (0.64 * Math.sin(phase) + 0.36 * (rand() * 2 - 1));
    values.push(v);
  }

  const max = Math.max(...values.map(Math.abs));
  return values.map((v) => v / max);
}

function toPath(values: number[], width: number, height: number, gain: number) {
  const mid = height / 2;
  const dx = width / (values.length - 1);
  let d = "";
  values.forEach((v, i) => {
    const x = (i * dx).toFixed(1);
    const y = (mid - v * mid * gain).toFixed(1);
    d += `${i === 0 ? "M" : "L"}${x} ${y}`;
  });
  return d;
}

interface SeismogramProps extends TraceOptions {
  /** Однократная прорисовка линии при загрузке. */
  animate?: boolean;
  className?: string;
  /** Доля полувысоты, которую занимает максимальная амплитуда. */
  gain?: number;
  strokeWidth?: number;
}

export function Seismogram({
  animate = false,
  className,
  gain = 0.92,
  strokeWidth = 1.25,
  ...trace
}: SeismogramProps) {
  const W = 1000;
  const H = 200;
  const d = toPath(buildTrace(trace), W, H, gain);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className={cn("block", animate && "animate-trace", className)}
      aria-hidden="true"
    >
      <path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
