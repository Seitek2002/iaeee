import type { Article } from "@/shared/api";
import { cn } from "@/shared/lib";
import { DownloadIcon } from "@/shared/ui";

const LANG_LABEL = { en: "English", ky: "Кыргызча", ru: null } as const;

interface ArticleRowProps {
  article: Article;
  className?: string;
  tone?: "dark" | "light";
}

/**
 * Строка оглавления выпуска: название статьи серифом (как в самом журнале),
 * авторы и страница. Если есть PDF — вся строка ведёт на него.
 */
export function ArticleRow({
  article,
  className,
  tone = "light",
}: ArticleRowProps) {
  const dark = tone === "dark";
  const lang = article.lang ? LANG_LABEL[article.lang] : null;
  const muted = dark ? "text-on-dark-muted" : "text-steel";

  const content = (
    <>
      <span className="min-w-0">
        <span
          className={cn(
            "block font-serif text-[1.125rem] leading-snug",
            article.pdf &&
              "decoration-1 underline-offset-4 group-hover:underline",
          )}
        >
          {article.title}
        </span>
        <span className={cn("mt-1.5 block text-small", muted)}>
          {article.authors}
          {lang && <span className="ml-3">{lang}</span>}
        </span>
      </span>
      <span className={cn("flex items-center gap-3 text-small tabular", muted)}>
        {article.pages && <span>с. {article.pages}</span>}
        {article.pdf && <DownloadIcon size={16} />}
      </span>
    </>
  );

  const base = cn(
    "grid grid-cols-[1fr_auto] items-baseline gap-6 border-b py-5",
    dark ? "border-on-dark/15" : "border-rule",
    className,
  );

  return article.pdf ? (
    <a
      href={article.pdf}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("group", base)}
      aria-label={`${article.title} — открыть PDF`}
    >
      {content}
    </a>
  ) : (
    <div className={base}>{content}</div>
  );
}
