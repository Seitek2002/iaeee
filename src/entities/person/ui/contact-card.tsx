import type { ContactPerson } from "@/shared/api";
import { cn, telHref, whatsappHref } from "@/shared/lib";
import { MailIcon, PhoneIcon, WhatsAppIcon } from "@/shared/ui";

export function ContactCard({
  person,
  className,
}: {
  className?: string;
  person: ContactPerson;
}) {
  return (
    <article className={cn("border-t border-petrol pt-5", className)}>
      <p className="text-small text-steel">{person.role}</p>
      <h3 className="mt-2 text-h3">{person.name}</h3>
      <ul className="mt-5 space-y-2.5">
        {person.phones.map((phone) => (
          <li
            key={phone.number}
            className="flex flex-wrap items-center gap-x-4 gap-y-1"
          >
            <a
              href={telHref(phone.number)}
              className="inline-flex items-center gap-2.5 tabular underline-offset-4 hover:underline"
            >
              <PhoneIcon size={17} className="text-steel" />
              {phone.number}
            </a>
            {phone.whatsapp && (
              <a
                href={whatsappHref(phone.number)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-small text-steel underline-offset-4 hover:text-petrol hover:underline"
              >
                <WhatsAppIcon size={16} />
                WhatsApp
              </a>
            )}
          </li>
        ))}
        {person.email && (
          <li>
            <a
              href={`mailto:${person.email}`}
              className="inline-flex items-center gap-2.5 underline-offset-4 hover:underline"
            >
              <MailIcon size={17} className="text-steel" />
              {person.email}
            </a>
          </li>
        )}
      </ul>
    </article>
  );
}
