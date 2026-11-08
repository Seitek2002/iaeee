"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { cn, useHydrated, useScrollLock } from "@/shared/lib";

interface DialogProps {
  children: ReactNode;
  className?: string;
  label: string;
  onClose: () => void;
  open: boolean;
  /** Полноэкранная тёмная подложка — для просмотра фото. */
  variant?: "panel" | "viewer";
}

/**
 * Модальное окно: портал в body, закрытие по Esc и клику по подложке,
 * блокировка прокрутки, фокус внутрь при открытии и обратно при закрытии.
 */
export function Dialog({
  open,
  onClose,
  label,
  children,
  className,
  variant = "panel",
}: DialogProps) {
  const hydrated = useHydrated();
  const ref = useRef<HTMLDivElement>(null);
  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const node = ref.current;
    const focusable = node?.querySelector<HTMLElement>(
      "input, button, [href], [tabindex]:not([tabindex='-1'])",
    );
    (focusable ?? node)?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !node) return;
      const items = node.querySelectorAll<HTMLElement>(
        "input, button, [href], [tabindex]:not([tabindex='-1'])",
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previous?.focus?.();
    };
  }, [open, onClose]);

  if (!hydrated || !open) return null;

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-50 flex animate-fade-fast",
        variant === "viewer"
          ? "bg-petrol/95"
          : "items-start justify-center bg-petrol/40 px-4 pt-[10vh] backdrop-blur-[2px]",
      )}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        className={cn("outline-none", className)}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}
