import type { LText, Lang } from "@/shared/api";
import { cn, pick } from "@/shared/lib";

/** Ключевые даты — последовательность, поэтому идут лентой слева направо. */
export function KeyDates({
  items,
  lang,
  tone = "light",
}: {
  items: { date: LText; text: LText }[];
  lang: Lang;
  tone?: "dark" | "light";
}) {
  const dark = tone === "dark";
  return (
    <ol className="grid gap-px overflow-hidden rounded-3xl sm:grid-cols-2 lg:grid-cols-3">
      {items.map((d, i) => (
        <li
          key={i}
          className={cn("flex gap-5 p-6", dark ? "bg-snow/5" : "bg-white")}
        >
          <span
            className={cn(
              "grid size-9 shrink-0 place-items-center rounded-full font-conf-display text-small font-semibold",
              dark ? "bg-apricot text-lake" : "bg-lake text-snow",
            )}
          >
            {i + 1}
          </span>
          <div>
            <p className="font-conf-display text-[1.0625rem] font-semibold">
              {pick(d.date, lang)}
            </p>
            <p
              className={cn(
                "mt-1.5 leading-snug",
                dark ? "text-glacier" : "text-ink-muted",
              )}
            >
              {pick(d.text, lang)}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
