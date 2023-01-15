// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from 'next';
import { AxiomAPIRequest, withAxiom } from 'next-axiom';
import { getNextRequestLoggerWithDefaults } from '@lib/next-request-logger';

type Data = {
  name: string;
};

function handler(req: AxiomAPIRequest, res: NextApiResponse<Data>) {
  const logger = getNextRequestLoggerWithDefaults(req);

  logger.info('"hello" handler invocation start');
  const data = { name: 'John Doe' };

  logger.debug('Sending this data', data);

  logger.info('Testing scoped log');
  logger.debug('Testing scoped log (debug level)', { myCustomArg: 'vighnesh153.com' });

  logger.error('My test error message', { errorData: 'vighnesh153 ❤️' });

  res.status(403).json(data);
}

export default withAxiom(handler);
