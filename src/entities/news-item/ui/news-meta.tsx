import type { NewsItem } from "@/shared/api";
import { cn, formatDate } from "@/shared/lib";

import { NEWS_CATEGORY_LABEL } from "../model";

export function NewsMeta({
  item,
  className,
  tone = "light",
}: {
  className?: string;
  item: Pick<NewsItem, "category" | "date">;
  tone?: "dark" | "light";
}) {
  return (
    <p
      className={cn(
        "flex flex-wrap items-baseline gap-x-4 gap-y-1 text-small",
        className,
      )}
    >
      <time dateTime={item.date} className="tabular">
        {formatDate(item.date)}
      </time>
      <span className={tone === "dark" ? "text-on-dark-muted" : "text-steel"}>
        {NEWS_CATEGORY_LABEL[item.category]}
      </span>
    </p>
  );
}
