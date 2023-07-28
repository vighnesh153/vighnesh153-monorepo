import React, { useEffect, useRef } from 'react';

import { Spinner } from './Spinner';
import { defaultHtml } from '../utils/constants';

export interface CodePreviewProps {
  bundling: boolean;
  bundleError: string;
  outputCode: string;
}

export function CodePreview({ bundling, bundleError, outputCode }: CodePreviewProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const iframeRef = useRef<any>();

  // send the code to iframe
  useEffect(() => {
    if (bundling) return;
    if (bundleError) return;
    if (!iframeRef.current) return;

    // reset the html doc
    iframeRef.current.srcdoc = defaultHtml;

    // send output code as message, to the iframe
    setTimeout(() => {
      iframeRef.current?.contentWindow?.postMessage?.(outputCode);
    }, 50);
  }, [outputCode, bundling, bundleError]);

  if (bundling) {
    return (
      <div style={bundlingStyles}>
        <Spinner />
      </div>
    );
  }

  if (bundleError) {
    return (
      <div style={bundleErrorStyles}>
        <div style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Some error occurred while bundling</div>
        <span>{bundleError}</span>
      </div>
    );
  }

  return (
    <iframe
      title="preview"
      sandbox="allow-same-origin allow-scripts"
      style={rootStyles}
      ref={iframeRef}
      srcDoc={defaultHtml}
    />
  );
}

const rootStyles: React.CSSProperties = {
  width: '100%',
  borderWidth: 2,
  borderColor: 'initial',
  borderStyle: 'inset',
};

const bundlingStyles: React.CSSProperties = {
  ...rootStyles,
  padding: '1rem',
};

const bundleErrorStyles: React.CSSProperties = {
  ...rootStyles,
  padding: '1rem',
  color: 'red',
  whiteSpace: 'pre',
  overflowX: 'auto',
};
