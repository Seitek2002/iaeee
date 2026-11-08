import { NewsCard, NewsRow } from "@/entities/news-item";

import type { NewsItem } from "@/shared/api";
import { ROUTES } from "@/shared/config";
import { Container, SectionHeading, TextLink } from "@/shared/ui";

export function LatestNews({ items }: { items: NewsItem[] }) {
  // Крупно — последний отмеченный «главным» материал, остальные — списком.
  const lead = items.find((n) => n.featured) ?? items[0];
  const rest = items.filter((n) => n !== lead).slice(0, 4);

  return (
    <section
      aria-labelledby="news-title"
      className="border-t border-rule py-20 md:py-28"
    >
      <Container>
        <SectionHeading
          id="news-title"
          title="Новости"
          action={<TextLink href={ROUTES.news}>Все новости</TextLink>}
        />
        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          <NewsCard item={lead} size="large" className="lg:col-span-7" />
          <div className="lg:col-span-4 lg:col-start-9">
            {rest.map((item) => (
              <NewsRow key={item.slug} item={item} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
