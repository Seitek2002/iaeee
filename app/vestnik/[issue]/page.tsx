import type { Metadata } from "next";

import { VestnikIssuePage } from "@/pages/vestnik-issue";

import { getIssue, getIssueIds } from "@/shared/api";
import { issueLabel } from "@/shared/lib";

type Props = { params: Promise<{ issue: string }> };

export async function generateStaticParams() {
  return (await getIssueIds()).map((issue) => ({ issue }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { issue: id } = await params;
  const issue = await getIssue(id);
  if (!issue) return { title: "Выпуск не найден" };
  return {
    title: `Вестник МАЭСС ${issueLabel(issue)}`,
    description: `Оглавление выпуска ${issueLabel(issue)}: ${issue.articles.length} статей по сейсмостойкому строительству.`,
  };
}

export default async function Page({ params }: Props) {
  const { issue } = await params;
  return <VestnikIssuePage id={issue} />;
}
