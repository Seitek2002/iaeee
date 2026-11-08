// Типы данных сайта. Сейчас всё отдаётся из mock.ts, но формы объектов
// подобраны так, чтобы при подключении бэкенда (CMS / REST) поменялись только
// функции запросов в этой папке, а не компоненты.

export type ISODate = string;

export type FileKind = "docx" | "link" | "pdf" | "video";

export interface Attachment {
  kind: FileKind;
  title: string;
  url: string;
}

// ---------- Новости ----------

export type NewsCategory =
  | "conferences"
  | "congratulations"
  | "contests"
  | "memory"
  | "publications"
  | "research"
  | "seminars";

export type NewsBlock =
  | { items: { label: string; value: string }[]; type: "facts" }
  | { items: string[]; type: "list" }
  | { text: string; type: "heading" }
  | { text: string; type: "paragraph" }
  | { text: string; type: "quote" }
  | { text: string; type: "signature" };

export interface NewsItem {
  attachments?: Attachment[];
  body: NewsBlock[];
  category: NewsCategory;
  /** Путь в /public. Нет обложки — карточка рисует фрагмент сейсмограммы. */
  cover?: string;
  /** contain — для афиш и плакатов, которые нельзя обрезать. */
  coverFit?: "contain" | "cover";
  date: ISODate;
  excerpt: string;
  featured?: boolean;
  gallery?: string[];
  slug: string;
  /** Ссылка на исходную публикацию на старом сайте. */
  source?: string;
  title: string;
}

// ---------- Вестник ----------

export interface Article {
  authors: string;
  lang?: "en" | "ky" | "ru";
  pages?: string;
  pdf?: string;
  title: string;
}

export interface Issue {
  articles: Article[];
  /** Слаг вида 2026-1 */
  id: string;
  /** Номер внутри года: 1 или 2 */
  issueOfYear: number;
  pdf?: string;
  /** Сквозной номер журнала */
  total: number;
  year: number;
}

export interface JournalInfo {
  about: string[];
  boardUrl: string;
  doi: string;
  firstIssueYear: number;
  index: string;
  issn: string;
  mediaRegistration: string;
  requirementsUrl: string;
  subscribeUrl: string;
  title: string;
}

// ---------- Организация ----------

export type CountryCode = "KG" | "KZ" | "RU";

export interface Member {
  abbr: string;
  activities?: string[];
  city?: string;
  country: CountryCode;
  description: string[];
  id: string;
  name: string;
  url?: string;
}

export interface Person {
  bio: string;
  deceased?: boolean;
  id: string;
  name: string;
  photo?: string;
  position: string;
  shortName: string;
}

export interface ContactPerson {
  email?: string;
  id: string;
  name: string;
  phones: { number: string; whatsapp?: boolean }[];
  role: string;
}

export interface Milestone {
  events: { date?: string; text: string }[];
  year: number;
}

export interface Service {
  id: string;
  items: string[];
  summary: string;
  title: string;
}

export interface Standard {
  code: string;
  title: string;
}

export type DocumentGroup =
  | "conference"
  | "journal"
  | "manuals"
  | "membership"
  | "organization"
  | "seminars";

export interface DocumentItem {
  group: DocumentGroup;
  id: string;
  kind: FileKind;
  lang?: "en" | "ky" | "ru";
  note?: string;
  title: string;
  url: string;
  year?: number;
}

export interface Organization {
  address: string;
  conferenceSite: string;
  email: string;
  founded: number;
  legalStatus: string;
  names: { en: string; ky: string; ru: string };
  phone: string;
  president: { cv: string; name: string; title: string };
  shortNames: { en: string; ru: string };
  website: string;
}

// ---------- Поиск ----------

export type SearchKind = "article" | "document" | "member" | "news" | "page";

export interface SearchEntry {
  hint: string;
  href: string;
  id: string;
  kind: SearchKind;
  title: string;
}

// ---------- Конференция (ICEE) ----------

export type Lang = "en" | "ru";

/** Текст на двух языках сайта конференции. */
export interface LText {
  en: string;
  ru: string;
}

export type CountryIso =
  | "AZ"
  | "CA"
  | "CN"
  | "DE"
  | "GE"
  | "JP"
  | "KG"
  | "KZ"
  | "PK"
  | "RU"
  | "TJ"
  | "UZ";

export interface ConferenceTalk {
  country: CountryIso;
  org: LText;
  speaker: LText;
  time: string;
  title: LText;
}

export interface ConferenceSession {
  id: string;
  kind: "plenary" | "technical" | "workshop";
  moderators: LText;
  number?: number;
  talks: ConferenceTalk[];
  time: string;
  title: LText;
}

export type ProgramItemKind =
  | "break"
  | "ceremony"
  | "logistics"
  | "meeting"
  | "roundtable"
  | "session"
  | "social"
  | "tour";

export interface ProgramItem {
  kind: ProgramItemKind;
  note?: LText;
  sessionId?: string;
  time: string;
  title: LText;
}

export interface ProgramDay {
  date: ISODate;
  items: ProgramItem[];
  place: LText;
  stage: "bishkek" | "lake" | "road";
}

export interface ConferenceVenue {
  address: LText;
  dates: LText;
  id: "bishkek" | "lake";
  map: string;
  name: LText;
  program: LText[];
}

export interface ConferenceFee {
  item: LText;
  kgs: number;
  usd: number;
}

export interface HotelRate {
  category: LText;
  fullBoard?: number;
  roomOnly: number;
}

export interface ConferenceDoc {
  kind: FileKind;
  title: LText;
  url: string;
}

export interface Conference {
  documents: ConferenceDoc[];
  end: ISODate;
  feeRules: LText[];
  fees: ConferenceFee[];
  format: LText[];
  goals: LText[];
  hotels: {
    contacts: { name: LText; phone: string }[];
    lakeRates: { body: HotelRate[]; cottage: HotelRate[] };
    lakeRatesNote: LText;
    lakePhones: string[];
    notes: LText[];
  };
  keyDates: { date: LText; text: LText }[];
  number: string;
  online: LText;
  organizers: LText[];
  payment: {
    bank: { label: LText; value: string }[];
    individuals: LText;
    legal: LText;
  };
  publication: LText;
  registrationUrl: string;
  requirements: LText[];
  review: LText[];
  roundTables: LText[];
  start: ISODate;
  steps: { text: LText; title: LText }[];
  title: LText;
  topics: LText[];
  tours: { place: LText; text: LText; time: LText; title: LText }[];
  venues: ConferenceVenue[];
  welcome: LText;
}

export interface ConferenceEdition {
  dates: LText;
  links?: ConferenceDoc[];
  number: string;
  roundTables?: LText[];
  summary: LText;
  topics?: LText[];
  venue: LText;
  year: number | null;
}

export interface Award {
  degrees?: LText[];
  description: LText;
  id: string;
  name: LText;
  spec: LText;
}
