import { For, type JSX } from 'solid-js';
import { useStore } from '@nanostores/solid';
import { snackbarList } from '@/stores/snackbar.ts';
import { Snackbar } from './Snackbar.tsx';

export function SnackbarHost(): JSX.Element {
  const $snackbarList = useStore(snackbarList);

  return (
    <div class="fixed top-10 right-10 z-snackbar">
      <For each={$snackbarList()}>{(snackbar) => <Snackbar {...snackbar} />}</For>
    </div>
  );
}
