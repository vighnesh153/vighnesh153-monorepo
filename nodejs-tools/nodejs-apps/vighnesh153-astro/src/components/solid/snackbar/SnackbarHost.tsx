import { type JSX } from 'solid-js';
import { useSnackbar } from './SnackbarUtils';
import { Snackbar } from './Snackbar';

export function SnackbarHost(): JSX.Element {
  const { snackbarList } = useSnackbar();

  return (
    <div class="fixed top-10 right-10">
      {snackbarList().map((snackbar) => (
        <Snackbar {...snackbar} />
      ))}
    </div>
  );
}
