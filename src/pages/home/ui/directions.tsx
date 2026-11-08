import Link from "next/link";

import type { Service } from "@/shared/api";
import { ROUTES } from "@/shared/config";
import { Container, SectionHeading, TextLink } from "@/shared/ui";

export function Directions({ services }: { services: Service[] }) {
  return (
    <section aria-labelledby="directions-title" className="pb-20 md:pb-28">
      <Container>
        <SectionHeading
          id="directions-title"
          title="Чем занимается ассоциация"
          action={<TextLink href={ROUTES.services}>Все услуги</TextLink>}
        />
        <ul className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <li
              key={service.id}
              className="group relative border-t border-petrol pt-6"
            >
              <h3 className="text-h3">
                <Link
                  href={`${ROUTES.services}#${service.id}`}
                  className="decoration-1 underline-offset-[5px] after:absolute after:inset-0 group-hover:underline"
                >
                  {service.title}
                </Link>
              </h3>
              <p className="mt-3 text-steel">{service.summary}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
