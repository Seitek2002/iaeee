import type { NextConfig } from "next";

// Сборка для GitHub Pages (npm run deploy): статический экспорт в out/,
// сайт живёт по адресу https://<user>.github.io/<repo>/ — отсюда basePath.
// Обычные `npm run dev` / `npm run build` работают без префикса.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const isStaticExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  // React Compiler — только в production-сборке: в dev он заметно утяжеляет
  // Turbopack, а мемоизация нужна именно на проде (тот же подход, что в imbir).
  reactCompiler: process.env.NODE_ENV === "production",

  ...(isStaticExport && {
    output: "export",
    basePath,
    // /news/ → news/index.html: так GitHub Pages отдаёт страницы без .html.
    trailingSlash: true,
  }),

  images: {
    // На статическом хостинге нет сервера оптимизации — картинки уже
    // пережаты заранее (public/images), отдаём как есть.
    unoptimized: isStaticExport,
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
  },

  // Без явного root Turbopack может подхватить чужой lockfile выше по дереву.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
