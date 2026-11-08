import { Chronicle } from "@/widgets/chronicle";
import { MembershipCta } from "@/widgets/membership-cta";

import { ContactCard, PersonCard } from "@/entities/person";

import {
  getAbout,
  getContactPeople,
  getDocuments,
  getMilestones,
  getPresidium,
  getStandards,
} from "@/shared/api";
import { Container, FileLink, PageIntro, SectionHeading } from "@/shared/ui";

import { StandardsTable } from "./standards-table";

export async function AboutPage() {
  const [about, presidium, milestones, people, standards, docs] =
    await Promise.all([
      getAbout(),
      getPresidium(),
      getMilestones(),
      getContactPeople(),
      getStandards(),
      getDocuments("organization"),
    ]);

  return (
    <>
      <PageIntro
        crumbs={[{ label: "Об ассоциации" }]}
        title="Об ассоциации"
        lead={about.text[0]}
        aside={
          <div>
            <p className="text-small text-steel">Профайл ассоциации</p>
            <div className="mt-2 border-t border-petrol">
              {docs.map((d) => (
                <FileLink
                  key={d.id}
                  kind={d.kind}
                  title={d.title}
                  url={d.url}
                  meta={d.lang === "en" ? "English" : "Русский"}
                />
              ))}
            </div>
          </div>
        }
      >
        <p className="prose-article mt-8 max-w-[38rem] text-steel">
          {about.text[1]}
        </p>
      </PageIntro>

      <section aria-label="Принципы и цели" className="py-20 md:py-28">
        <Container className="grid gap-16 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2 className="text-h2">Принципы</h2>
            <ul className="mt-10 border-t border-petrol">
              {about.principles.map((item) => (
                <li
                  key={item}
                  className="border-b border-rule py-5 leading-relaxed"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-h2">Цели</h2>
            <ul className="mt-10 border-t border-petrol">
              {about.goals.map((item) => (
                <li
                  key={item}
                  className="border-b border-rule py-5 leading-relaxed"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="standards"
        className="border-t border-rule py-20 md:py-28"
      >
        <Container>
          <SectionHeading
            id="standards"
            title="Нормы, в разработке которых участвовали эксперты"
            description="Научно-консультационное сопровождение строительных норм Кыргызской Республики и стандартов организаций."
          />
          <StandardsTable standards={standards} className="mt-12" />
        </Container>
      </section>

      <section
        id="presidium"
        aria-labelledby="presidium-title"
        className="border-t border-rule py-20 md:py-28"
      >
        <Container>
          <SectionHeading
            id="presidium-title"
            title="Почётный президиум"
            description="Учёные и руководители ведущих строительных организаций Кыргызстана, Казахстана, Узбекистана и России."
          />
          <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-6">
            {presidium.map((person) => (
              <PersonCard key={person.id} person={person} />
            ))}
          </div>
          <dl className="mt-16 grid gap-x-12 border-t border-petrol md:grid-cols-2">
            {presidium.map((person) => (
              <div key={person.id} className="border-b border-rule py-5">
                <dt className="font-medium">{person.shortName}</dt>
                <dd className="mt-1.5 text-small leading-relaxed text-steel">
                  {person.bio}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section
        aria-labelledby="chronicle-title"
        className="on-dark bg-petrol py-20 text-on-dark md:py-28"
      >
        <Container>
          <SectionHeading
            id="chronicle-title"
            tone="dark"
            title="Хроника"
            description="Основные мероприятия и работы Ассоциации с момента основания."
            className="mb-14"
          />
          <Chronicle milestones={milestones} tone="dark" />
        </Container>
      </section>

      <section aria-labelledby="secretariat" className="py-20 md:py-28">
        <Container>
          <SectionHeading id="secretariat" title="Секретариат" />
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {people.map((p) => (
              <ContactCard key={p.id} person={p} />
            ))}
          </div>
        </Container>
      </section>

      <MembershipCta />
    </>
  );
}
