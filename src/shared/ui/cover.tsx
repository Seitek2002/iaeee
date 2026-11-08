import Image from "next/image";

import { cn } from "@/shared/lib";

import { Seismogram, seedFrom } from "./seismogram";

interface CoverProps {
  alt: string;
  className?: string;
  fit?: "contain" | "cover";
  priority?: boolean;
  /** Ключ для детерминированной сейсмограммы, если фото нет. */
  seedKey: string;
  sizes: string;
  src?: string;
}

/**
 * Обложка материала. Афиши и плакаты (fit="contain") показываются целиком
 * на нейтральной подложке, фото — кадрируются. Нет фото — рисуем фрагмент
 * сейсмограммы, уникальный для каждого материала.
 */
export function Cover({
  src,
  alt,
  fit = "cover",
  seedKey,
  sizes,
  priority,
  className,
}: CoverProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        src ? (fit === "contain" ? "bg-mist" : "bg-rule") : "bg-petrol",
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn(
            fit === "contain" ? "object-contain p-4 sm:p-6" : "object-cover",
          )}
        />
      ) : (
        <div className="absolute inset-0 flex items-center px-[6%]">
          <Seismogram
            seed={seedFrom(seedKey)}
            points={420}
            gain={0.8}
            className="h-1/2 w-full text-on-dark/70"
          />
        </div>
      )}
    </div>
  );
}
