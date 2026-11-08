import { notFound } from "next/navigation";

import { NewsGallery } from "@/widgets/news-gallery";

import { NewsCard, NewsMeta } from "@/entities/news-item";

import { getNewsBySlug, getRelatedNews } from "@/shared/api";
import { ROUTES } from "@/shared/config";
import {
  ArrowUpRightIcon,
  Breadcrumbs,
  Container,
  Cover,
  FileLink,
  SectionHeading,
  TextLink,
} from "@/shared/ui";

import { ArticleBody } from "./article-body";

export async function NewsDetailsPage({ slug }: { slug: string }) {
  const item = await getNewsBySlug(slug);
  if (!item) notFound();

  const related = await getRelatedNews(item, 3);
  const poster = item.cover && item.coverFit === "contain";
  const photo = item.cover && !poster;
  // Если есть галерея, первое фото уже стоит обложкой — не дублируем его.
  const gallery = item.gallery?.filter((src) => src !== item.cover) ?? [];

  return (
    <article>
      <Container className="pt-10 md:pt-14">
        <Breadcrumbs
          items={[
            { href: ROUTES.home, label: "Главная" },
            { href: ROUTES.news, label: "Новости" },
            { label: item.title },
          ]}
        />
        <header className="mt-10 max-w-4xl">
          <NewsMeta item={item} />
          <h1 className="mt-5 text-[clamp(2rem,1.4rem+2.6vw,3.5rem)] leading-[1.06] tracking-[-0.028em]">
            {item.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lead text-steel">{item.excerpt}</p>
        </header>
      </Container>

      {photo && (
        <Container className="mt-12">
          <Cover
            src={item.cover}
            alt=""
            seedKey={item.slug}
            priority
            sizes="(min-width: 1320px) 1224px, 100vw"
            className="aspect-[16/9] md:aspect-[2/1]"
          />
        </Container>
      )}

      <Container className="mt-12 grid gap-14 pb-20 md:mt-16 md:pb-28 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <ArticleBody blocks={item.body} />

          {gallery.length > 0 && (
            <section aria-label="Фотографии" className="mt-14">
              <h2 className="mb-5 text-h3">Фотографии</h2>
              <NewsGallery images={gallery} title={item.title} />
            </section>
          )}
        </div>

        <aside className="flex flex-col gap-10 lg:col-span-4 lg:col-start-9">
          {poster && (
            <Cover
              src={item.cover}
              alt={`Афиша: ${item.title}`}
              fit="contain"
              seedKey={item.slug}
              priority
              sizes="(min-width: 1024px) 30vw, 100vw"
              className="aspect-[4/5]"
            />
          )}
          {item.attachments && item.attachments.length > 0 && (
            <section aria-labelledby="materials">
              <h2 id="materials" className="text-small text-steel">
                Материалы
              </h2>
              <div className="mt-3 border-t border-petrol">
                {item.attachments.map((a) => (
                  <FileLink
                    key={a.url}
                    kind={a.kind}
                    title={a.title}
                    url={a.url}
                  />
                ))}
              </div>
            </section>
          )}
          {item.source && (
            <a
              href={item.source}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 self-start text-small text-steel underline decoration-current/30 underline-offset-4 hover:text-petrol hover:decoration-current"
            >
              Публикация на текущем сайте
              <ArrowUpRightIcon size={15} />
            </a>
          )}
        </aside>
      </Container>

      {related.length > 0 && (
        <section
          aria-labelledby="related"
          className="border-t border-rule py-20 md:py-24"
        >
          <Container>
            <SectionHeading
              id="related"
              title="Ещё по теме"
              action={<TextLink href={ROUTES.news}>Все новости</TextLink>}
            />
            <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((n) => (
                <NewsCard key={n.slug} item={n} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </article>
  );
}
