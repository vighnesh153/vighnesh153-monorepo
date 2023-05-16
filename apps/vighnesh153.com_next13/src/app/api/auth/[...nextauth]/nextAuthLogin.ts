import { User } from 'next-auth';
import { Logger } from 'next-axiom';
import { AuditAction } from '@prisma/client';
import { PrismaTransaction } from '@/lib/prisma';
import { NextAuthSuccessFailure } from './nextAuthContants';

export async function nextAuthLoginUser(props: {
  tx: PrismaTransaction;
  user: User;
  logger: Logger;
}): Promise<NextAuthSuccessFailure> {
  const { tx, user, logger } = props;

  logger.debug('Inside "nextAuthLoginUser"');

  try {
    logger.debug('Inside "nextAuthLoginUser": Fetching user info in progress ⏳');
    const userInfo = await tx.userInfo.findUnique({
      where: {
        userId: user.id,
      },
    });
    logger.info('Inside "nextAuthLoginUser": Fetched user info complete ✅');

    if (userInfo === null) {
      logger.error('UserInfo will only be null if user is not signed up. This should not happen');
      return 'failure';
    }

    if (userInfo.blockSignIn) {
      logger.warn(`User "${user.email}" tried to log in but they are blocked.`);
      return 'failure';
    }

    logger.debug('Inside "nextAuthLoginUser": Logging in the user in progress ⏳');
    await Promise.all([
      tx.userInfo.update({
        where: {
          userId: user.id,
        },
        data: {
          name: user.name ?? '',
          image: user.image ?? '',
        },
      }),
      tx.auditLog.create({
        data: {
          action: AuditAction.LOG_IN,
          userId: user.id,
        },
      }),
    ]);
    logger.info('Inside "nextAuthLoginUser": User login complete ✅');

    return 'success';
  } catch (e) {
    logger.error('Inside "nextAuthLoginUser": Some error occurred when logging in user', { e });
    return 'failure';
  }
}
