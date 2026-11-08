# МАЭСС — новый сайт (демо)

Демо-версия нового сайта Международной ассоциации экспертов по сейсмостойкому
строительству (iaeee.kg). Все данные взяты с текущего сайта и лежат в одном
файле — `src/shared/api/mock.ts`. Бэкенда пока нет.

## Запуск

```bash
npm install
npm run dev            # http://localhost:3000
```

Для показа лучше собрать production-версию — она быстрее:

```bash
npm run build
npm start              # http://localhost:3000
```

Проверки: `npm run typecheck`, `npm run lint`, `npm run lint:fsd` (steiger),
`npm run format`.

## Публикация на GitHub Pages

Демо опубликовано на https://seitek2002.github.io/iaeee/. Чтобы выложить
свежую версию, закоммитьте изменения и выполните:

```bash
npm run deploy
```

Скрипт `scripts/deploy-pages.mjs` собирает статическую версию (`output:
"export"`, basePath `/iaeee`), добавляет `.nojekyll` и пушит папку `out/` в
ветку `gh-pages`. GitHub Pages обновляется через минуту-две. Обычные `npm run
dev` и `npm run build` работают без префикса `/iaeee`.

## Стек

Next.js 16 (App Router, Turbopack, React Compiler в проде) · React 19 ·
TypeScript · Tailwind CSS 4 · Zustand 5 · Feature-Sliced Design — по образцу
проекта imbir-nextjs.

## Структура

```
app/                 роутинг Next: только page/layout/not-found, тонкие обёртки
pages/README.md      пустая заглушка, чтобы Next не принял src/pages за Pages Router
src/
  app/               globals.css (дизайн-токены), providers.tsx
  pages/             страницы: home, about, news, news-details, vestnik,
                     vestnik-issue, services, members, membership, documents,
                     contacts, not-found
  widgets/           header, footer, chronicle, vestnik-spotlight,
                     news-gallery, membership-cta
  features/          global-search, news-filter, article-search,
                     contact-request, membership-application, photo-viewer,
                     newsletter-subscribe
  entities/          news-item, issue, person, member
  shared/
    api/             mock.ts (все данные), types.ts, функции getX()
    config/          маршруты, навигация, контакты
    lib/             cn, форматирование дат, склонения
    ui/              кит: кнопки, поля, диалог, тосты, сейсмограмма, обложка…
```

Компоненты получают данные только через асинхронные функции из `shared/api`
(`getNews`, `getIssues`, `getMembers`…). Когда появится CMS или REST API,
меняются эти функции, а не страницы.

## Состояние (Zustand)

| Стор | Что хранит |
|---|---|
| `features/global-search` | открыт ли поиск (Ctrl/⌘+K, «/»), запрос |
| `features/news-filter` | рубрика и поиск в новостях — сохраняются при возврате из новости |
| `features/article-search` | поиск по статьям «Вестника», раскрытые выпуски |
| `features/contact-request` | черновик обращения (sessionStorage), тема подставляется со страницы услуг |
| `features/membership-application` | чек-лист документов и заявка (localStorage) |
| `features/photo-viewer` | полноэкранный просмотр фото |
| `widgets/header` | мобильное меню |
| `shared/ui/toast` | уведомления |

## Дизайн

- Палитра — инженерная: светлая «чертёжная плёнка» `#F2F3EF`, тёмный «петроль»
  `#10262F`, сталь `#56676C`, янтарь `#E9B10F` (точечно: сильная фаза
  сейсмограммы, активные состояния).
- Шрифты: Geologica (заголовки и интерфейс, ось заострённости SHRP) и Spectral
  (длинный текст, статьи журнала).
- Фирменный элемент — сейсмограмма в первом экране с отметками волн P и S;
  паспорт ассоциации свёрстан как штамп чертежа.

## Что важно знать про демо

- Формы (обращение, заявка на вступление, подписка) ничего не отправляют —
  показывают уведомление. Чек-лист и черновики сохраняются в браузере.
- PDF и DOCX ведут на файлы текущего сайта iaeee.kg. У него просрочен
  SSL-сертификат, поэтому браузер может показать предупреждение.
- Фото оптимизированы и лежат в `public/images`.
