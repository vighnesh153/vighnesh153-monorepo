import { createSignal, onCleanup, onMount } from "solid-js";

import ls from "localstorage-slim";

import { milliseconds } from "@vighnesh153/tools";

const jailbreakCacheKey = (pageKey: string) => `jail-broken-for-${pageKey}`;

export type UseAccidentalPrivatePageOpenStubBreakerProps = {
  pageKey: string;
};

export function useAccidentalPrivatePageOpenStubBreaker(
  { pageKey }: UseAccidentalPrivatePageOpenStubBreakerProps,
) {
  const [pageAccessible, setPageAccessible] = createSignal(false);
  const [code, setCode] = createSignal("153153153");
  const [jailBreakEnabled, setJailBreakEnabled] = createSignal(true);

  const onKey = (key: string) => {
    if (!jailBreakEnabled()) {
      return;
    }

    if (code().startsWith(key)) {
      setCode(code().slice(1));
    } else {
      setJailBreakEnabled(false);
    }

    if (code().length == 0) {
      setPageAccessible(true);
      ls.set(
        jailbreakCacheKey(pageKey),
        "true",
        { ttl: milliseconds({ minutes: 5 }) / 1000 },
      );
    }
  };

  onMount(() => {
    if (ls.get(jailbreakCacheKey(pageKey)) === "true") {
      setPageAccessible(true);
      return;
    }

    function keyPressListener(e: KeyboardEvent) {
      onKey(e.key);
    }
    window.addEventListener("keypress", keyPressListener);
    onCleanup(() => {
      window.removeEventListener("keypress", keyPressListener);
    });
  });

  return {
    pageAccessible,
    onKey,
  };
}
