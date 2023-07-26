import React from 'react';

import { Color, EventMode } from '../../utils';
import { Fill, Pencil } from '../../icons';
import { useToolbar } from '../../contexts';

export interface ModeSelectorProps {
  style: React.CSSProperties;
  iconStyle: React.CSSProperties;
  fontStyle: React.CSSProperties;
}

export function ModeSelector({ style, iconStyle, fontStyle }: ModeSelectorProps): JSX.Element {
  const highlightColor = Color.DarkBlue;
  const { mode: activeMode, updateMode } = useToolbar();

  const handleUpdateMode: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    updateMode(e.target.value as EventMode);
  };

  return (
    <section style={{ ...style, flexDirection: 'row', gap: 20 }}>
      {[
        { mode: EventMode.Draw, Component: Pencil },
        { mode: EventMode.Fill, Component: Fill },
      ].map(({ mode, Component }) => (
        <div style={{ lineHeight: 0 }} aria-label={mode} key={mode}>
          <label
            htmlFor={mode}
            style={{ lineHeight: 0, display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 10 }}
          >
            <div
              role="button"
              style={{
                padding: 5,
                border: '3px solid',
                borderRadius: '50%',
                backgroundColor: activeMode === mode ? highlightColor : 'transparent',
                borderColor: activeMode === mode ? highlightColor : Color.Gray,
                cursor: 'pointer',
                outline: activeMode === mode ? `2px solid ${highlightColor}` : 'none',
                outlineOffset: 2,
              }}
            >
              <Component
                style={{
                  ...iconStyle,
                  backgroundColor: activeMode === mode ? highlightColor : 'transparent',
                  fill: activeMode === mode ? 'white' : Color.Black,
                }}
              />
            </div>
            <div
              style={{
                ...fontStyle,
                color: activeMode === mode ? highlightColor : Color.Black,
              }}
            >
              {mode}
            </div>
          </label>
          <input
            type="radio"
            name="section-mode"
            id={mode}
            value={mode}
            checked={activeMode === mode}
            style={{ display: 'none' }}
            onChange={handleUpdateMode}
          />
        </div>
      ))}
    </section>
  );
}
