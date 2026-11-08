import { ROUTES } from "@/shared/config";
import { ButtonLink, Container, Seismogram } from "@/shared/ui";

/**
 * Приглашение вступить. Внизу — та же сейсмограмма, что в первом экране,
 * но затихающая: визуальная рифма начала и конца главной страницы.
 */
export function MembershipCta() {
  return (
    <section
      aria-labelledby="membership-cta"
      className="relative overflow-hidden border-t border-rule"
    >
      <Container className="relative z-10 grid gap-10 py-20 md:py-28 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 id="membership-cta" className="text-h2">
            Вступайте в ассоциацию
          </h2>
          <p className="mt-5 max-w-xl text-lead text-steel">
            Членами МАЭСС становятся проектные и строительные организации,
            институты и университеты. Члены участвуют в разработке норм,
            экспертизе и испытаниях, выступают на конференциях и публикуются в
            «Вестнике».
          </p>
        </div>
        <div className="flex flex-wrap items-end gap-3 lg:col-span-5 lg:justify-end">
          <ButtonLink href={ROUTES.membership}>Как вступить</ButtonLink>
          <ButtonLink href={ROUTES.contacts} variant="outline">
            Написать в секретариат
          </ButtonLink>
        </div>
      </Container>
      <Seismogram
        seed={2016}
        p={0.05}
        s={0.08}
        gain={0.6}
        points={700}
        className="pointer-events-none absolute inset-x-0 bottom-6 h-16 w-full text-petrol/15"
      />
    </section>
  );
}
