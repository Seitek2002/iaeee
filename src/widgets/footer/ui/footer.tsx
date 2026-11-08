import Link from "next/link";

import { MAIN_NAV, ROUTES, SITE } from "@/shared/config";
import { ArrowRightIcon, Container, Logo } from "@/shared/ui";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark bg-petrol text-on-dark">
      <Container className="pt-16 pb-10 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href={ROUTES.home} aria-label="МАЭСС — на главную">
              <Logo inverted />
            </Link>
            <p className="mt-8 max-w-md text-h3 text-on-dark">
              {SITE.fullName}
            </p>
            <p className="mt-4 max-w-md text-small text-on-dark-muted">
              {SITE.fullNameKy}
            </p>
            <p className="mt-1 max-w-md text-small text-on-dark-muted">
              {SITE.fullNameEn}
            </p>
          </div>

          <nav
            aria-label="Разделы сайта"
            className="lg:col-span-3 lg:col-start-7"
          >
            <p className="text-small text-on-dark-muted">Разделы</p>
            <ul className="mt-4 space-y-2.5">
              {MAIN_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="underline-offset-4 transition-colors hover:text-amber"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={ROUTES.membership}
                  className="underline-offset-4 transition-colors hover:text-amber"
                >
                  Вступление в ассоциацию
                </Link>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="text-small text-on-dark-muted">Секретариат</p>
            <address className="mt-4 space-y-2.5 not-italic">
              <p>{SITE.addressFull}</p>
              <p>
                <a href={SITE.phoneHref} className="tabular hover:text-amber">
                  {SITE.phone}
                </a>
                <span className="text-on-dark-muted"> (WhatsApp)</span>
              </p>
              <p>
                <a href={`mailto:${SITE.email}`} className="hover:text-amber">
                  {SITE.email}
                </a>
              </p>
            </address>
            <Link
              href={ROUTES.conference}
              className="mt-8 inline-flex items-center gap-2 border-b border-on-dark/30 pb-1 transition-colors hover:border-amber hover:text-amber"
            >
              VI конференция ICEE 2026
              <ArrowRightIcon size={16} />
            </Link>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-on-dark/15 pt-6 text-small text-on-dark-muted sm:flex-row sm:justify-between">
          <p>
            © {SITE.founded}–{year} МАЭСС, Бишкек
          </p>
          <p>Демонстрационная версия нового сайта</p>
        </div>
      </Container>
    </footer>
  );
}
