import { Chronicle } from "@/widgets/chronicle";
import { MembershipCta } from "@/widgets/membership-cta";
import { VestnikSpotlight } from "@/widgets/vestnik-spotlight";

import {
  getIssues,
  getJournalInfo,
  getLatestNews,
  getMembers,
  getMilestones,
  getOrganization,
  getPresidium,
  getServices,
} from "@/shared/api";
import { Container, SectionHeading } from "@/shared/ui";

import { AboutTeaser } from "./about-teaser";
import { Directions } from "./directions";
import { Hero } from "./hero";
import { LatestNews } from "./latest-news";
import { MembersPreview } from "./members-preview";

/** Шесть конференций: I (2016), II (2018), III (2022) … VI (2026). */
const CONFERENCES_HELD = 6;

export async function HomePage() {
  const [
    organization,
    presidium,
    services,
    news,
    issues,
    journal,
    milestones,
    members,
  ] = await Promise.all([
    getOrganization(),
    getPresidium(),
    getServices(),
    getLatestNews(6),
    getIssues(),
    getJournalInfo(),
    getMilestones(),
    getMembers(),
  ]);

  const president = presidium[0];
  const latestIssue = issues[0];

  return (
    <>
      <Hero
        stamp={{
          founded: organization.founded,
          legalStatus: organization.legalStatus,
          president: `${president.shortName}, д.т.н., профессор`,
          issn: journal.issn,
          members: members.length,
          countries: new Set(members.map((m) => m.country)).size,
          conferences: CONFERENCES_HELD,
          issues: latestIssue.total,
        }}
      />
      <AboutTeaser organization={organization} president={president} />
      <Directions services={services} />
      <LatestNews items={news} />
      <VestnikSpotlight
        issue={latestIssue}
        journal={journal}
        issuesCount={latestIssue.total}
      />
      <section aria-labelledby="chronicle-title" className="py-20 md:py-28">
        <Container>
          <SectionHeading
            id="chronicle-title"
            title="Хроника"
            description="Десять лет работы: конференции, нормы, испытания и обучение."
            className="mb-14"
          />
          <Chronicle milestones={milestones} />
        </Container>
      </section>
      <MembersPreview members={members} />
      <MembershipCta />
    </>
  );
}
