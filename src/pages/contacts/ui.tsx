import { ContactForm } from "@/features/contact-request";

import { ContactCard } from "@/entities/person";

import { getContactPeople } from "@/shared/api";
import { SITE } from "@/shared/config";
import {
  ArrowUpRightIcon,
  Container,
  MailIcon,
  PageIntro,
  PinIcon,
} from "@/shared/ui";

export async function ContactsPage() {
  const people = await getContactPeople();

  return (
    <>
      <PageIntro
        crumbs={[{ label: "Контакты" }]}
        title="Контакты"
        lead="Секретариат Ассоциации работает в Бишкеке. Быстрее всего ответят в WhatsApp или по электронной почте."
        aside={
          <address className="space-y-4 border-t border-petrol pt-5 not-italic">
            <p className="flex gap-3">
              <PinIcon size={20} className="mt-0.5 shrink-0 text-steel" />
              <span>
                {SITE.addressFull}
                <a
                  href={SITE.mapHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1.5 flex items-center gap-1.5 text-small text-steel underline decoration-current/30 underline-offset-4 hover:text-petrol"
                >
                  Открыть в 2ГИС
                  <ArrowUpRightIcon size={14} />
                </a>
              </span>
            </p>
            <p className="flex gap-3">
              <MailIcon size={20} className="mt-0.5 shrink-0 text-steel" />
              <a
                href={`mailto:${SITE.email}`}
                className="underline-offset-4 hover:underline"
              >
                {SITE.email}
              </a>
            </p>
          </address>
        }
      />

      <section aria-label="Контактные лица" className="py-16 md:py-20">
        <Container className="grid gap-10 md:grid-cols-3">
          {people.map((p) => (
            <ContactCard key={p.id} person={p} />
          ))}
        </Container>
      </section>

      <section
        id="form"
        aria-labelledby="form-title"
        className="scroll-mt-20 border-t border-rule bg-paper py-16 md:py-24"
      >
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <h2 id="form-title" className="text-h2">
              Написать в секретариат
            </h2>
            <p className="mt-4 max-w-sm text-steel">
              Экспертиза, испытания, обучение, публикация в «Вестнике» или
              членство — выберите тему, и письмо попадёт к нужному координатору.
            </p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}
