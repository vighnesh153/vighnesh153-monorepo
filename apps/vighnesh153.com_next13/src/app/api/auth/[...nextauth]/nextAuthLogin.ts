import { User } from 'next-auth';
import { log } from 'next-axiom';
import { AuditAction } from '@prisma/client';
import { PrismaTransaction } from '@/lib/prisma';
import { NextAuthSuccessFailure } from './nextAuthContants';

export async function nextAuthLoginUser(tx: PrismaTransaction, user: User): Promise<NextAuthSuccessFailure> {
  try {
    const userInfo = await tx.userInfo.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (userInfo === null) {
      log.error('UserInfo will only be null if user is not signed up. This should not happen');
      return 'failure';
    }

    if (userInfo.blockSignIn) {
      log.warn(`User "${user.email}" tried to log in but they are blocked.`);
      return 'failure';
    }

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

    return 'success';
  } catch (e) {
    log.error('Some error occurred when logging in user', { e });
    return 'failure';
  }
}
