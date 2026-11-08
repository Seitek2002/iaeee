import { MembershipCta } from "@/widgets/membership-cta";

import { COUNTRY_LABEL } from "@/entities/member";

import { getMembers, getMembership } from "@/shared/api";
import { plural } from "@/shared/lib";
import { ArrowUpRightIcon, Container, PageIntro } from "@/shared/ui";

export async function MembersPage() {
  const [members, membership] = await Promise.all([
    getMembers(),
    getMembership(),
  ]);
  const countries = new Set(members.map((m) => m.country)).size;

  return (
    <>
      <PageIntro
        crumbs={[{ label: "Члены ассоциации" }]}
        title="Члены ассоциации"
        lead={`${members.length} ${plural(members.length, ["организация", "организации", "организаций"])} из ${countries} ${plural(countries, ["страны", "стран", "стран"])}: университеты, научно-исследовательские институты, проектные организации и профессиональные ассоциации.`}
      />

      <div>
        {members.map((member) => (
          <section
            key={member.id}
            id={member.id}
            aria-labelledby={`${member.id}-name`}
            className="scroll-mt-24 border-b border-rule py-14 md:py-20"
          >
            <Container className="grid gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-4">
                <p className="font-display text-[clamp(2.25rem,1.8rem+1.6vw,3.25rem)] leading-none font-semibold tracking-[-0.03em]">
                  {member.abbr}
                </p>
                <p className="mt-4 text-small text-steel">
                  {[member.city, COUNTRY_LABEL[member.country]]
                    .filter(Boolean)
                    .join(", ")}
                </p>
                {member.url && (
                  <a
                    href={member.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-small font-medium underline decoration-current/30 underline-offset-4 hover:decoration-current"
                  >
                    {member.url
                      .replace(/^https?:\/\/(www\.)?/, "")
                      .replace(/\/.*$/, "")}
                    <ArrowUpRightIcon size={15} />
                  </a>
                )}
              </div>
              <div className="lg:col-span-7 lg:col-start-6">
                <h2 id={`${member.id}-name`} className="text-h3">
                  {member.name}
                </h2>
                <div className="prose-article mt-5 text-[1.0625rem]">
                  {member.description.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
                {member.activities && (
                  <ul className="mt-6 grid gap-x-8 border-t border-rule sm:grid-cols-2">
                    {member.activities.map((a) => (
                      <li
                        key={a}
                        className="border-b border-rule py-3 text-small"
                      >
                        {a}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Container>
          </section>
        ))}
      </div>

      <section aria-labelledby="partnership" className="py-20 md:py-28">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <h2 id="partnership" className="text-h2 lg:col-span-4">
            Партнёрство и поддержка
          </h2>
          <div className="prose-article space-y-5 lg:col-span-7 lg:col-start-6">
            {membership.partnership.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Container>
      </section>

      <MembershipCta />
    </>
  );
}
