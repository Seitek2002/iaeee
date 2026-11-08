import { type Lang, getConference, getConferenceProgram } from "@/shared/api";
import { CONF_UI, confHref } from "@/shared/config";
import { pick } from "@/shared/lib";
import { ConfPageHead, Container, DownloadIcon, pillClass } from "@/shared/ui";

import { ProgramView } from "./program-view";

export async function ConferenceProgramPage({ lang }: { lang: Lang }) {
  const ui = CONF_UI[lang];
  const [conf, program] = await Promise.all([
    getConference(),
    getConferenceProgram(),
  ]);
  const pdf = conf.documents[0];

  return (
    <>
      <ConfPageHead
        eyebrow={
          <a
            href={confHref(lang)}
            className="underline-offset-4 hover:text-snow hover:underline"
          >
            ICEE 2026
          </a>
        }
        title={ui.program}
        lead={`${ui.dates}. ${pick(conf.online, lang)}`}
        aside={
          <a
            href={pdf.url}
            target="_blank"
            rel="noopener noreferrer"
            className={pillClass("apricot")}
          >
            <DownloadIcon size={18} />
            {pick(pdf.title, lang)}
          </a>
        }
      />
      <Container className="pb-24 md:pb-32">
        <ProgramView
          days={program.days}
          sessions={program.sessions}
          lang={lang}
        />
      </Container>
    </>
  );
}
