"use client";

import { useEffect } from "react";

import { plural } from "@/shared/lib";
import { Checkbox } from "@/shared/ui";

import { useApplicationStore } from "../model/store";

export function DocumentsChecklist({ documents }: { documents: string[] }) {
  const collected = useApplicationStore((s) => s.collected);
  const toggle = useApplicationStore((s) => s.toggleDocument);

  useEffect(() => {
    useApplicationStore.persist.rehydrate();
  }, []);

  const done = collected.length;
  const total = documents.length;
  const left = total - done;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <p className="font-medium tabular">
          Собрано {done} из {total}
        </p>
        <p className="text-small text-steel">
          {left === 0
            ? "Пакет готов к отправке"
            : `Осталось ${left} ${plural(left, ["документ", "документа", "документов"])}`}
        </p>
      </div>
      <div
        className="mt-3 h-1 bg-rule"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={done}
        aria-label="Собранные документы"
      >
        <div
          className="h-full bg-petrol transition-[width] duration-300"
          style={{ width: `${(done / total) * 100}%` }}
        />
      </div>

      <ul className="mt-6">
        {documents.map((doc, i) => (
          <li key={doc} className="border-b border-rule py-3.5 last:border-b-0">
            <Checkbox
              id={`doc-${i}`}
              checked={collected.includes(i)}
              onChange={() => toggle(i)}
              label={
                <span
                  className={
                    collected.includes(i)
                      ? "text-steel line-through decoration-1"
                      : undefined
                  }
                >
                  {doc}
                </span>
              }
            />
          </li>
        ))}
      </ul>
      <p className="mt-5 text-small text-steel">
        Отметки сохраняются в этом браузере — можно вернуться к перечню позже.
      </p>
    </div>
  );
}
