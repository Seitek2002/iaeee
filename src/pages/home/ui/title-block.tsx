import type { ReactNode } from "react";

import { cn, plural } from "@/shared/lib";

export interface TitleBlockData {
  conferences: number;
  countries: number;
  founded: number;
  issn: string;
  issues: number;
  legalStatus: string;
  members: number;
  president: string;
}

const RULE = "border-petrol/40";

/** Графа штампа: подпись сверху, значение снизу. */
function Cell({
  label,
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
  label: string;
}) {
  return (
    <dl className={cn("px-4 py-3", className)}>
      <dt className="text-caption text-steel">{label}</dt>
      <dd className="mt-0.5 leading-snug">{children}</dd>
    </dl>
  );
}

/** Строка штампа: подпись в узкой графе слева, значение справа. */
function Row({ label, children }: { children: ReactNode; label: string }) {
  return (
    <dl
      className={cn(
        "grid grid-cols-[7.5rem_1fr] border-b sm:grid-cols-[9rem_1fr]",
        RULE,
      )}
    >
      <dt className={cn("border-r px-4 py-3 text-caption text-steel", RULE)}>
        {label}
      </dt>
      <dd className="px-4 py-3 leading-snug">{children}</dd>
    </dl>
  );
}

/**
 * «Паспорт» Ассоциации, свёрстанный как основная надпись (штамп) чертежа:
 * жирная внешняя рамка, тонкие внутренние линии, мелкие графы справа.
 */
export function TitleBlock({ data }: { data: TitleBlockData }) {
  return (
    <section
      aria-label="Паспорт ассоциации"
      className="border-[1.5px] border-petrol text-[0.9375rem]"
    >
      <div className={cn("grid grid-cols-[1fr_auto_auto] border-b", RULE)}>
        <dl className="px-4 py-3">
          <dt className="text-caption text-steel">Организация</dt>
          <dd className="mt-0.5 font-display text-[1.375rem] leading-tight font-semibold">
            МАЭСС <span className="font-medium text-steel">/ IAEEE</span>
          </dd>
        </dl>
        <Cell label="Основана" className={cn("border-l tabular", RULE)}>
          {data.founded}
        </Cell>
        <Cell label="Город" className={cn("border-l", RULE)}>
          Бишкек
        </Cell>
      </div>
      <Row label="Правовой статус">{data.legalStatus}</Row>
      <Row label="Президент">{data.president}</Row>
      <Row label="Журнал">«Вестник МАЭСС», ISSN {data.issn}</Row>
      <div className="grid grid-cols-2 sm:grid-cols-3">
        <Cell
          label="Члены"
          className={cn(
            "col-span-2 border-b tabular sm:col-span-1 sm:border-b-0",
            RULE,
          )}
        >
          {data.members}{" "}
          {plural(data.members, ["организация", "организации", "организаций"])},{" "}
          {data.countries}{" "}
          {plural(data.countries, ["страна", "страны", "стран"])}
        </Cell>
        <Cell label="Конференции" className={cn("tabular sm:border-l", RULE)}>
          {data.conferences} международных
        </Cell>
        <Cell label="Выпуски журнала" className={cn("border-l tabular", RULE)}>
          {data.issues}
        </Cell>
      </div>
    </section>
  );
}
