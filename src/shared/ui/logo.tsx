import { cn } from "@/shared/lib";

/**
 * Знак МАЭСС: в квадрате — короткая запись сейсмограммы, амплитуда которой
 * нарастает и затухает. Тот же мотив, что и в первом экране сайта.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("size-8 shrink-0", className)}
      aria-hidden="true"
    >
      <rect width="32" height="32" fill="currentColor" />
      <path
        d="M4 17h4.5l1.5-3 1.6 6 1.9-12 2 15.5 1.9-11 1.7 7.5 1.5-4.5 1.3 2.3 1.2-.8H28"
        fill="none"
        stroke="var(--color-film)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({
  className,
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <LogoMark className={inverted ? "text-amber" : "text-petrol"} />
      <span className="flex items-baseline gap-2 leading-none">
        <span className="font-display text-[1.125rem] font-semibold tracking-[0.01em]">
          МАЭСС
        </span>
        <span
          className={cn(
            "text-[0.8125rem] font-medium tracking-[0.06em]",
            inverted ? "text-on-dark-muted" : "text-steel",
          )}
        >
          IAEEE
        </span>
      </span>
    </span>
  );
}
