import type { CountryIso, Lang } from "@/shared/api";

// Сайт конференции живёт в двух языковых версиях с отдельными адресами:
// /conference/... — русская, /conference/en/... — английская. Так обе
// версии статичны и индексируются, а переключение языка — обычная ссылка.

/** Даты текущей конференции — для статуса в шапке (без похода в API). */
export const CONFERENCE_DATES = {
  start: "2026-06-22",
  end: "2026-06-28",
} as const;

export function langFromPath(pathname: string): Lang {
  return pathname.startsWith("/conference/en") ? "en" : "ru";
}

export type ConferencePath =
  | ""
  | "/archive"
  | "/awards"
  | "/participation"
  | "/program";

export function confHref(lang: Lang, path: ConferencePath = "", hash = "") {
  const base = lang === "en" ? "/conference/en" : "/conference";
  return `${base}${path}${hash ? `#${hash}` : ""}`;
}

/** Адрес той же страницы на другом языке. */
export function confSwitchHref(pathname: string, to: Lang) {
  const rest = pathname.replace(/^\/conference(\/en)?/, "").replace(/\/$/, "");
  return `${to === "en" ? "/conference/en" : "/conference"}${rest}`;
}

export const CONF_NAV: { label: Record<Lang, string>; path: ConferencePath }[] =
  [
    { path: "/program", label: { ru: "Программа", en: "Programme" } },
    { path: "/participation", label: { ru: "Участие", en: "Participation" } },
    { path: "/awards", label: { ru: "Награды", en: "Awards" } },
    { path: "/archive", label: { ru: "Архив", en: "Archive" } },
  ];

export const COUNTRY_NAME: Record<CountryIso, Record<Lang, string>> = {
  KG: { ru: "Кыргызстан", en: "Kyrgyzstan" },
  KZ: { ru: "Казахстан", en: "Kazakhstan" },
  UZ: { ru: "Узбекистан", en: "Uzbekistan" },
  TJ: { ru: "Таджикистан", en: "Tajikistan" },
  RU: { ru: "Россия", en: "Russia" },
  GE: { ru: "Грузия", en: "Georgia" },
  AZ: { ru: "Азербайджан", en: "Azerbaijan" },
  JP: { ru: "Япония", en: "Japan" },
  PK: { ru: "Пакистан", en: "Pakistan" },
  CN: { ru: "Китай", en: "China" },
  DE: { ru: "Германия", en: "Germany" },
  CA: { ru: "Канада", en: "Canada" },
};

/** Строки интерфейса сайта конференции. */
export const CONF_UI = {
  ru: {
    brandSub: "Международная конференция по сейсмостойкому строительству",
    backToIaeee: "Сайт МАЭСС",
    register: "Регистрация",
    menuOpen: "Открыть меню",
    menuClose: "Закрыть меню",
    langLabel: "Язык",
    dates: "22–28 июня 2026",
    place: "Бишкек — Иссык-Куль",
    statusFinished: "Конференция состоялась",
    statusUpcoming: "Регистрация открыта",
    statusOngoing: "Конференция идёт",
    finishedNote:
      "Спасибо участникам и докладчикам. Программа, материалы и статьи — ниже.",
    program: "Программа",
    papers: "Статьи в «Вестнике»",
    howToJoin: "Как участвовать",
    routeTitle: "Маршрут конференции",
    routeBishkek: "Бишкек",
    routeBoom: "Боомское ущелье",
    routeLake: "Иссык-Куль",
    routeDistance: "≈ 250 км",
    days: "дни",
    goals: "Цели конференции",
    organizers: "Организаторы",
    format: "Формат",
    venues: "Две части конференции",
    onMap: "На карте",
    tours: "Технические экскурсии",
    topics: "Темы докладов",
    roundTables: "Круглые столы",
    keyDates: "Ключевые даты",
    speakersGeo: "Докладчики",
    countries: "стран",
    talks: "докладов",
    sessions: "пленарных сессий",
    publication: "Публикация",
    openIssue: "Открыть выпуск 2026/1",
    materials: "Материалы",
    contacts: "Оргкомитет",
    archive: "Все конференции",
    sessionsTitle: "Пленарные сессии",
    fullProgram: "Полная программа",
    footerNote: "Сайт конференции — часть сайта МАЭСС",
    demo: "Демонстрационная версия",
  },
  en: {
    brandSub: "International Conference on Earthquake Engineering",
    backToIaeee: "IAEEE website",
    register: "Registration",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    langLabel: "Language",
    dates: "June 22–28, 2026",
    place: "Bishkek — Issyk-Kul",
    statusFinished: "The conference has taken place",
    statusUpcoming: "Registration is open",
    statusOngoing: "The conference is under way",
    finishedNote:
      "Thank you to all participants and speakers. Programme, materials and papers are below.",
    program: "Programme",
    papers: "Papers in the Journal",
    howToJoin: "How to participate",
    routeTitle: "Conference route",
    routeBishkek: "Bishkek",
    routeBoom: "Boom Gorge",
    routeLake: "Issyk-Kul",
    routeDistance: "≈ 250 km",
    days: "days",
    goals: "Conference objectives",
    organizers: "Organisers",
    format: "Format",
    venues: "Two parts of the conference",
    onMap: "Map",
    tours: "Technical tours",
    topics: "Topics",
    roundTables: "Round tables",
    keyDates: "Key dates",
    speakersGeo: "Speakers",
    countries: "countries",
    talks: "papers",
    sessions: "plenary sessions",
    publication: "Publication",
    openIssue: "Open issue 2026/1",
    materials: "Materials",
    contacts: "Organising committee",
    archive: "All conferences",
    sessionsTitle: "Plenary sessions",
    fullProgram: "Full programme",
    footerNote: "The conference website is part of the IAEEE website",
    demo: "Demo version",
  },
} as const;

export type ConfUi = (typeof CONF_UI)[Lang];
