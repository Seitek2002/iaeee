import type { ReactNode } from "react";

import Link from "next/link";

import { cn } from "@/shared/lib";

import { Container } from "./container";

export interface Crumb {
  href?: string;
  label: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Навигационная цепочка">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-small text-steel">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            {i > 0 && (
              <span aria-hidden="true" className="text-rule-strong">
                /
              </span>
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="underline-offset-4 transition-colors hover:text-petrol hover:underline"
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-petrol">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

interface PageIntroProps {
  aside?: ReactNode;
  children?: ReactNode;
  className?: string;
  crumbs: Crumb[];
  lead?: ReactNode;
  title: ReactNode;
}

/** Шапка внутренних страниц: крошки, заголовок, лид и необязательная колонка справа. */
export function PageIntro({
  crumbs,
  title,
  lead,
  aside,
  children,
  className,
}: PageIntroProps) {
  return (
    <header
      className={cn(
        "border-b border-rule pt-10 pb-12 md:pt-14 md:pb-16",
        className,
      )}
    >
      <Container>
        <Breadcrumbs items={[{ href: "/", label: "Главная" }, ...crumbs]} />
        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className={aside ? "lg:col-span-8" : "lg:col-span-10"}>
            <h1 className="text-h1">{title}</h1>
            {lead && (
              <p className="mt-6 max-w-2xl text-lead text-steel">{lead}</p>
            )}
            {children}
          </div>
          {aside && <div className="lg:col-span-4 lg:self-end">{aside}</div>}
        </div>
      </Container>
    </header>
  );
}
