// Обход расхождения Next 16 в статическом экспорте.
//
// Сборка кладёт данные предзагрузки сегментов во вложенные папки:
//   membership/__next.membership/__PAGE__.txt
// а клиентский роутер запрашивает «плоские» имена:
//   membership/__next.membership.__PAGE__.txt
// На обычном сервере Next это не важно, а на статическом хостинге каждый
// промах — 404 (и лишняя загрузка 404.html). Дублируем файлы под теми
// именами, которые реально запрашиваются. Оригиналы не трогаем.
import { copyFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

function flatten(segmentDir, prefix, targetDir) {
  for (const name of readdirSync(segmentDir)) {
    const full = join(segmentDir, name);
    const flatName = `${prefix}.${name}`;
    if (statSync(full).isDirectory()) {
      flatten(full, flatName, targetDir);
    } else {
      const target = join(targetDir, flatName);
      if (!existsSync(target)) copyFileSync(full, target);
    }
  }
}

export function fixExportPrefetch(dir) {
  let count = 0;
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (!statSync(full).isDirectory()) continue;
    if (name.startsWith("__next.")) {
      flatten(full, name, dir);
      count++;
    } else if (name !== "_next" && name !== "images") {
      count += fixExportPrefetch(full);
    }
  }
  return count;
}

// Можно запустить отдельно: node scripts/fix-export-prefetch.mjs out
if (process.argv[1]?.endsWith("fix-export-prefetch.mjs")) {
  const dir = process.argv[2] ?? "out";
  console.log(`Сегментов обработано: ${fixExportPrefetch(dir)}`);
}
