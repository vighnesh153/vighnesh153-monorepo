import { User } from 'next-auth';
import { Logger } from 'next-axiom';
import { AuditAction } from '@prisma/client';
import { slugify } from '@vighnesh153/utils';
import { PrismaTransaction } from '@/lib/prisma';
import { NextAuthSuccessFailure } from './nextAuthContants';

export async function nextAuthSignUpUser(props: {
  tx: PrismaTransaction;
  user: User;
  logger: Logger;
}): Promise<NextAuthSuccessFailure> {
  const { tx, user, logger } = props;

  logger.debug('Inside "nextAuthSignUpUser"');

  const userName = (() => {
    const userNameSalt = Math.random().toString(16).split('.')[1].slice(0, 5);
    return slugify(`${user.name} ${userNameSalt}`, { convertToLowerCase: true });
  })();
  logger.debug(`Inside "nextAuthSignUpUser": generated username is "${userName}"`);

  logger.debug(`Inside "nextAuthSignUpUser": Signing up in progress ⏳`);
  try {
    await Promise.all([
      // Create UserInfo row
      tx.userInfo.create({
        data: {
          image: user.image ?? '',
          name: user.name ?? '',
          userName,
          userId: user.id,
        },
      }),
      // Create UserPermissions row
      tx.userPermissions.create({
        data: {
          userId: user.id,
        },
      }),
      // Create audit log
      tx.auditLog.create({
        data: { userId: user.id, action: AuditAction.SIGN_UP },
      }),
    ]);
    logger.debug(`Inside "nextAuthSignUpUser": Signing up in complete ✅`);

    return 'success';
  } catch (e) {
    logger.error('Inside "nextAuthSignUpUser": Some error occurred when signing in user', { e });
    return 'failure';
  }
}
