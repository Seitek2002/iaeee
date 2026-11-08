import { ROUTES } from "@/shared/config";
import { ButtonLink, Container } from "@/shared/ui";

/** 404: на месте сейсмограммы — ровная линия. Сигнала нет. */
export function NotFoundPage() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <p className="text-small text-steel tabular">Ошибка 404</p>
        <h1 className="mt-4 max-w-2xl text-h1">Такой страницы нет</h1>
        <p className="mt-6 max-w-xl text-lead text-steel">
          Возможно, адрес изменился при переезде на новый сайт. Начните с
          главной или найдите материал через поиск — Ctrl + K.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href={ROUTES.home}>На главную</ButtonLink>
          <ButtonLink href={ROUTES.news} variant="outline">
            Новости
          </ButtonLink>
        </div>
      </Container>
      <div aria-hidden="true" className="mt-20 flex items-center">
        <span className="h-px flex-1 bg-petrol/40" />
      </div>
    </section>
  );
}
