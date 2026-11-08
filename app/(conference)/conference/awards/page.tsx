import type { Metadata } from "next";

import { ConferenceAwardsPage } from "@/pages/conference-awards";

export const metadata: Metadata = {
  title: "Награды МАЭСС",
  description:
    "Медали и знаки МАЭСС, порядок представления к награждению и добровольные взносы.",
  alternates: {
    languages: { ru: "/conference/awards", en: "/conference/en/awards" },
  },
};

export default function Page() {
  return <ConferenceAwardsPage lang="ru" />;
}
