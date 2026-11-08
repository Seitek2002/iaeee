import type { Metadata } from "next";

import { ConferenceShell } from "@/app/conference-shell";

export const metadata: Metadata = {
  title: {
    default: "ICEE 2026",
    template: "%s — ICEE 2026",
  },
};

export default function ConferenceLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <ConferenceShell>{children}</ConferenceShell>;
}
