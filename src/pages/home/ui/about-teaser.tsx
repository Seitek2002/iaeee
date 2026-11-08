import Image from "next/image";

import type { Organization, Person } from "@/shared/api";
import { ROUTES } from "@/shared/config";
import { ArrowUpRightIcon, Container, TextLink } from "@/shared/ui";

export function AboutTeaser({
  organization,
  president,
}: {
  organization: Organization;
  president: Person;
}) {
  return (
    <section
      aria-labelledby="about-title"
      className="border-t border-rule py-20 md:py-28"
    >
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <h2 id="about-title" className="text-h2">
            Наука, нормы и практика в одной ассоциации
          </h2>
          <div className="prose-article mt-8 max-w-[38rem] space-y-5">
            <p>
              МАЭСС — некоммерческое объединение юридических лиц, созданное в{" "}
              {organization.founded} году. В Ассоциацию входят научные
              институты, университеты и проектные организации Кыргызстана,
              Казахстана и России.
            </p>
            <p>
              Специалисты Ассоциации участвовали в разработке действующих
              строительных норм Кыргызской Республики, проводят экспертизу
              проектов и натурные вибрационные испытания, обучают инженеров
              вместе с Всемирным банком и ведущими производителями систем
              сейсмозащиты.
            </p>
          </div>
          <TextLink href={ROUTES.about} className="mt-8">
            Принципы, цели и хроника
          </TextLink>
        </div>

        <aside
          aria-label="Президент ассоциации"
          className="lg:col-span-4 lg:col-start-9"
        >
          <div className="flex gap-5 border-t border-petrol pt-6 lg:flex-col">
            <div className="relative aspect-[4/5] w-28 shrink-0 overflow-hidden bg-mist sm:w-36 lg:w-44">
              {president.photo && (
                <Image
                  src={president.photo}
                  alt={president.name}
                  fill
                  sizes="176px"
                  className="object-cover"
                />
              )}
            </div>
            <div>
              <p className="text-small text-steel">Президент ассоциации</p>
              <p className="mt-2 text-h3">{president.name}</p>
              <p className="mt-3 text-small leading-relaxed text-steel">
                {organization.president.title}. Член EERI (США) и ASSISi
                (Италия), член Технического совета Госстроя КР.
              </p>
              <a
                href={organization.president.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-small font-medium underline decoration-current/30 underline-offset-4 hover:decoration-current"
              >
                Резюме на сайте МУИТ
                <ArrowUpRightIcon size={15} />
              </a>
            </div>
          </div>
        </aside>
      </Container>
    </section>
  );
}
