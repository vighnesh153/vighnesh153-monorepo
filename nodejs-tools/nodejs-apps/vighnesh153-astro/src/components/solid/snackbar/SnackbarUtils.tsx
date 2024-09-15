import { createSignal, createRoot, createContext, type JSX, type Accessor, type Setter, useContext } from 'solid-js';

export type SnackbarProps = {
  type: 'success' | 'error' | 'info' | 'warn';
  message: string;

  manualDismissible?: boolean;
  autoDismissible?: boolean;
  autoDismissTimeMillis?: number;
};

type InternalSnackbarProps = SnackbarProps & {
  id: string;
  dismiss: () => void;
};

export const SnackbarContext = createContext<{
  data: Accessor<InternalSnackbarProps[]>;
  setter: Setter<InternalSnackbarProps[]>;
} | null>(null);

export function SnackbarProvider({ children }: { children: JSX.Element }): JSX.Element {
  const [snackbarList, setSnackbarList] = createRoot(() => createSignal<InternalSnackbarProps[]>([]));

  return (
    <SnackbarContext.Provider value={{ data: snackbarList, setter: setSnackbarList }}>
      {children}
    </SnackbarContext.Provider>
  );
}

export function useSnackbar() {
  const context = useContext(SnackbarContext);
  if (context == null) {
    throw new Error('Context should be wrapped with SnackbarProvider');
  }

  const removeSnackbar = (id: string): void => {
    context.setter((old) => old.filter((snackbar) => snackbar.id !== id));
  };

  const createSnackbar = ({
    type,
    message,
    manualDismissible = false,
    autoDismissible = true,
    autoDismissTimeMillis = 5000,
  }: SnackbarProps) => {
    const id = Math.random().toString(16).slice(2);

    if (autoDismissible) {
      setTimeout(() => removeSnackbar(id), autoDismissTimeMillis);
    }

    context.setter((old) => [
      ...old,
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
  };

  return {
    snackbarList: context.data,
    createSnackbar,
  };
}
