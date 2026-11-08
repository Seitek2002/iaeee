import { RouteProfile } from "@/widgets/route-profile";

import type { Conference, Lang } from "@/shared/api";
import { CONF_UI, ROUTES, confHref } from "@/shared/config";
import { cn, eventStatus, pick } from "@/shared/lib";
import { Container, PillLink } from "@/shared/ui";

export function ConferenceHero({
  conf,
  lang,
}: {
  conf: Conference;
  lang: Lang;
}) {
  const ui = CONF_UI[lang];
  const status = eventStatus(conf.start, conf.end);
  const statusText =
    status === "finished"
      ? ui.statusFinished
      : status === "ongoing"
        ? ui.statusOngoing
        : ui.statusUpcoming;

  return (
    <section
      aria-labelledby="conf-title"
      className="on-dark overflow-hidden bg-lake text-snow"
    >
      <Container className="pt-10 md:pt-14">
        <p className="inline-flex items-center gap-2.5 rounded-full bg-snow/8 py-1.5 pr-4 pl-3 text-small">
          <span
            aria-hidden="true"
            className={cn(
              "size-2 rounded-full",
              status === "finished" ? "bg-glacier" : "bg-apricot",
            )}
          />
          {statusText}
        </p>

        <div className="mt-8 grid items-end gap-x-10 gap-y-6 lg:grid-cols-12">
          <p
            aria-hidden="true"
            className="font-conf-display text-c-numeral font-bold text-apricot lg:col-span-4"
          >
            {conf.number}
          </p>
          <div className="lg:col-span-8 lg:pb-3">
            <h1
              id="conf-title"
              className="font-conf-display text-c-h1 text-balance"
            >
              <span className="sr-only">{conf.number} </span>
              {pick(conf.title, lang)}
            </h1>
            <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 font-conf-display text-[clamp(1rem,0.9rem+0.5vw,1.375rem)] font-medium">
              <span>{ui.dates}</span>
              <span aria-hidden="true" className="h-px w-8 bg-glacier/50" />
              <span className="text-glacier">{ui.place}</span>
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-8 border-t border-glacier/15 pt-8 lg:grid-cols-12">
          <p className="max-w-xl text-lead text-glacier lg:col-span-6">
            {status === "finished" ? ui.finishedNote : pick(conf.welcome, lang)}
          </p>
          <div className="flex flex-wrap gap-3 lg:col-span-6 lg:justify-end">
            <PillLink href={confHref(lang, "/program")}>{ui.program}</PillLink>
            <PillLink href={ROUTES.issue("2026-1")} variant="ghost-dark">
              {ui.papers}
            </PillLink>
            {status !== "finished" && (
              <PillLink
                href={confHref(lang, "/participation")}
                variant="ghost-dark"
              >
                {ui.howToJoin}
              </PillLink>
            )}
          </div>
        </div>
      </Container>

      <Container className="mt-14 pb-10 md:mt-20">
        <RouteProfile lang={lang} />
      </Container>
    </section>
  );
}
