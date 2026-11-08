import Link from "next/link";

import { RouteProfile } from "@/widgets/route-profile";

import { CONF_UI, ROUTES } from "@/shared/config";
import { Container } from "@/shared/ui";

/**
 * Приглашение на сайт конференции. Нарочно в стилистике конференции —
 * ультрамарин и абрикос, — чтобы было видно: это отдельный сайт события.
 */
export function ConferenceTeaser() {
  const ui = CONF_UI.ru;

  return (
    <section
      aria-labelledby="conference-teaser"
      className="on-dark overflow-hidden bg-lake py-16 font-conf-text text-snow md:py-24"
    >
      <Container>
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <p
            aria-hidden="true"
            className="font-conf-display text-[clamp(5rem,3rem+8vw,10rem)] leading-[0.8] font-bold tracking-[-0.06em] text-apricot lg:col-span-3"
          >
            VI
          </p>
          <div className="lg:col-span-6">
            <h2 id="conference-teaser" className="font-conf-display text-c-h2">
              Международная конференция по сейсмостойкому строительству
            </h2>
            <p className="mt-4 text-lead text-glacier">
              {ui.dates}, {ui.place}. Около 50 докладов из 12 стран, семинар по
              сейсмоизоляции, экскурсии на «Бишкек Арену» и в ГИССИП.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-3 lg:justify-end">
            <Link
              href={ROUTES.conference}
              className="inline-flex h-12 items-center rounded-full bg-apricot px-6 font-semibold text-lake transition-colors hover:bg-[#f7b57d]"
            >
              Сайт конференции
            </Link>
          </div>
        </div>
        <div className="mt-12">
          <RouteProfile lang="ru" />
        </div>
      </Container>
    </section>
  );
}
