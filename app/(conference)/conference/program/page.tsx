import type { Metadata } from "next";

import { ConferenceProgramPage } from "@/pages/conference-program";

export const metadata: Metadata = {
  title: "Программа конференции",
  description:
    "Программа VI конференции по сейсмостойкому строительству: пленарные сессии, доклады, экскурсии и круглые столы.",
  alternates: {
    languages: { ru: "/conference/program", en: "/conference/en/program" },
  },
};

export default function Page() {
  return <ConferenceProgramPage lang="ru" />;
}
