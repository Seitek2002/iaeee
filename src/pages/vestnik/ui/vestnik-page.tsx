import { RequestButton } from "@/features/contact-request";
import { SubscribeForm } from "@/features/newsletter-subscribe";

import { getIssues, getJournalInfo } from "@/shared/api";
import { Container, FileLink, PageIntro, SectionHeading } from "@/shared/ui";

import { IssueArchive } from "./issue-archive";

export async function VestnikPage() {
  const [journal, issues] = await Promise.all([getJournalInfo(), getIssues()]);

  return (
    <>
      <PageIntro
        crumbs={[{ label: "Вестник МАЭСС" }]}
        title="Вестник МАЭСС"
        lead={journal.about[0]}
        aside={
          <dl className="border-[1.5px] border-petrol text-[0.9375rem]">
            {[
              ["ISSN печатной версии", journal.issn],
              ["Префикс DOI", journal.doi],
              ["Свидетельство СМИ", journal.mediaRegistration],
              ["Индексация", `${journal.index}, с 2018 года`],
            ].map(([label, value]) => (
              <div
                key={label}
                className="grid grid-cols-[9.5rem_1fr] border-b border-petrol/40 last:border-b-0"
              >
                <dt className="border-r border-petrol/40 px-4 py-3 text-caption text-steel">
                  {label}
                </dt>
                <dd className="px-4 py-3 tabular">{value}</dd>
              </div>
            ))}
          </dl>
        }
      >
        <p className="mt-5 max-w-2xl text-steel">{journal.about[1]}</p>
      </PageIntro>

      <section aria-labelledby="authors" className="py-16 md:py-20">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="authors" className="text-h3">
              Авторам
            </h2>
            <p className="mt-3 max-w-md text-steel">
              Принимаем статьи по сейсмологии, строительной динамике, расчёту и
              испытаниям конструкций на русском, кыргызском и английском языках.
            </p>
            <div className="mt-6">
              <RequestButton
                topic="Публикация статьи в «Вестнике МАЭСС»"
                label="Предложить статью"
                variant="primary"
              />
            </div>
          </div>
          <div className="lg:col-span-4">
            <div className="border-t border-petrol">
              <FileLink
                kind="pdf"
                title="Требования к оформлению статей"
                url={journal.requirementsUrl}
              />
              <FileLink
                kind="docx"
                title="Редакционная коллегия"
                url={journal.boardUrl}
              />
            </div>
          </div>
          <div className="lg:col-span-3">
            <SubscribeForm tone="light" />
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="archive"
        className="border-t border-rule pt-16 pb-24 md:pt-20 md:pb-32"
      >
        <Container>
          <SectionHeading
            id="archive"
            title="Выпуски"
            description="Оглавления с 2019 года, статьи — в PDF. Архив ранних выпусков переносится со старого сайта."
            className="mb-10"
          />
          <IssueArchive issues={issues} />
        </Container>
      </section>
    </>
  );
}
