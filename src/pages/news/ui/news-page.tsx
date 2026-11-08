import { getNews } from "@/shared/api";
import { Container, PageIntro } from "@/shared/ui";

import { NewsList } from "./news-list";

export async function NewsPage() {
  const items = await getNews();

  return (
    <>
      <PageIntro
        crumbs={[{ label: "Новости" }]}
        title="Новости"
        lead="Семинары и конференции, новые пособия, конкурсы для молодых учёных и награды членов Ассоциации."
        className="border-b-0 pb-8 md:pb-10"
      />
      <Container className="pb-24 md:pb-32">
        <NewsList items={items} />
      </Container>
    </>
  );
}
