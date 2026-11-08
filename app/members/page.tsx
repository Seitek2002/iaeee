import type { Metadata } from "next";

import { MembersPage } from "@/pages/members";

export const metadata: Metadata = {
  title: "Члены ассоциации",
  description:
    "Действительные члены МАЭСС: МУИТ, КГУСТА, Институт сейсмологии НАН КР, Промпроект, КазНИИСА, РАСС, РАДАР.",
};

export default function Page() {
  return <MembersPage />;
}
