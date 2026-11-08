"use client";

import { useRouter } from "next/navigation";

import { ROUTES } from "@/shared/config";
import { Button } from "@/shared/ui";

import { useContactStore } from "../model/store";

/**
 * «Обсудить задачу» со страницы услуг: подставляет тему в форму обращения
 * и ведёт на неё — человеку не нужно выбирать тему второй раз.
 */
export function RequestButton({
  topic,
  label = "Обсудить задачу",
  variant = "outline",
}: {
  label?: string;
  topic: string;
  variant?: "amber" | "outline" | "primary";
}) {
  const router = useRouter();
  const setTopic = useContactStore((s) => s.setTopic);

  return (
    <Button
      variant={variant}
      size="sm"
      onClick={() => {
        useContactStore.persist.rehydrate();
        setTopic(topic);
        router.push(`${ROUTES.contacts}#form`);
      }}
    >
      {label}
    </Button>
  );
}
