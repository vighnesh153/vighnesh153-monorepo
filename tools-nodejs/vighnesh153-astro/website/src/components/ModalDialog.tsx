import {
  useEffect,
  useRef,
  useState,
  type JSX,
  type PropsWithChildren,
} from "react";
import { createPortal } from "react-dom";

export type ModalProps = {
  open: boolean;
  close: () => void;
};

export type UseModalDialogProps = {
  initialOpen?: boolean;
};

export function useModalDialog(props: UseModalDialogProps = {}) {
  const [open, setOpen] = useState(props.initialOpen ?? false);

  const toggleOpen = (value?: boolean) => {
    if (value === undefined) {
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

export function ModalDialog(props: PropsWithChildren<ModalProps>): JSX.Element {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (props.open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [props.open]);

  return createPortal(
    <dialog ref={dialogRef} onClose={() => props.close()}>
      {props.children}
    </dialog>,
    document.body,
  );
}
