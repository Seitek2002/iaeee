import fsd from "@feature-sliced/steiger-plugin";
import { defineConfig } from "steiger";

export default defineConfig([
  ...fsd.configs.recommended,
  {
    // Шапка и подвал рендерятся из корневого app/layout.tsx (роутинг Next вне
    // src). steiger сканирует только src и не видит этого потребителя,
    // поэтому считает слайсы «без ссылок». Это не мёртвый код.
    files: ["./src/widgets/header/**", "./src/widgets/footer/**"],
    rules: {
      "fsd/insignificant-slice": "off",
    },
  },
  {
    // Демо-этап: часть фич и виджетов пока используется одной страницей, но
    // у каждой своё состояние (Zustand-стор) и своя зона ответственности.
    // Сливать их в страницы ради линтера не стоит — при подключении CMS и
    // новых разделов они переиспользуются (поиск статей, просмотр фото,
    // подписка, фильтр новостей, заявка на вступление).
    files: [
      "./src/features/**",
      "./src/widgets/vestnik-spotlight/**",
      "./src/widgets/news-gallery/**",
    ],
    rules: {
      "fsd/insignificant-slice": "off",
    },
  },
]);
