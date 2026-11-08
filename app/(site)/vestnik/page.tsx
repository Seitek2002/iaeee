import type { Metadata } from "next";

import { VestnikPage } from "@/pages/vestnik";

export const metadata: Metadata = {
  title: "Вестник МАЭСС",
  description:
    "Рецензируемый научный журнал МАЭСС: ISSN 1694-7797, DOI 10.30451, РИНЦ. Архив выпусков и статей по сейсмостойкому строительству.",
};

export default function Page() {
  return <VestnikPage />;
}
