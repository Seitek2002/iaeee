import type { NewsBlock } from "@/shared/api";

/** Рендер тела новости из блоков. Текст — серифом, факты — таблицей-штампом. */
export function ArticleBody({ blocks }: { blocks: NewsBlock[] }) {
  return (
    <div className="prose-article">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={i} className="mt-5 first:mt-0">
                {block.text}
              </p>
            );
          case "heading":
            return (
              <h2 key={i} className="mt-12 mb-4 font-sans text-h3 first:mt-0">
                {block.text}
              </h2>
            );
          case "list":
            return (
              <ul key={i} className="mt-5 border-t border-rule">
                {block.items.map((item) => (
                  <li
                    key={item}
                    className="relative border-b border-rule py-3.5 pl-6 before:absolute before:top-[1.45em] before:left-0 before:size-[7px] before:bg-petrol"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="my-10 border-l-2 border-amber pl-6 text-[1.5rem] leading-snug italic"
              >
                {block.text}
              </blockquote>
            );
          case "signature":
            return (
              <p
                key={i}
                className="mt-8 text-right font-sans text-small text-steel"
              >
                {block.text}
              </p>
            );
          case "facts":
            return (
              <dl
                key={i}
                className="mb-10 border-[1.5px] border-petrol font-sans text-[0.9375rem] first:mt-0"
              >
                {block.items.map((fact) => (
                  <div
                    key={fact.label}
                    className="grid grid-cols-[7.5rem_1fr] border-b border-petrol/40 last:border-b-0 sm:grid-cols-[10rem_1fr]"
                  >
                    <dt className="border-r border-petrol/40 px-4 py-3 text-caption text-steel">
                      {fact.label}
                    </dt>
                    <dd className="px-4 py-3 leading-snug">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            );
        }
      })}
    </div>
  );
}
