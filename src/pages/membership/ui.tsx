import {
  ApplicationForm,
  DocumentsChecklist,
} from "@/features/membership-application";

import { getDocuments, getMembership } from "@/shared/api";
import { Container, FileLink, PageIntro } from "@/shared/ui";

// Это действительно последовательность, поэтому шаги пронумерованы.
const STEPS = [
  {
    title: "Изучите Положение о членстве",
    text: "В нём — права и обязанности членов, порядок приёма и размер взноса.",
  },
  {
    title: "Соберите пакет документов",
    text: "Заполните формы 1–3 и подготовьте копии учредительных документов по перечню ниже.",
  },
  {
    title: "Отправьте заявку президенту Ассоциации",
    text: "Секретариат свяжется с вами и согласует передачу оригиналов и оплату взноса.",
  },
];

export async function MembershipPage() {
  const [membership, forms] = await Promise.all([
    getMembership(),
    getDocuments("membership"),
  ]);

  return (
    <>
      <PageIntro
        crumbs={[
          { href: "/members", label: "Члены ассоциации" },
          { label: "Вступление" },
        ]}
        title="Вступление в ассоциацию"
        lead="Действительными членами МАЭСС становятся организации: проектные и строительные компании, научные институты, университеты. Решение принимает президент Ассоциации на основании пакета документов."
      />

      <section aria-label="Порядок вступления" className="border-b border-rule">
        <Container>
          <ol className="grid md:grid-cols-3">
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                className="border-b border-rule py-10 last:border-b-0 md:border-b-0 md:border-l md:px-8 md:first:border-l-0 md:first:pl-0"
              >
                <span className="font-display text-[2.5rem] leading-none text-steel tabular">
                  {i + 1}
                </span>
                <h2 className="mt-5 text-h3">{step.title}</h2>
                <p className="mt-2 text-steel">{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="checklist" className="py-16 md:py-24">
        <Container className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <h2 id="checklist" className="text-h2">
              Перечень документов
            </h2>
            <p className="mt-4 max-w-xl text-steel">
              Отмечайте собранное — перечень запомнит прогресс.
            </p>
            <div className="mt-10">
              <DocumentsChecklist documents={membership.documents} />
            </div>
          </div>
          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="lg:sticky lg:top-28">
              <h2 className="text-small text-steel">Положение и формы</h2>
              <div className="mt-3 border-t border-petrol">
                {forms.map((d) => (
                  <FileLink
                    key={d.id}
                    kind={d.kind}
                    title={d.title}
                    url={d.url}
                  />
                ))}
              </div>
            </div>
          </aside>
        </Container>
      </section>

      <section
        id="application"
        aria-labelledby="application-title"
        className="border-t border-rule bg-paper py-16 md:py-24"
      >
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <h2 id="application-title" className="text-h2">
              Заявка
            </h2>
            <p className="mt-4 text-steel">
              Короткая анкета, чтобы секретариат связался с вами. Документы
              передаются отдельно, после согласования.
            </p>
          </div>
          <ApplicationForm className="lg:col-span-7 lg:col-start-6" />
        </Container>
      </section>
    </>
  );
}
