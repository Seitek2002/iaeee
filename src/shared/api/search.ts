import { conferenceSessions, documents, issues, members, news } from "./mock";
import type { SearchEntry } from "./types";

const PAGES: SearchEntry[] = [
  {
    id: "p-about",
    kind: "page",
    title: "Об ассоциации",
    hint: "История, принципы, цели, президиум",
    href: "/about",
  },
  {
    id: "p-news",
    kind: "page",
    title: "Новости",
    hint: "Семинары, конференции, публикации",
    href: "/news",
  },
  {
    id: "p-vestnik",
    kind: "page",
    title: "Вестник МАЭСС",
    hint: "Научный журнал, ISSN 1694-7797",
    href: "/vestnik",
  },
  {
    id: "p-services",
    kind: "page",
    title: "Инженерные услуги",
    hint: "Экспертиза, инжиниринг, испытания, обучение",
    href: "/services",
  },
  {
    id: "p-members",
    kind: "page",
    title: "Члены ассоциации",
    hint: "Университеты, институты, проектные организации",
    href: "/members",
  },
  {
    id: "p-membership",
    kind: "page",
    title: "Вступление в ассоциацию",
    hint: "Документы и заявка",
    href: "/membership",
  },
  {
    id: "p-documents",
    kind: "page",
    title: "Документы",
    hint: "Пособия, положения, материалы семинаров",
    href: "/documents",
  },
  {
    id: "p-contacts",
    kind: "page",
    title: "Контакты",
    hint: "Бишкек, мкр. Джал-29, д. 4/1",
    href: "/contacts",
  },
];

/**
 * Плоский индекс для поиска по сайту. Собирается на сервере и передаётся в
 * клиентский диалог пропом — так mock.ts не попадает в клиентский бандл.
 */
export async function getSearchIndex(): Promise<SearchEntry[]> {
  const newsEntries: SearchEntry[] = news.map((n) => ({
    id: `n-${n.slug}`,
    kind: "news",
    title: n.title,
    hint: n.excerpt,
    href: `/news/${n.slug}`,
  }));

  const articleEntries: SearchEntry[] = issues.flatMap((issue) =>
    issue.articles.map((article, i) => ({
      id: `a-${issue.id}-${i}`,
      kind: "article" as const,
      title: article.title,
      hint: `${article.authors} — Вестник ${issue.year}/${issue.issueOfYear} (${issue.total})`,
      href: `/vestnik/${issue.id}`,
    })),
  );

  const memberEntries: SearchEntry[] = members.map((m) => ({
    id: `m-${m.id}`,
    kind: "member",
    title: m.abbr,
    hint: m.name,
    href: `/members#${m.id}`,
  }));

  const documentEntries: SearchEntry[] = documents.map((d) => ({
    id: `d-${d.id}`,
    kind: "document",
    title: d.title,
    hint: d.note ?? "Документ",
    href: "/documents",
  }));

  const talkEntries: SearchEntry[] = conferenceSessions.flatMap((s) =>
    s.talks.map((t, i) => ({
      id: `t-${s.id}-${i}`,
      kind: "article" as const,
      title: t.title.ru,
      hint: `${t.speaker.ru} — доклад на VI конференции`,
      href: "/conference/program",
    })),
  );

  return [
    ...PAGES,
    ...talkEntries,
    ...newsEntries,
    ...articleEntries,
    ...memberEntries,
    ...documentEntries,
  ];
}
