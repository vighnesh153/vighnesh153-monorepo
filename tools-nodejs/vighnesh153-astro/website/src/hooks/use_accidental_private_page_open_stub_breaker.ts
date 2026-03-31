import { useCallback, useEffect, useState } from "react";

import ls from "localstorage-slim";

import { milliseconds } from "@vighnesh153/tools";

const jailbreakCacheKey = (pageKey: string) => `jail-broken-for-${pageKey}`;

export type UseAccidentalPrivatePageOpenStubBreakerProps = {
  pageKey: string;
};

export function useAccidentalPrivatePageOpenStubBreaker(
  { pageKey }: UseAccidentalPrivatePageOpenStubBreakerProps,
) {
  const [pageAccessible, setPageAccessible] = useState(false);
  const [code, setCode] = useState("153153153");
  const [jailBreakEnabled, setJailBreakEnabled] = useState(true);

  const onKey = useCallback((key: string) => {
    if (!jailBreakEnabled) {
      return;
    }

    if (code.startsWith(key)) {
      const newCode = code.slice(1);
      setCode(newCode);
    } else {
      setJailBreakEnabled(false);
    }
  }, [code, jailBreakEnabled, pageKey]);

  useEffect(() => {
    if (ls.get(jailbreakCacheKey(pageKey)) === "true") {
      setPageAccessible(true);
      return;
    }

    function keyPressListener(e: KeyboardEvent) {
      onKey(e.key);
    }
    window.addEventListener("keypress", keyPressListener);
    return () => {
      window.removeEventListener("keypress", keyPressListener);
    };
  }, [onKey, pageKey]);

  useEffect(() => {
    if (code.length > 0) {
      return;
    }

    setPageAccessible(true);
    ls.set(
      jailbreakCacheKey(pageKey),
      "true",
      { ttl: milliseconds({ minutes: 5 }) / 1000 },
    );
  }, [code]);

  return {
    pageAccessible,
    onKey,
  };
}
