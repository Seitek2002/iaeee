import Link from "next/link";

import type { NewsItem } from "@/shared/api";
import { ROUTES } from "@/shared/config";
import { cn } from "@/shared/lib";

import { NewsMeta } from "./news-meta";

/** Компактная строка новости для списков без изображений. */
export function NewsRow({
  item,
  className,
}: {
  className?: string;
  item: NewsItem;
}) {
  return (
    <article
      className={cn(
        "group relative border-t border-rule py-6 first:border-t-0 first:pt-0",
        className,
      )}
    >
      <NewsMeta item={item} />
      <h3 className="mt-2 text-[1.1875rem] leading-snug font-medium tracking-[-0.01em]">
        <Link
          href={ROUTES.newsItem(item.slug)}
          className="decoration-1 underline-offset-[5px] after:absolute after:inset-0 group-hover:underline"
        >
          {item.title}
        </Link>
      </h3>
    </article>
  );
}
