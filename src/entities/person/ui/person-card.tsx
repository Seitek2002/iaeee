import Image from "next/image";

import type { Person } from "@/shared/api";
import { cn } from "@/shared/lib";

interface PersonCardProps {
  className?: string;
  person: Person;
  showBio?: boolean;
}

/**
 * Портреты — в цвете, одинаковый кадр 4:5. Монохром только для ушедших
 * членов президиума (вместе с подписью «Светлая память»).
 */
export function PersonCard({
  person,
  showBio = false,
  className,
}: PersonCardProps) {
  return (
    <article className={cn("flex flex-col", className)}>
      <div className="relative aspect-[4/5] overflow-hidden bg-mist">
        {person.photo && (
          <Image
            src={person.photo}
            alt={person.name}
            fill
            sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
            className={cn(
              "object-cover object-top",
              person.deceased && "grayscale",
            )}
          />
        )}
      </div>
      <h3 className="mt-4 text-[1.0625rem] leading-snug font-medium tracking-[-0.005em]">
        {person.name}
      </h3>
      {person.deceased && (
        <p className="mt-1 text-small text-steel">Светлая память</p>
      )}
      <p className="mt-2 text-small text-steel">{person.position}</p>
      {showBio && (
        <p className="mt-3 text-small leading-relaxed">{person.bio}</p>
      )}
    </article>
  );
}
