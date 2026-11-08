"use client";

import { useRef, useState } from "react";

import type { Milestone } from "@/shared/api";
import { cn } from "@/shared/lib";

/**
 * Хроника ассоциации по годам. Шкала лет — как ось времени на сейсмограмме:
 * риски на линии, активный год отмечен янтарём. Стрелки ← → листают годы.
 */
export function Chronicle({
  milestones,
  tone = "light",
}: {
  milestones: Milestone[];
  tone?: "dark" | "light";
}) {
  const dark = tone === "dark";
  const [year, setYear] = useState(milestones[milestones.length - 1].year);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = milestones.find((m) => m.year === year) ?? milestones[0];
  const currentIndex = milestones.indexOf(current);

  const select = (i: number) => {
    const index = (i + milestones.length) % milestones.length;
    setYear(milestones[index].year);
    tabs.current[index]?.focus();
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Годы"
        className="scrollbar-none -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0"
      >
        <div
          className={cn(
            "relative flex min-w-[44rem] justify-between border-t",
            dark ? "border-on-dark/30" : "border-petrol/25",
          )}
        >
          {milestones.map((m, i) => {
            const active = m.year === year;
            return (
              <button
                key={m.year}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`year-${m.year}`}
                aria-selected={active}
                aria-controls="chronicle-panel"
                tabIndex={active ? 0 : -1}
                onClick={() => setYear(m.year)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight") select(i + 1);
                  if (e.key === "ArrowLeft") select(i - 1);
                }}
                className="group relative flex flex-col items-center px-1 pt-4 pb-1"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -top-px left-1/2 w-px -translate-x-1/2 transition-all",
                    active
                      ? "h-0"
                      : dark
                        ? "h-2 bg-on-dark/40 group-hover:h-3 group-hover:bg-on-dark"
                        : "h-2 bg-petrol/40 group-hover:h-3 group-hover:bg-petrol",
                  )}
                />
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute -top-[6px] left-1/2 size-[11px] -translate-x-1/2 bg-amber"
                  />
                )}
                <span
                  className={cn(
                    "text-small tabular transition-colors",
                    active
                      ? "font-semibold"
                      : dark
                        ? "text-on-dark-muted group-hover:text-on-dark"
                        : "text-steel group-hover:text-petrol",
                  )}
                >
                  {m.year}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        id="chronicle-panel"
        role="tabpanel"
        aria-labelledby={`year-${current.year}`}
        className="mt-12 grid gap-8 lg:grid-cols-12"
      >
        <div className="lg:col-span-3">
          <p
            key={current.year}
            className="animate-fade font-display text-[clamp(4rem,3rem+4vw,7.5rem)] leading-none tracking-[-0.04em] tabular"
          >
            {current.year}
          </p>
          <p
            className={cn(
              "mt-3 text-small",
              dark ? "text-on-dark-muted" : "text-steel",
            )}
          >
            {currentIndex === 0
              ? "Год основания"
              : `${currentIndex + 1}-й год работы`}
          </p>
        </div>
        <ul
          key={`list-${current.year}`}
          className="grid animate-fade content-start gap-x-10 sm:grid-cols-2 lg:col-span-9"
        >
          {current.events.map((event, i) => (
            <li
              key={i}
              className={cn(
                "border-t py-5",
                dark ? "border-on-dark/15" : "border-rule",
              )}
            >
              {event.date && (
                <p
                  className={cn(
                    "text-small font-medium tabular",
                    dark && "text-amber",
                  )}
                >
                  {event.date}
                </p>
              )}
              <p className={cn("leading-relaxed", event.date && "mt-1.5")}>
                {event.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
