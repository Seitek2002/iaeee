import type { Metadata } from "next";

import { ContactsPage } from "@/pages/contacts";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Секретариат МАЭСС: Бишкек, мкр. Джал-29, д. 4/1. Телефоны координаторов, WhatsApp, электронная почта и форма обращения.",
};

export default function Page() {
  return <ContactsPage />;
}
