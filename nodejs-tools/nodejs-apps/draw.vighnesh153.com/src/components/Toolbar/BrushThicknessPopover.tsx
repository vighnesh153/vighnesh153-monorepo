import { CSSProperties } from 'react';

import { ShowHide, useShowHide } from '../ShowHide';
import { BrushThickness, EventMode } from '../../utils';
import { useToolbar } from '../../contexts';

export interface BrushThicknessPopoverProps {
  style?: CSSProperties;
  baseFontStyles?: CSSProperties;
  baseIconButtonDisabledStyles?: CSSProperties;
}

export function BrushThicknessPopover({
  style,
  baseFontStyles,
  baseIconButtonDisabledStyles,
}: BrushThicknessPopoverProps): JSX.Element {
  const {
    color: activeColor,
    mode: activeMode,
    brushThickness: activeBrushThickness,
    updateBrushThickness,
  } = useToolbar();
  const { show, toggleShow } = useShowHide();
  const isDisabled = activeMode !== EventMode.Draw;

  const handleBrushThicknessChange = (thickness: BrushThickness) => {
    updateBrushThickness(thickness);
    toggleShow();
  };

  return (
    <>
      <div
        role="button"
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          backgroundColor: '#fff',
          border: '1px solid #dedede',
          display: 'grid',
          placeItems: 'center',
          cursor: 'pointer',
          ...(isDisabled ? baseIconButtonDisabledStyles : {}),
        }}
        onClick={() => toggleShow()}
        aria-disabled={isDisabled}
      >
        <div
          style={{
            backgroundColor: activeColor,
            width: activeBrushThickness,
            height: activeBrushThickness,
            borderRadius: '50%',
          }}
        />
      </div>
      <div style={baseFontStyles}>Size</div>
      <ShowHide show={show}>
        <div style={style}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {[BrushThickness.xs, BrushThickness.sm, BrushThickness.md, BrushThickness.lg, BrushThickness.xl].map(
              (thickness) => (
                <div
                  key={thickness}
                  role="button"
                  style={{
                    width: 35,
                    height: 35,
                    display: 'grid',
                    placeItems: 'center',
                    border: '1px solid #dedede',
                    borderRadius: '50%',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleBrushThicknessChange(thickness as BrushThickness)}
                >
                  <div
                    style={{ width: thickness, height: thickness, borderRadius: '50%', backgroundColor: activeColor }}
                  />
                </div>
              )
            )}
          </div>
        </div>
      </ShowHide>
    </>
  );
}
