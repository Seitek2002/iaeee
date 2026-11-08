import type { Standard } from "@/shared/api";
import { cn } from "@/shared/lib";

export function StandardsTable({
  standards,
  className,
}: {
  className?: string;
  standards: Standard[];
}) {
  return (
    <table className={cn("w-full border-t border-petrol text-left", className)}>
      <caption className="sr-only">Нормативные документы</caption>
      <thead className="sr-only">
        <tr>
          <th scope="col">Обозначение</th>
          <th scope="col">Наименование</th>
        </tr>
      </thead>
      <tbody>
        {standards.map((s, i) => (
          <tr key={i} className="border-b border-rule align-baseline">
            <th
              scope="row"
              className="w-[11rem] py-5 pr-6 font-display text-[1.0625rem] font-semibold whitespace-nowrap sm:w-[14rem]"
            >
              {s.code}
            </th>
            <td className="py-5 leading-relaxed">{s.title}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
