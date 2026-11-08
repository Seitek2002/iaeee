import type { Metadata } from "next";

import { ConferenceAwardsPage } from "@/pages/conference-awards";

export const metadata: Metadata = {
  title: "IAEEE Awards",
  description:
    "IAEEE medals and badges, nomination procedure and voluntary contributions.",
  alternates: {
    languages: { ru: "/conference/awards", en: "/conference/en/awards" },
  },
};

export default function Page() {
  return <ConferenceAwardsPage lang="en" />;
}
