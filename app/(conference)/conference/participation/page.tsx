import type { Metadata } from "next";

import { ConferenceParticipationPage } from "@/pages/conference-participation";

export const metadata: Metadata = {
  title: "Участие в конференции",
  description:
    "Регистрация, взносы, требования к статьям, рецензирование, проживание и трансфер.",
  alternates: {
    languages: {
      ru: "/conference/participation",
      en: "/conference/en/participation",
    },
  },
};

export default function Page() {
  return <ConferenceParticipationPage lang="ru" />;
}
