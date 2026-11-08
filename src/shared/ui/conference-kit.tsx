import type { ReactNode } from "react";

import Link from "next/link";

import { cn } from "@/shared/lib";

import { Container } from "./container";

// Визуальный язык сайта конференции отличается от сайта ассоциации:
// скруглённые формы, кнопки-«пилюли», широкий Unbounded в заголовках.

type PillVariant = "apricot" | "ghost-dark" | "lake" | "outline";

const PILL: Record<PillVariant, string> = {
  apricot: "bg-apricot text-lake hover:bg-[#f7b57d]",
  lake: "bg-lake text-snow hover:bg-lake-soft",
  outline:
    "border border-lake/30 text-lake hover:border-lake hover:bg-lake hover:text-snow",
  "ghost-dark":
    "border border-glacier/35 text-snow hover:border-snow hover:bg-snow/5",
};

export function pillClass(variant: PillVariant = "apricot", small = false) {
  return cn(
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-colors",
    small ? "h-10 px-4 text-small" : "h-12 px-6 text-[0.9375rem]",
    PILL[variant],
  );
}

export function PillLink({
  href,
  variant,
  small,
  className,
  children,
  external,
}: {
  children: ReactNode;
  className?: string;
  external?: boolean;
  href: string;
  small?: boolean;
  variant?: PillVariant;
}) {
  const cls = cn(pillClass(variant, small), className);
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {children}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function ConfHeading({
  title,
  lead,
  id,
  action,
  tone = "light",
  className,
}: {
  action?: ReactNode;
  className?: string;
  id?: string;
  lead?: ReactNode;
  title: ReactNode;
  tone?: "dark" | "light";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className="max-w-3xl">
        <h2 id={id} className="font-conf-display text-c-h2">
          {title}
        </h2>
        {lead && (
          <p
            className={cn(
              "mt-4 max-w-2xl text-lead",
              tone === "dark" ? "text-glacier" : "text-ink-muted",
            )}
          >
            {lead}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/** Шапка внутренних страниц конференции — тёмная полоса «озера». */
export function ConfPageHead({
  eyebrow,
  title,
  lead,
  aside,
}: {
  aside?: ReactNode;
  eyebrow?: ReactNode;
  lead?: ReactNode;
  title: ReactNode;
}) {
  return (
    <header className="on-dark bg-lake text-snow">
      <Container className="grid gap-10 pt-12 pb-14 md:pt-16 md:pb-20 lg:grid-cols-12">
        <div className="lg:col-span-8">
          {eyebrow && (
            <div className="mb-6 text-small text-glacier">{eyebrow}</div>
          )}
          <h1 className="font-conf-display text-c-h1">{title}</h1>
          {lead && (
            <p className="mt-5 max-w-2xl text-lead text-glacier">{lead}</p>
          )}
        </div>
        {aside && <div className="lg:col-span-4 lg:self-end">{aside}</div>}
      </Container>
    </header>
  );
}

/** Карточка с мягкими углами для светлых разделов. */
export function ConfCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-haze bg-white p-6 sm:p-8",
        className,
      )}
    >
      {children}
    </div>
  );
}

const KIND: Record<string, string> = {
  pdf: "PDF",
  docx: "DOCX",
  link: "↗",
  video: "▶",
};

/** Список документов конференции: формат в «таблетке», название, переход. */
export function ConfDocList({
  docs,
  tone = "light",
  className,
}: {
  className?: string;
  docs: { kind: string; title: string; url: string }[];
  tone?: "dark" | "light";
}) {
  const dark = tone === "dark";
  return (
    <ul className={cn("grid gap-2", className)}>
      {docs.map((d) => (
        <li key={d.url}>
          <a
            href={d.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "group flex items-center gap-4 rounded-2xl px-4 py-3.5 transition-colors",
              dark
                ? "bg-snow/5 hover:bg-snow/10"
                : "border border-haze bg-white hover:border-lake/40",
            )}
          >
            <span
              className={cn(
                "grid h-8 min-w-12 place-items-center rounded-full px-2 text-[0.6875rem] font-bold tracking-wide",
                dark ? "bg-apricot text-lake" : "bg-lake text-snow",
              )}
            >
              {KIND[d.kind] ?? "↗"}
            </span>
            <span className="leading-snug group-hover:underline group-hover:underline-offset-4">
              {d.title}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
