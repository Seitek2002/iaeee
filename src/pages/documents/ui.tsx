import { type DocumentGroup, getDocuments } from "@/shared/api";
import { Container, FileLink, PageIntro } from "@/shared/ui";

const GROUPS: { id: DocumentGroup; title: string; text: string }[] = [
  {
    id: "manuals",
    title: "Практические пособия",
    text: "Для инженеров-расчётчиков, конструкторов, студентов и магистрантов.",
  },
  {
    id: "organization",
    title: "Об ассоциации",
    text: "Профайл МАЭСС на русском и английском языках.",
  },
  {
    id: "membership",
    title: "Членство",
    text: "Положение о членстве и формы для подачи заявления.",
  },
  {
    id: "journal",
    title: "«Вестник МАЭСС»",
    text: "Требования к статьям и состав редакционной коллегии.",
  },
  {
    id: "conference",
    title: "Конференции и конкурсы",
    text: "Программа и информационные сообщения VI МНПК, условия конкурса молодых учёных.",
  },
  {
    id: "seminars",
    title: "Материалы семинаров",
    text: "Презентации семинаров по сейсмической безопасности школ (проект ERIK).",
  },
];

const LANG = { ru: "Русский", en: "English", ky: "Кыргызча" } as const;

export async function DocumentsPage() {
  const docs = await getDocuments();

  return (
    <>
      <PageIntro
        crumbs={[{ label: "Документы" }]}
        title="Документы"
        lead="Пособия, положения, формы и материалы мероприятий. Файлы открываются в новой вкладке."
      />
      <div className="pb-24 md:pb-32">
        {GROUPS.map((group) => {
          const items = docs.filter((d) => d.group === group.id);
          if (!items.length) return null;
          return (
            <section
              key={group.id}
              id={group.id}
              aria-labelledby={`${group.id}-title`}
              className="pt-16 md:pt-20"
            >
              <Container className="grid gap-8 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-4">
                  <h2 id={`${group.id}-title`} className="text-h3">
                    {group.title}
                  </h2>
                  <p className="mt-2 max-w-sm text-small text-steel">
                    {group.text}
                  </p>
                </div>
                <div className="border-t border-petrol lg:col-span-8">
                  {items.map((d) => (
                    <FileLink
                      key={d.id}
                      kind={d.kind}
                      title={d.title}
                      url={d.url}
                      meta={[
                        d.note,
                        d.year,
                        d.lang && d.lang !== "ru" ? LANG[d.lang] : null,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    />
                  ))}
                </div>
              </Container>
            </section>
          );
        })}
      </div>
    </>
  );
}
