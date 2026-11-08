import { SubscribeForm } from "@/features/newsletter-subscribe";

import { ArticleRow } from "@/entities/issue";

import type { Issue, JournalInfo } from "@/shared/api";
import { ROUTES } from "@/shared/config";
import { issueLabel, plural } from "@/shared/lib";
import { ButtonLink, Container } from "@/shared/ui";

interface VestnikSpotlightProps {
  issue: Issue;
  issuesCount: number;
  journal: JournalInfo;
}

export function VestnikSpotlight({
  issue,
  journal,
  issuesCount,
}: VestnikSpotlightProps) {
  const preview = issue.articles.slice(0, 5);
  const rest = issue.articles.length - preview.length;

  return (
    <section
      aria-labelledby="vestnik-title"
      className="on-dark bg-petrol py-20 text-on-dark md:py-28"
    >
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <h2 id="vestnik-title" className="text-h2">
            Вестник МАЭСС
          </h2>
          <p className="mt-5 max-w-md text-lead text-on-dark-muted">
            Рецензируемый научный журнал Ассоциации. Выходит с{" "}
            {journal.firstIssueYear} года, индексируется в РИНЦ, статьям
            присваивается DOI.
          </p>

          <dl className="mt-10 grid max-w-md grid-cols-2 border-t border-on-dark/15">
            {[
              ["ISSN", journal.issn],
              ["Префикс DOI", journal.doi],
              ["Индексация", journal.index],
              [
                "В архиве",
                `${issuesCount} ${plural(issuesCount, ["выпуск", "выпуска", "выпусков"])}`,
              ],
            ].map(([label, value], i) => (
              <div
                key={label}
                className={
                  "border-b border-on-dark/15 py-4 " +
                  (i % 2 === 0 ? "pr-4" : "border-l border-on-dark/15 pl-4")
                }
              >
                <dt className="text-small text-on-dark-muted">{label}</dt>
                <dd className="mt-1 text-[1.125rem] tabular">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href={ROUTES.vestnik} variant="amber">
              Все выпуски
            </ButtonLink>
            <a
              href={journal.requirementsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-[2px] border border-on-dark/35 px-6 text-[0.9375rem] font-medium transition-colors hover:border-on-dark hover:bg-on-dark/5"
            >
              Требования к статьям
            </a>
          </div>

          <SubscribeForm className="mt-12 max-w-md" />
        </div>

        <div className="lg:col-span-7">
          <div className="flex items-baseline justify-between gap-4 border-b border-on-dark/40 pb-4">
            <p className="text-h3">Выпуск {issueLabel(issue)}</p>
            <p className="text-small text-on-dark-muted">
              {issue.articles.length}{" "}
              {plural(issue.articles.length, ["статья", "статьи", "статей"])}
            </p>
          </div>
          <div>
            {preview.map((article) => (
              <ArticleRow key={article.title} article={article} tone="dark" />
            ))}
          </div>
          <div className="mt-6">
            <ButtonLink
              href={ROUTES.issue(issue.id)}
              variant="outline-light"
              size="sm"
            >
              Оглавление выпуска{rest > 0 ? `: ещё ${rest}` : ""}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
