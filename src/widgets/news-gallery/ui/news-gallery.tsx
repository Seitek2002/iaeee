"use client";

import Image from "next/image";

import { PhotoViewer, usePhotoViewerStore } from "@/features/photo-viewer";

import { cn } from "@/shared/lib";

/** Сетка фотографий с мероприятия; клик открывает полноэкранный просмотр. */
export function NewsGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const show = usePhotoViewerStore((s) => s.show);

  return (
    <>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {images.map((src, i) => (
          <li
            key={src}
            className={cn(
              i === 0 && images.length > 4 && "col-span-2 row-span-2",
            )}
          >
            <button
              type="button"
              onClick={() => show(images, i)}
              className="group relative block aspect-[4/3] h-full w-full overflow-hidden bg-rule"
              aria-label={`${title}: открыть фото ${i + 1} из ${images.length}`}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes={
                  i === 0 && images.length > 4
                    ? "(min-width: 1024px) 50vw, 100vw"
                    : "(min-width: 1024px) 25vw, 50vw"
                }
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </button>
          </li>
        ))}
      </ul>
      <PhotoViewer />
    </>
  );
}
