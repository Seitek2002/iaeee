import type { Metadata } from "next";

import { MembershipPage } from "@/pages/membership";

export const metadata: Metadata = {
  title: "Вступление в ассоциацию",
  description:
    "Порядок вступления в МАЭСС: Положение о членстве, формы заявления, перечень документов и онлайн-заявка.",
};

export default function Page() {
  return <MembershipPage />;
}
