import type { ReactNode } from "react";

import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";

/** Каркас сайта ассоциации: шапка, основное содержимое, подвал. */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
