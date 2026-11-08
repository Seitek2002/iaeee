import { RequestButton } from "@/features/contact-request";

import { getServices, getStandards } from "@/shared/api";
import { ROUTES } from "@/shared/config";
import { ButtonLink, Container, PageIntro, SectionHeading } from "@/shared/ui";

// Тема обращения для формы — по направлению услуги.
const TOPIC: Record<string, string> = {
  expertise: "Экспертиза проекта или нормативного документа",
  engineering: "Инжиниринг и консультации",
  research: "Испытания и исследования",
  education: "Обучение и семинары",
};

export async function ServicesPage() {
  const [services, standards] = await Promise.all([
    getServices(),
    getStandards(),
  ]);

  return (
    <>
      <PageIntro
        crumbs={[{ label: "Инженерные услуги" }]}
        title="Инженерные услуги"
        lead="Экспертизу, расчёты, испытания и обучение выполняют специалисты институтов, университетов и проектных организаций — членов Ассоциации."
      />

      <nav aria-label="Направления" className="border-b border-rule">
        <Container className="scrollbar-none flex gap-8 overflow-x-auto py-4 text-small">
          {services.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="shrink-0 text-steel underline-offset-4 hover:text-petrol hover:underline"
            >
              {s.title}
            </a>
          ))}
        </Container>
      </nav>

      {services.map((service) => (
        <section
          key={service.id}
          id={service.id}
          aria-labelledby={`${service.id}-title`}
          className="border-b border-rule py-16 md:py-24"
        >
          <Container className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <h2 id={`${service.id}-title`} className="text-h2">
                {service.title}
              </h2>
              <p className="mt-5 max-w-md text-lead text-steel">
                {service.summary}
              </p>
              <div className="mt-8">
                <RequestButton topic={TOPIC[service.id]} />
              </div>
            </div>
            <ul className="border-t border-petrol lg:col-span-6 lg:col-start-7">
              {service.items.map((item) => (
                <li
                  key={item}
                  className="border-b border-rule py-4 leading-relaxed"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ))}

      <section aria-labelledby="norms" className="py-20 md:py-28">
        <Container>
          <SectionHeading
            id="norms"
            title="Опыт в нормировании"
            description="Специалисты МАЭСС сопровождали разработку строительных норм Кыргызской Республики и стандартов организаций."
            action={
              <ButtonLink href={ROUTES.documents} variant="outline" size="sm">
                Пособия и документы
              </ButtonLink>
            }
          />
          <ul className="mt-12 grid gap-x-8 border-t border-petrol sm:grid-cols-2 lg:grid-cols-3">
            {standards.map((s, i) => (
              <li key={i} className="border-b border-rule py-5">
                <p className="font-display font-semibold">{s.code}</p>
                <p className="mt-1.5 text-small leading-relaxed text-steel">
                  {s.title}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
