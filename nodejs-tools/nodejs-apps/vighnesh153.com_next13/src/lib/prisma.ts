import { Prisma, PrismaClient } from '@prisma/client';

export type PrismaTransaction = Omit<
  PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'
>;

export const prisma = new PrismaClient();

export async function deleteEverything() {
  if (process.env.NODE_ENV === 'test') {
    await Promise.all([
      prisma.account.deleteMany(),
      prisma.auditLog.deleteMany(),
      prisma.session.deleteMany(),
      prisma.user.deleteMany(),
      prisma.userInfo.deleteMany(),
      prisma.userPermissions.deleteMany(),
      prisma.verificationToken.deleteMany(),
    ]);
  }
}
