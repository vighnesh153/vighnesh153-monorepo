import { createContext, useContext, useReducer } from 'react';

import { BrushThickness, Color, EventMode } from '../utils';

type ToolbarState = {
  mode: EventMode;
  brushThickness: BrushThickness;
  color: Color;
};

type ToolbarActions = {
  updateMode: (mode: EventMode) => void;
  updateColor: (color: Color) => void;
  updateBrushThickness: (brushThickness: BrushThickness) => void;
};

const reducer = (state: ToolbarState, updates: Partial<ToolbarState>): ToolbarState => {
  return { ...state, ...updates };
};

const ToolbarContext = createContext<(ToolbarState & ToolbarActions) | null>(null);

export function ToolbarProvider({ children }: { children: JSX.Element }): JSX.Element {
  const [{ mode, brushThickness, color }, setState] = useReducer(reducer, {
    mode: EventMode.Draw,
    brushThickness: BrushThickness.sm,
    color: Color.Black,
  });

  const updateMode = (newEventMode: EventMode) => {
    setState({ mode: newEventMode });
  };

  const updateColor = (newColor: Color) => {
    setState({ color: newColor });
  };

  const updateBrushThickness = (newBrushThickness: BrushThickness) => {
    setState({
      mode: EventMode.Draw,
      brushThickness: newBrushThickness,
    });
  };

  return (
    <ToolbarContext.Provider
      value={{
        mode,
        color,
        brushThickness,
        updateMode,
        updateColor,
        updateBrushThickness,
      }}
    >
      {children}
    </ToolbarContext.Provider>
  );
}

export const useToolbar = () => {
  const toolbarContext = useContext(ToolbarContext);

  if (!toolbarContext) {
    throw new Error('You need to wrap your components in <ToolbarProvider> to use "useToolbar"');
  }

  return toolbarContext;
};
