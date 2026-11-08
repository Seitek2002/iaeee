// Публикация сайта на GitHub Pages: npm run deploy
//
// 1. Статическая сборка (output: "export") с basePath = /<имя репозитория>.
// 2. .nojekyll — иначе GitHub Pages не отдаёт папку _next; плюс обход
//    расхождения имён файлов предзагрузки (см. fix-export-prefetch.mjs).
// 3. Содержимое out/ пушится в ветку gh-pages того же репозитория (force:
//    в ветке хранится только последняя сборка, история не нужна).
import { execSync } from "node:child_process";
import { rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import { fixExportPrefetch } from "./fix-export-prefetch.mjs";

const run = (cmd, opts = {}) =>
  execSync(cmd, { stdio: "inherit", shell: true, ...opts });
const read = (cmd) => execSync(cmd, { encoding: "utf8" }).trim();

const remote = read("git remote get-url origin");
const repo = remote.replace(/\.git$/, "").split("/").pop();
const basePath = process.env.PAGES_BASE_PATH ?? `/${repo}`;
const sha = read("git rev-parse --short HEAD");

console.log(`\n▸ Сборка для GitHub Pages, basePath=${basePath}\n`);
run("npx next build", {
  env: {
    ...process.env,
    STATIC_EXPORT: "true",
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
});

const out = join(process.cwd(), "out");
writeFileSync(join(out, ".nojekyll"), "");
console.log(`▸ Файлы предзагрузки: ${fixExportPrefetch(out)} сегментов`);

console.log(`\n▸ Публикация out/ в ветку gh-pages (${remote})\n`);
rmSync(join(out, ".git"), { recursive: true, force: true });
const git = (args) => run(`git ${args}`, { cwd: out });
git("init -q -b gh-pages");
git("add -A");
git(
  `commit -q -m "Deploy ${sha}" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"`,
);
git(`push -f "${remote}" gh-pages`);
rmSync(join(out, ".git"), { recursive: true, force: true });

const owner = remote.split(/[/:]/).slice(-2)[0].toLowerCase();
console.log(`\n✓ Готово: https://${owner}.github.io${basePath}/\n`);
