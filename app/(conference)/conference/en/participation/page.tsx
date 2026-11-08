import type { Metadata } from "next";

import { ConferenceParticipationPage } from "@/pages/conference-participation";

export const metadata: Metadata = {
  title: "Conference participation",
  description:
    "Registration, fees, paper requirements, peer review, accommodation and transfer.",
  alternates: {
    languages: {
      ru: "/conference/participation",
      en: "/conference/en/participation",
    },
  },
};

export default function Page() {
  return <ConferenceParticipationPage lang="en" />;
}
