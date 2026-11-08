"use client";

import { create } from "zustand";

import { cn } from "@/shared/lib";

import { CheckIcon, CloseIcon } from "./icons";

interface Toast {
  description?: string;
  id: number;
  title: string;
}

interface ToastState {
  dismiss: (id: number) => void;
  show: (toast: Omit<Toast, "id">) => void;
  toasts: Toast[];
}

let nextId = 1;

export const useToastStore = create<ToastState>((set, get) => ({
  toasts: [],
  show: (toast) => {
    const id = nextId++;
    set({ toasts: [...get().toasts, { ...toast, id }] });
    window.setTimeout(() => get().dismiss(id), 5000);
  },
  dismiss: (id) => set({ toasts: get().toasts.filter((t) => t.id !== id) }),
}));

/** Короткий доступ из обработчиков: toast({ title: "Заявка отправлена" }). */
export const toast = (t: Omit<Toast, "id">) => useToastStore.getState().show(t);

export function Toaster() {
  const toasts = useToastStore((s) => s.toasts);
  const dismiss = useToastStore((s) => s.dismiss);

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] flex flex-col items-center gap-2 p-4 sm:items-end sm:p-6"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className={cn(
            "on-dark pointer-events-auto flex w-full max-w-sm animate-rise items-start gap-3 rounded-[2px] bg-petrol p-4 text-on-dark shadow-[0_18px_40px_-20px_rgba(16,38,47,0.6)]",
          )}
        >
          <span className="mt-0.5 grid size-6 shrink-0 place-items-center bg-amber text-petrol">
            <CheckIcon size={15} strokeWidth={2} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-medium">{t.title}</p>
            {t.description && (
              <p className="mt-1 text-small text-on-dark-muted">
                {t.description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() => dismiss(t.id)}
            className="-m-1 p-1 text-on-dark-muted transition-colors hover:text-on-dark"
            aria-label="Закрыть уведомление"
          >
            <CloseIcon size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
