import { useReducer } from 'react';
import { not } from '@vighnesh153/utils';

import { Color, DrawEvents } from '../utils';

export interface CanvasHistoryState {
  events: DrawEvents[];
  currentEventPointer: number;
}

const reducer = (state: CanvasHistoryState, updates: Partial<CanvasHistoryState>): CanvasHistoryState => {
  return { ...state, ...updates };
};

export interface CanvasHistoryProps {
  resetTo: (updatedEvents: DrawEvents[]) => void;
  addNew: (newEvents: DrawEvents[]) => void;
}

/**
 * For doing some cool stuff 😎😎😎
 */
export const useCanvasHistory = (props: CanvasHistoryProps) => {
  const [{ events, currentEventPointer }, setState] = useReducer(reducer, {
    events: [{ type: 'clear', color: Color.White }],
    currentEventPointer: 0,
  });

  // Hos no history
  const isUndoAvailable = () => currentEventPointer > 0;

  // Has at least 1 event to go forward to
  const isRedoAvailable = () => currentEventPointer < events.length - 1;

  // Undo changes
  const undo = () => {
    if (not(isUndoAvailable())) return;

    let previousEventPointer = currentEventPointer - 1;
    let previousEvent = events[previousEventPointer];

    // As, at the end of every drag, we add a click event,
    // drag-event can never be a stopping point for the eventPointer
    while (previousEvent.type === 'line') {
      previousEventPointer -= 1;
      previousEvent = events[previousEventPointer];
    }

    setState({ currentEventPointer: previousEventPointer });

    // As we try to undo, we don't have a way to just undo the previous events
    // We have to re-draw all the events from 0 to n-1 which gives an
    // illusion of undo
    props.resetTo(events.slice(0, previousEventPointer + 1));
  };

  // Redo changes
  const redo = () => {
    if (not(isRedoAvailable())) return;

    let nextEventPointer = currentEventPointer + 1;
    let nextEvent = events[nextEventPointer];

    const newEvents: DrawEvents[] = [];
    while (nextEvent && nextEvent.type === 'line') {
      newEvents.push(nextEvent);
      nextEventPointer += 1;
      nextEvent = events[nextEventPointer];
    }

    newEvents.push(nextEvent);
    setState({ currentEventPointer: nextEventPointer });

    props.addNew(newEvents);
  };

  // Adds new events: "git push --force" strategy
  const triggerEvents = (...newEvents: DrawEvents[]) => {
    const previousEvents = events.slice(0, currentEventPointer + 1);
    const combinedEvents = [...previousEvents, ...newEvents];
    setState({
      currentEventPointer: currentEventPointer + newEvents.length,
      events: combinedEvents,
    });
    props.addNew(newEvents);
  };

  return { isUndoAvailable, isRedoAvailable, undo, redo, triggerEvents };
};
