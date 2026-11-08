import type { Metadata, Viewport } from "next";
import { Geologica, Golos_Text, Spectral, Unbounded } from "next/font/google";

import "@/app/globals.css";
import { Providers } from "@/app/providers";

import { getSearchIndex } from "@/shared/api";

// Сайт ассоциации: Geologica — гротеск с осью «заострённости» (SHRP),
// заголовки получают строгие срезанные окончания; Spectral — для длинного
// чтения и статей.
const geologica = Geologica({
  variable: "--font-geologica",
  subsets: ["latin", "cyrillic"],
  axes: ["SHRP"],
  display: "swap",
});

const spectral = Spectral({
  variable: "--font-spectral",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

// Сайт конференции: широкий Unbounded — афишный, «событийный» голос;
// Golos Text — спокойный текстовый гротеск для программы и регламента.
const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const golos = Golos_Text({
  variable: "--font-golos",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://iaeee.kg"),
  title: {
    default:
      "МАЭСС — Международная ассоциация экспертов по сейсмостойкому строительству",
    template: "%s — МАЭСС",
  },
  description:
    "МАЭСС объединяет научные институты, университеты и проектные организации Центральной Азии: нормы сейсмостойкого строительства, экспертиза, испытания, обучение инженеров и научный журнал «Вестник МАЭСС».",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "МАЭСС",
  },
};

export const viewport: Viewport = {
  themeColor: "#10262f",
};

// Корневой layout — только документ, шрифты и глобальные узлы (поиск,
// уведомления). Шапка и подвал у сайта ассоциации и у сайта конференции
// разные: они в layout'ах групп app/(site) и app/(conference).
export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const searchIndex = await getSearchIndex();

  return (
    <html
      lang="ru"
      className={`${geologica.variable} ${spectral.variable} ${unbounded.variable} ${golos.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col">
        <Providers searchIndex={searchIndex}>{children}</Providers>
      </body>
    </html>
  );
}
