import Link from "next/link";
import { notFound } from "next/navigation";

import { ArticleRow } from "@/entities/issue";

import { getIssue, getIssues, getJournalInfo } from "@/shared/api";
import { ROUTES } from "@/shared/config";
import { issueLabel, plural } from "@/shared/lib";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  Container,
  DownloadIcon,
  PageIntro,
  buttonClass,
} from "@/shared/ui";

export async function VestnikIssuePage({ id }: { id: string }) {
  const [issue, issues, journal] = await Promise.all([
    getIssue(id),
    getIssues(),
    getJournalInfo(),
  ]);
  if (!issue) notFound();

  const index = issues.findIndex((i) => i.id === issue.id);
  const newer = issues[index - 1];
  const older = issues[index + 1];
  const languages = new Set(issue.articles.map((a) => a.lang ?? "ru"));

  return (
    <>
      <PageIntro
        crumbs={[
          { href: ROUTES.vestnik, label: "Вестник МАЭСС" },
          { label: issueLabel(issue) },
        ]}
        title={`Выпуск ${issueLabel(issue)}`}
        lead={`Вестник Международной ассоциации экспертов по сейсмостойкому строительству, ${issue.year} год, выпуск ${issue.issueOfYear}. Сквозной номер ${issue.total}.`}
        aside={
          <div className="flex flex-col gap-4">
            <dl className="grid grid-cols-2 border-t border-petrol text-[0.9375rem]">
              <div className="border-b border-rule py-3 pr-4">
                <dt className="text-caption text-steel">Статей</dt>
                <dd className="mt-0.5 tabular">{issue.articles.length}</dd>
              </div>
              <div className="border-b border-l border-rule py-3 pl-4">
                <dt className="text-caption text-steel">ISSN</dt>
                <dd className="mt-0.5 tabular">{journal.issn}</dd>
              </div>
              <div className="col-span-2 border-b border-rule py-3">
                <dt className="text-caption text-steel">
                  {plural(languages.size, ["Язык", "Языки", "Языки"])} статей
                </dt>
                <dd className="mt-0.5">
                  {[...languages]
                    .map(
                      (l) =>
                        ({ ru: "русский", en: "английский", ky: "кыргызский" })[
                          l
                        ],
                    )
                    .join(", ")}
                </dd>
              </div>
            </dl>
            {issue.pdf && (
              <a
                href={issue.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClass("primary")}
              >
                <DownloadIcon size={18} />
                Выпуск целиком, PDF
              </a>
            )}
          </div>
        }
      />

      <section aria-label="Оглавление" className="py-16 md:py-20">
        <Container className="grid gap-10 lg:grid-cols-12">
          <h2 className="text-h3 lg:col-span-3">Оглавление</h2>
          <div className="border-t border-petrol lg:col-span-9">
            {issue.articles.map((article) => (
              <ArticleRow key={article.title} article={article} />
            ))}
          </div>
        </Container>
      </section>

      <nav aria-label="Соседние выпуски" className="border-t border-rule">
        <Container className="grid grid-cols-2 gap-6 py-10">
          <div>
            {older && (
              <Link
                href={ROUTES.issue(older.id)}
                className="group inline-flex flex-col gap-1"
              >
                <span className="inline-flex items-center gap-2 text-small text-steel">
                  <ArrowLeftIcon size={16} />
                  Предыдущий выпуск
                </span>
                <span className="font-display text-h3 group-hover:underline group-hover:underline-offset-4">
                  {issueLabel(older)}
                </span>
              </Link>
            )}
          </div>
          <div className="text-right">
            {newer && (
              <Link
                href={ROUTES.issue(newer.id)}
                className="group inline-flex flex-col items-end gap-1"
              >
                <span className="inline-flex items-center gap-2 text-small text-steel">
                  Следующий выпуск
                  <ArrowRightIcon size={16} />
                </span>
                <span className="font-display text-h3 group-hover:underline group-hover:underline-offset-4">
                  {issueLabel(newer)}
                </span>
              </Link>
            )}
          </div>
        </Container>
      </nav>
    </>
  );
}
