"use client";

import { useEffect } from "react";

import Image from "next/image";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  Dialog,
} from "@/shared/ui";

import { usePhotoViewerStore } from "../model/store";

/** Полноэкранный просмотр фотографий. Стрелки клавиатуры листают. */
export function PhotoViewer() {
  const { open, images, index, close, next, prev } = usePhotoViewerStore();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, next, prev]);

  const src = images[index];

  return (
    <Dialog
      open={open && Boolean(src)}
      onClose={close}
      label="Просмотр фотографий"
      variant="viewer"
      className="on-dark relative flex h-full w-full flex-col text-on-dark"
    >
      <div className="flex items-center justify-between px-5 py-4">
        <p className="text-small tabular text-on-dark-muted">
          {index + 1} из {images.length}
        </p>
        <button
          type="button"
          onClick={close}
          className="-mr-2 p-2 transition-colors hover:text-amber"
          aria-label="Закрыть просмотр"
        >
          <CloseIcon size={22} />
        </button>
      </div>
      <div className="relative flex-1">
        {src && (
          <Image
            key={src}
            src={src}
            alt={`Фото ${index + 1} из ${images.length}`}
            fill
            sizes="100vw"
            className="animate-fade object-contain px-4 sm:px-20"
          />
        )}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute top-1/2 left-2 -translate-y-1/2 p-3 transition-colors hover:text-amber sm:left-5"
              aria-label="Предыдущее фото"
            >
              <ChevronLeftIcon size={28} />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute top-1/2 right-2 -translate-y-1/2 p-3 transition-colors hover:text-amber sm:right-5"
              aria-label="Следующее фото"
            >
              <ChevronRightIcon size={28} />
            </button>
          </>
        )}
      </div>
      <div className="h-6" />
    </Dialog>
  );
}
