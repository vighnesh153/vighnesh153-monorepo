import { CSSProperties, useEffect, useMemo, useRef, useState } from 'react';

import { simpleCodeToHtml } from '@vighnesh153/simple-code-to-html';

import { defaultEditorCode } from '../utils/constants';

export interface CodeEditorProps {
  onChange: (newValue: string) => void;
}

const padding = 20;
const paddingLeft = 35;
const height = `calc(100% - ${padding * 2}px)`;
const position = 'absolute';
const overflow = 'auto';

const bgColor = '#2A2C3F';

const fontStyles: CSSProperties = {
  fontFamily: 'sans-serif',
  fontSize: '1.1rem',
  letterSpacing: 0.3,
  lineHeight: 1.15,
};

const sharedStyles: CSSProperties = {
  position,
  padding,
  paddingLeft,
  width: `calc(100% - ${padding + paddingLeft}px)`,
  height,
  overflow,
  whiteSpace: 'pre',

  ...fontStyles,
};

export function CodeEditor({ onChange }: CodeEditorProps): JSX.Element | null {
  const [inputCode, setInputCode] = useState(defaultEditorCode);
  const htmlVersion = useMemo(() => simpleCodeToHtml(inputCode), [inputCode]);
  const linesCount = useMemo(() => inputCode.split('\n').length, [inputCode]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const htmlCodeRef = useRef<HTMLDivElement>(null);
  const lineNumberRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onChange(inputCode);
  }, [onChange, inputCode]);

  useEffect(() => {
    const handler = () => {
      if (htmlCodeRef.current && textareaRef.current && lineNumberRef.current) {
        // scroll top
        htmlCodeRef.current.scrollTop = textareaRef.current.scrollTop;
        lineNumberRef.current.scrollTop = textareaRef.current.scrollTop;

        // scroll left
        htmlCodeRef.current.scrollLeft = textareaRef.current.scrollLeft;
      }
    };
    const textarea = textareaRef.current;
    textarea?.addEventListener('scroll', handler);
    return () => textarea?.removeEventListener('scroll', handler);
  }, []);

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 700,
        height: '80vh',
        position: 'relative',
        border: '1px solid',
        background: bgColor,
      }}
    >
      <div
        ref={lineNumberRef}
        style={{
          position,
          ...fontStyles,
          height,
          paddingBlock: padding,
          color: '#7e7e7e',
          overflow: 'hidden',
          background: bgColor,
          paddingInline: 5,
          zIndex: 2,
        }}
      >
        {Array.from({ length: linesCount }).map((_value, index) => (
          <span key={index}>
            {index + 1}
            <br />
          </span>
        ))}
      </div>
      <textarea
        ref={textareaRef}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        style={{
          ...sharedStyles,
          color: 'transparent',
          border: 'none',
          resize: 'none',
          zIndex: 1,
          background: 'transparent',
          caretColor: 'red',
        }}
        value={inputCode}
        onChange={(e) => setInputCode(e.target.value)}
      ></textarea>
      <div
        ref={htmlCodeRef}
        style={{
          ...sharedStyles,
          overflow: 'hidden',
          color: 'lightblue',
        }}
        dangerouslySetInnerHTML={{ __html: htmlVersion + '<br>' }}
      ></div>
    </div>
  );
}
