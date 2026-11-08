import type { ConferenceTalk, Lang } from "@/shared/api";
import { COUNTRY_NAME } from "@/shared/config";
import { cn, pick } from "@/shared/lib";

/** Доклад в программе: время, название, докладчик, организация и страна. */
export function TalkRow({
  talk,
  lang,
  className,
}: {
  className?: string;
  lang: Lang;
  talk: ConferenceTalk;
}) {
  return (
    <li
      className={cn(
        "grid grid-cols-[3.25rem_1fr] gap-x-4 border-t border-haze py-4 sm:grid-cols-[4rem_1fr_9rem]",
        className,
      )}
    >
      <span className="pt-0.5 text-small font-semibold text-ink-muted tabular">
        {talk.time}
      </span>
      <div className="min-w-0">
        <p className="leading-snug font-medium text-pretty">
          {pick(talk.title, lang)}
        </p>
        <p className="mt-1.5 text-small text-ink-muted">
          <span className="text-ink">{pick(talk.speaker, lang)}</span>
          <span className="mx-2 text-haze" aria-hidden="true">
            /
          </span>
          {pick(talk.org, lang)}
        </p>
      </div>
      <span className="col-start-2 mt-2 inline-flex self-start justify-self-start rounded-full bg-haze/70 px-2.5 py-0.5 text-[0.75rem] font-medium text-ink sm:col-start-3 sm:mt-0 sm:justify-self-end">
        {COUNTRY_NAME[talk.country][lang]}
      </span>
    </li>
  );
}
