import type { Metadata } from "next";

import { DocumentsPage } from "@/pages/documents";

export const metadata: Metadata = {
  title: "Документы",
  description:
    "Практические пособия, профайл ассоциации, Положение о членстве, материалы конференций и семинаров МАЭСС.",
};

export default function Page() {
  return <DocumentsPage />;
}
