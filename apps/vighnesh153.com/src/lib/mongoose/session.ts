import { ClientSession, Connection } from 'mongoose';
import { TransactionOptions } from 'mongodb';
import { log } from 'next-axiom';
import { mainDbConnection } from '@lib/mongoose/connection';

/**
 * Creates a new session instance
 *
 * @param connection
 */
export async function createNewSession(connection: Connection = mainDbConnection): Promise<ClientSession> {
  let session: ClientSession;
  try {
    session = await connection.startSession();
  } catch (e) {
    log.error('Failed to create a session', { error: e });
    throw e;
  }
  return session;
}

/**
 * Creates a new session instance and starts the transaction
 *
 * @param connection
 * @param transactionOptions
 */
export async function createNewSessionWithTransaction(
  connection: Connection = mainDbConnection,
  transactionOptions?: TransactionOptions
): Promise<ClientSession> {
  const session = await createNewSession(connection);
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    session.startTransaction(transactionOptions);
  } catch (error) {
    log.error('Failed to start transaction on the session instance', { error });
    throw error;
  }

  return session;
}

/**
 * Commits the transaction and ends the session
 *
 * @param session
 */
export async function commitTransactionAndEnd(session: ClientSession): Promise<'success' | 'failure'> {
  try {
    await session.commitTransaction();
  } catch (error) {
    log.error('Failed to commit the transaction', { error, session });
    return 'failure';
  }
  try {
    await session.endSession();
  } catch (error) {
    log.error('Failed to end the session', { error, session });
    return 'failure';
  }

  return 'success';
}
