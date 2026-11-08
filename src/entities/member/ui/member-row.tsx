import type { CountryCode, Member } from "@/shared/api";
import { cn } from "@/shared/lib";
import { ArrowUpRightIcon } from "@/shared/ui";

export const COUNTRY_LABEL: Record<CountryCode, string> = {
  KG: "Кыргызстан",
  KZ: "Казахстан",
  RU: "Россия",
};

/** Строка реестра членов: аббревиатура, полное название, страна, сайт. */
export function MemberRow({
  member,
  className,
}: {
  className?: string;
  member: Member;
}) {
  return (
    <div
      className={cn(
        "grid gap-x-8 gap-y-2 border-b border-rule py-6 sm:grid-cols-[10rem_1fr_4rem] sm:items-baseline lg:grid-cols-[12rem_1fr_11rem_4rem]",
        className,
      )}
    >
      <p className="font-display text-h3">{member.abbr}</p>
      <p className="leading-snug">{member.name}</p>
      <p className="text-small text-steel sm:col-start-2 lg:col-start-auto">
        {[member.city, COUNTRY_LABEL[member.country]]
          .filter(Boolean)
          .join(", ")}
      </p>
      {member.url ? (
        <a
          href={member.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-small text-steel underline-offset-4 hover:text-petrol hover:underline sm:col-start-3 sm:row-start-1 sm:justify-self-end lg:col-start-4"
          aria-label={`Сайт: ${member.abbr}`}
        >
          Сайт
          <ArrowUpRightIcon size={15} />
        </a>
      ) : (
        <span className="hidden sm:block" />
      )}
    </div>
  );
}
