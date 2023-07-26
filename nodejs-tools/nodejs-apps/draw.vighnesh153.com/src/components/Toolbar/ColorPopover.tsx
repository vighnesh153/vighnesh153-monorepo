import { CSSProperties } from 'react';

import { Color } from '../../utils';
import { useToolbar } from '../../contexts';
import { ShowHide, useShowHide } from '../ShowHide';

export interface ColorPopoverProps {
  style?: CSSProperties;
  baseFontStyles?: CSSProperties;
}

export function ColorPopover({ style, baseFontStyles }: ColorPopoverProps): JSX.Element {
  const { color: activeColor, updateColor } = useToolbar();
  const { show, toggleShow } = useShowHide();

  const handleColorChange = (color: string) => {
    updateColor(color as Color);
    toggleShow();
  };

  return (
    <>
      <div
        role="button"
        style={{
          width: 35,
          height: 35,
          backgroundColor: activeColor,
          borderRadius: '50%',
          cursor: 'pointer',
          border: '1px solid #dedede',
        }}
        onClick={() => toggleShow()}
      />
      <div style={baseFontStyles}>Color</div>
      <ShowHide show={show}>
        <div style={style}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {Object.values(Color).map((color) => (
              <div
                key={color}
                role="button"
                style={{
                  width: 35,
                  height: 35,
                  border: '1px solid #dedede',
                  borderRadius: '50%',
                  backgroundColor: color,
                  cursor: 'pointer',
                }}
                onClick={() => handleColorChange(color)}
              />
            ))}
          </div>
        </div>
      </ShowHide>
    </>
  );
}
