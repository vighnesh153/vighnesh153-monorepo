import { AxiomAPIRequest, Logger } from 'next-axiom';
import { v4 as uuidv4 } from 'uuid';

export function getNextRequestLoggerWithDefaults(req: AxiomAPIRequest): Logger {
  return req.log.with({ requestId: uuidv4() });
}
