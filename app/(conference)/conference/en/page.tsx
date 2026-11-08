import type { Metadata } from "next";

import { ConferenceHomePage } from "@/pages/conference-home";

export const metadata: Metadata = {
  title: "VI Conference on Earthquake Engineering",
  description:
    "VI International Conference on Earthquake Engineering, June 22–28, 2026, Bishkek — Issyk-Kul: programme, venues, participation and materials.",
  alternates: { languages: { ru: "/conference", en: "/conference/en" } },
};

export default function Page() {
  return <ConferenceHomePage lang="en" />;
}
