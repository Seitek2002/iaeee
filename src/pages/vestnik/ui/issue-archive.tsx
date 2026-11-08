"use client";

import { useMemo } from "react";

import Link from "next/link";

import {
  ArticleSearchField,
  filterIssues,
  useArticleSearchStore,
} from "@/features/article-search";

import { ArticleRow } from "@/entities/issue";

import type { Issue } from "@/shared/api";
import { ROUTES } from "@/shared/config";
import { cn, issueLabel, plural } from "@/shared/lib";
import { MinusIcon, PlusIcon } from "@/shared/ui";

/**
 * Архив выпусков. Каждый выпуск раскрывается в оглавление; поиск по
 * названиям и авторам сразу раскрывает выпуски, где есть совпадения.
 */
export function IssueArchive({ issues }: { issues: Issue[] }) {
  const query = useArticleSearchStore((s) => s.query);
  const stored = useArticleSearchStore((s) => s.expanded);
  const toggle = useArticleSearchStore((s) => s.toggle);
  const expanded = stored ?? (issues[0] ? [issues[0].id] : []);

  const searching = query.trim().length > 0;
  const results = useMemo(() => filterIssues(issues, query), [issues, query]);
  const found = results.reduce((n, r) => n + r.articles.length, 0);

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
        <ArticleSearchField />
        <p aria-live="polite" className="text-small text-steel md:text-right">
          {searching
            ? `Найдено ${found} ${plural(found, ["статья", "статьи", "статей"])}`
            : `${issues.reduce((n, i) => n + i.articles.length, 0)} статей в ${issues.length} выпусках`}
        </p>
      </div>

      {searching && results.length === 0 ? (
        <div className="mt-8 border-t border-petrol py-14">
          <p className="text-h3">Статей по запросу «{query}» нет</p>
          <p className="mt-3 max-w-lg text-steel">
            Ищите по фамилии без инициалов или по ключевому слову из названия —
            например, «сейсмоизоляция», «Габибов», «школ».
          </p>
        </div>
      ) : (
        <ul className="mt-8 border-t border-petrol">
          {results.map(({ issue, articles }) => {
            const open = searching || expanded.includes(issue.id);
            const panelId = `issue-${issue.id}`;
            return (
              <li key={issue.id} className="border-b border-rule">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => toggle(issue.id, expanded)}
                    aria-expanded={open}
                    aria-controls={panelId}
                    disabled={searching}
                    className="group grid flex-1 grid-cols-[1fr_auto] items-baseline gap-4 py-6 text-left sm:grid-cols-[13rem_1fr_auto]"
                  >
                    <span className="font-display text-h3 tabular">
                      {issueLabel(issue)}
                    </span>
                    <span className="hidden text-steel sm:block">
                      {searching
                        ? `${articles.length} ${plural(articles.length, ["совпадение", "совпадения", "совпадений"])}`
                        : `${issue.articles.length} ${plural(issue.articles.length, ["статья", "статьи", "статей"])}`}
                    </span>
                    {!searching && (
                      <span className="grid size-8 place-items-center border border-rule-strong transition-colors group-hover:border-petrol">
                        {open ? (
                          <MinusIcon size={16} />
                        ) : (
                          <PlusIcon size={16} />
                        )}
                      </span>
                    )}
                  </button>
                </div>
                <div
                  id={panelId}
                  hidden={!open}
                  className={cn("pb-8", open && "animate-fade")}
                >
                  <div className="border-t border-rule sm:ml-[13rem]">
                    {articles.map((article) => (
                      <ArticleRow key={article.title} article={article} />
                    ))}
                  </div>
                  <div className="mt-5 sm:ml-[13rem]">
                    <Link
                      href={ROUTES.issue(issue.id)}
                      className="text-small font-medium underline decoration-current/30 underline-offset-4 hover:decoration-current"
                    >
                      Страница выпуска {issueLabel(issue)}
                    </Link>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
