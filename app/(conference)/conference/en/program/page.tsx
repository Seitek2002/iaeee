import type { Metadata } from "next";

import { ConferenceProgramPage } from "@/pages/conference-program";

export const metadata: Metadata = {
  title: "Conference programme",
  description:
    "Programme of the VI Conference on Earthquake Engineering: plenary sessions, papers, tours and round tables.",
  alternates: {
    languages: { ru: "/conference/program", en: "/conference/en/program" },
  },
};

export default function Page() {
  return <ConferenceProgramPage lang="en" />;
}
