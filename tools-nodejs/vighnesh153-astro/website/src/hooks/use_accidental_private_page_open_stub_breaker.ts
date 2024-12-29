import { createSignal, onCleanup, onMount } from "solid-js";

export function useAccidentalPrivatePageOpenStubBreaker() {
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
    }
  };

  onMount(() => {
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
