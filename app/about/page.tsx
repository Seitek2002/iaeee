import type { Metadata } from "next";

import { AboutPage } from "@/pages/about";

export const metadata: Metadata = {
  title: "Об ассоциации",
  description:
    "История, принципы и цели МАЭСС, почётный президиум, хроника работы с 2016 года и секретариат.",
};

export default function Page() {
  return <AboutPage />;
}
