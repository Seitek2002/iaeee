"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * false на сервере и при гидратации, true после неё. Нужен для данных из
 * localStorage (persist-сторы), чтобы не ловить hydration mismatch.
 */
export function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
