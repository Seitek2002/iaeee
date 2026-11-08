import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// tailwind-merge не знает кастомную шкалу шрифтов из @theme и считает
// `text-small` цветом — тогда `text-steel text-small` схлопывается в один
// класс и цвет теряется. Регистрируем размеры явно.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "caption",
            "small",
            "body",
            "lead",
            "h3",
            "h2",
            "h1",
            "display",
            "c-numeral",
            "c-h1",
            "c-h2",
            "c-h3",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
