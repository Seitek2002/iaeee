# Зачем нужна эта папка

Эта папка `pages/` намеренно пустая — здесь нет роутов.

Проект использует **Next.js App Router** (корневая `app/`) вместе с
**Feature-Sliced Design**, у которого слой страниц живёт в `src/pages`.

Без папки `pages/` в корне Next.js принимает `src/pages` за свой Pages Router:
каждый `src/pages/<slice>/index.ts` становится маршрутом и конфликтует с App
Router, из-за чего падает `next build` («App Router and Pages Router both match
path»). Пустая корневая `pages/` забирает эту роль на себя.

Не удалять. См. https://feature-sliced.design/docs/guides/tech/with-nextjs
