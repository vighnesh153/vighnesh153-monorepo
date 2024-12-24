import {
  createEffect,
  createSignal,
  type JSX,
  type ParentProps,
} from "solid-js";
import { Portal } from "solid-js/web";

export type ModalProps = {
  open: boolean;
  close: () => void;
};

export type UseModalDialogProps = {
  initialOpen?: boolean;
};

export function useModalDialog(props: UseModalDialogProps = {}) {
  const [open, setOpen] = createSignal(props.initialOpen ?? false);

  const toggleOpen = (value?: boolean) => {
    if (value == undefined) {
      setOpen((old) => !old);
    } else {
      setOpen(value);
    }
  };

  return {
    open,
    close: () => toggleOpen(false),
    toggleOpen,
  };
}

export function ModalDialog(props: ParentProps<ModalProps>): JSX.Element {
  let dialogRef!: HTMLDialogElement;

  createEffect(() => {
    if (props.open) {
      dialogRef?.showModal();
    } else {
      dialogRef?.close();
    }
  });

  return (
    <Portal mount={document.body}>
      <dialog ref={dialogRef} onClose={() => props.close()}>
        {props.children}
      </dialog>
    </Portal>
  );
}
