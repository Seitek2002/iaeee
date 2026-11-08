import type { Metadata } from "next";

import { ServicesPage } from "@/pages/services";

export const metadata: Metadata = {
  title: "Инженерные услуги",
  description:
    "Экспертиза проектов и нормативных документов, инжиниринг, вибрационные испытания и обучение инженеров по сейсмостойкому строительству.",
};

export default function Page() {
  return <ServicesPage />;
}
