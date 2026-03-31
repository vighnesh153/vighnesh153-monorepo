import type { JSX } from "react";
import { useStore } from "@nanostores/react";
import { snackbarList } from "@/store/snackbar.ts";
import { Snackbar } from "./Snackbar.tsx";

export function SnackbarHost(): JSX.Element {
  const $snackbarList = useStore(snackbarList);

  return (
    <div className="fixed top-10 right-10 z-(--z-snackbar)">
      {$snackbarList.map((snackbar) => (
        <Snackbar key={snackbar.id} {...snackbar} />
      ))}
    </div>
  );
}
