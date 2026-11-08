import type { Metadata } from "next";

import { NewsDetailsPage } from "@/pages/news-details";

import { getNewsBySlug, getNewsSlugs } from "@/shared/api";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getNewsSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);
  if (!item) return { title: "Новость не найдена" };
  return {
    title: item.title,
    description: item.excerpt,
    openGraph: { images: item.cover ? [item.cover] : undefined },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <NewsDetailsPage slug={slug} />;
}
