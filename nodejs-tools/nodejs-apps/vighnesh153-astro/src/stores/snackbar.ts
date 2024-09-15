import { atom, type ReadableAtom } from 'nanostores';

export type SnackbarPropsApi = {
  type: 'success' | 'error' | 'info' | 'warn';
  message: string;

  manualDismissible?: boolean;
  autoDismissible?: boolean;
  autoDismissTimeMillis?: number;
};

export type SnackbarProps = SnackbarPropsApi & {
  id: string;
  dismiss: () => void;
};

export const mutableSnackbarList = atom<SnackbarProps[]>([]);
export const snackbarList: ReadableAtom<SnackbarProps[]> = mutableSnackbarList;

function removeSnackbar(id: string): void {
  mutableSnackbarList.set(snackbarList.get().filter((snackbar) => snackbar.id !== id));
}

export function createSnackbar({
  type,
  message,
  manualDismissible = false,
  autoDismissible = true,
  autoDismissTimeMillis = 5000,
}: SnackbarPropsApi) {
  const id = Math.random().toString(16).slice(2);

  if (autoDismissible) {
    setTimeout(() => removeSnackbar(id), autoDismissTimeMillis);
  }

  mutableSnackbarList.set([
    ...snackbarList.get(),
    {
      id,
      dismiss: () => removeSnackbar(id),
      type,
      message,
      manualDismissible,
      autoDismissible,
      autoDismissTimeMillis,
    },
  ]);
}
