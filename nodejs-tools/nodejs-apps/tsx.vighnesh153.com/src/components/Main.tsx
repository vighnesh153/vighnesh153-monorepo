import { useCallback, useEffect, useState } from 'react';

import { CodeEditor } from './CodeEditor';
import { CodePreview } from './CodePreview';
import { bundle } from '../bundler';
import { debounce } from '@vighnesh153/utils';

export function Main(): JSX.Element {
  const [inputCode, setInputCode] = useState('');
  const [outputCode, setOutputCode] = useState('');
  const [bundling, setBundling] = useState(false);
  const [error, setError] = useState('');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedBundle = useCallback(
    debounce(async (inputCode: string) => {
      const { outputCode, error } = await bundle(inputCode);
      setOutputCode(outputCode);
      setError(error);
      setBundling(false);
    }, 1000),
    []
  );

  // compile the code on change
  useEffect(() => {
    setBundling(true);
    setError('');
    debouncedBundle(inputCode);
  }, [debouncedBundle, inputCode]);

  return (
    <main
      style={{
        height: 'calc(100vh - var(--header-height))',
        display: 'flex',
        alignItems: 'stretch',
      }}
    >
      <CodeEditor onChange={setInputCode} />
      <CodePreview bundling={bundling} bundleError={error} outputCode={outputCode} />
    </main>
  );
}
