export const ROUTES = {
  home: "/",
  about: "/about",
  news: "/news",
  newsItem: (slug: string) => `/news/${slug}`,
  vestnik: "/vestnik",
  issue: (id: string) => `/vestnik/${id}`,
  services: "/services",
  members: "/members",
  membership: "/membership",
  documents: "/documents",
  contacts: "/contacts",
  conference: "/conference",
} as const;

export interface NavItem {
  href: string;
  label: string;
}

export const MAIN_NAV: NavItem[] = [
  { href: ROUTES.about, label: "Об ассоциации" },
  { href: ROUTES.news, label: "Новости" },
  { href: ROUTES.vestnik, label: "Вестник" },
  { href: ROUTES.services, label: "Услуги" },
  { href: ROUTES.members, label: "Члены" },
  { href: ROUTES.documents, label: "Документы" },
  { href: ROUTES.conference, label: "Конференция" },
  { href: ROUTES.contacts, label: "Контакты" },
];
