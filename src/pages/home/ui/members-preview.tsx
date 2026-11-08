import { MemberRow } from "@/entities/member";

import type { Member } from "@/shared/api";
import { ROUTES } from "@/shared/config";
import { Container, SectionHeading, TextLink } from "@/shared/ui";

export function MembersPreview({ members }: { members: Member[] }) {
  return (
    <section
      aria-labelledby="members-title"
      className="border-t border-rule py-20 md:py-28"
    >
      <Container>
        <SectionHeading
          id="members-title"
          title="Действительные члены"
          description="Университеты, научные институты и проектные организации, которые определяют работу Ассоциации."
          action={
            <TextLink href={ROUTES.members}>О каждой организации</TextLink>
          }
        />
        <div className="mt-12 border-t border-petrol">
          {members.map((member) => (
            <MemberRow key={member.id} member={member} />
          ))}
        </div>
      </Container>
    </section>
  );
}
