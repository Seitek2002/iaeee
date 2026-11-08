import type { Metadata } from "next";

import { ConferenceArchivePage } from "@/pages/conference-archive";

export const metadata: Metadata = {
  title: "Архив конференций",
  description:
    "Международные научно-практические конференции МАЭСС по сейсмостойкому строительству с 2016 года.",
  alternates: {
    languages: { ru: "/conference/archive", en: "/conference/en/archive" },
  },
};

export default function Page() {
  return <ConferenceArchivePage lang="ru" />;
}
