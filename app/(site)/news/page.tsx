import type { Metadata } from "next";

import { NewsPage } from "@/pages/news";

export const metadata: Metadata = {
  title: "Новости",
  description:
    "Семинары, конференции, публикации и события Международной ассоциации экспертов по сейсмостойкому строительству.",
};

export default function Page() {
  return <NewsPage />;
}
