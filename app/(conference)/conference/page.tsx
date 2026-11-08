import type { Metadata } from "next";

import { ConferenceHomePage } from "@/pages/conference-home";

export const metadata: Metadata = {
  title: "VI конференция по сейсмостойкому строительству",
  description:
    "VI Конференция по сейсмостойкому строительству, 22–28 июня 2026, Бишкек — Иссык-Куль: программа, площадки, участие и материалы.",
  alternates: { languages: { ru: "/conference", en: "/conference/en" } },
};

export default function Page() {
  return <ConferenceHomePage lang="ru" />;
}
