import { SiteShell } from "@/app/site-shell";

import { NotFoundPage } from "@/pages/not-found";

// Корневой not-found рендерится вне групп маршрутов, поэтому каркас сайта
// (шапку и подвал) подключаем здесь явно.
export default function NotFound() {
  return (
    <SiteShell>
      <NotFoundPage />
    </SiteShell>
  );
}
