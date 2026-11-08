import Image from "next/image";

import type { Person } from "@/shared/api";
import { cn } from "@/shared/lib";

interface PersonCardProps {
  className?: string;
  person: Person;
  showBio?: boolean;
}

/**
 * Портреты в архиве разного качества и с разным фоном, поэтому приводим их к
 * одному виду: монохром, одинаковый кадр 4:5.
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
            className="object-cover object-top grayscale contrast-[1.05]"
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
