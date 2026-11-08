"use client";

import Link from "next/link";

import { MAIN_NAV, ROUTES, SITE } from "@/shared/config";
import { cn, useScrollLock } from "@/shared/lib";
import { ButtonLink, Container } from "@/shared/ui";

export function MobileMenu({
  open,
  pathname,
}: {
  open: boolean;
  pathname: string;
}) {
  useScrollLock(open);

  return (
    <div
      id="mobile-menu"
      hidden={!open}
      className="fixed inset-x-0 top-[72px] bottom-0 z-30 overflow-y-auto bg-film xl:hidden"
    >
      <Container className="flex min-h-full flex-col pt-6 pb-10">
        <nav aria-label="Мобильная навигация">
          <ul>
            {MAIN_NAV.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href} className="border-b border-rule">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between py-4 text-[1.5rem] font-medium tracking-[-0.015em]",
                      active ? "text-petrol" : "text-petrol/75",
                    )}
                  >
                    {item.label}
                    {active && (
                      <span className="size-2 bg-amber" aria-hidden="true" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="mt-auto pt-10">
          <ButtonLink href={ROUTES.membership} className="w-full">
            Вступить в ассоциацию
          </ButtonLink>
          <div className="mt-8 space-y-1 text-small text-steel">
            <p>
              <a href={SITE.phoneHref} className="tabular text-petrol">
                {SITE.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${SITE.email}`} className="text-petrol">
                {SITE.email}
              </a>
            </p>
            <p>{SITE.address}</p>
          </div>
        </div>
      </Container>
    </div>
  );
}
