import React, { createContext, useContext, useRef } from 'react';
import { Queue } from '@vighnesh153/utils';

import { DrawEvents } from '../utils';

const ProcessingQueueContext = createContext<React.MutableRefObject<Queue<DrawEvents>> | null>(null);

export function ProcessingQueueProvider({ children }: { children: JSX.Element }): JSX.Element {
  const processingQueueRef = useRef<Queue<DrawEvents>>(new Queue<DrawEvents>());

  return <ProcessingQueueContext.Provider value={processingQueueRef}>{children}</ProcessingQueueContext.Provider>;
}

export const useProcessingQueueRef = () => {
  const processingQueueRef = useContext(ProcessingQueueContext);

  if (!processingQueueRef) {
    throw new Error(
      '"useProcessingQueueRef" can only be used inside <ProcessingQueueProvider>. ' +
        'Wrap your least common ancestor with this provider.'
    );
  }

  return processingQueueRef;
};
