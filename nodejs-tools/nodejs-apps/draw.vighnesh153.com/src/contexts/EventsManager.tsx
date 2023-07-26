import { createContext, useContext } from 'react';
import { Queue } from '@vighnesh153/utils';
import { useProcessingQueueRef } from './ProcessingQueue';
import { useCanvasHistory } from '../hooks';
import { ClearScreenEvent, DrawEvents, DrawLineEvent, DrawPointEvent, FillEvent } from '../utils';

export type EventsManagerProps = {
  undo: () => void;
  redo: () => void;
  isUndoAvailable: () => boolean;
  isRedoAvailable: () => boolean;
  triggerEvents: (...newEvents: DrawEvents[]) => void;
  buildDrawPointEvent: (options: Omit<DrawPointEvent, 'type'>) => DrawPointEvent;
  buildFillEvent: (options: Omit<FillEvent, 'type'>) => FillEvent;
  buildDrawLineEvent: (options: Omit<DrawLineEvent, 'type'>) => DrawLineEvent;
  buildClearScreenEvent: (options: Omit<ClearScreenEvent, 'type'>) => ClearScreenEvent;
};

const EventsManagerContext = createContext<EventsManagerProps | null>(null);

export function EventsManagerProvider({ children }: { children: JSX.Element }): JSX.Element {
  const processingQueueRef = useProcessingQueueRef();
  const { triggerEvents, ...canvasHistoryOthers } = useCanvasHistory({
    resetTo: (updatedEvents) => (processingQueueRef.current = new Queue(...updatedEvents)),
    addNew: (newEvents) => processingQueueRef.current.pushRight(...newEvents),
  });

  const buildDrawPointEvent = (options: Omit<DrawPointEvent, 'type'>): DrawPointEvent => {
    return { type: 'point', ...options };
  };

  const buildFillEvent = (options: Omit<FillEvent, 'type'>): FillEvent => {
    return { type: 'fill', ...options };
  };

  const buildDrawLineEvent = (options: Omit<DrawLineEvent, 'type'>): DrawLineEvent => {
    return { type: 'line', ...options };
  };

  const buildClearScreenEvent = (options: Omit<ClearScreenEvent, 'type'>): ClearScreenEvent => {
    return { type: 'clear', ...options };
  };

  return (
    <EventsManagerContext.Provider
      value={{
        ...canvasHistoryOthers,
        buildDrawPointEvent,
        buildFillEvent,
        buildDrawLineEvent,
        buildClearScreenEvent,
        triggerEvents,
      }}
    >
      {children}
    </EventsManagerContext.Provider>
  );
}

export const useEventsManager = () => {
  const eventsManager = useContext(EventsManagerContext);

  if (!eventsManager) {
    throw new Error(
      '"useEventsManager" cannot be used outside of <EventsManagerProvider>.' +
        'Wrap your components in <EventsManagerProvider> to use this hook.'
    );
  }

  return eventsManager;
};
