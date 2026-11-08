import { cn } from "@/shared/lib";

/** Знак конференции: римская цифра выпуска в абрикосовом квадрате. */
export function ConferenceMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid size-10 shrink-0 place-items-center rounded-xl bg-apricot font-conf-display text-[0.9375rem] font-bold text-lake",
        className,
      )}
    >
      VI
    </span>
  );
}
