import type { Metadata } from "next";

import { ConferenceArchivePage } from "@/pages/conference-archive";

export const metadata: Metadata = {
  title: "Conference archive",
  description:
    "IAEEE international conferences on earthquake engineering since 2016.",
  alternates: {
    languages: { ru: "/conference/archive", en: "/conference/en/archive" },
  },
};

export default function Page() {
  return <ConferenceArchivePage lang="en" />;
}
