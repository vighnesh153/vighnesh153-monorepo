import { MouseEventHandler, RefObject, useRef } from 'react';

import { Coordinates, EventMode } from '../utils';
import { useEventsManager, useToolbar } from '../contexts';

type State = 'idle' | 'pressed' | 'drag';

export interface UseCanvasMouseEventsHandlers {
  canvasRef: RefObject<HTMLCanvasElement>;
}

const getMouseCoordinates = (
  e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  canvas: HTMLCanvasElement
): Coordinates => {
  const rect = canvas.getBoundingClientRect();
  return { x: e.clientX - rect.left, y: e.clientY - rect.top };
};

export const useCanvasMouseEventsHandlers = ({ canvasRef }: UseCanvasMouseEventsHandlers) => {
  const { buildDrawPointEvent, buildFillEvent, buildDrawLineEvent, triggerEvents } = useEventsManager();
  const { mode, color, brushThickness } = useToolbar();
  const stateRef = useRef<State>('idle');
  const previousCoordinatesRef = useRef<Coordinates | null>(null);

  /**
   * Handles mousedown event's interaction with the current state
   */
  const onMouseDown: MouseEventHandler<HTMLCanvasElement> = (e) => {
    const coordinates = getMouseCoordinates(e, canvasRef.current!);
    const previousState = stateRef.current;

    if (previousState !== 'idle') return;

    stateRef.current = 'pressed';
    previousCoordinatesRef.current = coordinates;
  };

  /**
   * Handles mousemove event's interaction with the current state
   */
  const onMouseMove: MouseEventHandler<HTMLCanvasElement> = (e) => {
    const currentCoordinates = getMouseCoordinates(e, canvasRef.current!);
    const previousState = stateRef.current;

    if (previousState === 'idle') return;
    if (mode === EventMode.Fill) return;

    stateRef.current = 'drag';

    // trigger event
    const drawLineEvent = buildDrawLineEvent({
      color,
      brushThickness,
      coordinate1: previousCoordinatesRef.current!,
      coordinate2: currentCoordinates,
    });
    if (mode === EventMode.Draw) {
      triggerEvents(drawLineEvent);
    }

    // set previous coordinates to current coordinates
    previousCoordinatesRef.current = currentCoordinates;
  };

  /**
   * Handles mouseup event's interaction with the current state
   */
  const onMouseUp: MouseEventHandler<HTMLCanvasElement> = (e) => {
    const coordinates = getMouseCoordinates(e, canvasRef.current!);
    const previousCoordinates = previousCoordinatesRef.current!;
    const previousState = stateRef.current;
    stateRef.current = 'idle';
    previousCoordinatesRef.current = null;

    const fillEvent = buildFillEvent({ color, coordinates });
    const drawPointEvent = buildDrawPointEvent({ color, coordinates, brushThickness });
    const drawLineEvent = buildDrawLineEvent({
      color,
      brushThickness,
      coordinate1: previousCoordinates,
      coordinate2: coordinates,
    });

    // mouse up does nothing when idle
    if (previousState === 'idle') return;

    if (previousState === 'drag') {
      if (mode === EventMode.Draw) {
        triggerEvents(drawLineEvent, drawPointEvent);
      }
      return;
    }

    if (previousState === 'pressed') {
      triggerEvents(mode === EventMode.Draw ? drawPointEvent : fillEvent);
      return;
    }

    throw new Error('We should never reach here.');
  };

  return {
    onMouseDown,
    onMouseMove,
    onMouseUp,
  };
};
