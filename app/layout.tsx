import type { Metadata, Viewport } from "next";
import { Geologica, Spectral } from "next/font/google";

import "@/app/globals.css";
import { Providers } from "@/app/providers";

import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";

import { getSearchIndex } from "@/shared/api";

// Geologica — гротеск с осью «заострённости» (SHRP): заголовки получают
// строгие срезанные окончания. Spectral — для длинного чтения и статей.
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

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const searchIndex = await getSearchIndex();

  return (
    <html
      lang="ru"
      className={`${geologica.variable} ${spectral.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col">
        <Providers searchIndex={searchIndex}>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
