import Link from "next/link";

import type { NewsItem } from "@/shared/api";
import { ROUTES } from "@/shared/config";
import { cn } from "@/shared/lib";
import { Cover } from "@/shared/ui";

import { NewsMeta } from "./news-meta";

interface NewsCardProps {
  className?: string;
  item: NewsItem;
  priority?: boolean;
  size?: "default" | "large";
}

/** Карточка новости: обложка, дата и рубрика, заголовок, лид. Вся карточка — ссылка. */
export function NewsCard({
  item,
  size = "default",
  priority,
  className,
}: NewsCardProps) {
  const large = size === "large";

  return (
    <article className={cn("group relative flex flex-col", className)}>
      <Cover
        src={item.cover}
        alt=""
        fit={item.coverFit}
        seedKey={item.slug}
        priority={priority}
        sizes={
          large
            ? "(min-width: 1024px) 58vw, 100vw"
            : "(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
        }
        className={cn(large ? "aspect-[16/10]" : "aspect-[3/2]")}
      />
      <NewsMeta item={item} className="mt-5" />
      <h3
        className={cn(
          "mt-3 text-pretty",
          large
            ? "text-[clamp(1.5rem,1.2rem+1.1vw,2.25rem)] leading-[1.12] tracking-[-0.02em]"
            : "text-h3",
        )}
      >
        <Link
          href={ROUTES.newsItem(item.slug)}
          className="decoration-1 underline-offset-[6px] after:absolute after:inset-0 group-hover:underline"
        >
          {item.title}
        </Link>
      </h3>
      <p
        className={cn(
          "mt-3 text-steel",
          large ? "max-w-2xl text-lead" : "line-clamp-3",
        )}
      >
        {item.excerpt}
      </p>
    </article>
  );
}
